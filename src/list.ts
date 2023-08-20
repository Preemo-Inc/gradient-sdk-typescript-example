import { Configuration, ModelsApi } from "@gradientai/nodejs-sdk";

async function main() {
  const configuration = new Configuration({
    accessToken: process.env.GRADIENT_ACCESS_TOKEN,
    basePath: process.env.GRADIENT_API_URL,
  });

  const modelsApi = new ModelsApi(configuration);
  const models = await modelsApi.listModels({
    onlyBase: false,
    xPreemoWorkspaceId: process.env.GRADIENT_WORKSPACE_ID!,
  });

  if (models.status !== 200) {
    throw new Error("Failed to list models");
  }

  console.log(models.data);
}

main().catch(console.error).then(console.log);
