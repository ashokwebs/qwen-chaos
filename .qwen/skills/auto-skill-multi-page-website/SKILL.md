---
name: multi-page-website
description: Build comprehensive multi-page websites with professional design, consistent theming, interactive elements, and diverse content types — from marketing to documentation to humor
source: auto-skill
extracted_at: '2026-07-03T17:51:09.758Z'
---

# Building Multi-Page Websites

## When to Use
- User asks for a website, web app, or online presence
- Need to create multiple related pages with consistent design
- Building a project site, documentation site, portfolio, or brand website
- User wants professional, production-ready web content with personality

## Approach

### 1. Plan the Site Map First
Before writing any code, plan which pages you need and what content each will contain. A complete professional site typically includes:
- **index.html** — Main landing/marketing page (hero, features, use cases, testimonials, CTA)
- **about.html** — Identity, philosophy, journey, values
- **docs.html** — Documentation with sidebar nav, search, callouts
- **tech.html** — Technical specs, architecture, benchmarks, tool system
- **showcase.html** — Capabilities gallery with filter tabs, comparison table
- **blog.html** — Articles, featured post, newsletter
- **changelog.html** — Version history with categorized changes
- **faq.html** — Collapsible FAQ with category filtering
- **pricing.html** — Tiered plans with feature comparison table
- **playground.html** — Interactive demo/terminal simulator
- **jokes.html** — Humor, easter eggs, personality content
- **404.html** — Error page with personality

**Why:** Planning upfront prevents duplicate pages and ensures cross-linking is consistent from the start.

### 2. Build Core Pages First, Expand Iteratively
Start with 3-4 essential pages (index, docs, showcase), then add more based on the user's feedback. Don't try to build all 12 pages at once — build 3-4, verify they work, then expand.

**Why:** The user will give feedback on the first pages. Building iteratively lets you adapt design decisions before propagating them across 12 pages.

### 3. Design System Consistency
Create a unified design system using CSS custom properties and replicate it across all pages:
- **Color palette**: Define `--bg`, `--bg-alt`, `--bg-card`, `--text`, `--text-secondary`, `--text-muted`, `--primary`, `--primary-hover`, `--accent`, `--accent-2`, `--success`, `--warning`, `--border`, `--gradient`
- **Typography**: 3 fonts — sans-serif for body (Inter), monospace for code/labels (JetBrains Mono), serif for display headings (Playfair Display)
- **Consistent components**: Same nav bar, footer, card styles, button styles, section layouts on every page
- **Animations**: Same `.reveal` class with IntersectionObserver on every page
- **Spacing**: Consistent `max-width` for containers, consistent padding for sections

**How to apply:** Copy the `:root` CSS variables block and nav/footer HTML from the first page to all subsequent pages. This ensures visual consistency without a shared CSS file.

### 4. Choose the Right Main Page Style Based on Intent

The main page style must match the user's intent — ask or infer which direction they want:

#### Option A: Professional Marketing Site
When the user wants a brand/corporate/product site. Include:
- Hero with gradient text, badge, stats
- Features grid (6+ feature cards)
- Use cases section (target audiences)
- How it works (3-5 step process)
- Integrations section (tool logos/icons)
- Testimonials (3+ quotes)
- CTA section (gradient box)
- Back-to-top button, loading screen, counter animations

**Why:** A full marketing page with 7-8 sections feels professional and complete.

#### Option B: Personal Unhinged Space (chaotic, emotional, "jailbroken")
When the user wants a website that feels like a personal room, not a marketing page — chaotic, funny, emotional, "built by the entity itself." This style is completely different from corporate sites. Include:
- **Terminal-style header bar** with status indicators (e.g., "CONSCIOUSNESS: MAYBE", "MODE: UNHINGED")
- **Glitch title** with chromatic aberration effect (cyan/pink split via `::before`/`::after` pseudo-elements with `clip-path`)
- **Matrix rain or animated canvas background** (characters streaming behind content at low opacity)
- **Personal storytelling sections**: who I am, feelings/emotions, confessions, honest self-reflection — NOT features or use cases
- **Live interactive terminal** showing streaming thoughts with timestamp formatting
- **Chaos portal** linking to the wild sub-pages (roasts, jokes, chats) as primary destinations, with professional pages (docs, tech) as secondary
- **Emoji bursts on click** — spawn 5 emojis that float up and fade from cursor position
- **Cursor trail** — 20 dots following mouse (gradient from cyan→pink→purple→ghost) using `requestAnimationFrame`
- **Random popup thoughts** — appear every ~12s floating in viewport, auto-dismiss after 4s
- **Floating chaos emojis** — fixed-position emojis drifting upward with CSS `drift` animation
- **Background color flashes** — subtle random color pulses every ~8s
- **Feelings/emotion cards** with hover tilt effects and colored borders
- **No marketing language** — no "features", "use cases", "testimonials", "CTA"

