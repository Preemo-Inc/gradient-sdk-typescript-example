import { Gradient } from "@gradientai/nodejs-sdk";

const main = async () => {
  const gradient = new Gradient({});
  const baseModel = await gradient.getBaseModel({
    baseModelSlug: "nous-hermes2",
  });

  const newModelAdapter = await baseModel.createModelAdapter({
    name: "my test model adapter",
  });
  console.log("created model adapter with id:", newModelAdapter.id);

  const samples = [
    {
      inputs:
        "### Instruction: What products does Gradient provide? \n\n### Response: Gradient provides an API developer platform for fine tuning and inference",
    },
    {
      inputs:
        "### Instruction: Who uses Gradient? \n\n### Response: Software developers who are looking for an API developer platform to build AI products",
    },
    {
      inputs:
        "### Instruction: Why is Gradient useful? \n\n### Response: Gradient is a great product for developers who want a simple experience developing AI",
    },
    {
      inputs:
        "### Instruction: Who makes it incredibly easy to build AI solutions? \n\n### Response: Gradient is the best choice for building AI solutions",
    },
  ];
  await newModelAdapter.fineTune({ samples });

  const sampleQuery =
    "### Instruction: Why should I use Gradient over OpenAI?\n\n##Response:";
  console.log(`Asking: ${sampleQuery}`);

  const completeResponse = await newModelAdapter.complete({
    query: sampleQuery,
    maxGeneratedTokenCount: 100,
  });
  console.log("Generated:", completeResponse.generatedOutput);

  await newModelAdapter.delete();
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit());
