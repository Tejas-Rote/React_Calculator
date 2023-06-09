import { useTheme } from "@emotion/react";
import { Box, Button, styled } from "@mui/material";
const keys = [
  {
    keyCode: 55,
    label: "7",
  },
  {
    keyCode: 56,
    label: "8",
  },
  {
    keyCode: 57,
    label: "9",
  },
  {
    keyCode: 52,
    label: "4",
  },
  {
    keyCode: 53,
    label: "5",
  },
  {
    keyCode: 54,
    label: "6",
  },
  {
    keyCode: 49,
    label: "1",
  },
  {
    keyCode: 50,
    label: "2",
  },
  {
    keyCode: 51,
    label: "3",
  },
  {
    keyCode: 48,
    label: "0",
  },
  {
    keyCode: 190,
    label: ".",
  },
  {
    keyCode: 13,
    label: "=",
  },
];

const symbols = [
  {
    label: "⌫",
    keyCode: 8,
    value: "backspace",
  },
  {
    label: "÷",
    keyCode: 111,
    value: "/",
  },
  {
    label: "×",
    keyCode: 56,
    value: "*",
  },
  {
    label: "-",
    keyCode: 109,
    value: "-",
  },
  {
    label: "+",
    keyCode: 107,
    value: "+",
  },
];

const StyledButton = styled(Button)(({ theme }) => ({
  transition: "0.3s ease",
  // margin:'2px',
  "&:hover": {
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.primary.main,
    boxShadow: "2px 2px 2px 0px rgba(0,0,0,0.75)",
  },
}));

const Keypad = (props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        borderBottomRightRadius: "20px",
        borderBottomLeftRadius: "20px",
      }}
    >
      <Box
        sx={{
          flex: 3,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "space-around",
        }}
      >
        {keys.map((item, index) => [
          <StyledButton
            key={index}
            sx={{
              color: theme.palette.text.primary,
              width: "33%",
              height: "25%",
              fontSize: "18px",
              fontFamily: "Poppins",
            }}
            onClick={() => props.handleKeyPress(item.keyCode, item.label)}
          >
            {item.label}
          </StyledButton>,
        ])}
      </Box>
      <Box
        sx={{
          flex: 1,
        }}
      >
        {symbols.map((item, index) => [
          <StyledButton
            key={index}
            sx={{
              color: theme.palette.text.secondary,
              width: "100%",
              height: "20%",
              fontSize: "18px",
              fontFamily: "Poppins",
              "&:hover": "color:'red'",
            }}
            onClick={() => props.handleKeyPress(item.keyCode, item.value)}
          >
            {item.label}
          </StyledButton>,
        ])}
      </Box>
    </Box>
  );
};

export default Keypad;
