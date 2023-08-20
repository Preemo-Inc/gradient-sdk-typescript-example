import { Configuration, ModelsApi } from "@gradientai/nodejs-sdk";

async function main() {
  const configuration = new Configuration({
    accessToken: process.env.GRADIENT_API_KEY,
  });

  const modelsApi = new ModelsApi(configuration);
  const models = await modelsApi.listModels({
    onlyBase: false,
    xGradientWorkspaceId: process.env.GRADIENT_WORKSPACE_ID!,
  });

  if (models.status !== 200) {
    throw new Error("Failed to list models");
  }

  console.log(models.data);
}

main().catch(console.error).then(console.log);
