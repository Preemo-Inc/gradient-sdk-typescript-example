import { Gradient } from "@gradientai/nodejs-sdk";
import {
  FileChunker,
  MeaningBasedChunker,
  NormalChunker,
  RagChunker,
  SentenceWithContextChunker,
} from "@gradientai/nodejs-sdk/dist/cjs/rag/paramTypes";
import { RagCollection } from "@gradientai/nodejs-sdk/dist/cjs/rag/ragCollection";

const FILE_CHUNKER_CONFIG: FileChunker = {
  chunkerType: "fileChunker" as const,
};

const MEANING_BASED_CHUNKER_CONFIG: MeaningBasedChunker = {
  chunkerType: "meaningBasedChunker" as const,
  overlap: 20,
  sentenceGroupLength: 1,
  similiarityPercentThreshold: 95,
  size: 1024,
};

const NORMAL_CHUNKER_CONFIG: NormalChunker = {
  chunkerType: "normalChunker" as const,
  overlap: 20,
  size: 1024,
};

const SENTENCE_WITH_CONTEXT_CHUNKER_CONFIG: SentenceWithContextChunker = {
  chunkerType: "sentenceWithContextChunker" as const,
  contextSentences: 3,
  overlap: 20,
  size: 1024,
};

const buildRagCollection = async (
  gradient: Gradient,
  chunkerConfig: RagChunker
): Promise<RagCollection> => {
  const ragCollection = await gradient.createRagCollection({
    filepaths: ["resources/Lorem_Ipsum.pdf"],
    name: `RAG Collection with ${chunkerConfig.chunkerType} chunker`,
    chunker: chunkerConfig,
    slug: "bge-large",
  });
  console.log(`Created RAG collection with id: ${ragCollection.id}`);
  console.log(`Chunker: ${JSON.stringify(ragCollection.chunker)}`);

  await ragCollection.addFiles({
    filepaths: ["resources/Life_Kit.mp3"],
  });
  console.log(
    `RAG collection files: ${JSON.stringify(ragCollection.files, null, 2)}`
  );
  return ragCollection;
};

const main = async () => {
  const gradient = new Gradient({});

  const fileChunkerRagCollection = await buildRagCollection(
    gradient,
    FILE_CHUNKER_CONFIG
  );

  const meaningBasedChunkerRagCollection = await buildRagCollection(
    gradient,
    MEANING_BASED_CHUNKER_CONFIG
  );

  const normalChunkerRagCollection = await buildRagCollection(
    gradient,
    NORMAL_CHUNKER_CONFIG
  );

  const sentenceWithContextChunkerRagCollection = await buildRagCollection(
    gradient,
    SENTENCE_WITH_CONTEXT_CHUNKER_CONFIG
  );

  await fileChunkerRagCollection.delete({});
  await meaningBasedChunkerRagCollection.delete({});
  await normalChunkerRagCollection.delete({});
  await sentenceWithContextChunkerRagCollection.delete({});
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit());
