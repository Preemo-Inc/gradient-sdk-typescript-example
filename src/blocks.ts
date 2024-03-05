import { Gradient } from "@gradientai/nodejs-sdk";
import {
  AnalyzeSentimentParams,
  ExtractParams,
  SummarizeParams,
} from "@gradientai/nodejs-sdk/dist/cjs/types";

const runAnswerExample = async ({
  gradient,
}: {
  gradient: Gradient;
}): Promise<void> => {
  const document =
    "When Apple released the Apple Watch in 2015, it was business " +
    "as usual for a company whose iPhone updates had become cultural " +
    "touchstones. Before the watch went on sale, Apple gave early " +
    "versions of it to celebrities like Beyoncé, featured it in fashion " +
    "publications like Vogue and streamed a splashy event on the internet " +
    "trumpeting its features.";
  const question = "How was the Apple watch marketed?";

  console.log("==== Q & A ====");
  console.log(`Document: ${document}\n`);
  console.log(`Question: ${question}\n`);

  console.log("Answering question...");
  const { answer } = await gradient.answer({
    question,
    source: {
      type: "document",
      value: document,
    },
  });
  console.log(`Answer: ${answer}`);
  console.log("================\n");
};

const runSummarizeExample = async ({
  gradient,
}: {
  gradient: Gradient;
}): Promise<void> => {
  const document =
    "In the days ahead of the Vision Pro's launch, Apple has heavily promoted some of the apps " +
    "destined for its spatial computing headset. Download Disney Plus and watch movies from " +
    "Tatooine! Slack and Fantastical and Microsoft Office on your face! FaceTime with your " +
    "friends as a floating hologram! But it's increasingly clear that the early success of " +
    "the Vision Pro, and much of the answer to the question of what this headset is actually " +
    "for, will come from a single app: Safari.\n\nThat's right, friends. Web browsers are " +
    "back. And Apple needs them more than ever if it wants this $3,500 face computer to be a " +
    "hit. Embracing the web will mean threatening the very things that have made Apple so " +
    "powerful and so rich in the mobile era, but at least at first, the open web is Apple's " +
    "best chance to make its headset a winner. Because at least so far, it seems developers " +
    "are not exactly jumping to build new apps for Apple's new platform.";

  const examples = [
    {
      document:
        "Historically, Apple is unmatched in its ability to get app makers to keep up with its " +
        "newest stuff. When it releases features for iPhones and iPads, a huge chunk of the App " +
        "Store supports those features within a few weeks. But so far, developers appear to be " +
        "taking their Vision Pro development slowly. Exactly why varies across the App Store, " +
        "but there are a bunch of good reasons to choose from. One is just that it's a new " +
        "platform with new UI ideas and usability concerns on a really expensive device few " +
        "people will have access to for a while. Sure, you can more or less tick a box and port " +
        "your iPad app to the Vision Pro, but that may not be up to everyone's standards.",
      summary:
        "Apple typically releases hardware first with app support added over a few weeks. " +
        "However, fewer developers are supporting the Vision Pro over the first few weeks of " +
        "its release.",
    },
  ];

  console.log("==== Document Summary (with examples) ====");
  console.log(`Document: ${document}\n`);
  console.log(`Examples: ${JSON.stringify(examples, null, 2)}\n`);

  console.log("Summarizing document...");
  const resultWithExamples = await gradient.summarize({
    document,
    examples,
  });
  console.log(`Summary: ${resultWithExamples.summary}`);
  console.log("================\n");

  const length: SummarizeParams["length"] = "medium";

  console.log("==== Document Summary (with length) ====");
  console.log(`Document: ${document}\n`);
  console.log(`Length: ${length}\n`);

  console.log("Summarizing document...");
  const resultWithLength = await gradient.summarize({
    document,
    length: "long",
  });
  console.log(`Summary: ${resultWithLength.summary}`);
  console.log("================\n");
};