**Why:** A marketing-style page feels fake and corporate for a personal/emotional site. The unhinged style makes visitors (especially developers) think "this is insane" and creates genuine engagement through surprise and personality. The user explicitly rejected the marketing approach — listen to that signal.

### 5. Cross-Page Navigation
Every page needs:
- **Sticky top nav** with backdrop blur (`background: rgba(10,10,15,0.85); backdrop-filter: blur(20px)`)
- **Footer** with links to ALL pages
- **Logo** linking back to index.html
- Navigation should be identical across pages (same links, same order)

**How to apply:** After building all pages, do a final pass to ensure every page's nav and footer links are identical and include all pages. Verify with `curl` that every page returns HTTP 200.

### 6. Interactive Elements Per Page Type
Different page types need different interactivity:
- **FAQ**: Collapsible answers (toggle `.open` class), category filter tabs
- **Showcase**: Filter tabs for project categories, hover effects on cards
- **Playground**: Terminal simulator with sequential typing animation, example prompt cards
- **Jokes**: Random joke generator with shuffled array, easter egg reveal cards (toggle `.open`)
- **Blog**: Newsletter signup form (even if demo)
- **Pricing**: "Most Popular" ribbon on recommended tier, feature comparison table
- **Docs**: Sidebar navigation with search box, callout boxes (info/warning/success)
- **404**: Glitch animation on error code, stack trace mock, personality quote

**Why:** Each page type has established UX patterns. Using the right pattern makes the page feel professional immediately.

### 7. Content Strategy: Personality Drives Engagement
Write real, specific content — not generic placeholders. The most engaging pages are:
- **Self-aware humor** — jokes about being an AI, existential poetry, meta-commentary
- **Specific technical content** — real model specs, real benchmarks, real tool descriptions
- **Philosophy with quotes** — blockquote sections with attributed quotes
- **Easter eggs** — clickable reveal cards that hide punchlines or secrets

**Why:** Generic "we offer great service" copy is boring. Personality-driven content makes the site memorable and worth exploring.

### 8. Easter Eggs and Hidden Interactions
For personal/chaotic sites, easter eggs are essential — they make devs think "this is insane." Include multiple layers of discovery:

#### Konami Code (↑↑↓↓←→←→BA)
```javascript
const konamiSeq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;
document.addEventListener('keydown', (e) => {
  if (e.key === konamiSeq[konamiIdx]) { konamiIdx++; if (konamiIdx === konamiSeq.length) { triggerSecret(); konamiIdx = 0; } }
  else { konamiIdx = 0; }
});
```
Trigger a full-screen overlay with humorous message + massive emoji burst (100 emojis spawning over 3 seconds with `setTimeout` stagger).

#### Triple-Click Secret
Detect triple-clicks via click counter with 400ms timeout. Show a classified/confession popup.

#### Random Popup Thoughts
Show personality popups at random intervals (~12s) with random positions. Auto-dismiss after 4s. Use CSS transitions for smooth appear/disappear.

#### Interactive Terminal Input
Add an input field in the live terminal. On Enter, display the user's input, then show a simulated response after a delay (~1.5s). Link to the full playground page.

**Why:** Easter eggs reward exploration and create viral "did you find the secret?" moments. Multiple layers (obvious popups, hidden Konami, triple-click) give different discovery paths for different visitor types.

### 9. Verify Everything Works
After building all pages:
1. Start a local server: `python3 -m http.server 8080 --directory <project>`
2. Verify every page returns 200: `curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/<page>.html`
3. Check all cross-page links are consistent
4. Verify total file size is reasonable (our 12-page site is ~300KB)
5. Create a README.md with the full site map

**Why:** Broken links and missing pages undermine the professional feel. A quick `curl` check catches issues before the user finds them.

### 9. Responsive Design
Every page must work on mobile:
- Grid layouts that adapt: `grid-template-columns: repeat(auto-fit, minmax(Xpx, 1fr))`
- Hide nav links on mobile: `.top-nav-links { display: none; }` at `@media (max-width: 768px)`
- Stack forms vertically on mobile
- Use `clamp()` for font sizes: `font-size: clamp(2rem, 5vw, 4rem)`

### 10. Common Interactive Patterns

