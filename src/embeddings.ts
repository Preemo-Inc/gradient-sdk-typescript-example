import { Gradient } from "@gradientai/nodejs-sdk";

const main = async () => {
  const gradient = new Gradient({});

  const embeddingsModel = await gradient.getEmbeddingsModel({
    slug: "bge-large",
  });

  const { embeddings } = await embeddingsModel.generateEmbeddings({
    inputs: [
      {
        input:
          "Multimodal brain MRI is the preferred method to evaluate for acute ischemic infarct and ideally should be obtained within 24 hours of symptom onset, and in most centers will follow a NCCT",
      },
      {
        input:
          "CTA has a higher sensitivity and positive predictive value than magnetic resonance angiography (MRA) for detection of intracranial stenosis and occlusion and is recommended over time-of-flight (without contrast) MRA",
      },
      {
        input:
          "Echocardiographic strain imaging has the advantage of detecting early cardiac involvement, even before thickened walls or symptoms are apparent",
      },
    ],
  });

  for (const { embedding } of embeddings) {
    console.log(`created embedding: ${JSON.stringify(embedding, null, 2)}`);
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit());
