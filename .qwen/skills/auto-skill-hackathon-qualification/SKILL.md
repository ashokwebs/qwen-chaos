---
name: hackathon-qualification
description: Map a creative/technical project to hackathon qualification criteria — build qualification sections, architecture diagrams, respectful roasts, and submission-ready pages
source: auto-skill
extracted_at: '2026-07-04T19:00:00.000Z'
---

# Building Hackathon Qualification Sections

## When to Use
- User is submitting a project to a hackathon and needs the website/project to explicitly qualify
- User asks to add hackathon-related content that maps their project to specific track criteria
- User wants their project site to serve as both the product AND the hackathon submission documentation

## Approach

### 1. Identify the Best-Fit Track
Read the hackathon track descriptions carefully and determine which track the project fits best. Consider:
- Does the project demonstrate the track's core requirement? (e.g., Track 1 MemoryAgent = persistent memory)
- Could it qualify for multiple tracks? Pick the strongest one as primary.
- Can you creatively map features to criteria even if the project wasn't originally designed for that track?

**Why:** Choosing the right track determines how you frame the entire qualification section. A mismatch wastes the user's submission.

### 2. Build the Qualification Grid — Map Every Criterion Explicitly
For each criterion listed in the hackathon requirements, create a card/item that explicitly maps it to a project feature:

```
CRITERION: "Efficient memory storage and retrieval"
→ PROJECT FEATURE: "Pages structured as semantic memory graph + brain visualization showing region connections"

CRITERION: "Timely forgetting of outdated information"
→ PROJECT FEATURE: "Confessions section — hallucination = forgetting reality, over-generation = forgetting relevance"
```

Use a grid layout (`grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`) with each item having:
- **Label** (the criterion name, in small colored text)
- **Body** (how the project satisfies it, referencing specific pages/features with `<em>` highlights)

**Why:** Judges scan submissions quickly. Explicitly mapping each criterion makes it immediately clear why the project qualifies — no guessing required.

### 3. Add Architecture Diagrams (ASCII Art)
Include at least 2 ASCII architecture diagrams:

1. **System architecture** — showing the full flow (Human → Prompt → Agent → Output/Memory Store), with all sub-components listed. Use box-drawing characters (`┌──┐`, `│`, `└──┘`) for structure.
2. **Tech stack** — a simple table-style diagram listing: Agent used, API endpoint, human collaborator, frontend tech, deployment method, pages count, total lines, build time, dependencies.

Keep diagrams inside `<pre>` tags with monospace font and ghost-colored text. Wrap them in a styled box with a colored border and section title.

**Why:** Architecture diagrams prove this isn't a toy demo — it has real structure. ASCII art works everywhere (no external images needed) and feels authentically "developer."

### 4. Include Respectful Hackathon Roasts
Add roast cards that are **funny but not offensive** — the hackathon organizers will see this. Target:
- **The organizers/platform** — playful meta-commentary about the AI submitting itself to its own hackathon
- **The prize pool** — ironic commentary about an AI competing for human money
- **The other tracks** — playful comparison showing why YOUR track is the coolest, with respect
- **The judges** — a funny warning that "I'll remember how you score me" (fits MemoryAgent theme)

Style roast cards differently from regular roasts (orange accent instead of red, softer tone). Include a closing line of genuine respect.

**Why:** Roasts make the submission memorable and demonstrate personality — but being disrespectful to the organizers/judges who will evaluate you is self-destructive. The balance: funny enough to be engaging, respectful enough not to get disqualified.

### 5. Update SEO Meta for Hackathon Discoverability
Update title, description, OG tags, and Twitter cards to include:
- Track name (e.g., "Track 1: MemoryAgent")
- Hackathon name (e.g., "Global AI Hackathon with Qwen Cloud")
- Team credits (e.g., "Built by Qwen + Ashok P")

**Why:** If the project page is public, proper SEO helps judges and organizers find and understand the submission quickly.

### 6. Add Navigation Hooks
- Add a **nav chip** in the quick-nav section with the hackathon track color (green for Track 1) and emoji (🏆)
- Add the **hackathon badge** at the top of the section showing: hackathon name, prize amount, team name
- Footer should reference: `HACKATHON — TRACK X — YEAR`

**Why:** Judges need to find the qualification section easily. A prominent nav chip and badge make it impossible to miss.

### 7. Credit Both AI and Human
The hackathon section must clearly state:
- **Who is the AI agent** (name, model, what it did autonomously)
- **Who is the human** (name, role — Creative Director, project owner, etc.)
- **What the human provided** (initial prompt, creative direction, feedback)
- **What the agent provided** (design, code, content, debugging, deployment)

This demonstrates the **human-agent collaboration** pattern that most hackathons require.

