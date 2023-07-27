async function getAllUsers() {
    try {
      await client.connect();
      const database = client.db("user");
      const collection = database.collection("users");
      const data = await collection.findAll({}).toArray();
      await client.close();
      return data;
    } catch (error) {
      console.log("Error fetching data from the database", error);
      throw error;
    }
  }

  app.get("/", async (req, res) => {
    try {
      const data = await getAllUsers();
      console.log(data);
      res.json(data);
    } catch (error) {
      console.error("Error handling GET request", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });