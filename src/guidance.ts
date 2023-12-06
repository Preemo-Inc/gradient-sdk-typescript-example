import { Gradient } from "@gradientai/nodejs-sdk";

const main = async () => {
  const gradient = new Gradient({});
  const baseModel = await gradient.getBaseModel({
    baseModelSlug: "nous-hermes2",
  });

  const query = "What is your favorite color? ";
  console.log(`Asking: ${query}`);

  const choices = ["red", "green", "blue"];
  console.log(`Allowed responses: ${JSON.stringify(choices)}`);

  const { generatedOutput } = await baseModel.complete({
    guidance: {
      type: "choice",
      value: choices,
    },
    query,
  });
  console.log(`Generated: ${generatedOutput}`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit());
