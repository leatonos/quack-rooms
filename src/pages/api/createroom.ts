// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, ServerApiVersion, } from 'mongodb';
//const { MongoClient, ServerApiVersion } = require('mongodb');

const uri ='mongodb+srv://pedro:1CuYmShxJMsz23fj@cluster0.alojs.mongodb.net/?retryWrites=true&w=majority'
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

async function createRoom(newRoomName: string,newRoomLimit:number) {

  const client = new MongoClient(uri);

  try {

   const database = client.db('QuackChat')
   const roomCollection = database.collection('QuackRooms')

   const newRoom = await roomCollection.insertOne({
    password:'',
    ducks: [{duckName:'Duck',color:'#c9b93a'}],
    roomName: newRoomName,
    limit:newRoomLimit
   })
   
   //console.log(`new room created name: ${newRoomName} with Id:${newRoom.insertedId}`)
   return newRoom.insertedId

  } finally {
    client
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

type Data = {
  name: string
}

export default  async function handler(req: NextApiRequest,res: NextApiResponse
){

  const { roomName } = JSON.parse(req.body);
  const { roomLimit } = JSON.parse(req.body);

  const mongoResult = req.body
  const id = await createRoom(roomName,roomLimit)
  console.log(id)

  res.status(200).json({newRoomId:id})
}