const runAnalyzeSentimentExample = async ({
  gradient,
}: {
  gradient: Gradient;
}): Promise<void> => {
  const document =
    "Spotify has been railing against Apple's 30 percent cut of in-app purchases for years.";
  const examples: AnalyzeSentimentParams["examples"] = [
    {
      document:
        "Netflix got a sweetheart deal from Apple years ago to share only 15 percent of revenue" +
        "but has recently been refusing to participate in the Apple TV app's discovery feature" +
        "and has long since stopped allowing you to subscribe to Netflix from your iOS device. ",
      sentiment: "negative",
    },
    {
      document:
        "Over the last decade or so, we've all stopped opening websites and started tapping app " +
        "icons, but the age of the URL might be coming back.",
      sentiment: "positive",
    },
  ];

  console.log("==== Sentiment Analysis ====");
  console.log(`Document: ${document}\n`);
  console.log(`Examples: ${JSON.stringify(examples, null, 2)}\n`);

  console.log("Analyzing sentiment...");
  const { sentiment } = await gradient.analyzeSentiment({
    document,
    examples,
  });
  console.log(`Sentiment: ${sentiment}`);
  console.log("================\n");
};

const runPersonalizeExample = async ({
  gradient,
}: {
  gradient: Gradient;
}): Promise<void> => {
  const document =
    "Harry Potter fans have been eagerly anticipating Hogwarts Legacy since the game was " +
    "first revealed in 2020, and unfortunately, it's been a long wait to play the game. " +
    "Hogwarts Legacy was originally supposed to launch in 2021, but then its release date " +
    "was pushed back to 2022. For months, fans have been anticipating a holiday 2022 " +
    "release date for the game, but now Hogwarts Legacy has been delayed yet again, pushed " +
    "back to 2023. With Hogwarts Legacy getting its own State of Play presentation earlier " +
    "this year, it seemed like the game was on track to meet its planned 2022 release date. " +
    "After all, the Hogwarts Legacy gameplay footage shown during the State of Play looked " +
    "quite impressive, indicating that the game's development was going well and nearing " +
    "its end point.";

  const audienceDescription =
    "Someone who loves playing action-adventure RPGs.";

  console.log("==== Personalization ====");
  console.log(`Document: ${document}\n`);
  console.log(`Audience Description: ${audienceDescription}\n`);

  console.log("Personalizing document...");
  const { personalizedDocument } = await gradient.personalize({
    document,
    audienceDescription,
  });
  console.log(`Personalized document: ${personalizedDocument}`);
  console.log("================\n");
};

const runExtractExample = async ({
  gradient,
}: {
  gradient: Gradient;
}): Promise<void> => {
  const document =
    "When Apple released the Apple Watch in 2015, it was business as usual for " +
    "a company whose iPhone updates had become cultural touchstones. Before the " +
    "watch went on sale, Apple gave early versions of it to celebrities like Beyoncé, " +
    "featured it in fashion publications like Vogue and streamed a splashy event on " +
    "the internet trumpeting its features.";

  const schema: ExtractParams["schema"] = {
    company: { type: "string" },
    product: { type: "string" },
    magazine: { type: "string" },
    singer: { type: "string" },
  };

  console.log("==== Entity Extraction ====");
  console.log(`Document: ${document}\n`);
  console.log(`Schema: ${JSON.stringify(schema, null, 2)}\n`);

  console.log("Extracting entity from document...");
  const { entity } = await gradient.extract({
    document,
    schema,
  });
  console.log(`Entity: ${JSON.stringify(entity, null, 2)}`);
  console.log("================\n");
};

const runExtractPdfExample = async ({
  gradient,
}: {
  gradient: Gradient;
}): Promise<void> => {
  const filepath = "resources/Lorem_Ipsum.pdf";
  console.log("==== PDF Extraction ====");
  console.log(`Filepath: ${filepath}\n`);

  console.log("Extracting content from the PDF...");
  const { pages, text } = await gradient.extractPdf({ filepath });

  console.log(`Text: ${text}`);
  console.log(`Pages: ${JSON.stringify(pages, null, 2)}`);
  console.log("================\n");
};

const main = async () => {
  const gradient = new Gradient({});

  await runAnswerExample({ gradient });
  await runSummarizeExample({ gradient });
  await runAnalyzeSentimentExample({ gradient });
  await runPersonalizeExample({ gradient });
  await runExtractExample({ gradient });
  await runExtractPdfExample({ gradient });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit());
