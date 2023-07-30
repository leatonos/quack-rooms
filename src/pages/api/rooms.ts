// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, ServerApiVersion, } from 'mongodb';
//const { MongoClient, ServerApiVersion } = require('mongodb');

const uri ='mongodb+srv://pedro:1CuYmShxJMsz23fj@cluster0.alojs.mongodb.net/?retryWrites=true&w=majority'
// Create a MongoClient with a MongoClientOptions object to set the Stable API version




async function run() {

  const client = new MongoClient(uri);

  try {

   const database = client.db('QuackChat')
   const roomCollection = database.collection('QuackRooms')

   const query = {password:''}
   const cursor = roomCollection.find(query)
   
   if ((await roomCollection.countDocuments(query)) === 0) {
    console.warn("No documents found!");
    }
  
    const result = await cursor.toArray()

    return result
    
  } finally {
    client
    // Ensures that the client will close when you finish/error
    await client.close();
   
    
  }
}
run().catch(console.dir);

type Data = {
  name: string
}

export default  async function handler(req: NextApiRequest,res: NextApiResponse
){
  const mongoResult =  await run()

  const jsonBody = {result:'hi'}

  res.status(200).json(mongoResult)
}