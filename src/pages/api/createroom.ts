// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, ServerApiVersion, } from 'mongodb';
//const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.NEXT_PUBLIC_MONGODB_URI as string
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

async function createRoom(newRoomName: string,newRoomLimit:number,password:string) {

  const client = new MongoClient(uri);

  try {

   const database = client.db('QuackChat')
   const roomCollection = database.collection('QuackRooms')

   const newRoom = await roomCollection.insertOne({
    password:password,
    ducks: [],
    roomName: newRoomName,
    limit:newRoomLimit
   })
   
   //console.log(`new room created name: ${newRoomName} with Id:${newRoom.insertedId}`)
   return newRoom.insertedId.toString()

  } finally {
    client
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest,res: NextApiResponse
){

  const { roomName, password, limit } = req.body;

  const mongoResult = req.body
  const id = await createRoom(roomName,limit,password)
  console.log(id)

  res.status(200).json({newRoomId:id})
}
