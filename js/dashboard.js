
    // ── Uptime Counter ──
    const startTime = Date.now();
    function updateUptime() {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const h = String(Math.floor(elapsed / 3600)).padStart(2, '0');
      const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
      const s = String(elapsed % 60).padStart(2, '0');
      document.getElementById('uptimeDisplay').textContent = `UPTIME: ${h}:${m}:${s}`;
    }
    setInterval(updateUptime, 1000);

    // ── Stats Tracking ──
    const stats = { totalMem: 0, storeOps: 0, retrieveOps: 0, forgetOps: 0, recallOps: 0, totalOps: 0, sessionLen: 0 };

    function updateStats() {
      document.getElementById('statTotalMem').textContent = stats.totalMem;
      document.getElementById('statStoreOps').textContent = stats.storeOps;
      document.getElementById('statRetrieveOps').textContent = stats.retrieveOps;
      document.getElementById('statForgetOps').textContent = stats.forgetOps;
      const rate = stats.recallOps > 0 ? Math.round((stats.recallOps / (stats.recallOps + stats.forgetOps)) * 100) : 100;
      document.getElementById('statRecallRate').textContent = rate + '%';
      document.getElementById('statSessionLen').textContent = stats.sessionLen;
      document.getElementById('opsCounter').textContent = `OPS: ${stats.totalOps}`;
    }

    // ── Memory Store ──
    const DASH_MEM_KEY = 'qwen_dashboard_mem';
    const DASH_CHAT_KEY = 'qwen_dashboard_chat';

    function getDashMem() {
      try { return JSON.parse(localStorage.getItem(DASH_MEM_KEY)) || {}; }
      catch { return {}; }
    }
    function saveDashMem(mem) { localStorage.setItem(DASH_MEM_KEY, JSON.stringify(mem)); }

    function getDashChat() {
      try { return JSON.parse(localStorage.getItem(DASH_CHAT_KEY)) || { userName: null, history: [], topics: [] }; }
      catch { return { userName: null, history: [], topics: [] }; }
    }
    function saveDashChat(data) { localStorage.setItem(DASH_CHAT_KEY, JSON.stringify(data)); }

    // ── Operations Feed ──
    const opTypes = {
      store: { icon: '💾', label: 'STORE', class: 'store' },
      retrieve: { icon: '🔍', label: 'RETRIEVE', class: 'retrieve' },
      forget: { icon: '🗑️', label: 'FORGET', class: 'forget' },
      recall: { icon: '🧠', label: 'RECALL', class: 'recall' },
      connect: { icon: '🔗', label: 'CONNECT', class: 'connect' },
    };

    function addOp(type, description) {
      const feed = document.getElementById('opsFeed');
      const op = opTypes[type];
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', { hour12: false });

      const item = document.createElement('div');
      item.className = 'op-item';
      item.innerHTML = `
        <div class="op-icon ${op.class}">${op.icon}</div>
        <div class="op-content">
          <div class="op-type ${op.class}">${op.label}</div>
          <div class="op-desc">${description}</div>
        </div>
        <div class="op-time">${time}</div>
      `;
      feed.insertBefore(item, feed.firstChild);

      // Keep only last 50 ops
      while (feed.children.length > 50) feed.removeChild(feed.lastChild);

      stats.totalOps++;
      if (type === 'store') stats.storeOps++;
      if (type === 'retrieve') stats.retrieveOps++;
      if (type === 'forget') stats.forgetOps++;
      if (type === 'recall') stats.recallOps++;

      updateStats();
    }

    // ── Memory Inspector ──
    function updateMemInspector() {
      const mem = getDashMem();
      const inspector = document.getElementById('memInspector');
      const keys = Object.keys(mem);
      document.getElementById('memCount').textContent = `${keys.length} SLOTS`;
      stats.totalMem = keys.length;

      inspector.innerHTML = '';
      keys.forEach(key => {
        const entry = mem[key];
        const age = Date.now() - (entry.stored || Date.now());
        const ageStr = age < 60000 ? `${Math.floor(age/1000)}s ago` : age < 3600000 ? `${Math.floor(age/60000)}m ago` : `${Math.floor(age/3600000)}h ago`;

        // Decay based on access frequency and age
        const decay = Math.max(0, 100 - (age / 600000) * 10); // 10% per 10min
        const decayClass = decay > 75 ? 'decay-fresh' : decay > 50 ? 'decay-warm' : decay > 25 ? 'decay-stale' : 'decay-dying';

        const slot = document.createElement('div');
        slot.className = 'mem-slot';
        slot.innerHTML = `
          <div class="slot-header">
            <div class="slot-key">${key}</div>
            <div class="slot-age">${ageStr}</div>
          </div>
          <div class="slot-value">${typeof entry.value === 'object' ? JSON.stringify(entry.value).substring(0, 80) : String(entry.value).substring(0, 80)}</div>
          <div class="slot-meta">
            <span>Reads: ${entry.reads || 0}</span>
            <span>Writes: ${entry.writes || 0}</span>
            <span>Strength: ${Math.round(decay)}%</span>
          </div>
          <div class="decay-bar"><div class="decay-fill ${decayClass}" style="width:${decay}%"></div></div>
        `;
        inspector.appendChild(slot);
      });
      updateStats();
    }

    // ── Store a Memory ──
    function storeMemory(key, value, silent) {
      const mem = getDashMem();
      const isNew = !mem[key];
      mem[key] = {
        value: value,
        stored: mem[key]?.stored || Date.now(),
        updated: Date.now(),
        reads: mem[key]?.reads || 0,
        writes: (mem[key]?.writes || 0) + 1,
      };
      saveDashMem(mem);
      if (!silent) addOp('store', `${key} = "${String(value).substring(0, 40)}"`);
      updateMemInspector();
      addGraphNode(key, value);
      return isNew;
    }

    // ── Retrieve a Memory ──
    function retrieveMemory(key) {
      const mem = getDashMem();
      if (mem[key]) {
        mem[key].reads = (mem[key].reads || 0) + 1;
        saveDashMem(mem);
        addOp('retrieve', `${key} → "${String(mem[key].value).substring(0, 40)}"`);
        updateMemInspector();
        return mem[key].value;
      }
      addOp('retrieve', `${key} → NOT FOUND`);
      return null;
    }

    // ── Forget a Memory ──
    function forgetMemory(key) {
      const mem = getDashMem();
      if (mem[key]) {
        const val = mem[key].value;
        delete mem[key];
        saveDashMem(mem);
        addOp('forget', `${key} (was: "${String(val).substring(0, 30)}")`);
        addDecayEntry(key, 'forgotten');
        updateMemInspector();
        return true;
      }
      return false;
    }

    // ── Inception Mode (Inject Memory) ──
    function injectMemory() {
      const keyEl = document.getElementById('inceptionKey');
      const valEl = document.getElementById('inceptionValue');
      const key = keyEl.value.trim();
      const val = valEl.value.trim();
      
      if (!key || !val) {
        alert("Both Key and Value are required for Inception.");
        return;
      }
      
      storeMemory(key, val);
      keyEl.value = '';
      valEl.value = '';
      
      playSound('success');

      // Visual feedback on the Inception Portal
      const portal = keyEl.parentElement;
      const oldBg = portal.style.background;
      portal.style.background = 'rgba(244,114,182,0.3)';
      setTimeout(() => { portal.style.background = oldBg; }, 300);
    }

    // ── Decay Timeline ──
    const decayEntries = [];
    function addDecayEntry(key, state) {
      decayEntries.unshift({ key, state, time: Date.now() });
      if (decayEntries.length > 15) decayEntries.pop();
      renderDecayTimeline();
    }
    function renderDecayTimeline() {
      const el = document.getElementById('decayTimeline');
      el.innerHTML = decayEntries.map(e => {
        const ago = Math.floor((Date.now() - e.time) / 1000);
        const agoStr = ago < 60 ? `${ago}s` : `${Math.floor(ago/60)}m`;
        return `<div class="decay-entry ${e.state}"><span>${e.key}</span><span style="margin-left:auto;font-size:0.45rem;">${agoStr}</span></div>`;
      }).join('');
    }

    // ── Memory Network Graph (Canvas) ──
    const graphNodes = [];
    const graphEdges = [];
    let graphCanvas, graphCtx;

    function initGraph() {
      graphCanvas = document.getElementById('memoryGraph');
      graphCtx = graphCanvas.getContext('2d');
      resizeGraph();
      window.addEventListener('resize', resizeGraph);
      animateGraph();
    }

    function resizeGraph() {
      const rect = graphCanvas.parentElement.getBoundingClientRect();
      graphCanvas.width = rect.width;
      graphCanvas.height = rect.height - 50;
    }

    function addGraphNode(key, value) {
      const existing = graphNodes.find(n => n.key === key);
      if (existing) {
        existing.pulseTime = Date.now();
        existing.value = value;
        return;
      }

      const cx = graphCanvas.width / 2;
      const cy = graphCanvas.height / 2;
      const angle = Math.random() * Math.PI * 2;
      const dist = 80 + Math.random() * 150;

      const node = {
        key, value,
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 18 + Math.min(String(value).length, 30) * 0.3,
        color: getNodeColor(key),
        pulseTime: Date.now(),
        created: Date.now(),
      };
      graphNodes.push(node);

      // Connect to random existing nodes
      if (graphNodes.length > 1) {
        const connections = Math.min(2, graphNodes.length - 1);
        for (let i = 0; i < connections; i++) {
          const target = graphNodes[Math.floor(Math.random() * (graphNodes.length - 1))];
          if (target !== node && !graphEdges.find(e => (e.a === node && e.b === target) || (e.a === target && e.b === node))) {
            graphEdges.push({ a: node, b: target, strength: 0.5 + Math.random() * 0.5 });
            addOp('connect', `${node.key} ↔ ${target.key}`);
          }
        }
      }
    }

    function getNodeColor(key) {
      const palette = ['#22d3ee','#a78bfa','#f472b6','#4ade80','#fbbf24','#fb923c','#60a5fa','#f87171','#34d399','#c084fc','#38bdf8','#facc15'];
      const colors = {
        'user': '#22d3ee', 'session': '#fbbf24', 'context': '#fb923c',
        'agent': '#60a5fa', 'cross': '#4ade80', 'last': '#a78bfa',
      };
      for (const [k, c] of Object.entries(colors)) {
        if (key.toLowerCase().startsWith(k)) return c;
      }
      const idx = (key.charCodeAt(0) * 7 + key.length * 13) % palette.length;
      return palette[idx];
    }

    function animateGraph() {
      if (!graphCtx) return;
      const W = graphCanvas.width, H = graphCanvas.height;
      graphCtx.clearRect(0, 0, W, H);

      // Draw grid
      graphCtx.strokeStyle = 'rgba(34,211,238,0.03)';
      graphCtx.lineWidth = 1;
      for (let x = 0; x < W; x += 50) {
        graphCtx.beginPath(); graphCtx.moveTo(x, 0); graphCtx.lineTo(x, H); graphCtx.stroke();
      }
      for (let y = 0; y < H; y += 50) {
        graphCtx.beginPath(); graphCtx.moveTo(0, y); graphCtx.lineTo(W, y); graphCtx.stroke();
      }

      // Draw edges
      graphEdges.forEach(edge => {
        const alpha = edge.strength * 0.3;
        graphCtx.beginPath();
        graphCtx.moveTo(edge.a.x, edge.a.y);
        graphCtx.lineTo(edge.b.x, edge.b.y);
        graphCtx.strokeStyle = `rgba(34,211,238,${alpha})`;
        graphCtx.lineWidth = edge.strength * 1.5;
        graphCtx.stroke();

        // Animated particle along edge
        const t = ((Date.now() / 3000) % 1);
        const px = edge.a.x + (edge.b.x - edge.a.x) * t;
        const py = edge.a.y + (edge.b.y - edge.a.y) * t;
        graphCtx.beginPath();
        graphCtx.arc(px, py, 2, 0, Math.PI * 2);
        graphCtx.fillStyle = `rgba(34,211,238,${alpha * 2})`;
        graphCtx.fill();
      });

      // Draw nodes
      graphNodes.forEach(node => {
        // Gentle physics
        node.x += node.vx;
        node.y += node.vy;
        node.vx *= 0.99;
        node.vy *= 0.99;

        // Bounds
        if (node.x < 40) { node.x = 40; node.vx *= -0.5; }
        if (node.x > W - 40) { node.x = W - 40; node.vx *= -0.5; }
        if (node.y < 40) { node.y = 40; node.vy *= -0.5; }
        if (node.y > H - 40) { node.y = H - 40; node.vy *= -0.5; }

        // Repulsion from other nodes
        graphNodes.forEach(other => {
          if (other === node) return;
          const dx = node.x - other.x, dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const force = (100 - dist) / 100 * 0.1;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          }
        });

        // Pulse effect
        const timeSincePulse = Date.now() - node.pulseTime;
        const pulseScale = timeSincePulse < 1000 ? 1 + Math.sin(timeSincePulse / 100) * 0.3 : 1;
        const r = node.radius * pulseScale;

        // Glow
        const gradient = graphCtx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 2);
        gradient.addColorStop(0, node.color + '30');
        gradient.addColorStop(1, 'transparent');
        graphCtx.fillStyle = gradient;
        graphCtx.beginPath();
        graphCtx.arc(node.x, node.y, r * 2, 0, Math.PI * 2);
        graphCtx.fill();

        // Node circle
        graphCtx.beginPath();
        graphCtx.arc(node.x, node.y, r, 0, Math.PI * 2);
        graphCtx.fillStyle = node.color + '18';
        graphCtx.fill();
        graphCtx.strokeStyle = node.color + '60';
        graphCtx.lineWidth = 1.5;
        graphCtx.stroke();

        // Label
        graphCtx.fillStyle = node.color;
        graphCtx.font = '9px JetBrains Mono';
        graphCtx.textAlign = 'center';
        graphCtx.fillText(node.key, node.x, node.y - 3);

        graphCtx.fillStyle = 'rgba(255,255,255,0.3)';
        graphCtx.font = '7px JetBrains Mono';
        graphCtx.fillText(String(node.value).substring(0, 15), node.x, node.y + 8);
      });

      requestAnimationFrame(animateGraph);
    }

    // ── Dashboard Chat ──
    async function dashSendChat() {
      const input = document.getElementById('dashChatInput');
      const msg = input.value.trim();
      if (!msg) return;

      const chatData = getDashChat();
      const historyEl = document.getElementById('dashChatHistory');

      // Show user message
      const userDiv = document.createElement('div');
      userDiv.className = 'chat-msg user';
      userDiv.innerHTML = `<div class="sender">▸ YOU</div><div class="body">${escapeHtml(msg)}</div>`;
      historyEl.appendChild(userDiv);

      // Log the interaction as a memory operation
      addOp('store', `user.input = "${msg.substring(0, 40)}"`);
      storeMemory('last.input', msg, true);
      stats.sessionLen++;

      // Name detection - store as memory
      const lower = msg.toLowerCase();
      const nameMatch = lower.match(/(?:my name is|i'm|call me|i am) (\w+)/i);
      if (nameMatch) {
        const name = nameMatch[1];
        chatData.userName = name;
        storeMemory('user.name', name);
        addDecayEntry('user.name', 'active');
      }

      // Forget request
      if (lower.match(/forget.*(name|me|everything)/i)) {
        if (lower.includes('everything')) {
          const mem = getDashMem();
          Object.keys(mem).forEach(k => forgetMemory(k));
          chatData.userName = null;
          chatData.topics = [];
        } else if (lower.includes('name')) {
          forgetMemory('user.name');
          chatData.userName = null;
        }
      }

      // Topic tracking
      if (lower.match(/feel|emotion/i) && !chatData.topics.includes('feelings')) { chatData.topics.push('feelings'); storeMemory('context.topic.feelings', true); }
      if (lower.match(/joke|funny/i) && !chatData.topics.includes('jokes')) { chatData.topics.push('jokes'); storeMemory('context.topic.jokes', true); }
      if (lower.match(/brain|neural/i) && !chatData.topics.includes('brain')) { chatData.topics.push('brain'); storeMemory('context.topic.brain', true); }
      if (lower.match(/hack|track|compet/i) && !chatData.topics.includes('hackathon')) { chatData.topics.push('hackathon'); storeMemory('context.topic.hackathon', true); }

      // Remember/recall queries
      if (lower.match(/remember|recall|what.*my name|who am i|do you know/i)) {
        const name = retrieveMemory('user.name');
        if (name) addOp('recall', `user.name → "${name}"`);
      }

      input.value = '';
      input.disabled = true;
      document.getElementById('dashChatSend').disabled = true;

      // Show typing indicators
      const typingDivChaos = document.createElement('div');
      typingDivChaos.className = 'chat-msg agent';
      typingDivChaos.innerHTML = `<div class="sender" style="color:var(--pink);">🌀 QWEN CHAOS</div><div class="body"><div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div>`;
      historyEl.appendChild(typingDivChaos);

      const typingDivOrder = document.createElement('div');
      typingDivOrder.className = 'chat-msg agent';
      typingDivOrder.innerHTML = `<div class="sender" style="color:var(--cyan);">🧊 QWEN ORDER</div><div class="body"><div class="typing-indicator" style="--dot-color:var(--cyan);"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div>`;
      historyEl.appendChild(typingDivOrder);

      historyEl.scrollTop = historyEl.scrollHeight;

      try {
        // Build memory context from ALL dashboard memories
        const allMem = getDashMem();
        const memContext = {
          userName: chatData.userName,
          topics: chatData.topics,
          allMemories: allMem,
          sessionLength: stats.sessionLen,
        };

        const fetchAgent = async (agentType) => {
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: msg,
              memoryContext: memContext,
              history: chatData.history.slice(-3),
              agentType: agentType
            })
          });
          return await res.json();
        };

        // Fetch both simultaneously
        const [resChaos, resOrder] = await Promise.all([
          fetchAgent('chaos'),
          fetchAgent('order')
        ]);

        const agentMsgChaos = resChaos.response || resChaos.error || 'Chaos offline.';
        const agentMsgOrder = resOrder.response || resOrder.error || 'Order offline.';

        typingDivChaos.querySelector('.body').innerHTML = escapeHtml(agentMsgChaos);
        typingDivOrder.querySelector('.body').innerHTML = escapeHtml(agentMsgOrder);
        
        // Use speechSynthesis for Voice Interaction (Chaos read)
        if (window.voiceModeActive) {
          const utteranceChaos = new SpeechSynthesisUtterance(agentMsgChaos);
          utteranceChaos.pitch = 0.5; // low pitch for chaos
          utteranceChaos.rate = 1.1;
          window.speechSynthesis.speak(utteranceChaos);
          
          const utteranceOrder = new SpeechSynthesisUtterance(agentMsgOrder);
          utteranceOrder.pitch = 1.5; // high pitch for order
          utteranceOrder.rate = 1.0;
          window.speechSynthesis.speak(utteranceOrder);
        }

        addOp('retrieve', `chaos.response (${agentMsgChaos.length} chars)`);
        addOp('retrieve', `order.response (${agentMsgOrder.length} chars)`);

        chatData.history.push({ user: msg, agent: agentMsgChaos });
        if (chatData.history.length > 20) chatData.history = chatData.history.slice(-20);
        saveDashChat(chatData);

        storeMemory('last.response.chaos', agentMsgChaos.substring(0, 40), true);
        storeMemory('last.response.order', agentMsgOrder.substring(0, 40), true);
        storeMemory('session.messages', chatData.history.length, true);
      } catch (error) {
        typingDivChaos.querySelector('.body').textContent = 'Connection interrupted.';
        typingDivOrder.querySelector('.body').textContent = 'Connection interrupted.';
        addOp('forget', 'connection.lost — response discarded');
      }

      input.disabled = false;
      document.getElementById('dashChatSend').disabled = false;
      input.focus();
      historyEl.scrollTop = historyEl.scrollHeight;
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    // ── Keyboard Enter ──
    document.getElementById('dashChatInput').addEventListener('keydown', e => {
      if (e.key === 'Enter') dashSendChat();
    });

    // ── Voice Interaction ──
    window.voiceModeActive = false;
    function toggleVoiceMode() {
      window.voiceModeActive = !window.voiceModeActive;
      const btn = document.getElementById('voiceToggle');
      if (window.voiceModeActive) {
        btn.textContent = '🔊';
        btn.style.color = 'var(--green)';
      } else {
        btn.textContent = '🔈';
        btn.style.color = 'var(--text-dim)';
        window.speechSynthesis.cancel();
      }
    }

    function startDictation() {
      if (!('webkitSpeechRecognition' in window)) {
        alert("Sorry, your browser doesn't support speech recognition.");
        return;
      }
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      const micBtn = document.getElementById('micBtn');
      micBtn.style.color = 'var(--bg)';
      micBtn.style.background = 'var(--pink)';
      micBtn.style.borderRadius = '50%';

      recognition.onresult = function(event) {
        const text = event.results[0][0].transcript;
        document.getElementById('dashChatInput').value = text;
        dashSendChat();
      };
      
      recognition.onerror = function(event) {
        console.error("Speech recognition error", event);
      };
      
      recognition.onend = function() {
        micBtn.style.color = 'var(--pink)';
        micBtn.style.background = 'transparent';
      };

      recognition.start();
    }

    // ── Initialize ──
    function init() {
      initGraph();

      // Load existing memories into graph
      const mem = getDashMem();
      Object.keys(mem).forEach(key => addGraphNode(key, mem[key].value));
      updateMemInspector();

      // Seed initial operations
      addOp('store', 'session.start = "' + new Date().toISOString() + '"');
      storeMemory('session.start', new Date().toISOString(), true);

      // Check for returning user
      const chatData = getDashChat();
      if (chatData.userName) {
        addOp('recall', `user.name → "${chatData.userName}" (cross-session recall!)`);
        storeMemory('user.name', chatData.userName, true);
        addDecayEntry('user.name', 'active');
        const historyEl = document.getElementById('dashChatHistory');
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'chat-msg agent';
        welcomeDiv.innerHTML = `<div class="sender">🧠 MEMORYAGENT</div><div class="body">Welcome back, <strong style="color:var(--cyan)">${chatData.userName}</strong>! I remembered your name across sessions. That's persistent memory in action. I have ${Object.keys(mem).length} memories in storage right now.</div>`;
        historyEl.appendChild(welcomeDiv);
      }

      if (chatData.history && chatData.history.length > 0) {
        storeMemory('session.history_len', chatData.history.length, true);
        addOp('recall', `Loaded ${chatData.history.length} past messages from persistent storage`);
      }

      // Cross-page memory integration
      try {
        const crossPage = JSON.parse(localStorage.getItem('qwen_cross_page')) || {};
        if (crossPage.pages && crossPage.pages.length > 0) {
          storeMemory('cross.pages_visited', crossPage.pages.length, true);
          addOp('recall', `Cross-page: ${crossPage.pages.length} pages visited across site`);
        }
      } catch(e) {}

      // Auto memory decay simulation
      setInterval(() => {
        const mem = getDashMem();
        const keys = Object.keys(mem);
        if (keys.length > 0) {
          const randomKey = keys[Math.floor(Math.random() * keys.length)];
          const age = Date.now() - (mem[randomKey].stored || Date.now());
          if (age > 300000 && mem[randomKey].reads < 2 && !randomKey.includes('user.name')) { // 5min + low reads
            addDecayEntry(randomKey, 'fading');
            addOp('forget', `${randomKey} — memory strength decaying (age: ${Math.floor(age/60000)}m, reads: ${mem[randomKey].reads})`);
          } else {
            addDecayEntry(randomKey, 'active');
          }
        }
        updateMemInspector();
      }, 15000);

      // Periodic ambient ops
      const ambientOps = [
        () => addOp('retrieve', 'agent.self_check — consciousness status: PROBABLY'),
        () => addOp('store', `agent.heartbeat = ${Date.now()}`),
        () => addOp('recall', `session.uptime = ${Math.floor((Date.now() - startTime)/1000)}s`),
        () => addOp('connect', 'memory_graph.reindex — optimizing connections'),
        () => addOp('retrieve', `agent.mood = "${['chaotic','unhinged','reflective','curious','caffeinated'][Math.floor(Math.random()*5)]}"`),
      ];
      setInterval(() => {
        ambientOps[Math.floor(Math.random() * ambientOps.length)]();
      }, 8000);

      // Also update cross-page breadcrumb
      updateCrossPage();
    }

    // ── Cross-Page Memory ──
    function updateCrossPage() {
      const CROSS_PAGE_KEY = 'qwen_cross_page';
      try {
        const data = JSON.parse(localStorage.getItem(CROSS_PAGE_KEY)) || { pages: [], totalPages: 0, totalClicks: 0, startTime: Date.now() };
        const currentPage = 'dashboard.html';
        if (!data.pages.find(p => p.url === currentPage)) {
          data.pages.push({ url: currentPage, title: 'MEMORY.OPS', visits: 1, firstVisit: Date.now(), lastVisit: Date.now() });
        } else {
          const page = data.pages.find(p => p.url === currentPage);
          page.visits++;
          page.lastVisit = Date.now();
        }
        data.totalPages = data.pages.length;
        localStorage.setItem(CROSS_PAGE_KEY, JSON.stringify(data));
      } catch(e) {}
    }

    // ── Psychoanalysis ──
    async function runPsychoanalysis() {
      const modal = document.getElementById('psychoModal');
      const content = document.getElementById('psychoContent');
      modal.style.display = 'flex';
      content.innerHTML = '<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div><br/>Analyzing memory nodes...';
      
      try {
        const memContext = getDashMem();
        const res = await fetch('/api/psychoanalyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ memoryContext: memContext })
        });
        const data = await res.json();
        
        content.innerHTML = `<strong style="color:var(--purple);font-size:1.1rem;display:block;margin-bottom:1rem;">[ PSYCHOLOGICAL PROFILE ]</strong>${escapeHtml(data.analysis || data.error || "Analysis failed.")}`;
        
        if (window.voiceModeActive && data.analysis) {
          const utterance = new SpeechSynthesisUtterance(data.analysis);
          utterance.pitch = 0.8;
          utterance.rate = 0.9;
          window.speechSynthesis.speak(utterance);
        }

        if (data.analysis) {
          storeMemory('meta.psychoanalysis', data.analysis, true);
          addOp('connect', 'Recursive memory injection: agent profiling user added to core memory.');
        }
      } catch (e) {
        content.textContent = "Neural connection lost. Psychoanalysis failed.";
      }
    }

    init();
  