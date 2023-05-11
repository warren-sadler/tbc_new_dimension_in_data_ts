import 'dotenv/config';
import { OpenAI } from 'langchain/llms/openai';

async function main() {
  const model = new OpenAI({ temperature: 0 });
  return model.call('Who gave the "I have a Dream Speech?"');
}

main().then(console.log).catch(console.error);
