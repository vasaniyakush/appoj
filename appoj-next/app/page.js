import Image from "next/image";
import styles from "./page.module.css";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import CodeIcon from '@mui/icons-material/Code';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
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
export default function Home() {
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
        mt:0,
        display:"flex",
        flexDirection:"row"
      }}>
      <Box sx={{ bgcolor: '#cfe8fc', width:"50%", height: '100vh', border:"solid 0.5px black",mr:0 }} />
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
      <Box sx={{ bgcolor: '#cfe8fc', width:"100%", height: '100%', border:"solid 0.5px black",ml:1 }} />
      </Container>
      </Container>
    </>
  );
}
