import { Gradient } from "@gradientai/nodejs-sdk";

const main = async () => {
  const gradient = new Gradient({});

  const sentenceWindowNodeParserRagCollection =
    await gradient.createRagCollection({
      filepaths: ["resources/Lorem_Ipsum.pdf"],
      name: "RAG Collection with Sentence Window Node Parser",
      parser: {
        chunkSize: 1024,
        chunkOverlap: 20,
        parserType: "sentenceWindowNodeParser",
        windowSize: 3,
      },
      slug: "bge-large",
    });
  console.log(
    `Created RAG collection with id: ${sentenceWindowNodeParserRagCollection.id}`
  );

  console.log(
    `RAG collection: ${JSON.stringify(
      sentenceWindowNodeParserRagCollection,
      null,
      2
    )}`
  );

  await sentenceWindowNodeParserRagCollection.addFiles({
    filepaths: ["resources/Life_Kit.mp3"],
  });
  console.log(
    `RAG collection files: ${JSON.stringify(
      sentenceWindowNodeParserRagCollection.files,
      null,
      2
    )}`
  );

  const simpleNodeParserRagCollection = await gradient.createRagCollection({
    filepaths: ["resources/Lorem_Ipsum.pdf"],
    name: "RAG Collection with Simple Node Parser",
    parser: {
      chunkSize: 1024,
      chunkOverlap: 20,
      parserType: "simpleNodeParser",
    },
    slug: "bge-large",
  });
  console.log(
    `Created RAG collection with id: ${simpleNodeParserRagCollection.id}`
  );

  console.log(
    `RAG collection: ${JSON.stringify(simpleNodeParserRagCollection, null, 2)}`
  );

  await simpleNodeParserRagCollection.addFiles({
    filepaths: ["resources/Life_Kit.mp3"],
  });
  console.log(
    `RAG collection files: ${JSON.stringify(
      simpleNodeParserRagCollection.files,
      null,
      2
    )}`
  );

  await sentenceWindowNodeParserRagCollection.delete({});
  await simpleNodeParserRagCollection.delete({});
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit());
