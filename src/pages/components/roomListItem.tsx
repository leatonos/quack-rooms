

import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { FormEvent, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DuckRoom,Duck } from '@/types'

const inter = Inter({ subsets: ['latin'] })

interface roomInfo{
    roomInfo:DuckRoom
}

export default function RoomListItem(props:DuckRoom) {

    const router = useRouter()
    const duckRoomName = props.roomName
    const ducks = props.ducks as Duck[]
    const numberOfDucks = () =>{
      if(ducks === undefined){
        return 0
      }else{
        return ducks.length
      }
    }
    const limitOfDucks = props.limit

  return (
    <div onClick={()=>router.push(`/quackroom/${props._id}`)}  className={styles.roomListItem}>
        <div className={styles.roomNameContainer}>
        <h2>{duckRoomName}</h2>
        </div>
        <div className={styles.roomParticipantCounterContainer}>
        {`${numberOfDucks()}/${limitOfDucks}`}
        </div>
        <div></div>
    </div>
  )
}