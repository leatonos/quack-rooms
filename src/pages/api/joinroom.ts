// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, ObjectId, ServerApiVersion, WithId, } from 'mongodb';
import { Duck } from '@/types';
//const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

type DuckRoom = {
    _id: ObjectId;
    password:string;
    ducks:Duck[]
    roomName:string;
    limit:number
}

async function joinRoom(roomId:string) {

  const client = new MongoClient(uri);

  try {

   

    const database = client.db('QuackChat')
    const roomCollection = database.collection('QuackRooms')

    const duckRoomInfo = await roomCollection.findOne<DuckRoom>(
        {_id: new ObjectId(roomId)},
    )

    if(!duckRoomInfo){
        return 'Room not found'
    }

    const duckLimit = duckRoomInfo?.limit as number
    const numberOfDucks = duckRoomInfo?.ducks.length as number

    if(numberOfDucks >= duckLimit){
        return 'Full Room'
    }

    const newDuck = {
            duckName:'Duck',
            color:'#c9b93a'
        }
    
    await roomCollection.updateOne(
        { _id: new ObjectId(roomId) },
            {
                $push: { ducks:  newDuck},
            },
        { upsert: true }

        
    );

    const duckNumber = await roomCollection.findOne<DuckRoom>(
        {_id: new ObjectId(roomId)},
    ) as DuckRoom

    return(duckNumber.ducks.length-1)


  } finally {
    client
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest,res: NextApiResponse){

    const { roomId } = JSON.parse(req.body);

    const duckRoomResponse = await joinRoom(roomId)

  res.status(200).json({result:duckRoomResponse})
}
