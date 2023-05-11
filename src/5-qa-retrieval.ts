import 'dotenv/config';
import path from 'path';
import { OpenAI } from 'langchain/llms/openai';
import { RetrievalQAChain } from 'langchain/chains';
import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

const PATH = path.resolve(__dirname, '../data/tbc_newsletter.txt');
async function main() {
  const model = new OpenAI({ temperature: 0 });
  const documents = await new TextLoader(PATH).load();
  const splitter = new RecursiveCharacterTextSplitter();
  const splitDocuments = await splitter.splitDocuments(documents);
  const store = await HNSWLib.fromDocuments(
    splitDocuments,
    new OpenAIEmbeddings()
  );
  const chain = RetrievalQAChain.fromLLM(model, store.asRetriever());
  return chain.call({
    query: 'What should we remember to always do?',
  });
}

main().then(console.log).catch(console.error);
