import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { FormEvent, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useRouter } from 'next/router'
import { DuckMessage } from '@/types'
import DuckImage from '../components/duckImage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
    
  const roomId = router.query.id as string
  const [messages,setMessages] = useState<DuckMessage[]>([])
  const [isJoined, setIsJoined] = useState(false);
  const [duckColor,setDuckColor] = useState<string>('#e9ff70')
  const [duckName,setDuckName] = useState<string>('Duck')
  const socket = io('http://localhost:3001')



  useEffect(()=>{

    socket.connect()
    socket.emit('joinRoom', roomId,duckName,duckColor);
    console.log('userConnected')

    if(!router.isReady){
        return
    }



    
    
    socket.on(`new message`,(msg:DuckMessage)=>{
      console.log(msg)
      setMessages((prevMessages) => [...prevMessages, msg]);
    })

    socket.on(`changeDuck:`,(duck)=>{
     console.log('A duck changed color or name')
    })

     // Clean up the socket connection when the component unmounts
     return () => {
      socket.disconnect();
    };

  },[router,isJoined])


  const serverChangeDuckColor=async (roomCode:string,duckColor:string,duckNumber:number) => {
    socket.emit('changeDuck')
  }  

  const sendMessage = async (event:FormEvent) => {
    event.preventDefault()
    const message = (document.getElementById('input') as HTMLInputElement).value 
    
    const messageObj:DuckMessage = {
      text: message,
      sender:duckName,
      roomId:roomId
    }

    socket.emit('message', messageObj);
    (document.getElementById('input') as HTMLInputElement).value = '' 

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
        <DuckImage color={duckColor} duckName={''}/>
      </div>
      <div className={styles.duckEditor}>
      <h3>Your Duck</h3>
        <label htmlFor="duckColor">Duck color </label>
        <input type="color" id="duckColor" onChange={(e)=>setDuckColor(e.target.value)} onBlur={()=>serverChangeDuckColor(roomId,duckColor,0)} defaultValue={duckColor}></input>
        <label htmlFor="duckName">Duck Name: </label>
        <input type="text" id="duckName" onBlur={(e)=>setDuckName(e.target.value)} defaultValue={'Duck'}></input>
      </div>
     </div>
     <ul id="messages">
      {messages.map((message,index)=>{
        return (
          <li key={index}>{message.sender}: {message.text}</li>
        )
      })}
     </ul>
      <form id="form" action="" onSubmit={(e)=>sendMessage(e)}>
        <input id="input" autoComplete="off" /><button type='submit'>Send</button>
      </form>
     </main>
    </>
  )
}
