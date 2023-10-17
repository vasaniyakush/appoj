'use client'
import Image from "next/image";
import styles from "./page.module.css";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import CodeIcon from '@mui/icons-material/Code';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';

import CodeMirror from '@uiw/react-codemirror';
// import '../node_modules/codemirror/';
// import 'codemirror/theme/monokai.css';
const code = 'print("hello world")';


import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Drawer,
  IconButton,
  Menu,
  Select,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { problem } from "@/components/problem";
import { useState } from "react";
export default function Home() {

  const [lang,setLang] = useState("cpp");
  return (
    <>
      <AppBar  position="sticky"
      sx={
        {
          height:"3rem",
          display:"flex",
          flexDirection:"row",
        }
      }
      >
        <Box component="img" src="logo.svg" sx={{
          height:"80%",
          alignSelf:"center",
          ml:1
          
        }}>
          </Box>

          <CodeIcon fontSize="large" sx={{
            alignSelf:"center",
            ml:"auto",
            mr:1
          }}/>

        <Typography Typography variant="h4" sx={{
          alignSelf:"center",
          
          mr:1,
          fontFamily:"Young Serif"
        }} >
          AppPerfectOJ
        </Typography>
          <CodeIcon fontSize="large" sx={{
            alignSelf:"center",
            mr:1,
          
          }}/>

        
      
      
        
      </AppBar>
      <Container  maxWidth="false" sx={{
        mt:1,
        display:"flex",
        flexDirection:"row"
      }}>
      <Box sx={{ bgcolor: '#cfe8fc',  width:"50%", height: '100vh',mr:0 }} />
      <Container  maxWidth="false" sx={{
        m:0,
        display:"flex",
        width:"50%",
        flexDirection:"column"
      }}>
        <Container  maxWidth="false" sx={{
        m:1,
        mr:0,
        // ml:0,
        display:"flex",
        flexDirection:"row"
      }}>
        {/* <Select>Language</Select> */}
        <Button sx={{ml:"auto"}} variant="outlined">Run</Button>
        <Button sx={{ ml:1, alignSelf:"flex-end"}} variant="contained">Submit</Button>
      </Container>
      <Box sx={{ bgcolor: '#cfe8fc',  width:"100%", height: '100%', ml:1 }} >
      <CodeMirror
          value={code}
          options={{
          theme: 'monokai',
          keyMap: 'sublime',
          mode: 'python',
          }}
          />
      </Box>
      </Container>
      </Container>
    </>
  );
}
