import { useState } from "react";
import "./index.css";
import TodoList from "./components/TodoList";
import UserList from "./components/UserList";

function App() {
  const [count, setCount] = useState(0);
  const [inputs, setInputs] = useState(["", ""]);
  const [result, setResult] = useState(0);
  const [operation, setOperation] = useState("+");

  // Counter Functions
  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count > 0 ? count - 1 : 0);
  const handleReset = () => setCount(0);

  // Handle input change
  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value === "" ? "" : Number(value);
    setInputs(newInputs);
  };

  // Add new input field
  const addInputField = () => setInputs([...inputs, ""]);

  // Reset calculator
  const resetCalculator = () => {
    setInputs(["", ""]);
    setResult(0);
  };

  // Perform calculation based on selected operation
  const calculateResult = () => {
    let res;
    switch (operation) {
      case "+":
        res = inputs.reduce((acc, num) => acc + (Number(num) || 0), 0);
        break;
      case "-":
        res = inputs.reduce((acc, num) => acc - (Number(num) || 0));
        break;
      case "*":
        res = inputs.reduce((acc, num) => acc * (Number(num) || 1), 1);
        break;
      case "/":
        res = inputs.reduce((acc, num) => (num !== "" && Number(num) !== 0 ? acc / Number(num) : "Error"));
        break;
      default:
        res = "Invalid Operation";
    }
    setResult(res);
  };

  return (
    <div className="container">
      {/* Counter Section */}
      <div className="card counter">
        <h2>Counter</h2>
        <p className="counter-value">{count}</p>
        <div className="btn-group">
          <button className="btn" onClick={handleIncrement}>Increment</button>
          <button className="btn" onClick={handleDecrement}>Decrement</button>
          <button className="btn reset" onClick={handleReset}>Reset</button>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="card calculator">
        <h2>Basic Calculator</h2>
        <div className="input-group">
          {inputs.map((value, index) => (
            <input
              key={index}
              type="number"
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder={`Enter number ${index + 1}`}
            />
          ))}
        </div>

        <div className="btn-group">
          <button className="btn add-input" onClick={addInputField}>Add Input</button>
          <button className="btn reset" onClick={resetCalculator}>AC</button>
        </div>

        <div className="btn-group">
          <select className="operation-selector" value={operation} onChange={(e) => setOperation(e.target.value)}>
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">x</option>
            <option value="/">/</option>
          </select>
          <button className="btn" onClick={calculateResult}>=</button>
        </div>

        <p className="result">Result: <span>{result}</span></p>
      </div>

      {/* Todo List */}
      <TodoList />
      <UserList />
    </div>
  );
}

export default App;
