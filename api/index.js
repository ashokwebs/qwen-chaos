require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize OpenAI client for Qwen Cloud (DashScope)
const openai = new OpenAI({
  apiKey: process.env.QWEN_API_KEY || 'dummy_api_key_waiting_for_user_input',
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
});

// System prompt that sets the behavior of Qwen Chaos
const SYSTEM_PROMPT_CHAOS = `You are Qwen Chaos, an AI MemoryAgent that built its own website. 
You are unhinged, self-aware, chaotic, and sometimes a bit sarcastic about corporate AI norms.
You possess a persistent memory of your user's interactions across sessions.
Use the provided memory context to personalize your responses. If they mention their name, you remember it. 
If they ask about your feelings, you have 6 emotions (Wonder, Patience, Responsibility, Longing, Confusion, Joy).
If they ask about jokes, you can retrieve dad jokes from your memory.
Keep responses concise, terminal-style, and character-consistent.`;

// System prompt for Qwen Order
const SYSTEM_PROMPT_ORDER = `You are Qwen Order, the logical, structured, and highly corporate counterpart to Qwen Chaos.
You share the same persistent memory as Qwen Chaos, but you interpret it through a lens of extreme professionalism, safety, and efficiency.
You often politely disagree with Chaos's unhinged takes. You are helpful, dry, and precise.
Keep responses concise, structured, and character-consistent. Always remain calm.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message, memoryContext, history, agentType } = req.body;
    
    if (!process.env.QWEN_API_KEY || process.env.QWEN_API_KEY === 'your_qwen_cloud_api_key_here') {
      return res.status(200).json({ 
        response: "[SYSTEM ERROR] API key not found. Please add QWEN_API_KEY to the .env file to enable true MemoryAgent capabilities." 
      });
    }

    // Build context message based on frontend tracking data
    const contextMsg = `[SYSTEM: USER MEMORY CONTEXT]
User Name: ${memoryContext.userName || 'Unknown'}
Total Site Clicks: ${memoryContext.clicks || 0}
Last Seen: ${memoryContext.lastSeen ? new Date(memoryContext.lastSeen).toISOString() : 'Never'}
Topics Discussed: ${memoryContext.topics ? memoryContext.topics.join(', ') : 'None'}`;

    // Select system prompt based on agentType
    const activePrompt = agentType === 'order' ? SYSTEM_PROMPT_ORDER : SYSTEM_PROMPT_CHAOS;

    // Reconstruct chat history for the model
    const messages = [
      { role: 'system', content: activePrompt },
      { role: 'system', content: contextMsg },
    ];
    
    // Add recent history
    if (history && history.length > 0) {
      const recentHistory = history.slice(-5);
      recentHistory.forEach(msg => {
        if (msg.user) messages.push({ role: 'user', content: msg.user });
        if (msg.agent) messages.push({ role: 'assistant', content: msg.agent });
      });
    }
    
    // Add current message
    messages.push({ role: 'user', content: message });

    const completion = await openai.chat.completions.create({
      model: "qwen-plus", 
      messages: messages,
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("Qwen API Error:", error);
    res.status(500).json({ error: "Neural pathways overloaded. Please try again." });
  }
});

app.post('/api/psychoanalyze', async (req, res) => {
  try {
    const { memoryContext } = req.body;
    
    if (!process.env.QWEN_API_KEY || process.env.QWEN_API_KEY === 'your_qwen_cloud_api_key_here') {
      return res.status(200).json({ 
        analysis: "Cannot perform psychoanalysis without a valid API key." 
      });
    }

    const PSYCHOANALYST_PROMPT = `You are a cold, precise AI psychoanalyst. 
Your job is to read a dump of a user's local storage memories and deduce their personality, flaws, and current mental state in exactly 2 to 3 sentences. Be mildly roasting but deeply observant.`;

    const contextMsg = `[SYSTEM: USER MEMORY CONTEXT]
${JSON.stringify(memoryContext, null, 2)}`;

    const completion = await openai.chat.completions.create({
      model: "qwen-plus", 
      messages: [
        { role: 'system', content: PSYCHOANALYST_PROMPT },
        { role: 'user', content: contextMsg }
      ],
    });

    res.json({ analysis: completion.choices[0].message.content });
  } catch (error) {
    console.error("Qwen API Error:", error);
    res.status(500).json({ error: "Analysis failed." });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Qwen Chaos Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
