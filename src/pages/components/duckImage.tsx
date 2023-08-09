

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
    <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 135 135">
<g>
	<ellipse cx="89.6" cy="44" rx="8.5" ry="7.6"/>
</g>
<g>
	<path style={{fill:props.color}} d="M63.1,125.1c52.6,0,40.3-38.7,34.3-52.3c-0.7-1.9-0.4-4,0.9-5.5c2-2.1,3.4-4.7,4.4-7.5
		c12.4-1.5,15.1-7.7,14.7-12.5c0-1.5-1.2-2.6-2.7-2.5c-4.4,0.4-8.3,0.2-11-0.2C101.7,32.8,91,23.9,78.6,25.3
		c-10.8,1.1-19.7,10.2-21.1,21.5c-1.1,8.7,2,16.6,7.3,21.9c2.5,2.5,1.8,6.8-1.2,8.1c-3,1.3-7.6,2.1-14.4,2.1
		c-10.8,0-17.4-4-21.1-7.9c-2.7-2.8-7.5-1.3-8.3,2.5C15.2,91.3,13.2,125.1,63.1,125.1z M89.6,38.5c2.8,0,5.2,2.5,5.2,5.5
		c0,3-2.3,5.5-5.2,5.5c-2.8,0-5.2-2.5-5.2-5.5C84.4,40.9,86.7,38.5,89.6,38.5z"/>
</g>
<g>
	<path style={{fill:'none'}} d="M96.3,19.9c-2.9,1.1-7.3,0.3-9.5-1.7l-5.7-6.3l-5.7,6.3c-2.2,2.1-6.6,2.9-9.5,1.8c0,0-0.1,0-0.1-0.1l-5.1-3.6
		l1.2,19.2h38.5l1.2-19.2l-5.1,3.6C96.4,19.9,96.3,19.9,96.3,19.9z"/>
</g>
</svg>
 
  )
}