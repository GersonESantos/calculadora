const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let currentValue = "0";
let prevValue = null;
let operator = null;

app.post("/", (req, res) => {
  const { value } = req.body;

  if (!isNaN(value)) {
    currentValue = currentValue === "0" ? value : currentValue + value;
  } else if (["+", "-", "*", "/"].includes(value)) {
    prevValue = currentValue;
    operator = value;
    currentValue = "0";
  } else if (value === "=") {
    if (operator && prevValue !== null) {
      const a = parseFloat(prevValue);
      const b = parseFloat(currentValue);
      let result;
      switch (operator) {
        case "+":
          result = a + b;
          break;
        case "-":
          result = a - b;
          break;
        case "*":
          result = a * b;
          break;
        case "/":
          result = b !== 0 ? a / b : "Erro";
          break;
        default:
          return;
      }
      currentValue = String(result);
      operator = null;
      prevValue = null;
    }
  } else if (value === "C") {
    currentValue = "0";
    prevValue = null;
    operator = null;
  }
  res.json({ display: currentValue });
});

app.listen(8080, () => {
  console.log('Rodando app listening at http://localhost:8080');
});


