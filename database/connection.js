const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const run = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ping: 1});
  } finally{
    await client.close();
  }
}
run().catch(console.dir);
