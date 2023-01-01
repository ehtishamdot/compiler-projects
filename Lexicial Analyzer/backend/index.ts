//@ts-nocheck

const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.post("/lexer", (req, res) => {
  console.log(req.body);
  const input = req.body.input;
  console.log(input);
  const tokens = lexer(input);
  console.log(tokens);
  res.send({ tokens });
});

app.listen(port, () => {
  console.log(`Lexer API listening at http://localhost:${port}`);
});

function lexer(input) {
  let current = 0;
  let tokens = [];

  const DATA_TYPES = /int|float|double/;
  const COMPARISON_OPERATORS = /[\=\!\<\>]/;
  const BRACES = /[\{\}]/;
  const WHITESPACE = /\s/;
  const PARENTHESES = /[()]/;
  const OPERATORS = /[+\-*\/]/;
  const NUMBERS = /\d/;
  const IDENTIFIERS = /[a-z]/i;
  const IDENTIFIERS_AND_NUMBERS = /[a-z0-9]/i;

  while (current < input.length) {
    // const words = input.split(" ")
    let char = input[current];

    console.log(input[current]);

    if (BRACES.test(char)) {
      tokens.push({ type: "BRACES", value: char, color: "#ffa07a" });
      current++;
      continue;
    }

    if (/\;/.test(char)) {
      tokens.push({ type: "SEMI_COLON", value: char, color: "#6495ed" });
      current++;
      continue;
    }

    // Skip whitespace
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    if (COMPARISON_OPERATORS.test(char)) {
      if (COMPARISON_OPERATORS.test(input[current + 1])) {
        tokens.push({
          type: "OPERATOR",
          value: `${char}${input[current + 1]}`,
          color: "#32cd32",
        });
      } else {
        tokens.push({
          type: "OPERATOR",
          value: char,
          color: "#32cd32",
        });
      }
      current++;
      continue;
    }

    // Parse parentheses
    if (DATA_TYPES.test(char)) {
      tokens.push({ type: "DATA_TYPE", value: char, color: "#00bfff" });
      current++;
      continue;
    }

    // Parse parentheses
    if (PARENTHESES.test(char)) {
      tokens.push({ type: "PARENTHESIS", value: char, color: "#ee82ee" });
      current++;
      continue;
    }

    // Parse comma
    if (char === ",") {
      tokens.push({ type: "COMMA", value: char, color: "#ffd700" });
      current++;
      continue;
    }

    // Parse operators
    if (OPERATORS.test(char)) {
      if (OPERATORS.test)
        tokens.push({ type: "OPERATOR", value: char, color: "#9400d3" });
      current++;
      continue;
    }

    // Parse numbers
    if (NUMBERS.test(char)) {
      let value = "";

      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: "NUMBER", value, color: "#8b008b" });
      continue;
    }

    // Parse strings
    if (char === '"') {
      let value = "";
      char = input[++current];

      while (char !== '"') {
        value += char;
        char = input[++current];
      }

      char = input[++current];
      tokens.push({ type: "STRING", value, color: "#008080" });
      continue;
    }

    // Parse identifiers (e.g. variable names)
    if (IDENTIFIERS.test(char)) {
      let value = "";

      while (DATA_TYPES.test(char)) {
        console.log(char);
      }

      while (IDENTIFIERS_AND_NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: "IDENTIFIER", value, color: "#a9a9a9" });
      continue;
    }

    throw new TypeError(`I don't know what this character is: ${char}`);
  }

  return tokens;
}
