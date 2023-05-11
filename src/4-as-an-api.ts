import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { createServer } from 'http';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { SystemChatMessage, HumanChatMessage } from 'langchain/schema';

const CHAT = new ChatOpenAI({
  temperature: 0,
});
const PORT = 8080;
const PROMPT =
  'You are an opinionated literary expert. Answer the following question to the best of your ability.';
const app = express();
app.use(express.json());
app.use(morgan('combined'));

app.use('/api/lit-opinions', async function (req, res) {
  const { question }: { question: string } = req.body;
  const answer = await CHAT.call([
    new SystemChatMessage(PROMPT),
    new HumanChatMessage(question),
  ]);
  res.json(answer);
});

createServer(app).listen(PORT, function () {
  console.log(`Your 🤖 is running on port: ${PORT}`);
});
