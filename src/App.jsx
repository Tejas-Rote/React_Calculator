import "./App.css";
import {
  Box,
  IconButton,
  Switch,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useState, useEffect } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Display from "./containers/display/Display";
import Keypad from "./containers/keypads/Keypad";

const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];

function App() {
  const [DarkMode, setDarkMode] = useState("dark");
  const handleChange = () => {
    setDarkMode(DarkMode === "light" ? "dark" : "light");
  };

  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("calculator-app-history")) || []
  );

  const handleKeyPress = (keyCode, key) => {
    if (!keyCode) return;
    if (!usedKeyCodes.includes(keyCode)) return;

    if (numbers.includes(key)) {
      if (key === "0") {
        if (expression.length === 0) return;
      }
      calculateResult(expression + key);
      setExpression(expression + key);
    } else if (operators.includes(key)) {
      if (!expression) return;

      const lastChar = expression.slice(-1);
      if (operators.includes(lastChar)) return;
      if (lastChar === ".") return;

      setExpression(expression + key);
    } else if (key === ".") {
      if (!expression) return;
      const lastChar = expression.slice(-1);
      if (!numbers.includes(lastChar)) return;

      setExpression(expression + key);
    } else if (keyCode === 8) {
      if (!expression) return;
      calculateResult(expression.slice(0, -1));
      setExpression(expression.slice(0, -1));
    } else if (keyCode === 13) {
      if (!expression) return;
      calculateResult(expression);

      let tempHistory = [...history];
      if (tempHistory.length > 20) tempHistory = tempHistory.splice(0, 1);
      tempHistory.push(expression);
      setHistory(tempHistory);
    }
  };

  const calculateResult = (exp) => {
    if (!exp) {
      setResult("");
      return;
    }
    const lastChar = exp.slice(-1);
    if (!numbers.includes(lastChar)) exp = exp.slice(0, -1);

    const answer = eval(exp).toFixed(2) + "";
    setResult(answer);
  };

  useEffect(() => {
    localStorage.setItem("calculator-app-history", JSON.stringify(history));
  }, [history]);

  const theme = createTheme({
    palette: {
      mode: DarkMode,
      // type: darkMode ? "dark" : "light",

      ...(DarkMode === "light"
        ? {
            // palette values for dark mode
            primary: {
              main: "#2F8886",
            },
            secondary: {
              main: "#84C69B",
            },
            text: {
              primary: "#1A2F4B",
              secondary: "#28475C",
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: "#28475C",
            },
            secondary: {
              main: "#1A2F4B",
            },
            text: {
              primary: "#84C69B",
              secondary: "#2F8886",
            },
          }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "space-between",
            height: 500,
            width: 300,
            backgroundColor: theme.palette.primary.main,
            borderRadius: "20px",
            boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)",
          }}
        >
          {/* header start  */}
          <Box
            sx={{
              display: "flex",
              backgroundColor: theme.palette.secondary.main,
              borderBottomRightRadius: "20px",
              boxShadow: "2px 2px 2px 0px rgba(0,0,0,0.75)",
              zIndex: 5,
            }}
          >
            <Switch
              sx={{
                margin: 0,
              }}
              color="default"
              inputProps={{ "aria-label": "checkbox with default color" }}
              onChange={handleChange}
              checked={DarkMode === "light" ? true : false}
            />
            <IconButton color="inherit">
              {theme.palette.mode === "dark" ? (
                <DarkModeIcon
                  sx={{
                    color: "white",
                  }}
                />
              ) : (
                <LightModeIcon />
              )}
            </IconButton>
          </Box>

          {/* header end  */}

          {/* display start  */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              backgroundColor: theme.palette.primary.main,
              width: "100%",
            }}
          >
            <Display
              expression={expression}
              result={result}
              history={history}
            />
          </Box>
          {/* display end  */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1.3,
              backgroundColor: theme.palette.secondary.main,
              width: "100%",
              borderRadius: "20px",
              padding: "1rem",
            }}
          >
            <Keypad handleKeyPress={handleKeyPress} />
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