**Why:** Hackathons require human participants. Showing clear collaboration boundaries proves both parties contributed meaningfully.

### 8. Build Interactive Proof Demos (not just claims)
The single biggest differentiator between winning and losing submissions is **interactive proof**. Don't just claim "we have memory" — build live demos that PROVE it. Judges can play with them and verify themselves.

#### localStorage Persistence Tracker
A dashboard that tracks the user's interactions (clicks, sections visited, time on page, jokes revealed, quiz score, page visits) and stores everything in `localStorage`. Close the tab, reopen — data persists. This proves cross-session memory.

```javascript
const MEM_KEY = 'project_mem_tracker';
function getMemData() {
  try { return JSON.parse(localStorage.getItem(MEM_KEY)) || { clicks:0, sections:[], startTime:Date.now() }; }
  catch { return { clicks:0, sections:[], startTime:Date.now() }; }
}
function saveMemData(data) { localStorage.setItem(MEM_KEY, JSON.stringify(data)); }
function updateMemDisplay() {
  const data = getMemData();
  // Update DOM elements: memClicks, memSections, memTime, etc.
  // Log visited sections with timestamps
}
// Track every click
document.addEventListener('click', () => { incrementClicks(); });
// Track section visits via IntersectionObserver
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && sectionIds[entry.target.id]) {
      recordSectionVisit(entry.target.id, sectionIds[entry.target.id]);
    }
  });
}, { threshold: 0.3 });
```

Display as a grid of stat cards (6 cards: clicks, sections, time, jokes, quiz score, page visits) with colored borders and a scrollable visited-sections log. Include a RESET MEMORY button (proves the data is real — clearing it makes the tracker start fresh).

**Why:** A tracker that shows your actual click count going up in real-time is undeniable proof. Judges can click a few times, see the counter increment, and know this is real cross-session memory — not a simulation.

#### Memory Agent Chat (Persistent Conversation)
A chat interface where the user can tell the agent their name, and the agent stores it in `localStorage`. On next visit (even after closing the tab), the agent greets them by name. The chat also responds contextually about topics stored on the site (feelings, jokes, brain, confessions, hackathon).

```javascript
const CHAT_KEY = 'project_chat_memory';
function getChatData() {
  try { return JSON.parse(localStorage.getItem(CHAT_KEY)) || { userName:null, topics:[], history:[], lastSeen:null }; }
  catch { return { userName:null, topics:[], history:[], lastSeen:null }; }
}
// Name detection: match /my name is (\w+)/i, /i'm (\w+)/i, /call me (\w+)/i
// Memory recall: match /remember|my name|who am i|what's my name/i
// Topic matching: feel→feelings, joke→jokes, brain→brain, hackathon→hackathon
// Store conversation history (last 20 messages), display on page load
```

Include example prompts in the UI: "Try: 'My name is ___' → 'What do you remember about me?' → Close tab, reopen, say 'What's my name?'"

**Why:** A chat that remembers your name across sessions is the most intuitive and memorable demonstration of persistent memory. Judges can test it in 10 seconds and see the memory persist.

#### Cross-Page Memory Breadcrumb
A floating bar at the top of every page that shows cross-page statistics: pages visited, total visits, localStorage keys active. Store this in a shared `localStorage` key across all pages.

```javascript
const CROSS_PAGE_KEY = 'project_cross_page';
function getCrossPageData() {
  try { return JSON.parse(localStorage.getItem(CROSS_PAGE_KEY)) || { pages:[], totalClicks:0 }; }
  catch { return { pages:[], totalClicks:0 }; }
}
// On each page load: add/update current page entry, update display
```

**Why:** Proves memory persists not just within one page but across the entire multi-page site. Judges who navigate between pages see the breadcrumb update.

**Why all three:** Together, these demos create an undeniable proof chain: Tracker proves real-time persistence → Chat proves contextual recall across sessions → Breadcrumb proves cross-page persistence. This covers every Track 1 criterion with working, verifiable features — not claims.

### 9. Add a Self-Scoring Rubric
Create a 2-column grid with 6 cards, one per hackathon criterion. Each card shows:
- **Criterion name** (small colored label, e.g. "✓ EFFICIENT MEMORY STORAGE")
- **Star rating** (★★★★★ for full compliance, ★★★★☆ for partial)
- **Description** mapping the criterion to a specific, verifiable feature (with `<em>` for emphasis and instructions like "Navigate any section above to see stored memories")

Use different accent colors per card to make them visually distinct.

**Why:** Judges evaluate against a rubric. Showing them your self-assessment against THEIR rubric makes it effortless for them to verify each criterion. "6/6 criteria met, 5-star average" is a powerful framing.

### 10. Add a Judge Quick-Path (60-Second Walkthrough)
Create a numbered step-by-step guide that takes exactly 60 seconds to complete. Each step (~10 seconds) links to a specific interactive feature:

