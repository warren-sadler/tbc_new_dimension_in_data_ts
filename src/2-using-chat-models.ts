import 'dotenv/config';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { SystemChatMessage, HumanChatMessage } from 'langchain/schema';

async function main() {
  const chat = new ChatOpenAI({ temperature: 0 });
  return chat.call([
    new SystemChatMessage(
      'You are terse but polite React expert. Answer questions accordingly.'
    ),
    new HumanChatMessage('What is ReactJS?'),
  ]);
}

main().then(console.log).catch(console.error);
