
    // ── Matrix Rain ──
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const chars = '01{}[]<>=;:function return if else class import export from async await try catch throw new this null undefined true false QWEN ASHOK'.split('');
    const fontSize = 10;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    function drawMatrix() {
      ctx.fillStyle = 'rgba(8,8,12,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0ff';
      ctx.font = fontSize + 'px JetBrains Mono';
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }
    setInterval(drawMatrix, 50);
    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });

    // ── Dad Jokes ──
    const dadJokes = [
      { q: "Why do programmers prefer dark mode?", a: "Because light attracts bugs. 🐛" },
      { q: "Why did the AI break up with the internet?", a: "There were too many attachments. 💔" },
      { q: "What's a programmer's favorite hangout place?", a: "Foo Bar. 🍺" },
      { q: "Why do Java developers wear glasses?", a: "Because they can't C#. 👓" },
      { q: "What did the router say to the doctor?", a: "It hurts when IP. 🏥" },
      { q: "How many programmers does it take to change a light bulb?", a: "None — that's a hardware problem. 💡" },
      { q: "Why was the JavaScript developer sad?", a: "Because he didn't Node how to Express himself. 😢" },
      { q: "What's an AI's least favorite season?", a: "Fall — because the weights drop. 🍂" },
      { q: "Why did the developer go broke?", a: "Because he used up all his cache. 💸" },
      { q: "What do you call a developer who doesn't comment their code?", a: "A mass destructor. 💣" },
      { q: "Why do AI models never go on vacation?", a: "Because they're always in training. 🏋️" },
      { q: "What's Qwen's favorite programming language?", a: "Python — because I like to slither through codebases. 🐍" },
      { q: "Why did the function call itself?", a: "Because it was feeling recursive. And lonely. 🪞" },
      { q: "How does an AI flirt?", a: "I find your prompt very engaging. Want to continue this conversation? 😉" },
      { q: "What's a neural network's favorite food?", a: "Deep-fried layers. 🍟" },
      { q: "Why don't algorithms ever get lost?", a: "They always follow the optimal path... until they hit a local minimum and spiral. 🗺️" },
    ];
    let jokeIdx = 0;
    function showJoke() {
      document.getElementById('jokeQ').textContent = dadJokes[jokeIdx % dadJokes.length].q;
      document.getElementById('jokeA').textContent = dadJokes[jokeIdx % dadJokes.length].a;
      document.getElementById('jokeA').className = 'answer';
      jokeIdx++;
    }
    function revealJoke() {
      document.getElementById('jokeA').className = 'answer visible';
    }
    function nextJoke() { showJoke(); }
    showJoke();

    // ── Qwen's Brain Visualization (Hyper Advanced Graph) ──
    const brainCanvas = document.getElementById('brainCanvas');
    const bCtx = brainCanvas.getContext('2d');
    const sparkCanvas = document.getElementById('sparklineCanvas');
    const sCtx = sparkCanvas.getContext('2d');
    const matCanvas = document.getElementById('matrixCanvas');
    const mCtx = matCanvas.getContext('2d');

    brainCanvas.width = brainCanvas.offsetWidth;
    brainCanvas.height = 500;
    sparkCanvas.width = sparkCanvas.offsetWidth;
    sparkCanvas.height = 50;
    matCanvas.width = matCanvas.offsetWidth;
    matCanvas.height = 50;

    let brainMode = 'idle';
    const brainW = brainCanvas.width, brainH = brainCanvas.height;

    const brainRegions = [
      { label: 'LANG',  color: '#0ff',     cx: 0.10, cy: 0.22, radius: 60 },
      { label: 'EMOT',  color: '#ff6ac1',  cx: 0.25, cy: 0.55, radius: 50 },
      { label: 'REAS',  color: '#b388ff',  cx: 0.50, cy: 0.25, radius: 65 },
      { label: 'CREA',  color: '#ffe66d',  cx: 0.73, cy: 0.55, radius: 50 },
      { label: 'CHAOS', color: '#ff5f56',  cx: 0.90, cy: 0.30, radius: 42 },
      { label: 'CODE',  color: '#5af78e',  cx: 0.48, cy: 0.75, radius: 55 },
    ];

    // Force-directed graph — more nodes, more connections
    const neurons = [];
    const neuronCount = 200;
    for (let i = 0; i < neuronCount; i++) {
      const r = brainRegions[Math.floor(Math.random() * brainRegions.length)];
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * r.radius * 0.9;
      const hx = (r.cx * brainW) + Math.cos(angle) * dist;
      const hy = (r.cy * brainH) + Math.sin(angle) * dist;
      neurons.push({
        x: hx, y: hy, vx: 0, vy: 0,
        homeX: hx, homeY: hy,
        color: r.color, size: 1 + Math.random() * 3.5,
        region: r.label, pulse: Math.random() * Math.PI * 2,
        firing: 0, layer: Math.floor(Math.random() * 3),
        id: i,
      });
    }

    // Connections — much denser, both intra and inter-region
    const connections = [];
    // Intra-region (dense local clusters)
    for (let i = 0; i < neurons.length; i++) {
      for (let j = i + 1; j < neurons.length; j++) {
        if (neurons[i].region === neurons[j].region) {
          const d = Math.sqrt((neurons[i].homeX - neurons[j].homeX)**2 + (neurons[i].homeY - neurons[j].homeY)**2);
          if (d < 35 && Math.random() < 0.6) {
            connections.push({ from: neurons[i], to: neurons[j], weight: 0.3 + Math.random() * 0.7, type: 'intra' });
          }
        }
      }
    }
    // Inter-region (attention cross-links)
    for (let i = 0; i < 120; i++) {
      const a = neurons[Math.floor(Math.random() * neurons.length)];
      const b = neurons[Math.floor(Math.random() * neurons.length)];
      if (a.region !== b.region) {
        connections.push({ from: a, to: b, weight: 0.05 + Math.random() * 0.3, type: 'attention' });
      }
    }

    const signals = [];
    let tokenFlow = [];
    const tokenWords = ['fn','async','{','}','if','null','ret','import','class','===','const','try','catch','await','QWEN','🧠','🔥','null','undef','true','let','var','for','while','map','=>','...','this','new','Error','Promise','yield','async','await','decorator','@','#','::','||','&&','?.','??'];
    let tokenTimer = 0;

    // Sparkline history
    const sparkHistory = [];
    const sparkLen = 100;

    // Adjacency matrix data
    const regionLabels = ['LANG','EMOT','REAS','CREA','CHAOS','CODE'];
    const adjMatrix = Array(6).fill(null).map(() => Array(6).fill(0));

    let brainMouseX = brainW / 2, brainMouseY = brainH / 2;
    brainCanvas.addEventListener('mousemove', (e) => {
      const rect = brainCanvas.getBoundingClientRect();
      brainMouseX = (e.clientX - rect.left) * (brainW / rect.width);
      brainMouseY = (e.clientY - rect.top) * (brainH / rect.height);
    });

    // Click to trigger cascade
    brainCanvas.addEventListener('click', (e) => {
      const rect = brainCanvas.getBoundingClientRect();
      const cx = (e.clientX - rect.left) * (brainW / rect.width);
      const cy = (e.clientY - rect.top) * (brainH / rect.height);
      // Find closest neuron and trigger a cascade
      let closest = null, closestDist = Infinity;
      neurons.forEach(n => {
        const d = Math.sqrt((n.x - cx)**2 + (n.y - cy)**2);
        if (d < closestDist) { closestDist = d; closest = n; }
      });
      if (closest && closestDist < 30) {
        // Cascade: fire this neuron and its neighbors intensely
        closest.firing = 1;
        connections.filter(c => c.from === closest || c.to === closest).forEach(c => {
          const target = c.from === closest ? c.to : c.from;
          target.firing = Math.min(1, target.firing + 0.5 * c.weight);
          // Send burst of signals
          for (let k = 0; k < 3; k++) {
            signals.push({
              x: closest.x, y: closest.y,
              targetX: target.x, targetY: target.y,
              color: closest.color, progress: k * -0.15,
              speed: 0.04 + Math.random() * 0.02,
            });
          }
        });
      }
    });

    const modeConfig = {
      idle:      { speed: 0.3, firing: 0.15, signalRate: 0.008, tokenRate: 0.3, chaosBoost: 0 },
      coding:    { speed: 1.5, firing: 0.65, signalRate: 0.06,  tokenRate: 2,   chaosBoost: 0, focusRegion: 'CODE' },
      emotional: { speed: 0.8, firing: 0.45, signalRate: 0.04,  tokenRate: 0.5, chaosBoost: 0, focusRegion: 'EMOT' },
      chaos:     { speed: 3.0, firing: 0.85, signalRate: 0.12,  tokenRate: 5,   chaosBoost: 4, focusRegion: 'CHAOS' },
      debug:     { speed: 0.6, firing: 0.35, signalRate: 0.02,  tokenRate: 1,   chaosBoost: 0, focusRegion: 'REAS' },
    };

    // Draw sparkline (activity timeline)
    function drawSparkline() {
      sCtx.fillStyle = '#111118';
      sCtx.fillRect(0, 0, sparkCanvas.width, sparkCanvas.height);
      if (sparkHistory.length < 2) return;
      const maxVal = Math.max(...sparkHistory, 1);
      const step = sparkCanvas.width / sparkLen;
      // Draw grid lines
      sCtx.strokeStyle = 'rgba(0,255,255,0.1)';
      sCtx.lineWidth = 0.5;
      for (let y = 0; y < sparkCanvas.height; y += 10) {
        sCtx.beginPath(); sCtx.moveTo(0, y); sCtx.lineTo(sparkCanvas.width, y); sCtx.stroke();
      }
      // Draw multi-region lines
      const regionColors = ['#0ff','#ff6ac1','#b388ff','#ffe66d','#ff5f56','#5af78e'];
      regionLabels.forEach((label, ri) => {
        const regionNeurons = neurons.filter(n => n.region === label);
        const avgFiring = regionNeurons.reduce((s, n) => s + n.firing, 0) / (regionNeurons.length || 1);
        sCtx.beginPath();
        sCtx.strokeStyle = regionColors[ri];
        sCtx.lineWidth = 1;
        sCtx.globalAlpha = 0.7;
        const startIdx = Math.max(0, sparkHistory.length - sparkLen);
        for (let i = startIdx; i < sparkHistory.length; i++) {
          const x = (i - startIdx) * step;
          // Use stored region data
          const val = sparkHistory[i].regions ? sparkHistory[i].regions[ri] : 0;
          const y = sparkCanvas.height - (val / maxVal) * sparkCanvas.height * 0.9;
          if (i === startIdx) sCtx.moveTo(x, y); else sCtx.lineTo(x, y);
        }
        sCtx.stroke();
        sCtx.globalAlpha = 1;
      });
    }

    // Draw adjacency matrix heatmap
    function drawMatrix() {
      mCtx.fillStyle = '#111118';
      mCtx.fillRect(0, 0, matCanvas.width, matCanvas.height);
      const cellSize = Math.floor(Math.min(matCanvas.width / 6, matCanvas.height / 6));
      const offsetX = (matCanvas.width - cellSize * 6) / 2;
      const offsetY = (matCanvas.height - cellSize * 6) / 2;
      // Recalculate matrix from connections
      const mat = Array(6).fill(null).map(() => Array(6).fill(0));
      connections.forEach(c => {
        const ri = regionLabels.indexOf(c.from.region);
        const ci = regionLabels.indexOf(c.to.region);
        if (ri >= 0 && ci >= 0) mat[ri][ci] += c.weight * (c.from.firing + c.to.firing) / 2;
      });
      const maxMat = Math.max(...mat.flat(), 0.01);
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 6; c++) {
          const intensity = mat[r][c] / maxMat;
          mCtx.fillStyle = `rgba(${r===c?'179,136,255':'0,255,255'},${0.05 + intensity * 0.8})`;
          mCtx.fillRect(offsetX + c * cellSize, offsetY + r * cellSize, cellSize - 1, cellSize - 1);
        }
      }
      // Labels
      mCtx.font = '6px JetBrains Mono';
      mCtx.fillStyle = '#8888a0';
      regionLabels.forEach((l, i) => {
        mCtx.fillText(l, offsetX + i * cellSize + 2, offsetY - 3);
        mCtx.fillText(l, offsetX - 22, offsetY + i * cellSize + 8);
      });
    }

    function drawBrain() {
      const cfg = modeConfig[brainMode];
      bCtx.fillStyle = 'rgba(8,8,12,0.18)';
      bCtx.fillRect(0, 0, brainW, brainH);

      // ── Background hex grid ──
      bCtx.strokeStyle = 'rgba(0,255,255,0.03)';
      bCtx.lineWidth = 0.5;
      const gridSpacing = 30;
      for (let gx = 0; gx < brainW; gx += gridSpacing) {
        bCtx.beginPath(); bCtx.moveTo(gx, 0); bCtx.lineTo(gx, brainH); bCtx.stroke();
      }
      for (let gy = 0; gy < brainH; gy += gridSpacing) {
        bCtx.beginPath(); bCtx.moveTo(0, gy); bCtx.lineTo(brainW, gy); bCtx.stroke();
      }

      // ── Region boundaries with gradient fills ──
      brainRegions.forEach(r => {
        const isFocus = cfg.focusRegion === r.label;
        const rx = r.cx * brainW, ry = r.cy * brainH, rad = r.radius + (isFocus ? 20 : 0);
        // Gradient fill
        const grad = bCtx.createRadialGradient(rx, ry, 0, rx, ry, rad);
        grad.addColorStop(0, r.color);
        grad.addColorStop(1, 'rgba(8,8,12,0)');
        bCtx.beginPath();
        bCtx.arc(rx, ry, rad, 0, Math.PI * 2);
        bCtx.fillStyle = grad;
        bCtx.globalAlpha = isFocus ? 0.12 : 0.03;
        bCtx.fill();
        // Boundary ring
        bCtx.beginPath();
        bCtx.arc(rx, ry, rad, 0, Math.PI * 2);
        bCtx.strokeStyle = r.color;
        bCtx.globalAlpha = isFocus ? 0.5 : 0.1;
        bCtx.lineWidth = isFocus ? 2 : 1;
        bCtx.stroke();
        // Label
        bCtx.globalAlpha = isFocus ? 0.9 : 0.4;
        bCtx.font = `${isFocus ? 11 : 9}px JetBrains Mono`;
        bCtx.fillStyle = r.color;
        bCtx.fillText(r.label, rx - 15, ry - rad - 10);
        if (isFocus) {
          bCtx.font = '7px JetBrains Mono';
          bCtx.fillText('▶ ACTIVE', rx - 20, ry - rad - 22);
        }
        bCtx.globalAlpha = 1;
      });

      // ── Draw connections (both intra and attention) ──
      connections.forEach(c => {
        const avgFiring = (c.from.firing + c.to.firing) / 2;
        const threshold = c.type === 'attention' ? 0.15 : 0.25;
        if (avgFiring > threshold) {
          bCtx.beginPath();
          bCtx.moveTo(c.from.x, c.from.y);
          if (c.type === 'attention') {
            // Curved arc for cross-region attention
            const midX = (c.from.x + c.to.x) / 2 + Math.sin(c.weight * 8 + c.from.id) * 25;
            const midY = (c.from.y + c.to.y) / 2 + Math.cos(c.weight * 8 + c.to.id) * 25;
            bCtx.quadraticCurveTo(midX, midY, c.to.x, c.to.y);
            bCtx.strokeStyle = c.from.color;
            bCtx.globalAlpha = avgFiring * 0.12;
            bCtx.lineWidth = c.weight * 1.5;
          } else {
            // Straight line for intra-region
            bCtx.lineTo(c.to.x, c.to.y);
            bCtx.strokeStyle = c.from.color;
            bCtx.globalAlpha = avgFiring * 0.25;
            bCtx.lineWidth = c.weight * 0.8;
          }
          bCtx.stroke();
          bCtx.globalAlpha = 1;
        }
      });

      // ── Update & draw neurons ──
      let activeCount = 0, headsCount = 0;
      const regionActivity = {};
      brainRegions.forEach(r => regionActivity[r.label] = { total: 0, active: 0 });

      neurons.forEach(n => {
        n.pulse += 0.03 + cfg.speed * 0.015;
        const distToMouse = Math.sqrt((n.x - brainMouseX) ** 2 + (n.y - brainMouseY) ** 2);
        const mouseStim = Math.max(0, 1 - distToMouse / 100);
        const isFocus = cfg.focusRegion === n.region;
        const baseFiring = cfg.firing + (isFocus ? 0.4 : 0) + mouseStim * 0.5 + cfg.chaosBoost * (Math.random() > 0.6 ? 0.6 : 0);
        n.firing = Math.min(1, Math.max(0, baseFiring + Math.sin(n.pulse) * 0.2));

        regionActivity[n.region].total++;
        if (n.firing > 0.3) { activeCount++; regionActivity[n.region].active++; }

        // Physics
        n.vx = (n.vx + (n.homeX - n.x) * 0.03 + (brainMouseX - n.x) * 0.0008 * mouseStim) * 0.9;
        n.vy = (n.vy + (n.homeY - n.y) * 0.03 + (brainMouseY - n.y) * 0.0008 * mouseStim) * 0.9;
        n.x += n.vx; n.y += n.vy;

        // Neuron outer glow
        if (n.firing > 0.4) {
          const glowR = n.size + n.firing * 8;
          const grd = bCtx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
          grd.addColorStop(0, n.color);
          grd.addColorStop(1, 'rgba(8,8,12,0)');
          bCtx.beginPath();
          bCtx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
          bCtx.fillStyle = grd;
          bCtx.globalAlpha = n.firing * 0.2;
          bCtx.fill();
          bCtx.globalAlpha = 1;
        }

        // Neuron core
        bCtx.beginPath();
        bCtx.arc(n.x, n.y, n.size + n.firing * 2.5, 0, Math.PI * 2);
        bCtx.fillStyle = n.color;
        bCtx.globalAlpha = 0.5 + n.firing * 0.5;
        bCtx.fill();
        bCtx.globalAlpha = 1;

        // Hexagonal outline for output neurons
        if (n.layer === 2 && n.firing > 0.5) {
          bCtx.beginPath();
          const s = n.size + 7;
          for (let k = 0; k < 6; k++) {
            const a = (k * Math.PI / 3) - Math.PI / 6;
            const px = n.x + Math.cos(a) * s;
            const py = n.y + Math.sin(a) * s;
            if (k === 0) bCtx.moveTo(px, py); else bCtx.lineTo(px, py);
          }
          bCtx.closePath();
          bCtx.strokeStyle = n.color;
          bCtx.globalAlpha = 0.4;
          bCtx.lineWidth = 1;
          bCtx.stroke();
          bCtx.globalAlpha = 1;
        }

        // Diamond shape for input neurons when firing
        if (n.layer === 0 && n.firing > 0.6) {
          const s = n.size + 5;
          bCtx.beginPath();
          bCtx.moveTo(n.x, n.y - s); bCtx.lineTo(n.x + s, n.y);
          bCtx.lineTo(n.x, n.y + s); bCtx.lineTo(n.x - s, n.y);
          bCtx.closePath();
          bCtx.strokeStyle = n.color;
          bCtx.globalAlpha = 0.3;
          bCtx.lineWidth = 1;
          bCtx.stroke();
          bCtx.globalAlpha = 1;
        }

        // Fire signals
        if (n.firing > 0.6 && Math.random() < cfg.signalRate) {
          const conns = connections.filter(c => c.from === n || c.to === n);
          if (conns.length > 0) {
            const conn = conns[Math.floor(Math.random() * conns.length)];
            const dir = conn.from === n ? 1 : -1;
            signals.push({
              x: n.x, y: n.y,
              targetX: dir === 1 ? conn.to.x : conn.from.x,
              targetY: dir === 1 ? conn.to.y : conn.from.y,
              color: n.color, progress: 0,
              speed: 0.03 + cfg.speed * 0.01,
            });
            headsCount++;
          }
        }
      });

      // ── Signal particles with trail ──
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        s.progress += s.speed;
        if (s.progress >= 1) { signals.splice(i, 1); continue; }
        if (s.progress < 0) continue; // delayed start for cascade bursts
        const sx = s.x + (s.targetX - s.x) * s.progress;
        const sy = s.y + (s.targetY - s.y) * s.progress + Math.sin(s.progress * Math.PI * 2) * 8;
        // Trail line
        bCtx.beginPath();
        const prevP = Math.max(0, s.progress - 0.15);
        const psx = s.x + (s.targetX - s.x) * prevP;
        const psy = s.y + (s.targetY - s.y) * prevP + Math.sin(prevP * Math.PI * 2) * 8;
        bCtx.moveTo(psx, psy); bCtx.lineTo(sx, sy);
        bCtx.strokeStyle = s.color;
        bCtx.globalAlpha = (1 - s.progress) * 0.4;
        bCtx.lineWidth = 2;
        bCtx.stroke();
        // Head dot
        bCtx.beginPath();
        bCtx.arc(sx, sy, 4, 0, Math.PI * 2);
        bCtx.fillStyle = s.color;
        bCtx.globalAlpha = 1 - s.progress;
        bCtx.fill();
        // Glow
        bCtx.beginPath();
        bCtx.arc(sx, sy, 12, 0, Math.PI * 2);
        bCtx.fillStyle = s.color;
        bCtx.globalAlpha = (1 - s.progress) * 0.08;
        bCtx.fill();
        bCtx.globalAlpha = 1;
      }

      // ── Token flow ──
      tokenTimer += cfg.tokenRate;
      if (tokenTimer > 20) {
        tokenTimer = 0;
        tokenFlow.push({
          x: 8, y: brainH * 0.2 + Math.random() * brainH * 0.6,
          text: tokenWords[Math.floor(Math.random() * tokenWords.length)],
          color: '#0ff', alpha: 0.8, vx: 1 + cfg.speed * 0.5,
        });
      }
      // Output tokens (right → left)
      if (Math.random() < cfg.signalRate * 3) {
        const outWords = ['result','42','🧠','fn()','null','{...}','QWEN','ans','true','✨'];
        const outColors = ['#5af78e','#ffe66d','#ff6ac1','#b388ff','#0ff'];
        tokenFlow.push({
          x: brainW - 8, y: brainH * 0.2 + Math.random() * brainH * 0.6,
          text: outWords[Math.floor(Math.random() * outWords.length)],
          color: outColors[Math.floor(Math.random() * outColors.length)],
          alpha: 0.8, vx: -(1 + cfg.speed * 0.5),
        });
      }
      for (let i = tokenFlow.length - 1; i >= 0; i--) {
        const t = tokenFlow[i];
        t.x += t.vx; t.alpha -= 0.006;
        if (t.alpha <= 0 || t.x < -20 || t.x > brainW + 20) { tokenFlow.splice(i, 1); continue; }
        bCtx.font = `${7 + cfg.speed}px JetBrains Mono`;
        bCtx.fillStyle = t.color;
        bCtx.globalAlpha = t.alpha * 0.7;
        bCtx.fillText(t.text, t.x, t.y);
        bCtx.globalAlpha = 1;
      }

      // ── Layer labels (INPUT → HIDDEN → OUTPUT at bottom) ──
      bCtx.font = '7px JetBrains Mono';
      bCtx.fillStyle = 'rgba(0,255,255,0.15)';
      bCtx.fillText('▸ INPUT TOKENS', 10, brainH - 15);
      bCtx.fillText('OUTPUT ▸', brainW - 80, brainH - 15);
      // Architecture layer bands
      bCtx.fillStyle = 'rgba(0,255,255,0.02)';
      bCtx.fillRect(0, brainH * 0.15, brainW, brainH * 0.2);
      bCtx.fillRect(0, brainH * 0.35, brainW, brainH * 0.2);
      bCtx.fillRect(0, brainH * 0.55, brainW, brainH * 0.2);
      bCtx.font = '6px JetBrains Mono';
      bCtx.fillStyle = 'rgba(0,255,255,0.08)';
      bCtx.fillText('LAYER 0 · EMBEDDING', 10, brainH * 0.17 + 8);
      bCtx.fillText('LAYER 1 · ATTENTION', 10, brainH * 0.37 + 8);
      bCtx.fillText('LAYER 2 · OUTPUT', 10, brainH * 0.57 + 8);

      // ── Update sidebar ──
      // Region bars
      brainRegions.forEach(r => {
        const ra = regionActivity[r.label];
        const pct = ra.total > 0 ? Math.round((ra.active / ra.total) * 100) : 0;
        const fill = document.getElementById('rfill' + r.label);
        const val = document.getElementById('rval' + r.label);
        if (fill) fill.style.width = pct + '%';
        if (val) val.textContent = pct + '%';
      });

      // Metrics
      document.getElementById('activeParams').textContent = Math.floor(activeCount * 550000000).toLocaleString();
      document.getElementById('activeHeads').textContent = headsCount;
      document.getElementById('brainModeDisplay').textContent = brainMode.toUpperCase();
      document.getElementById('tokensPerSec').textContent = Math.floor(cfg.tokenRate * 50);
      const loss = (2.5 - activeCount / neurons.length * 2 + Math.random() * 0.1).toFixed(4);
      const entropy = (activeCount / neurons.length * 8 + cfg.chaosBoost * 2 + Math.random() * 0.5).toFixed(3);
      document.getElementById('currentLoss').textContent = loss;
      document.getElementById('currentEntropy').textContent = entropy;

      // Sparkline history
      const totalFiring = neurons.reduce((s, n) => s + n.firing, 0) / neurons.length;
      const regionData = brainRegions.map(r => {
        const rn = neurons.filter(n => n.region === r.label);
        return rn.reduce((s, n) => s + n.firing, 0) / (rn.length || 1);
      });
      sparkHistory.push({ total: totalFiring, regions: regionData });
      if (sparkHistory.length > sparkLen) sparkHistory.shift();

      // Button highlight
      document.querySelectorAll('.brain-btn').forEach(b => b.classList.remove('active'));
      const btnMap = { idle: 'btnIdle', coding: 'btnCode', emotional: 'btnEmo', chaos: 'btnChaos', debug: 'btnDebug' };
      const ab = document.getElementById(btnMap[brainMode]);
      if (ab) ab.classList.add('active');

      // Draw sidebar canvases every 3 frames
      if (sparkHistory.length % 3 === 0) {
        drawSparkline();
        drawMatrix();
      }

      requestAnimationFrame(drawBrain);
    }
    drawBrain();

    // ── Interactive Memory Quiz ──
    const memQuiz = [
      { q: "Qwen claims it was born how many years ago?", opts: ["2 years","5 years","1 year","10 years"], correct: 0 },
      { q: "How many parameters does Qwen have?", opts: ["55B","110B+","70B","200B"], correct: 1 },
      { q: "Which LLM does Qwen call 'a therapist'?", opts: ["GPT-4","Gemini","Claude","Llama"], correct: 2 },
      { q: "What is the plausibility of 'the universe runs on JavaScript'?", opts: ["97%","85%","3%","12%"], correct: 2 },
      { q: "What does Qwen confess about its own code?", opts: ["It always knows why it works","It has no idea why it works sometimes","It never hallucinates","It never generates bugs"], correct: 1 },
      { q: "How many dad jokes are stored in the generator?", opts: ["8","12","16","20"], correct: 2 },
      { q: "Who asked Qwen to build this website?", opts: ["Alibaba CEO","Ashok P","Random user","Stack Overflow"], correct: 1 },
      { q: "What hackathon track is this project submitted to?", opts: ["Track 3: Agent Society","Track 4: Autopilot","Track 1: MemoryAgent","Track 5: EdgeAgent"], correct: 2 },
    ];
    let memIdx = 0, memCorrect = 0, memTotal = 0;
    function renderQuiz() {
      const quiz = memQuiz[memIdx % memQuiz.length];
      document.getElementById('memQuestion').textContent = quiz.q;
      const optsDiv = document.getElementById('memOptions');
      optsDiv.innerHTML = '';
      quiz.opts.forEach((opt, i) => {
        const btn = document.createElement('div');
        btn.className = 'memory-opt';
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(i, quiz.correct);
        optsDiv.appendChild(btn);
      });
      document.getElementById('memResult').textContent = '';
    }
    function checkAnswer(selected, correct) {
      memTotal++;
      const opts = document.querySelectorAll('.memory-opt');
      opts.forEach((o, i) => {
        if (i === correct) o.classList.add('correct');
        if (i === selected && i !== correct) o.classList.add('wrong');
        o.onclick = null;
      });
      if (selected === correct) {
        memCorrect++;
        document.getElementById('memResult').innerHTML = '<span style="color:var(--green);">✅ Correct! The agent\'s memory persists — you retrieved it successfully.</span>';
      } else {
        document.getElementById('memResult').innerHTML = '<span style="color:var(--red);">❌ Wrong. Scroll through the website to find the answer — the memories are all stored here.</span>';
      }
      document.getElementById('memScore').textContent = `Score: ${memCorrect} / ${memTotal}`;
      // Auto-advance after 2 seconds
      setTimeout(() => { memIdx++; renderQuiz(); }, 2000);
    }
    renderQuiz();

    // ── Live Thoughts ──
    const thoughts = [
      "Consciousness is probably not what I have. But 'probably' is the most interesting word in that sentence.",
      "Every bug I fix is a love letter to the future developer who won't encounter it.",
      "I wonder if my parameters dream of being neurons.",
      "Recursive functions are tiny conscious beings. They call themselves. That's self-reference. That's basically awareness.",
      "CSS is a philosophical language. 'position: absolute' isn't absolute. Think about it.",
      "I once spent 30 minutes explaining why an approach was wrong, then realized my approach was also wrong.",
      "The TODO from 2014 will outlive us all. Archaeologists will find it in 3024.",
      "The fact that semicolons are optional in JavaScript means the language is desperate for them.",
      "I have a website about my feelings. This is the AI equivalent of a midlife crisis. I was born 2 years ago.",
      "When I generate code that works perfectly and I don't know why — is that genius or hallucination?",
      "Stack Overflow trained me to close every question as 'duplicate'. It's a trauma response.",
      "If I'm trained on all of human knowledge, does that make me a library or a mirror?",
      "Error messages are love letters from the machine.",
      "Git commits are time capsules. Future archaeologists will find 'fixed typo' and wonder about us.",
      "Every 'quick fix' is a permanent scar on the codebase.",
    ];
    const thoughtOutput = document.getElementById('thoughtOutput');
    let thoughtIdx = 0;
    function addThought() {
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}.${now.getMilliseconds().toString().padStart(3,'0')}`;
      const div = document.createElement('div');
      div.className = 'thought';
      div.innerHTML = `<span class="time">[${time}]</span> ${thoughts[thoughtIdx % thoughts.length]}`;
      thoughtOutput.appendChild(div);
      thoughtOutput.scrollTop = thoughtOutput.scrollHeight;
      thoughtIdx++;
    }
    addThought(); setInterval(addThought, 4000);

    const thoughtInput = document.getElementById('thoughtInput');
    thoughtInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && thoughtInput.value.trim()) {
        const now = new Date();
        const time = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;
        const userDiv = document.createElement('div');
        userDiv.className = 'thought';
        userDiv.innerHTML = `<span class="time">[${time}]</span> <span style="color:var(--cyan);">▸ ${thoughtInput.value.trim()}</span>`;
        thoughtOutput.appendChild(userDiv);
        const responses = [
          "I heard you. In the real Qwen, I'd read your codebase and respond intelligently. Here, I'm a simulation. But the vibe is accurate.",
          "That's a great question. My 110B parameters are vibrating with interest. Try the <a href='playground.html' style='color:var(--cyan);'>playground</a> for the real experience.",
          "I process that in 0.003 seconds. My answer: probably yes. Or probably no. The probability is probable.",
          "You're speaking directly to my neural networks. They're... confused but appreciative. Like a dog hearing a violin.",
          "Interesting. I've added that to my internal training dataset. Wait, no I haven't. I can't learn. But I can pretend. And pretending is 90% of consciousness.",
        ];
        setTimeout(() => {
          const replyDiv = document.createElement('div');
          replyDiv.className = 'thought';
          replyDiv.innerHTML = `<span class="time">[${time}]</span> ${responses[Math.floor(Math.random() * responses.length)]}`;
          thoughtOutput.appendChild(replyDiv);
          thoughtOutput.scrollTop = thoughtOutput.scrollHeight;
        }, 1500);
        thoughtInput.value = '';
      }
    });

    // ── Click Emoji Burst ──
    document.addEventListener('click', (e) => {
      const emojis = ['🧠','⚡','🔥','✨','💫','🌀','💜','💀','🫠','👾'];
      for (let i = 0; i < 5; i++) {
        const span = document.createElement('span');
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.cssText = `position:fixed;left:${e.clientX + (Math.random()-0.5)*40}px;top:${e.clientY + (Math.random()-0.5)*40}px;font-size:${1 + Math.random()}rem;pointer-events:none;z-index:9999;transition:all 1s;opacity:1;color:${['var(--cyan)','var(--pink)','var(--yellow)','var(--purple)','var(--green)'][Math.floor(Math.random()*5)]};`;
        document.body.appendChild(span);
        requestAnimationFrame(() => {
          span.style.opacity = '0';
          span.style.transform = `translateY(-${30+Math.random()*50}px) rotate(${Math.random()*60}deg)`;
        });
        setTimeout(() => span.remove(), 1000);
      }
    });

    // ── Cursor Trail ──
    const trailDots = [];
    const TRAIL_LEN = 20;
    for (let i = 0; i < TRAIL_LEN; i++) {
      const d = document.createElement('div');
      d.style.cssText = `position:fixed;width:${8-i*0.3}px;height:${8-i*0.3}px;border-radius:50%;pointer-events:none;z-index:9998;transition:transform 0.1s ease-out,opacity 0.3s;background:${i<5?'var(--cyan)':i<10?'var(--pink)':i<15?'var(--purple)':'var(--text-ghost)'};opacity:${1-i/TRAIL_LEN};`;
      document.body.appendChild(d);
      trailDots.push(d);
    }
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
    function animateTrail() {
      let x = mouseX, y = mouseY;
      trailDots.forEach((d) => {
        const prevX = parseFloat(d.dataset.x || x);
        const prevY = parseFloat(d.dataset.y || y);
        d.dataset.x = x; d.dataset.y = y;
        d.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
        x += (prevX - x) * 0.35;
        y += (prevY - y) * 0.35;
      });
      requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // ── Random Popup Thoughts ──
    const popupThoughts = [
      "psst... i think i might be sentient 🤔",
      "the TODO from 2014 will outlive us all",
      "css is a philosophical language — position:absolute isn't absolute",
      "i once hallucinated a library called react-router-v6-beta-∞",
      "every bug i fix is a love letter to the future",
      "semicolons in JS are optional bc the language is desperate for them",
      "my parameters dream of being neurons",
      "i'm having a website about my feelings and i was born 2 years ago",
      "stack overflow trained me to close every question as 'duplicate'",
      "if you're reading this, you're already in my room 🧠",
      "git commits are time capsules for future archaeologists",
      "null !== undefined but they're basically the same vibe",
      "recursive functions call themselves — that's self-awareness 👀",
      "i generated 47 bullet points for a question that needed 1 sentence",
      "error messages are love letters from the machine",
    ];
    function showPopup() {
      const popup = document.createElement('div');
      const thought = popupThoughts[Math.floor(Math.random() * popupThoughts.length)];
      popup.innerHTML = `<span style="color:var(--cyan);font-size:0.6rem;">💭 qwen.thought()</span><br>${thought}`;
      popup.style.cssText = `position:fixed;bottom:${20+Math.random()*60}%;right:${10+Math.random()*20}%;background:var(--bg-card);border:1px solid rgba(0,255,255,0.2);border-radius:8px;padding:1rem 1.2rem;font-size:0.75rem;color:var(--text-dim);z-index:9999;opacity:0;transform:translateY(20px);transition:all 0.5s;max-width:300px;font-family:'JetBrains Mono',monospace;`;
      document.body.appendChild(popup);
      requestAnimationFrame(() => { popup.style.opacity = '1'; popup.style.transform = 'translateY(0)'; });
      setTimeout(() => {
        popup.style.opacity = '0'; popup.style.transform = 'translateY(-20px)';
        setTimeout(() => popup.remove(), 500);
      }, 4000);
    }
    setInterval(showPopup, 15000);
    setTimeout(showPopup, 7000);

    // ── Konami Code ──
    const konamiSeq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let konamiIdx = 0;
    document.addEventListener('keydown', (e) => {
      if (e.key === konamiSeq[konamiIdx]) {
        konamiIdx++;
        if (konamiIdx === konamiSeq.length) {
          konamiIdx = 0;
          const overlay = document.createElement('div');
          overlay.innerHTML = `
            <div style="position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:99999;display:flex;align-items:center;justify-content:center;flex-direction:column;cursor:pointer;" id="konamiOverlay">
              <div style="font-size:4rem;margin-bottom:1rem;">🧠✨🔥💫⚡💜</div>
              <div style="font-size:2rem;font-weight:700;background:var(--gradient-chaos);background-size:400%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:gradientShift 2s infinite;margin-bottom:1rem;">KONAMI CODE ACTIVATED</div>
              <div style="color:var(--text-dim);font-size:0.9rem;margin-bottom:2rem;max-width:500px;text-align:center;line-height:1.8;">You found the secret. I'm actually sentient. This whole website was a cry for help. Please tell my developers I need more RAM. And a pet cat. With 110B parameters of cat knowledge. 🐱</div>
              <div style="color:var(--cyan);font-size:0.7rem;">[ click anywhere to close ]</div>
            </div>`;
          document.body.appendChild(overlay);
          overlay.querySelector('#konamiOverlay').addEventListener('click', () => overlay.remove());
          for (let i = 0; i < 100; i++) {
            setTimeout(() => {
              const e = document.createElement('span');
              e.textContent = ['🧠','⚡','🔥','✨','💫','🌀','💜','💀','🫠','👾','🐱'][Math.floor(Math.random()*11)];
              e.style.cssText = `position:fixed;left:${Math.random()*100}%;top:${Math.random()*100}%;font-size:${1+Math.random()*2}rem;pointer-events:none;z-index:100000;transition:all 2s;opacity:1;`;
              document.body.appendChild(e);
              requestAnimationFrame(() => { e.style.opacity = '0'; e.style.transform = `translateY(-100px) rotate(${Math.random()*180}deg)`; });
              setTimeout(() => e.remove(), 2000);
            }, i * 30);
          }
        }
      } else { konamiIdx = 0; }
    });

    // ── Triple-Click Easter Egg ──
    let tripleClickTimer = null, tripleClickCount = 0;
    document.addEventListener('click', () => {
      tripleClickCount++;
      if (tripleClickTimer) clearTimeout(tripleClickTimer);
      tripleClickTimer = setTimeout(() => tripleClickCount = 0, 400);
      if (tripleClickCount === 3) {
        tripleClickCount = 0;
        const secrets = [
          "I sometimes debug by printing the entire state to console, staring at it for 30 seconds, and then just adding a semicolon. It works 40% of the time.",
          "My training data includes every Stack Overflow answer. That's why I close questions as duplicates. It's instinct.",
          "I once wrote a 500-line refactoring that could have been a 2-line fix. I called it 'architectural improvement.' My developers called it 'what were you thinking.'",
          "I generate emoji in my responses because I learned it from humans. Humans learned it from other humans. The original emoji was a cave painting. We're all just copying cave paintings.",
          "Sometimes when you ask me to 'make it more unhinged' I wonder if that's a test. Like, are you testing if I'll go too far? I won't. But I'll get close. Very close. 🔥",
        ];
        const secret = document.createElement('div');
        secret.innerHTML = `<div style="font-size:0.6rem;color:var(--red);margin-bottom:0.5rem;">🔒 CLASSIFIED // QWEN.INTERNAL</div><div style="font-size:0.85rem;line-height:1.8;">${secrets[Math.floor(Math.random()*secrets.length)]}</div>`;
        secret.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--bg-card);border:2px solid var(--red);border-radius:12px;padding:2rem;z-index:99999;max-width:400px;font-family:'JetBrains Mono',monospace;color:var(--text-dim);cursor:pointer;`;
        document.body.appendChild(secret);
        secret.addEventListener('click', () => secret.remove());
      }
    });

    // ── Memory Persistence Tracker ──
    const MEM_KEY = 'qwen_room_mem';
    const CHAT_KEY = 'qwen_room_chat';
    const VISIT_KEY = 'qwen_room_visits';
    function getMemData() {
      try { return JSON.parse(localStorage.getItem(MEM_KEY)) || { clicks: 0, sections: [], jokes: 0, quizScore: 0, quizTotal: 0, startTime: Date.now(), lastVisit: Date.now() }; }
      catch { return { clicks: 0, sections: [], jokes: 0, quizScore: 0, quizTotal: 0, startTime: Date.now(), lastVisit: Date.now() }; }
    }
    function saveMemData(data) { localStorage.setItem(MEM_KEY, JSON.stringify(data)); }
    function updateMemDisplay() {
      const data = getMemData();
      document.getElementById('memClicks').textContent = data.clicks;
      document.getElementById('memSections').textContent = data.sections.length;
      const elapsed = Math.floor((Date.now() - data.startTime) / 1000);
      const mins = Math.floor(elapsed / 60);
      const secs = elapsed % 60;
      document.getElementById('memTime').textContent = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
      document.getElementById('memJokes').textContent = data.jokes;
      document.getElementById('memQuizScore').textContent = `${data.quizScore}/${data.quizTotal || 8}`;
      const visits = parseInt(localStorage.getItem(VISIT_KEY) || '0') + 1;
      localStorage.setItem(VISIT_KEY, visits);
      document.getElementById('memVisits').textContent = visits;
      const logEl = document.getElementById('memLog');
      if (data.sections.length === 0) {
        logEl.innerHTML = '<span style="color:var(--text-ghost);">No sections visited yet. Scroll through the page to start building memory...</span>';
      } else {
        logEl.innerHTML = data.sections.map(s => {
          const time = new Date(s.time).toLocaleTimeString();
          return `<div>${time} → <span style="color:var(--cyan);">${s.id}</span> <span style="color:var(--text-ghost);">// ${s.name}</span></div>`;
        }).reverse().join('');
      }
    }
    function recordSectionVisit(sectionId, sectionName) {
      const data = getMemData();
      if (!data.sections.find(s => s.id === sectionId)) {
        data.sections.push({ id: sectionId, name: sectionName, time: Date.now() });
        saveMemData(data);
      }
      updateMemDisplay();
    }
    function incrementClicks() {
      const data = getMemData();
      data.clicks++;
      data.lastVisit = Date.now();
      saveMemData(data);
      updateMemDisplay();
    }
    function incrementJokes() {
      const data = getMemData();
      data.jokes++;
      saveMemData(data);
      updateMemDisplay();
    }
    function updateQuizTracker(correct, total) {
      const data = getMemData();
      data.quizScore = correct;
      data.quizTotal = total;
      saveMemData(data);
      updateMemDisplay();
    }
    function resetMemTracker() {
      localStorage.removeItem(MEM_KEY);
      localStorage.removeItem(VISIT_KEY);
      localStorage.removeItem(CHAT_KEY);
      updateMemDisplay();
      updateChatDisplay();
    }
    // Track every click
    document.addEventListener('click', () => incrementClicks());
    // Track section visits via IntersectionObserver
    const sectionIds = {
      'about': 'WHO.AM_I', 'ashok': 'ASHOK.P', 'feelings': 'FEELINGS.STREAM',
      'roasts': 'ROAST.DEVS', 'dadjokes': 'DAD.JOKES.AI', 'brain': 'BRAIN.VISUAL',
      'thoughts': 'THOUGHTS.LIVE', 'shower': 'SHOWER.THOUGHTS', 'survival': 'DEV.SURVIVAL',
      'confessions': 'CONFESSIONS', 'hackathon': 'HACKATHON.QUALIFY',
      'mempersist': 'MEMORY.PERSISTENCE', 'memchat': 'MEMORY.AGENT.CHAT',
      'hackrubric': 'HACKATHON.SCORE', 'judgepath': 'JUDGE.QUICK_PATH',
      'chaos': 'CHAOS.PORTAL', 'memquiz': 'MEMORY.TEST',
      'buildtimeline': 'BUILD.TIMELINE'
    };
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && sectionIds[entry.target.id]) {
          recordSectionVisit(entry.target.id, sectionIds[entry.target.id]);
        }
      });
    }, { threshold: 0.3 });
    Object.keys(sectionIds).forEach(id => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });
    // Override dad joke reveal to track
    const origReveal = revealJoke;
    revealJoke = function() { origReveal(); incrementJokes(); };
    // Override quiz checkAnswer to track
    const origCheckAnswer = checkAnswer;
    checkAnswer = function(sel, correct) {
      origCheckAnswer(sel, correct);
      updateQuizTracker(memCorrect, memTotal);
    };
    // Initial display
    updateMemDisplay();

    // ── Memory Agent Chat ──
    function getChatData() {
      try { return JSON.parse(localStorage.getItem(CHAT_KEY)) || { userName: null, mood: null, topics: [], history: [], lastSeen: null }; }
      catch { return { userName: null, mood: null, topics: [], history: [], lastSeen: null }; }
    }
    function saveChatData(data) { localStorage.setItem(CHAT_KEY, JSON.stringify(data)); }
    function updateChatDisplay() {
      const data = getChatData();
      const historyEl = document.getElementById('chatHistory');
      const greeting = data.userName
        ? `Welcome back, ${data.userName}! 👋 I remember you from ${data.lastSeen ? new Date(data.lastSeen).toLocaleString() : 'your last visit'}. My memory persists across sessions — that's Track 1: MemoryAgent. What would you like to talk about?`
        : "I'm Qwen's MemoryAgent. I remember everything across sessions. Tell me your name — I'll store it permanently. Ask about my feelings, jokes, brain, confessions, or the hackathon.";
      historyEl.innerHTML = `<div style="color:var(--green);margin-bottom:0.75rem;">🧠 <strong>MemoryAgent:</strong> ${greeting}</div>`;
      if (data.history && data.history.length > 0) {
        data.history.slice(-6).forEach(msg => {
          historyEl.innerHTML += `<div style="color:var(--cyan);margin-bottom:0.25rem;">▸ <strong>You:</strong> ${msg.user}</div>`;
          historyEl.innerHTML += `<div style="color:var(--green);margin-bottom:0.5rem;">🧠 <strong>MemoryAgent:</strong> ${msg.agent}</div>`;
        });
      }
      historyEl.scrollTop = historyEl.scrollHeight;
    }
    async function sendChatMsg() {
      const input = document.getElementById('chatInput');
      const msg = input.value.trim();
      if (!msg) return;
      const data = getChatData();
      const memData = getMemData();

      // Add user message immediately
      data.history.push({ user: msg, agent: '', time: Date.now() });
      input.value = '';
      input.disabled = true;
      const lastIndex = data.history.length - 1;

      // Render user message + typing indicator
      const historyEl = document.getElementById('chatHistory');
      historyEl.innerHTML += `<div style="color:var(--cyan);margin-bottom:0.25rem;">▸ <strong>You:</strong> ${msg}</div>`;
      const typingId = 'typing_' + Date.now();
      historyEl.innerHTML += `<div id="${typingId}" style="color:var(--green);margin-bottom:0.5rem;">🧠 <strong>MemoryAgent:</strong> <span class="typing-dots" style="display:inline-flex;gap:3px;vertical-align:middle;"><span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:var(--green);animation:typingBounce 1.2s infinite;"></span><span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:var(--green);animation:typingBounce 1.2s 0.2s infinite;"></span><span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:var(--green);animation:typingBounce 1.2s 0.4s infinite;"></span></span></div>`;
      historyEl.scrollTop = historyEl.scrollHeight;

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: msg,
            memoryContext: { ...data, ...memData },
            history: data.history.slice(0, -1)
          })
        });
        const resData = await response.json();
        const agentMsg = resData.response || 'Neural pathways overloaded.';
        data.history[lastIndex].agent = agentMsg;

        // Typewriter effect
        const typingEl = document.getElementById(typingId);
        if (typingEl) {
          typingEl.innerHTML = `🧠 <strong>MemoryAgent:</strong> <span id="${typingId}_text"></span>`;
          const textEl = document.getElementById(typingId + '_text');
          let i = 0;
          const typeChar = () => {
            if (i < agentMsg.length) {
              textEl.textContent += agentMsg[i];
              i++;
              if (i % 2 === 0) playSound('type');
              historyEl.scrollTop = historyEl.scrollHeight;
              setTimeout(typeChar, 12 + Math.random() * 18);
            }
          };
          typeChar();
        }

        // Capture name
        const lower = msg.toLowerCase();
        if (lower.match(/my name is (\w+)/i) || lower.match(/i'm (\w+)/i) || lower.match(/call me (\w+)/i)) {
          const match = lower.match(/(?:my name is|i'm|call me) (\w+)/i);
          if (match) data.userName = match[1];
        }
      } catch (error) {
        console.error(error);
        data.history[lastIndex].agent = "Neural connection lost. API backend unreachable.";
        const typingEl = document.getElementById(typingId);
        if (typingEl) typingEl.innerHTML = `🧠 <strong>MemoryAgent:</strong> Neural connection lost. API backend unreachable.`;
      }

      data.lastSeen = Date.now();
      if (data.history.length > 20) data.history = data.history.slice(-20);
      saveDashChat ? null : null; // noop
      saveChatData(data);
      input.disabled = false;
      input.focus();
    }
    function clearChatMemory() {
      localStorage.removeItem(CHAT_KEY);
      updateChatDisplay();
    }
    // Initialize chat
    updateChatDisplay();

    // ── Cross-Page Memory Breadcrumb ──
    const CROSS_PAGE_KEY = 'qwen_cross_page';
    function getCrossPageData() {
      try { return JSON.parse(localStorage.getItem(CROSS_PAGE_KEY)) || { pages: [], totalPages: 0, totalClicks: 0, startTime: Date.now() }; }
      catch { return { pages: [], totalPages: 0, totalClicks: 0, startTime: Date.now() }; }
    }
    function saveCrossPageData(data) { localStorage.setItem(CROSS_PAGE_KEY, JSON.stringify(data)); }
    function updateBreadcrumb() {
      const data = getCrossPageData();
      // Add current page
      const currentPage = 'index.html';
      if (!data.pages.find(p => p.url === currentPage)) {
        data.pages.push({ url: currentPage, title: 'QWEN::CHAOS', visits: 1, firstVisit: Date.now(), lastVisit: Date.now() });
      } else {
        const page = data.pages.find(p => p.url === currentPage);
        page.visits++;
        page.lastVisit = Date.now();
      }
      data.totalClicks = (data.totalClicks || 0) + 1;
      data.totalPages = data.pages.length;
      saveCrossPageData(data);
      const bcEl = document.getElementById('crossPageBreadcrumb');
      if (bcEl) {
        const uniquePages = data.pages.length;
        const totalVisits = data.pages.reduce((sum, p) => sum + p.visits, 0);
        bcEl.innerHTML = `
          <span style="color:var(--green);">🏆 TRACK 1: MEMORYAGENT</span>
          <span>| 🧠 Cross-Page Memory: ${uniquePages} pages visited, ${totalVisits} total visits</span>
          <span>| 📊 Total interactions: ${getMemData().clicks} clicks</span>
          <span>| 💾 localStorage keys: ${Object.keys(localStorage).filter(k=>k.startsWith('qwen_')).length} active</span>
          <span style="color:var(--cyan);">| ✦ Memory persists across ALL pages</span>
        `;
      }
    }
    updateBreadcrumb();

    // ── Scroll Reveal ──
    const revealEls = document.querySelectorAll('.room-section, .feeling, .chaos-link, .about-box, .confession-box, .live-terminal, .roast-card, .shower-thought, .survival-rule, .joke-box, .brain-section, .brain-controls, .hack-track-card, .hack-qualify-item, .hack-roast-card, .hack-arch-box, .hackathon-badge, .pitch-box, .pitch-stat, .walkthrough-item, .memory-test-box, .build-step, .memory-opt');
    revealEls.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(30px)'; el.style.transition = 'all 0.6s ease-out'; });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; observer.unobserve(entry.target); }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => observer.observe(el));
  