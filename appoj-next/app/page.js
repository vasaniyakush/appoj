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
  Chip,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  LinearProgress,
  Menu,
  MenuItem,
  Paper,
  Select,
  TextField,
  TextareaAutosize,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { green, purple } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AceEditor from "react-ace";
import axios from "axios";
import "brace/mode/c_cpp";
import "brace/mode/java";
import "brace/mode/python";
import "brace/theme/monokai";

import { useState } from "react";
import useLocalStorage from "@/customhook/useLocalStorage";
import Problem from "@/components/problem";
import { IP, defaultCode, langs, langs_ids, statuses } from "@/constants";
import { BorderColor } from "@mui/icons-material";

export default function Home() {
  const [lang, setLang] = useState(langs[0]);
  const [selectVal, setSelectVal] = useState(1);
  const [cCode, setCCode] = useLocalStorage("C", defaultCode.C);
  const [cppCode, setCPPCode] = useLocalStorage("CPP", defaultCode.CPP);
  const [javaCode, setJavaCode] = useLocalStorage("JAVA", defaultCode.JAVA);
  const [pyCode, setPyCode] = useLocalStorage("PYTHON", defaultCode.PYTHON);
  const [code, setCode] = useLocalStorage("CODE", cppCode);
  const availableCodes = [cCode, cppCode, javaCode, pyCode];
  const availableSetCodes = [setCCode, setCPPCode, setJavaCode, setPyCode];
  const [fontSize, setFontSize] = useLocalStorage("fontsize", 20);
  const [alignment, setAlignment] = useState("testcase");
  const [customTestcase, setCustomTestcase] = useLocalStorage("testcase", "");
  const [result, setResult] = useLocalStorage(
    "result",
    "Run or Submit to see output"
  );
  const [passed, setPassed] = useState("default");
  const [testcaseStatus, setTestcaseStatus] = useState("status");
  const [buttonStatus, setButtonStatus] = useState(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: green[300],
        dark: green[500],
      },
      secondary: {
        main: purple[600],
        dark: purple[800],
      },
      primaryLight: {
        main: green[50],
        contrastText: "#616161",
      },
    },
  });
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleRun = async () => {
    try {
      setButtonStatus(true);
      setAlignment("testcase")
      setResult("Loading....")
      let data = JSON.stringify({
        code: availableCodes[selectVal],
        lang_id: langs_ids[selectVal],
        input:customTestcase
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `http://${IP}:3001/judge/custom`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const resp = await axios.request(config);
      console.log(resp.data);

      if (parseInt( resp.data.judgement.status_id) <= 4) {
        setResult(resp.data.stdout);
        setPassed("success");
        setTestcaseStatus("Compiled Successfully");
      } else {
        setPassed("error");
        setTestcaseStatus(statuses[parseInt(resp.data.judgement.status_id) - 1]);
        setResult(  statuses[parseInt(resp.data.judgement.status_id) - 1] + "\n" +  resp.data.decoded?.toString());

      }
    } catch (err) {
      setResult(err.message, err);
    } finally {
      setAlignment("result")
      setButtonStatus(false);
    }
  };
  const handleSubmit = async () => {
    try {
      setButtonStatus(true);
      setAlignment("result")
      setResult("Loading....")
      let data = JSON.stringify({
        code: availableCodes[selectVal],
        lang_id: langs_ids[selectVal],
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `http://${IP}:3001/judge`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const resp = await axios.request(config);
      console.log(resp.data);

      if (resp.data.judgement.status_id == "3") {
        setResult("All Hidden Testcases Passed!!!");
        setPassed("success");
        setTestcaseStatus("Passed");
      } else {
        setPassed("error");
        setTestcaseStatus("Failed");
        setResult(  statuses[parseInt(resp.data.judgement.status_id) - 1] + "\n" +  resp.data.decoded?.toString());

      }
    } catch (err) {
      setResult(err.message, err);
    } finally {
      setButtonStatus(false);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar
          position="sticky"
          sx={{
            height: "3rem",
            display: "flex",
            flexDirection: "row",
          }}
          color="primaryLight"
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
              ml: "auto",
              mr: "auto",
            }}
          ></Box>

          {/* <CodeIcon
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
        /> */}
        </AppBar>
        <Container
          maxWidth="false"
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box sx={{ width: "40%", height: "100vh", mr: 0 }}>
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
              <FormControl
                variant="filled"
                sx={{
                  minWidth: "120px",
                  m: 0,
                }}
              >
                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                <Select
                  defaultValue={1}
                  onChange={(e) => {
                    console.log(lang);
                    setLang(langs[e.target.value]);
                    setSelectVal(e.target.value);
                    setCode(availableCodes[e.target.value]);
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  sx={{
                    m: 0,
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
              <Button
                disabled={buttonStatus}
                sx={{ ml: "auto", height: "auto" }}
                variant="outlined"
                color="secondary"
                onClick={handleRun}
              >
                Run
              </Button>
              <Button
                disabled={buttonStatus}
                sx={{ ml: 1, alignSelf: "flex-end", height: "100%" }}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Container>
            <Box
              sx={{ bgcolor: "#cfe8fc", width: "100%", height: "100%", ml: 1 }}
            >
              {/* {console.log(cppCode) } */}
              <AceEditor
                onChange={(value) => {
                  availableSetCodes[selectVal](value);
                }}
                fontSize={fontSize}
                width="100%"
                height="70%"
                mode={lang}
                theme="monokai"
                value={availableCodes[selectVal]}
              />
              <Box sx={{ height: "30%", bgcolor: "white" }}>
                <Box display="flex" flexDirection="row" bgcolor={"white"}>
                  <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Option"
                    sx={{
                      bgcolor: "white",
                    }}
                  >
                    <ToggleButton
                      color="secondary"
                      sx={{ width: "8rem" }}
                      value="testcase"
                    >
                      TestCase
                    </ToggleButton>
                    <ToggleButton
                      color="primary"
                      sx={{ width: "8rem" }}
                      value="result"
                    >
                      Result
                    </ToggleButton>

                    {/* <ToggleButton value="ios">iOS</ToggleButton> */}
                  </ToggleButtonGroup>
                  <Chip
                    sx={{ mt: "auto", mb: "auto", ml: "auto", mr: 3 }}
                    size="medium"
                    label={testcaseStatus}
                    color={passed}
                  />
                </Box>
                   {buttonStatus?<LinearProgress color={alignment == "testcase"?"secondary":"primary"}/>: <Divider light />}
                {console.log(alignment)}
                {alignment == "testcase" ? (
                  <Typography
                    padding={1}
                    minHeight={"100%"}
                    // bgcolor={"black"}
                    color={"white"}
                    variant="body1"
                    gutterBottom
                  >
                    <TextareaAutosize
                      value={customTestcase}
                      onChange={(e) => {
                        setCustomTestcase(e.target.value);
                      }}
                      minRows="15"
                      style={{ minWidth: "100%" }}
                    ></TextareaAutosize>
                  </Typography>
                ) : (
                  <Typography
                    padding={1}
                    minHeight={"100%"}
                    // bgcolor={"black"}
                    color={"white"}
                    variant="body1"
                    gutterBottom
                  >
                    <TextareaAutosize
                      value={result}
                      minRows="15"
                      style={{ minWidth: "100%" }}
                    ></TextareaAutosize>
                  </Typography>
                )}
              </Box>
            </Box>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  );
}
