import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const createAssistant = async ({ name, instructions, fileId }) => {
  const assistant = await openai.beta.assistants.create({
    name,
    instructions,
    tools: [{ type: 'code_interpreter' }],
    model: 'gpt-4-turbo-preview',
    file_ids: fileId && [fileId],
  });

  return assistant;
};

const runAssistant = async ({ assistant_id, threadId, instructions }) => {
  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id,
    instructions,
  });

  return run;
};
