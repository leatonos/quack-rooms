

import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Duck, DuckMessage, DuckRoom } from '@/types'
import styles from '@/styles/Home.module.css'
import DuckImage from './duckImage'
import DuckKingImage from '../../../public/duck-server.svg'

const inter = Inter({ subsets: ['latin'] })

export default function DuckMessageComponent(props:DuckMessage) {

  let duckImageResult:any;

  
  if(props.color == 'Server'){
    duckImageResult = <Image className={styles.messageDuckImage} src={DuckKingImage} alt={'This is the duck king'}/>
  }else{
   
  }

  return (
    <div className={styles.messageContainer}>
        <div className={styles.messageTextContainer}>
          <div className='speech-bubble-left'>
            <p>{props.text}</p>
          </div>
        </div>
      <div className={styles.messageDuckIconContainer}>
        <div className={styles.duckPortrait}>
           <DuckImage duckId={''} duckName={''} color={props.color}/>
        </div>
        <h4 className={styles.messageDuckName}>{props.duckName}</h4>
      </div>
    </div>
  )
}