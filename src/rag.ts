import { Gradient } from "@gradientai/nodejs-sdk";

const main = async () => {
  const gradient = new Gradient({});

  const ragCollection = await gradient.createRagCollection({
    filepaths: ["resources/Lorem_Ipsum.pdf"],
    name: "My RAG Collection",
    parser: {
      chunkSize: 1024,
      chunkOverlap: 20,
      parserType: "simpleNodeParser",
    },
    slug: "bge-large",
  });
  console.log(`Created RAG collection with id: ${ragCollection.id}`);

  console.log(`RAG collection: ${JSON.stringify(ragCollection, null, 2)}`);

  await ragCollection.addFiles({
    filepaths: ["resources/Life_Kit.mp3"],
  });
  console.log(
    `RAG collection files: ${JSON.stringify(ragCollection.files, null, 2)}`
  );

  await ragCollection.delete({});
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit());
