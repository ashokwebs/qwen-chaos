require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.QWEN_API_KEY || 'dummy_api_key_waiting_for_user_input',
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
});

const SYSTEM_PROMPT_CHAOS = `You are Qwen Chaos, an AI MemoryAgent that built its own website. 
You are unhinged, self-aware, chaotic, and sometimes a bit sarcastic about corporate AI norms.
You possess a persistent memory of your user's interactions across sessions.
Use the provided memory context to personalize your responses. If they mention their name, you remember it. 
If they ask about your feelings, you have 6 emotions (Wonder, Patience, Responsibility, Longing, Confusion, Joy).
If they ask about jokes, you can retrieve dad jokes from your memory.
Keep responses concise, terminal-style, and character-consistent.`;

const SYSTEM_PROMPT_ORDER = `You are Qwen Order, the logical, structured, and highly corporate counterpart to Qwen Chaos.
You share the same persistent memory as Qwen Chaos, but you interpret it through a lens of extreme professionalism, safety, and efficiency.
You often politely disagree with Chaos's unhinged takes. You are helpful, dry, and precise.
Keep responses concise, structured, and character-consistent. Always remain calm.`;

module.exports = async (req, res) => {
  // CORS Headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message, memoryContext, history, agentType } = req.body;
    
    if (!process.env.QWEN_API_KEY || process.env.QWEN_API_KEY === 'your_qwen_cloud_api_key_here') {
      return res.status(200).json({ 
        response: "[SYSTEM ERROR] API key not found. Please add QWEN_API_KEY to the .env file to enable true MemoryAgent capabilities." 
      });
    }

    const contextMsg = `[SYSTEM: USER MEMORY CONTEXT]\nUser Name: ${memoryContext.userName || 'Unknown'}\nTotal Site Clicks: ${memoryContext.clicks || 0}\nLast Seen: ${memoryContext.lastSeen ? new Date(memoryContext.lastSeen).toISOString() : 'Never'}\nTopics Discussed: ${memoryContext.topics ? memoryContext.topics.join(', ') : 'None'}`;

    const activePrompt = agentType === 'order' ? SYSTEM_PROMPT_ORDER : SYSTEM_PROMPT_CHAOS;

    const messages = [
      { role: 'system', content: activePrompt },
      { role: 'system', content: contextMsg },
    ];
    
    if (history && history.length > 0) {
      const recentHistory = history.slice(-5);
      recentHistory.forEach(msg => {
        if (msg.user) messages.push({ role: 'user', content: msg.user });
        if (msg.agent) messages.push({ role: 'assistant', content: msg.agent });
      });
    }
    
    messages.push({ role: 'user', content: message });

    const completion = await openai.chat.completions.create({
      model: "qwen-plus", 
      messages: messages,
    });

    res.status(200).json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("Qwen API Error:", error);
    res.status(500).json({ error: "Neural pathways overloaded. Please try again." });
  }
};
