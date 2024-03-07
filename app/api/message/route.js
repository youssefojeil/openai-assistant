import { MessageArraySchema } from '@/lib/validators/message';
import { chatbotPrompt } from '@/helpers/constants/chatbot-prompt';

export async function POST(req) {
  console.log('endpoint works');

  const { messages } = await req.json();

  const parsedMessages = MessageArraySchema.parse(messages);

  const outboundMessages = parsedMessages.map((message) => ({
    role: message.isUserMessage ? 'user' : 'system',
    content: message.text,
  }));

  outboundMessages.unshift({
    role: 'system',
    content: chatbotPrompt,
  });
}
