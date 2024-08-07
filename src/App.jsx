import React, { useState, useRef, useEffect } from "react";
import "./App.css";

export default function App() {
  const [inputVal, setInputVal] = useState("");
  const [command, setCommand] = useState([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const inputRef = useRef(null);
  const animatedCommandRef = useRef(null);
  const handleCommandChange = (e) => {
    setInputVal(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setCommand((prev) => [...prev, inputVal]);
      setCurrentCommand(inputVal);
      setInputVal("");
      inputRef.current.focus();
    }
  };

  const typeWriter = () => {
    let index = 0;
    while(index < currentCommand.length) {
      const text=currentCommand[index];
      animatedCommandRef.current.innerHTML += text;
      index++;
      setTimeout(typeWriter, 10)
    }
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className="main-container">
      <div className="world-description">
        <div className="user-command-display">
          {command.map((command, index) =>
            command === currentCommand ? (
              <p key={index} id='animated-command' ref={animatedCommandRef}></p>
            ) : (
              <p key={index}>{command}</p>
            )
          )}
        </div>
        <div className="world-description-display"></div>
      </div>
      <div className="user-command">
        <input
          type="text"
          ref={inputRef}
          className="input-field"
          value={inputVal}
          onChange={(e) => handleCommandChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </div>
    </div>
  );
}
