import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { FormEvent, useEffect, useState } from 'react'
import { DuckMessage, DuckRoom } from '@/types'
import { useRouter } from 'next/router'
import { io } from 'socket.io-client'
import RoomListItem from './components/roomListItem'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  const [rooms,setRooms] = useState<any[]>([])
  const [showRoomCreator,setRoomCreator] = useState<boolean>(false)
  const [messages,setMessages] = useState<DuckMessage[]>([])

  
  const router = useRouter()
  const socketIoServer = process.env.NODE_ENV == 'development' ? 'http://localhost:3004' : 'https://socket-io-quackrooms-server-142859f50720.herokuapp.com/'
  const socket = io(socketIoServer,{
    withCredentials: false
  })

  useEffect(()=>{

  socket.connect();

  socket.on("connect", () => {
    console.log(socket.id)
    socket.emit('getRooms',socket.id)
  });
  

  socket.on('activeRooms', (activeRooms) => {
    setRooms(activeRooms)
    console.log(activeRooms)
    // Use the 'activeRooms' array as needed in your client-side code
  });

  socket.on('roomCreated', (roomId) => {
    console.log("Room created", roomId)
    //
  });

  return () =>{
   socket.disconnect();
  }

  },[])


  
  function RoomCreator(){
    
    const createRoom = async(e:FormEvent) =>{

      e.preventDefault()

      const roomName = (document.getElementById('newRoomName') as HTMLInputElement).value
      const roomLimit = (document.getElementById('roomLimit') as HTMLInputElement).value
      const password = ''
      const requestData = {
        roomName: roomName,
        password: password,
        limit: roomLimit,
      };


      //Create a room using these parameters: roomId,roomName,limit
      
      try {
        const response = await fetch('/api/createroom', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
  
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData)
          socket.emit('createRoom')
          router.push(`quackroom/${responseData.newRoomId}`)
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }



    }
   
  if(!showRoomCreator){ return }
  
    return(
      <div className='fullScreenCover'>
        <div className={styles.roomCreatorContainer}>
          <div className={styles.roomCreatorContainerHeader}>
            <h2>Create Room</h2>
            <form onSubmit={createRoom}>
              <div>
                <label htmlFor='newRoomName'>Room Name:</label>
                <input type='text' id='newRoomName' defaultValue={'Quack room'}></input>
              </div>              
              <div>
                <label htmlFor='roomLimit'>Room Limit</label>
                <input type='number' id='roomLimit' max={12} min={1} defaultValue={4}></input>
              </div>
              <div>
                <button className={styles.createRoomBtn} type='submit'> Create Room </button>
                <button className={styles.cancelCreateBtn} type='button' onClick={()=>setRoomCreator(false)}>Cancel</button>
              </div>              
            </form>
          </div>
        </div>
      </div>
    )
  }


  return (
    <>
      <Head>
        <title>Welcome to the quack rooms</title>
        <meta name="description" content="A chat room where you can quack to your friends" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <RoomCreator/>
     <main>
      <div className={styles.mainContainer}>
        <h1>Welcome to the Quackrooms</h1>
        <button className={styles.createRoomBtn} onClick={()=>setRoomCreator(true)}> Create Room </button>
        <div className={styles.roomListContainer}>
          
        {
          rooms.map((room)=>{
            return <RoomListItem key={`${room._id}${room.ducks}`} ducks={room.ducks} roomId={room._id} roomName={room.roomName} limit={room.limit} />
          })
        }

        </div>
      </div>
     </main>
    </>
  )
}