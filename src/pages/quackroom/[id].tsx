import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { FormEvent, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useRouter } from 'next/router'
import { Duck, DuckMessage, DuckRoom } from '@/types'
import DuckImage from '../components/duckImage'
import DuckMessageComponent from '../components/duckMessage'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
    
  const roomId = router.query.id as string
  const [messages,setMessages] = useState<DuckMessage[]>([])
  const [duckColor,setDuckColor] = useState<string>('#e9ff70')
  const [duckName,setDuckName] = useState<string>('Duck')
  const [duckId,setDuckId] = useState<string>('')
  const [roomDucks,setRoomDucks] = useState<Duck[]>([])
 
  const socketIoServer = process.env.NODE_ENV == 'development' ? 'http://localhost:3004' : 'https://socket-io-quackrooms-server-142859f50720.herokuapp.com/'
  const socket = io(socketIoServer)

  useEffect(()=>{

    if(!router.isReady){
      return
    }

    socket.connect()

    socket.on("connect", () => {
      setDuckId(socket.id)
    });

    socket.emit('joinRoom', roomId,duckName,duckColor);
    
    socket.on(`new message`,(msg:DuckMessage)=>{
      console.log(msg)
      setMessages((prevMessages) => [...prevMessages, msg]);
    })

    socket.on(`Ducks in the room`,(roomInfo:DuckRoom)=>{
      console.log(roomInfo)
      if(!roomInfo){
        return
      }else if(!roomInfo.ducks){
       return
      }else{
        setRoomDucks(roomInfo.ducks)
      }
    })

     // Clean up the socket connection when the component unmounts
     return () => {
      socket.disconnect();
    };

  },[router])

  const serverChangeDuck=async () => {
    socket.emit('duckChange',roomId,duckId,duckName,duckColor)
  }  

  const sendMessage = async (event:FormEvent) => {
    event.preventDefault()
    const message = (document.getElementById('input') as HTMLInputElement).value 
    
    const messageObj:DuckMessage = {
      text: message,
      duckName:duckName,
      roomId:roomId,
      color:duckColor
    }

    socket.emit('message', messageObj);
    (document.getElementById('input') as HTMLInputElement).value = '' 

  }

function DuckListItem(props:Duck){
  return(
    <div className={styles.duckListItem}>
        <div className={styles.duckIcon}>
            <DuckImage color={props.color} duckName={props.duckName} duckId={''}/>
        </div>
        <div className={styles.duckInfo}>
          <h4>{props.duckName}</h4>
        </div>
      </div>
  )
}

  return (
    <> 
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <main>
     <div className={styles.duckEditorContainer}>
      <div className={styles.duckImageContainer}>
        <DuckImage color={duckColor} duckName={''} duckId={''}/>
      </div>
      <div className={styles.duckEditor}>
        <h3>Your Duck</h3>
        <h4>{duckId}</h4>
        <label htmlFor="duckColor">Duck color</label>
        <p>{duckColor}</p>
        <input type="color" id="duckColor" onChange={(e)=>setDuckColor(e.target.value)} onBlur={()=>serverChangeDuck()} defaultValue={duckColor}></input>
        <label htmlFor="duckName">Duck Name: </label>
        <input type="text" id="duckName" onChange={(e)=>setDuckName(e.target.value)} onBlur={()=>serverChangeDuck()} defaultValue={'Duck'}></input>
      </div>
     </div>
     <div className={styles.duckList}>
      <h3>Online Ducks</h3>
      {
        
      roomDucks.map((duck)=>{
        return <DuckListItem key={`${duck.duckId}-${duck.color}-${duck.duckName}`} duckName={duck.duckName} color={duck.color} duckId={duck.duckId}/>
      })
      }
     </div>
     <div className={styles.messagesContainer}>
      {messages.map((message,index)=>{
        return (
          <DuckMessageComponent key={index} text={message.text} roomId={''} duckName={message.duckName} color={message.color}/>
        )
      })}
     </div>
      <form id="form" action="" onSubmit={(e)=>sendMessage(e)}>
        <input id="input" autoComplete="off" /><button type='submit'>Send</button>
      </form>
     </main>
    </>
  )
}