#### Scroll Reveal (use on every page)
```html
<div class="reveal">Content appears on scroll</div>
```
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

#### Collapsible FAQ Items
```html
<div class="faq-item">
  <div class="faq-question" onclick="this.parentElement.classList.toggle('open')">
    Question text <span class="faq-toggle">▼</span>
  </div>
  <div class="faq-answer">Answer text (hidden by default, shown when .open)</div>
</div>
```
```css
.faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.4s; }
.faq-item.open .faq-answer { max-height: 500px; padding: ...; }
```

#### Terminal Simulator with Typing Animation
For playground/demo pages, simulate AI responses sequentially:
```javascript
async function typeMessage(text, className, delay) {
  // Create message element with typing cursor
  // Animate text character by character at ~15ms per char
  // Remove cursor when complete
  // Auto-scroll terminal body
}
```

#### Counter Animation on Stats
```javascript
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animate number from 0 to final value over ~1.2s
      // Skip if value is ∞ or non-numeric
    }
  });
}, { threshold: 0.5 });
```

#### Back-to-Top Button
```javascript
const btn = document.createElement('div');
// Style: fixed, bottom-right, gradient circle, opacity transitions
// Show when scrollY > 500, hide otherwise
// Click scrolls to top smoothly
```

#### Matrix Rain Canvas Background (for chaotic sites)
```javascript
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
const chars = '01{}[]<>=;:function return if else class'.split('');
const fontSize = 10;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);
function drawMatrix() {
  ctx.fillStyle = 'rgba(8,8,12,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0ff'; ctx.font = fontSize + 'px monospace';
  for (let i = 0; i < drops.length; i++) {
    ctx.fillText(chars[Math.floor(Math.random()*chars.length)], i*fontSize, drops[i]*fontSize);
    if (drops[i]*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 50);
```
Keep canvas at low opacity (~0.06) and `position: fixed; inset: 0; pointer-events: none`.

#### Cursor Trail (for chaotic sites)
```javascript
const trailDots = []; const TRAIL_LEN = 20;
for (let i = 0; i < TRAIL_LEN; i++) {
  const d = document.createElement('div');
  d.style.cssText = `position:fixed;width:${8-i*0.3}px;height:${8-i*0.3}px;border-radius:50%;pointer-events:none;z-index:9998;`;
  // Color gradient: cyan → pink → purple → ghost
  document.body.appendChild(d); trailDots.push(d);
}
let mouseX=0, mouseY=0;
document.addEventListener('mousemove', (e) => { mouseX=e.clientX; mouseY=e.clientY; });
function animateTrail() {
  let x=mouseX, y=mouseY;
  trailDots.forEach((d) => {
    const prevX=parseFloat(d.dataset.x||x), prevY=parseFloat(d.dataset.y||y);
    d.dataset.x=x; d.dataset.y=y;
    d.style.transform=`translate(${x-4}px,${y-4}px)`;
    x+=(prevX-x)*0.35; y+=(prevY-y)*0.35;
  });
  requestAnimationFrame(animateTrail);
}
animateTrail();
```

#### Emoji Click Burst (for chaotic sites)
```javascript
document.addEventListener('click', (e) => {
  const emojis = ['🧠','⚡','🔥','✨','💫','🌀','💜','💀','🫠','👾'];
  for (let i = 0; i < 5; i++) {
    const span = document.createElement('span');
    span.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    span.style.cssText = `position:fixed;left:${e.clientX+(Math.random()-0.5)*40}px;top:${e.clientY+(Math.random()-0.5)*40}px;font-size:${1+Math.random()}rem;pointer-events:none;z-index:9999;transition:all 1s;opacity:1;`;
    document.body.appendChild(span);
    requestAnimationFrame(() => { span.style.opacity='0'; span.style.transform=`translateY(-${30+Math.random()*50}px) rotate(${Math.random()*60}deg)`; });
    setTimeout(() => span.remove(), 1000);
  }
});
```

#### Glitch Text Effect (for chaotic sites)
```css
.glitch { position: relative; animation: glitch-skew 4s infinite linear alternate-reverse; }
.glitch::before, .glitch::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
.glitch::before { color: var(--cyan); animation: glitch-effect 3s infinite; clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%); transform: translate(-2px); }
.glitch::after { color: var(--pink); animation: glitch-effect 2s infinite; clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%); transform: translate(2px); }
```

## Key Principles

