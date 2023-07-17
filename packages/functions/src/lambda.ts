const { Client, NoAuth } = require("./whatsapp/index.js");

const client = new Client({
  puppeteer: { headless: "new" },
  authStrategy: new NoAuth(),
});

export const handler = async (event, context, callback) => {
  console.log("Starting...");
  client.on("loading_screen", (percent, message) => {
    console.log("LOADING SCREEN", percent, message);
  });
  console.log("Initialized");
  client.on("qr", (qr: string) => {
    console.log("QR RECEIVED HERE", qr);
  });

  await client.initialize();
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};

export const prova = () => {};
