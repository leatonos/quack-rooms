// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, ObjectId, ServerApiVersion, } from 'mongodb';
//const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.NEXT_PUBLIC_MONGODB_URI as string
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

async function run(roomId: string) {

  const client = new MongoClient(uri);

  try {

   const database = client.db('QuackChat')
   const roomCollection = database.collection('QuackRooms')

   const query = {_id:new ObjectId(roomId)}
   
   const result = await roomCollection.findOne(query)
   console.log(result)
   return result 
  } catch (error) {
    console.error('Error:', error);
  }
}

type Data = {
  name: string
}

export default  async function handler(req: NextApiRequest,res: NextApiResponse
){
   
  const mongoResult =  await run(req.body.roomId)
  
  res.status(200).json(mongoResult)
}
