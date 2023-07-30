

import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { FormEvent, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Duck, DuckRoom } from '@/types'

const inter = Inter({ subsets: ['latin'] })

export default function DuckImage(props:Duck) {


  return (
    <svg version="1.1" x="0px" y="0px" viewBox="0 0 120 120" >
 
 <g id="Layer_1">
   <ellipse cx="87.08" cy="27.43" rx="9.32" ry="9.35"/>
 </g>
 <g id="Layer_2">
  <path className="st0" style={{fill: props.color}} d="M56.72,111.76c57.84,0,44.36-40.21,37.71-54.33c-0.78-1.96-0.39-4.12,0.98-5.69c2.15-2.16,3.71-4.9,4.88-7.84
     c13.68-1.57,16.61-8.04,16.22-12.94c0-1.57-1.37-2.75-2.93-2.55c-4.88,0.39-9.18,0.2-12.11-0.2C99.12,15.86,87.4,6.64,73.72,8.01
     C61.8,9.19,52.03,18.6,50.47,30.37c-1.17,9.02,2.15,17.26,8.01,22.75c2.74,2.55,1.95,7.06-1.37,8.43
     c-3.32,1.37-8.4,2.16-15.83,2.16c-11.92,0-19.15-4.12-23.25-8.24c-2.93-2.94-8.21-1.37-9.18,2.55
     C3.96,76.66,1.81,111.76,56.72,111.76z M85.83,21.74c3.13,0,5.67,2.55,5.67,5.69s-2.54,5.69-5.67,5.69c-3.13,0-5.67-2.55-5.67-5.69
     C80.17,24.29,82.71,21.74,85.83,21.74z"/>
 </g>
 </svg>
 
  )
}