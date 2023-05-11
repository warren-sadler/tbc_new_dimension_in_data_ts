import 'dotenv/config';
import readline from 'readline';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { SystemChatMessage, HumanChatMessage } from 'langchain/schema';

const chat = new ChatOpenAI({ temperature: 0 });
const messages: Message[] = [];

type Message = { message: string; isUser: boolean };

function formatMessage(from: string) {
  return (message: string, isUser: boolean): Message => {
    return { message: `${from}: ${message} \n`, isUser };
  };
}
const fromBot = formatMessage('(🤖) Bot');
const fromYou = formatMessage('(😀) You');

const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const QUESTION = 'Ask me anything about React. Type `exit` to quit.\n > ';

function renderMessages(messages: Message[]) {
  console.clear();
  for (let message of messages) console.log(message.message);
}

async function handleAnswer(response: string) {
  const sanitizedAnswer = response.trim().toLowerCase();
  if (sanitizedAnswer === 'exit') process.exit(0);
  console.clear();
  console.log('The 🤖 is thinking... Please wait.');
  const answer = await chat.call([
    new SystemChatMessage(
      'You are a terse but polite React expert. Answer questions you receive.'
    ),
    new HumanChatMessage(sanitizedAnswer),
  ]);
  messages.push(fromYou(response, true), fromBot(answer.text, false));
  renderMessages(messages);
  prompt.question(QUESTION, handleAnswer);
}

async function main() {
  prompt.question(QUESTION, handleAnswer);
}

main().catch(console.error);