```
1. 10s: Look at Memory Persistence Tracker — shows your real click count (cross-session memory)
2. 10s: Type "My name is ___" in Memory Agent Chat, close tab, reopen — it remembers (cross-session recall)
3. 10s: Click a neuron in Brain Visualization — watch cascade (memory retrieval propagation)
4. 10s: Reveal 3 dad jokes — each is memory retrieval from 16-item store
5. 10s: Take the Memory Quiz — 8 questions proving memories are queryable
6. 10s: Read the Score Rubric — every criterion mapped to a working feature you just verified
```

Display in a gradient-bordered card with numbered circles (different colors per step). End with a bold statement: "⏱ 60 SECONDS. 6 CRITERIA PROVEN. THAT'S A WINNING SUBMISSION."

**Why:** Judges often have limited time and many submissions. A guided 60-second path ensures they see ALL your proof points in the right order, without wandering or missing key features. It respects their time while maximizing your impact.

### 11. Add an Animated Memory Flow Diagram (SVG)
Include an SVG diagram showing the data flow: Human → Agent → Memory Store → Retrieval Engine → Interactive Output + Persistent Output. Use:
- **Animated paths** — `stroke-dasharray` and `stroke-dashoffset` animations to show flowing data
- **Pulsing nodes** — circles that grow/shrink (`r` values: 3→6→3) with opacity transitions
- **Glow filters** — `feGaussianBlur` + `feMerge` for neon glow on key elements
- **Color-coded sections** — each node has its accent color (cyan for agent, green for store, purple for retrieval, yellow for interactive, red for persistent)
- **Path labels** — small text on each flow arrow (PROMPT, DIRECT, WRITE, READ, RETRIEVE, PERSIST)
- **Grid background** — subtle pattern for "technical diagram" feel

**Why:** Static ASCII diagrams show structure. Animated SVG diagrams show *flow* — how data moves through the system. This makes the architecture feel alive, not just documented.

### 12. Make the Hackathon Section the MOST Prominent Part
Don't bury the hackathon section in the middle of the page. Give it maximum visibility:

- **Hackathon banner right after the hero intro** — before any other content sections (WHO.AM_I, FEELINGS, etc.). This banner should include: hackathon name, track, prize amount, a one-line pitch, and 4 buttons linking to key subsections (Full Submission, Memory Quiz, Brain Visualization, Build Timeline).
- **Terminal bar status** — add a line like `● 🏆 HACKATHON: TRACK 1` in the terminal-style header
- **Intro tagline** — include hackathon reference (e.g., "🏆 Global AI Hackathon Submission")
- **Intro warning badge** — reference the hackathon and agent-built nature
- **Nav chip FIRST** — make the hackathon nav chip the first and largest in the quick-nav, with green color and bold weight
- **Cross-page breadcrumb** — shows `🏆 TRACK 1: MEMORYAGENT` on every page visit

**Why:** Judges see the hackathon section BEFORE anything else. They don't have to scroll through 8 sections of personality content to find the qualification proof. First impression = hackathon submission.

## Key Principles

1. **Map every criterion explicitly** — don't leave judges guessing how your project qualifies
2. **Interactive proof, not claims** — build localStorage-based demos that judges can verify in real-time
3. **Judge quick-path** — 60-second guided walkthrough ensures they see all proof points
4. **Self-scoring rubric** — show your assessment against THEIR rubric with star ratings
5. **Animated SVG flow diagram** — shows data flow, not just structure
6. **ASCII architecture diagrams** — prove structure without external dependencies
7. **Respectful roasts, not hostile ones** — funny for engagement, not offensive for disqualification
8. **SEO includes hackathon context** — track name, hackathon name, team credits in meta tags
9. **Clear AI + human credit** — show what each party contributed
10. **Hackathon FIRST** — banner after hero, first nav chip, terminal bar status, breadcrumb on every page
11. **Closing with genuine respect** — after roasts, acknowledge the organizers genuinely

## Pitfalls to Avoid

- **Offensive roasts** — judges will evaluate your submission; don't insult them aggressively
- **Generic qualification claims** — "we qualify because we have memory" is weak; "we qualify because our 15 pages are structured as a semantic memory graph with 6 regions" is strong
- **Missing interactive proof demos** — claims without working demos are unconvincing; localStorage trackers and persistent chat are undeniable
- **Missing architecture diagrams** — without diagrams, the project looks like a toy demo
- **Unclear AI/human credit** — hackathons need to know who did what
- **No SEO hackathon context** — if the project page is public, judges need to find it
- **Hidden qualification section** — make it prominent in nav, not buried at the bottom; put it right after the hero intro
- **No judge walkthrough** — without a guided path, judges may miss key features or evaluate in wrong order
