import { Configuration, ModelsApi } from "@gradientai/nodejs-sdk";

async function main() {
  const configuration = new Configuration({
    accessToken: process.env.GRADIENT_ACCESS_TOKEN,
  });

  const modelsApi = new ModelsApi(configuration);
  const models = await modelsApi.listModels({
    xGradientWorkspaceId: process.env.GRADIENT_WORKSPACE_ID!,
  });

  if (models.status !== 200) {
    throw new Error("Failed to list models");
  }

  console.log(models.data);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit());
