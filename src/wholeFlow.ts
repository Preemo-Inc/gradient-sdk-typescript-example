import { Gradient } from "@gradientai/nodejs-sdk/src/gradient";

const main = async () => {
  const gradient = new Gradient({});
  const baseModel = await gradient.getBaseModel({
    baseModelSlug: "bloom-560m",
  });

  const newModelAdapter = await baseModel.createModelAdapter({
    name: "my test model adapter",
  });
  console.log("created model adapter with id:", newModelAdapter.id);

  await newModelAdapter.fineTune({
    samples: [{ inputs: "some training string" }],
  });
  const completeResponse = await newModelAdapter.complete({
    query: "can you tell me a story set in Faerun",
    maxGeneratedTokenCount: 100,
  });
  console.log("generated output:", completeResponse.generatedOutput);

  await newModelAdapter.delete();
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit());
