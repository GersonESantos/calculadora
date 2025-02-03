import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [operator, setOperator] = useState(null);
  const [prevValue, setPrevValue] = useState(null);

  const handleNumberClick = (num) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num));
  };

  const handleOperatorClick = (op) => {
    setPrevValue(display);
    setOperator(op);
    setDisplay("0");
  };

  const calculate = () => {
    if (!operator || prevValue === null) return;
    const a = parseFloat(prevValue);
    const b = parseFloat(display);
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
    setDisplay(String(result));
    setOperator(null);
    setPrevValue(null);
  };

  const clearDisplay = () => {
    setDisplay("0");
    setOperator(null);
    setPrevValue(null);
  };

  return (
    <div className="w-72 p-4 bg-black rounded-lg text-white text-center">
      <div className="text-4xl p-4 bg-gray-800 rounded-lg mb-4">{display}</div>
      <div className="grid grid-cols-4 gap-2">
        {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", "C", "=", "+"].map((item) => (
          <button
            key={item}
            className="p-4 bg-gray-700 rounded-lg text-xl hover:bg-gray-600"
            onClick={() =>
              item === "C"
                ? clearDisplay()
                : item === "="
                ? calculate()
                : ["+", "-", "*", "/"].includes(item)
                ? handleOperatorClick(item)
                : handleNumberClick(item)
            }
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
