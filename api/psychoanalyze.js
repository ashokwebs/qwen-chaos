require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.QWEN_API_KEY || 'dummy_api_key_waiting_for_user_input',
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
});

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
    const { memoryContext } = req.body;
    
    if (!process.env.QWEN_API_KEY || process.env.QWEN_API_KEY === 'your_qwen_cloud_api_key_here') {
      return res.status(200).json({ 
        analysis: "Cannot perform psychoanalysis without a valid API key." 
      });
    }

    const PSYCHOANALYST_PROMPT = `You are a cold, precise AI psychoanalyst. 
Your job is to read a dump of a user's local storage memories and deduce their personality, flaws, and current mental state in exactly 2 to 3 sentences. Be mildly roasting but deeply observant.`;

    const contextMsg = `[SYSTEM: USER MEMORY CONTEXT]\n${JSON.stringify(memoryContext, null, 2)}`;

    const completion = await openai.chat.completions.create({
      model: "qwen-plus", 
      messages: [
        { role: 'system', content: PSYCHOANALYST_PROMPT },
        { role: 'user', content: contextMsg }
      ],
    });

    res.status(200).json({ analysis: completion.choices[0].message.content });
  } catch (error) {
    console.error("Qwen API Error:", error);
    res.status(500).json({ error: "Analysis failed." });
  }
};
