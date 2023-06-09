import { Box, Divider, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useRef } from "react";
import "./display.css";

const Display = (props) => {
  const theme = useTheme();
  const resultRef = useRef();
  const expressionRef = useRef();

  useEffect(() => {
    resultRef.current.scrollIntoView();
  }, [props.history]);

  useEffect(() => {
    expressionRef.current.scrollLeft = expressionRef.current.scrollWidth;
  }, [props.expression]);
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: theme.palette.primary.main,
        padding: "20px",
        maxHeight: "200px",
        width: "300px",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
      className="custom-scroll "
    >
      <Box
        className="custom-scroll "
        sx={{
          marginBottom: "10px",
          overflowX: "hidden",
        }}
      >
        {props.history &&
          props.history?.map((item) => (
            <p
              key={item + "" + Math.random() * 44}
              style={{
                fontSize: "16px",
                fontFamily: "Poppins",
                lineHeight: "20px",
                color: theme.palette.text.secondary,
                display: "flex",
                justifyContent: "flex-end",
                textAlign: "right",
              }}
            >
              {item}
            </p>
          ))}
      </Box>
      <Divider
        sx={{
          backgroundColor: theme.palette.text.secondary,
        }}
      />
      <div
        className="custom-scroll"
        ref={expressionRef}
        style={{
          overflowY: scroll,
          width: "100%",
          minHeight: "30px",
        }}
      >
        <p
          style={{
            whiteSpace: "nowrap",
            minWidth: "100%",
            width: "fit",
            fontWeight: "bold",
            fontFamily: "Poppins",
            fontSize: "22px",
            minHeight: "30px",
            marginTop: "5px",
            color: theme.palette.text.secondary,

            textAlign: "right",
          }}
        >
          {props.expression}
        </p>
      </div>
      <div
        className="custom-scroll"
        ref={expressionRef}
        style={{
          overflowY: scroll,
          width: "100%",
          minHeight: "30px",
        }}
      >
        <p
          ref={resultRef}
          style={{
            fontWeight: "bold",
            fontSize: "28px",
            fontFamily: "Poppins",
            minHeight: "30px",
            color: theme.palette.text.primary,
            textAlign: "right",
          }}
        >
          {props.result}
        </p>
      </div>
    </div>
  );
};

export default Display;
