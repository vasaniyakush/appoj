"use client";
import Image from "next/image";
import styles from "./page.module.css";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import CodeIcon from "@mui/icons-material/Code";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";

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
  Grid,
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
import "brace/theme/chrome";

import { useState } from "react";
import useLocalStorage from "@/customhook/useLocalStorage";
import Problem from "@/components/problem";
import {
  IP,
  backendIP,
  defaultCode,
  lang_extn,
  langs,
  langs_ids,
  statuses,
} from "@/constants";
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
  const [customTestcase, setCustomTestcase] = useLocalStorage(
    "testcase",
    "1\n0"
  );
  const [result, setResult] = useLocalStorage(
    "result",
    "Run or Submit to see output"
  );
  const [passed, setPassed] = useState("default");
  const [testcaseStatus, setTestcaseStatus] = useState("status");
  const [buttonStatus, setButtonStatus] = useState(false);

  //form states
  const [loading, setLoading] = useState(false);
  const [formName, setFormName] = useState("");
  const [rollNum, setRollNum] = useState("");
  const [password, setPassword] = useState("");
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

  const handleCheck = async () => {
    try {
      setButtonStatus(true);
      setAlignment("testcase");
      setResult("Loading....");
      let data = JSON.stringify({
        code: availableCodes[selectVal],
        lang_id: langs_ids[selectVal],
        input: customTestcase,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `/api/run`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const resp = await axios.request(config, { message: "obj passed" });
      console.log(resp);
      console.log(resp.data);

      if (parseInt(resp.data.judgement.status_id) <= 4) {
        setResult(resp.data.stdout);
        setPassed("success");
        setTestcaseStatus("Compiled Successfully");
      } else {
        setPassed("error");
        setTestcaseStatus(
          statuses[parseInt(resp.data.judgement.status_id) - 1]
        );
        setResult(
          statuses[parseInt(resp.data.judgement.status_id) - 1] +
          "\n" +
          resp.data.decoded?.toString()
        );
      }
    } catch (err) {
      console.log(err);
      setResult(err.response.data.message);
    } finally {
      setAlignment("result");
      setButtonStatus(false);
    }
  };
  const handleRun = async () => {
    try {
      setButtonStatus(true);
      setAlignment("testcase");
      setResult("Loading....");
      let data = JSON.stringify({
        code: availableCodes[selectVal],
        lang_id: langs_ids[selectVal],
        input: customTestcase,
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

      if (parseInt(resp.data.judgement.status_id) <= 4) {
        setResult(resp.data.stdout);
        setPassed("success");
        setTestcaseStatus("Compiled Successfully");
      } else {
        setPassed("error");
        setTestcaseStatus(
          statuses[parseInt(resp.data.judgement.status_id) - 1]
        );
        setResult(
          statuses[parseInt(resp.data.judgement.status_id) - 1] +
          "\n" +
          resp.data.decoded?.toString()
        );
      }
    } catch (err) {
      setResult(err.response.data.message);
    } finally {
      setAlignment("result");
      setButtonStatus(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setButtonStatus(true);
      setAlignment("result");
      setResult("Loading....");
      let data = JSON.stringify({
        code: availableCodes[selectVal],
        lang_id: langs_ids[selectVal],
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `/api/submit`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const resp = await axios.request(config);
      console.log(resp.data);

      if (resp.data.passed) {
        setResult("All Hidden Testcases Passed!!!");
        setPassed("success");
        setTestcaseStatus("Passed");
      } else {
        setPassed("error");
        setTestcaseStatus("Failed");
        setResult(
          "Failed to pass on all testcases"
        );
      }
    } catch (err) {
      setResult(err.response.data.message);
    } finally {
      setButtonStatus(false);
    }
  };

  const sendFileToServer = async (extention, content, name, roll, password) => {
    // const content = document.querySelector("textarea").value;

    // const file = new Blob([content], { type: "text/plain" });
    const file = btoa(content)

    let data = JSON.stringify({
      "code": file,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `/api/file?name=${name + "_" + roll
        }&extention=${extention}`,
      headers: {
        "Content-Type": "application/json",
        "password": password
      },
      data: data,
    };

    const resp = await axios.request(config);
    console.log(resp);
    // alert(resp.data.message);

  };

  const handleFileSend = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(formName, rollNum, password);

      if (formName == "") {
        alert("Name is empty");
      } else if (rollNum == "") {
        alert("Roll Number is empty");
      } else if (password == "") {
        alert("Password is empty");
      } else {
        await sendFileToServer(
          lang_extn[selectVal],
          availableCodes[selectVal],
          formName.replace(/ /g, ""),
          rollNum.replace(/ /g, ""),
          password.replace(/ /g, "")
        );
        alert("File Sent Successfully");
        setFormName("");
        setRollNum("");
        setPassword("");
      }
      setLoading(false);
      
    } catch (err) {
      console.log(err);
      alert(err.message);
      setLoading(false);
    } finally {
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
            src="logo.png"
            sx={{
              height: "80%",
              alignSelf: "center",
              ml: "auto",
              mr: "auto",
            }}
          ></Box>
        </AppBar>
        <Container
          maxWidth="false"
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box sx={{ width: "30%", height: "100vh", mr: 0 }}>
            <Problem />
          </Box>
          <Container
            maxWidth="false"
            sx={{
              m: 0,
              display: "flex",
              width: "70%",
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
                  m: 0,
                }}
              >
                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                <Select
                  size="small"
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
                size="small"
                disabled={buttonStatus}
                sx={{ ml: "auto", alignSelf: "flex-end" }}
                variant="contained"
                color="secondary"
                onClick={handleCheck}
              >
                Run
              </Button>
              <Button
                size="small"
                disabled={buttonStatus}
                sx={{ ml: 1, alignSelf: "flex-end" }}
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
                    // onChange={handleChange}
                    aria-label="Option"
                    sx={{
                      bgcolor: "white",
                    }}
                  >
                    <ToggleButton
                      color="secondary"
                      sx={{ width: "8rem" }}
                      onClick={(e) => {
                        setAlignment(e.target.value);
                      }}
                      value="testcase"
                    >
                      TestCase
                    </ToggleButton>
                    <ToggleButton
                      color="primary"
                      sx={{ width: "8rem" }}
                      value="result"
                      onClick={(e) => {
                        setAlignment(e.target.value);
                      }}
                    >
                      Result
                    </ToggleButton>
                    <ToggleButton
                      color="primary"
                      sx={{ width: "8rem" }}
                      value="submit"
                      onClick={(e) => {
                        setAlignment(e.target.value);
                      }}
                    >
                      Submit
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
                {buttonStatus ? (
                  <LinearProgress
                    color={alignment == "testcase" ? "secondary" : "primary"}
                  />
                ) : (
                  <Divider light />
                )}
                {/* {console.log(alignment)} */}
                {alignment == "testcase" ? (
                  <AceEditor
                    value={customTestcase}
                    onChange={(value) => {
                      setCustomTestcase(value);
                    }}
                    theme="chrome"
                    height="100%"
                    minHeight="10%"
                    style={{ minWidth: "100%" }}
                  ></AceEditor>
                ) : alignment == "result" ? (
                  <AceEditor
                    value={result}
                    minRows="15"
                    height="100%"
                    readOnly={true}
                    style={{ minWidth: "100%" }}
                  ></AceEditor>
                ) : (
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"space-center"}
                    marginTop={1}
                    minHeight={"100%"}
                    width={"80%"}
                  >
                    {/* <TextField   label="Name" variant="outlined" fullWidth="false" sx={{
                  width:"30%",
                  mb:1
                  // alignSelf:"center"
                }} />
                <TextField   label="Password" variant="outlined" fullWidth="false" sx={{
                  width:"30%",
                  
                  // alignSelf:"center"
                }} />
                <TextField    label="Roll Number" variant="outlined" fullWidth="false" sx={{
                  width:"30%",
                  alignSelf:""
                  
                  // alignSelf:"center"
                }} /> */}
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <TextField
                          label="Name"
                          value={formName}
                          onChange={(e) => {
                            setFormName(e.target.value);
                          }}
                          variant="outlined"
                        >
                          xs=8
                        </TextField>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Roll Number"
                          value={rollNum}
                          onChange={(e) => {
                            setRollNum(e.target.value);
                          }}
                          variant="outlined"
                        >
                          xs=4
                        </TextField>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        justifyContent={"center"}
                        textAlign={"center"}
                        padding={1}
                        display={"flex"}
                        flexDirection={"row"}
                        alignItems={"center"}
                        sx={{
                          textAlign: "center",
                          justifyContent: "space-around ",
                        }}
                      >
                        {testcaseStatus != "Passed" ? (
                          <WarningIcon
                            color="error"
                            sx={{ mt: 1 }}
                          ></WarningIcon>
                        ) : (
                          <CheckCircleIcon
                            color="success"
                            sx={{ mt: 1 }}
                          ></CheckCircleIcon>
                        )}{" "}
                        <TextField
                          value={
                            testcaseStatus != "Passed"
                              ? "Testcases not Passed"
                              : "Testcases Passed"
                          }
                          disabled
                          variant="standard"
                        >
                          Hidden Testcases not Passed
                        </TextField>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          variant="outlined"
                        >
                          xs=4
                        </TextField>
                      </Grid>
                      <Grid item xs={4}>
                        <LoadingButton
                          size="large"
                          onClick={handleFileSend}
                          endIcon={<SendIcon />}
                          loading={loading}
                          loadingPosition="end"
                          variant="contained"
                          sx={{
                            mt: 1,
                            ml: 3,
                            mr: 2,
                            mb: 1,
                          }}
                        >
                          <span>Send</span>
                        </LoadingButton>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Box>
            </Box>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  );
}
