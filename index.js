const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())


const uri = "mongodb+srv://ApuSaha:JsiUM6jGPcdQkNmp@cluster0.gnqpnrf.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const songCollection = client.db("prityDb").collection("song")
        app.get('/song', async (req, res) => {
            const cursor = songCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })
        app.post('/song', async (req, res) => {
            const song = req.body
            console.log(song);
            const result = await songCollection.insertOne(song);
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('welcome to priti server')
})
app.listen(port, () => {
    console.log(`Priti app listening on port ${port}`);
})