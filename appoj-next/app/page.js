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
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
export default function Home() {
  return (
    <AppBar  position="static"
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

  );
}