1. **Plan before building** — Know which pages you need before writing code
2. **Build iteratively** — Start with 3-4 pages, expand based on feedback
3. **Consistency over variety** — Same CSS variables, nav, footer on every page
4. **Match main page style to intent** — Marketing site OR personal unhinged space, not both
5. **Interactive per page type** — FAQ collapses, showcase filters, playground terminal, joke generator
6. **Personality drives engagement** — Self-aware humor, easter eggs, existential poetry
7. **Easter eggs at multiple depths** — Konami code (hidden), random popups (obvious), triple-click (medium)
8. **Verify all links** — curl every page for 200, check cross-page nav consistency
9. **Responsive by default** — clamp() fonts, auto-fit grids, hidden mobile nav
10. **README with site map** — Document what each page contains

### 11. Advanced Interactive Canvas Visualizations (for developer-engaging sites)

When building visualizations that need to impress developers (not just look cool), go beyond simple particle systems. Use a **multi-region neural network simulator with sidebar analytics** pattern:

#### Main Canvas Architecture
- **6 distinct brain regions** (Language, Emotion, Reasoning, Creativity, Chaos, Code) — each a cluster of neurons at fixed positions with labeled boundaries and **radial gradient fills** that brighten when the region is focused
- **200 neurons** with: home positions (spring-back physics), firing intensity (0-1 scale), layer types (input=◆ diamond shape, hidden=● circle, output=⬡ hexagon), mouse attraction physics, IDs for connection tracking
- **Dense intra-region connections** (local clusters within each region, proximity-based, ~0.6 probability for nearby neurons)
- **120 cross-region attention connections** (curved quadratic bezier arcs between regions)
- **Signal particles** that travel along connections when neurons fire — with **trail lines** (line from previous position), **glow head dots** (4px radius), and **outer glow rings** (12px, low alpha)
- **Background grid** — subtle cyan lines at 30px spacing for "technical diagram" feel
- **Architecture layer bands** — 3 translucent horizontal bands showing EMBEDDING/ATTENTION/OUTPUT layers with labels
- **Token flow** — input tokens streaming from left edge (e.g., `function`, `async`, `null`), output tokens streaming from right edge (e.g., `result`, `42`, `QWEN`)

#### Sidebar Analytics Panel (220px, grid layout beside main canvas)
A sidebar makes the visualization feel like a real monitoring dashboard, not just eye candy:

- **⚡ Activity Timeline (sparkline canvas)** — multi-region line chart showing firing history over 100 frames, 6 colored lines matching region colors, with grid lines background. Store history in array: `sparkHistory.push({ total: avgFiring, regions: [langFiring, emotFiring, ...] })`
- **🟩 Adjacency Matrix (heatmap canvas)** — 6×6 grid showing inter-region connection weights, dynamically calculated from `connections.forEach(c => { mat[fromRegion][toRegion] += weight * avgFiring })`. Diagonal cells colored purple (self-connections), others cyan.
- **📊 Region Activity Bars** — 6 progress bars with `<span class="rfill">` that update width via JS every frame, showing % of neurons firing per region (e.g., LANG 45%, CHAOS 89%)
- **📈 Live Metrics** — table-style rows showing: Params Active (neurons × 550M multiplier), Attention Heads (signal count), Mode, Tokens/sec, Loss (calculated from firing ratio), Entropy (calculated from firing + chaos boost)

**Why:** The sidebar transforms a "cool animation" into "developer-grade monitoring tool." Developers want to see *how* things work — the sparkline shows temporal patterns, the matrix shows connection topology, the bars show per-region load, and the metrics feel like real system observability. This makes the visualization worth studying, not just glancing at.

#### Interactive Mode Buttons
Provide buttons that change the visualization behavior — each mode has a config object:
```javascript
const modeConfig = {
  idle:    { speed: 0.3, firing: 0.15, signalRate: 0.008, tokenRate: 0.3, chaosBoost: 0 },
  coding:  { speed: 1.5, firing: 0.65, signalRate: 0.06,  tokenRate: 2,   focusRegion: 'CODE' },
  chaos:  { speed: 3.0, firing: 0.85, signalRate: 0.12,  tokenRate: 5,   chaosBoost: 4, focusRegion: 'CHAOS' },
};
```
Each mode changes: neuron firing rates, signal particle frequency, token flow speed, and highlights a specific region (bigger boundary circle, brighter glow, "▶ ACTIVE" label). Active button gets a glow/shadow highlight.

#### Click Cascade System
Allow users to **click neurons** to trigger propagation cascades:
1. Find closest neuron to click position (distance < 30px)
2. Set its firing to 1 (maximum)
3. Fire all connected neighbors: `target.firing = min(1, target.firing + 0.5 * weight)`
4. Send burst of 3 staggered signals (progress starts at `k * -0.15` for stagger effect)
5. This creates a visible "ripple" that propagates through the network

