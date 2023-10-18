// import './globals.css'
// "use client"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Online Judge',
  description: 'Online Coding platform by AppPerfect',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="smlogo.png" ></link>
      <head><meta name="viewport" content="initial-scale=1, width=device-width" />
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
<link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@200;400&family=Tilt+Prism&family=Young+Serif&display=swap" rel="stylesheet"></link>
      </head>
  
      <body className={inter.className}>{children}</body>
    </html>
  )
}
