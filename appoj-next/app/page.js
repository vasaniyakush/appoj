"use client";
import Image from "next/image";
import styles from "./page.module.css";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import CodeIcon from "@mui/icons-material/Code";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";

import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import AceEditor from "react-ace";
import axios from "axios";
import "brace/mode/c_cpp";
import "brace/mode/java";
import "brace/mode/python";
import "brace/theme/monokai";

import { useState } from "react";
import useLocalStorage from "@/customhook/useLocalStorage";
import Problem from "@/components/problem";
import { defaultCode, langs } from "@/constants";

export default function Home() {
  const [lang, setLang] = useState(langs[0]);
  const [selectVal,setSelectVal] = useState(1)
  const [cCode,setCCode] = useLocalStorage("C",defaultCode.C)
  const [cppCode,setCPPCode] = useLocalStorage("CPP",defaultCode.CPP)
  const [javaCode,setJavaCode] = useLocalStorage("JAVA",defaultCode.JAVA)
  const [pyCode,setPyCode] = useLocalStorage("PYTHON",defaultCode.PYTHON)
  const [code,setCode] = useLocalStorage("CODE",cppCode)
  const availableCodes = [cCode,cppCode,javaCode,pyCode]
  const availableSetCodes = [setCCode,setCPPCode,setJavaCode,setPyCode]
  const [fontSize,setFontSize] = useLocalStorage("fontsize",20)

  
  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          height: "3rem",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* <Box
          component="img"
          src="smlogo.png"
          sx={{
            height: "80%",
            alignSelf: "center",
            ml: 1,
          }}
        ></Box> */}
        <Box
          component="img"
          src="logo.svg"
          sx={{
            height: "80%",
            alignSelf: "center",
            ml: 1,
          }}
        ></Box>

        <CodeIcon
          fontSize="large"
          sx={{
            alignSelf: "center",
            ml: "auto",
            mr: 1,
          }}
        />

        <Typography
          
          variant="h4"
          sx={{
            alignSelf: "center",

            mr: 1,
            fontFamily: "Young Serif",
          }}
        >
          Online Judge
        </Typography>
        <CodeIcon
          fontSize="large"
          sx={{
            alignSelf: "center",
            mr: 1,
          }}
        />
      </AppBar>
      <Container
        maxWidth="false"
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{  width: "40%", height: "100vh", mr: 0 }}
        >
          <Problem />
          </Box>
        <Container
          maxWidth="false"
          sx={{
            m: 0,
            display: "flex",
            width: "60%",
            flexDirection: "column",
          }}
        >
          <Container
            maxWidth="false"
            sx={{
              m: 1,
              mr: 0,
              // ml:0,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <FormControl variant="filled"
              sx={{
                minWidth: "120px",
                m:0  
              }}
            >
              <InputLabel id="demo-simple-select-label">Language</InputLabel>
              <Select defaultValue={1}
                
                onChange={(e)=>{
                  console.log(lang);
                  setLang(langs[e.target.value])
                  setSelectVal(e.target.value)
                  setCode(availableCodes[e.target.value])
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{
                  m:0
                }}
                // value={age}
                label="Language"
                // onChange={handleChange}
              >
                <MenuItem value={0}>C</MenuItem>
                <MenuItem value={1}>CPP</MenuItem>
                <MenuItem value={2}>JAVA</MenuItem>
                <MenuItem value={3}>Python</MenuItem>
              </Select>
            </FormControl>
            <Button sx={{ ml: "auto", height:"auto" }} variant="outlined">
              Run
            </Button>
            <Button sx={{ ml: 1, alignSelf: "flex-end", height:"100%" }} variant="contained"
              onClick={async()=>{
                try {
                  
                  const response = await fetch('http://localhost:3001/judge/');
                  if (response.ok) {
                    const json = await response.text();
                    console.log(json);
                    // setData(json);
                  } else {
                    console.error('Failed to fetch data');
                  }
                } catch (error) {
                  console.error('Error:', error);
                }
          
              }}
            >
              Submit
            </Button>
          </Container>
          <Box
            sx={{ bgcolor: "#cfe8fc", width: "100%", height: "100%", ml: 1 }}
          >
            {console.log(cppCode) }
            <AceEditor 
            onChange={value=>{
              availableSetCodes[selectVal](value)
            }}
             fontSize={fontSize} width="100%" height="70%" mode={lang} theme="monokai" value={availableCodes[selectVal]} />
             <Paper sx={{height:"30%", bgcolor:"gray"}}></Paper>
          </Box>
        </Container>
      </Container>
    </>
  );
}