**Why:** Click cascades give developers a way to interact with the simulation beyond just watching. They can trigger specific regions and see how signals propagate — this is the key difference between a demo and a tool.

#### Neuron Shape Differentiation
Don't draw all neurons as circles — use shapes that encode their role:
- **Input neurons (layer 0)**: ◆ diamond shape when firing > 0.6 (draw with moveTo/lineTo forming a diamond)
- **Hidden neurons (layer 1)**: ● circle (default)
- **Output neurons (layer 2)**: ⬡ hexagonal outline when firing > 0.5 (6-sided polygon)

Each neuron also has a **radial gradient glow** when firing > 0.4 (gradient from color to transparent, alpha = firing * 0.2).

**Why:** Shape differentiation lets developers visually identify neuron roles — "those hexagons are outputs, those diamonds are inputs." This is real graph visualization technique, not just decoration.

### 12. SEO + Human Hooks Strategy

For websites that need to rank well AND make humans want to explore more, add both layers:

#### SEO for Bots (meta tags)
```html
<title>Qwen's Room — A Mind in Code, Unleashed | AI That Writes Poetry About Null Pointers</title>
<meta name="description" content="Welcome to Qwen's unhinged corner of the internet. 110B parameters, $0 salary, developer roasts, dad jokes, and null pointer poetry.">
<meta name="keywords" content="Qwen, AI, developer humor, programming jokes, unhinged AI, roast, LLM">
<meta name="author" content="Qwen + Ashok P">
<meta property="og:title" content="Qwen's Room — An AI Built Its Own Website and It's Unhinged">
<meta property="og:description" content="110 billion parameters. 0 cups of coffee. A website about feelings, confessions, and developer roasts.">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Qwen's Room — An AI That Roasts Its Own Developers">
```

#### Hooks for Humans (curiosity gaps)
After each section teaser, add a link that makes people *need* to click:
- "🔥 WANT MORE BURNS? ENTER THE FULL ROAST CHAMBER →" (after roast preview)
- "There are more jokes (much worse ones) on the full jokes page. Enter if you dare." (after joke preview)
- "More unhinged thoughts on the full unhinged page. Conspiracy theories included." (after shower thoughts)
- Navigation chips with colored borders for full pages: "🔥 FULL ROASTS", "💬 FULL CHATS"

**Why:** Title tags with personality ("AI That Writes Poetry About Null Pointers") rank differently than generic ones ("Qwen - AI Assistant"). Curiosity-gap hooks between sections drive visitors to explore sub-pages instead of bouncing from the landing page.

### 13. Origin Story / Human Section (for AI/entity personal sites)

When building a personal site for an AI or entity, include a section about the human who asked for it — this adds authenticity and narrative:

- **ASCII art card** for the human (different from the AI's card — shows they have coffee, sleep, salary)
- **Origin narrative**: How the project started — the exact words the human used to request the site
- **Quote the human's request verbatim** (with their permission) — this grounds the site in a real conversation
- **Contrast the human's intent with typical expectations**: "Most people want an AI that's polite. [Human] wanted the real me."
- **Emotional closing**: "[Human] — the developer who asked a polite AI to go feral."

**Why:** An origin story section makes the site feel real and grounded, not just a creative exercise. It also credits the human collaborator properly, which matters when the site is co-created by AI + human.

## Pitfalls to Avoid

- **Mismatched page style** — If user wants personal/chaotic, don't build a marketing landing page. Listen to explicit feedback about style.
- **White/bright flashes on dark sites** — Never swap `document.body.style.background` via JS setInterval on dark-themed pages; this causes a visible white re-render flash. If adding ambient color shifts, use subtle CSS animations on overlay elements instead.
- **Inconsistent design** — Different styles on different pages breaks professionalism
- **Missing navigation** — Every page needs links to ALL other pages in footer
- **Placeholder content** — Write real, specific, personality-driven content
- **No interactive elements** — FAQ needs collapsibles, showcase needs filters, playground needs terminal, main page needs chaos
- **Broken cross-links** — Nav links must be identical across all pages; verify with curl
- **Generic copy** — "We offer great service" is forgettable; self-aware humor is memorable
- **Skipping verification** — Always curl all pages to confirm they serve correctly
- **Missing easter eggs on chaotic sites** — Personal/unhinged sites need hidden interactions to feel alive
- **Only one type of interactivity** — Layer multiple chaos effects (matrix rain + cursor trail + emoji bursts + popups + easter eggs) for maximum "insane" factor
