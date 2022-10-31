import React, { useState } from "react";
import {
  MIN,
  MAX,
  symbols,
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  checkboxData,
} from "./constants";
import "./App.css";

const App = () => {
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [characterLength, setCharacterLength] = useState(0);
  const [options, setOptions] = useState({
    upperCaseLetter: false,
    lowerCaseLetter: false,
    number: false,
    symbol: false,
  });
  const handleOnChange = (e) => {
    const { value, type, name } = e.target;

    if (type === "checkbox") {
      setOptions((prev) => ({
        ...prev,
        [name]: e.target.checked,
      }));
    } else {
      setCharacterLength(value);
    }
  };
  const copyPassword = () => {
    if (password.length > 0) navigator.clipboard.writeText(password);
    setAlertVisible(true);
    setInterval(() => setAlertVisible(false), 2000);
  };

  const generatePassword = () => {
    let characters = "";
    let generatedPassword = "";
    let passwordLength = characterLength;
    if (options.lowerCaseLetter) {
      characters += lowerCaseLetters;
      let randomIndex = Math.floor(Math.random() * lowerCaseLetters.length);
      generatedPassword += lowerCaseLetters[randomIndex];
      passwordLength -= 1;
    }
    if (options.upperCaseLetter) {
      characters += upperCaseLetters;
      let randomIndex = Math.floor(Math.random() * upperCaseLetters.length);
      generatedPassword += upperCaseLetters[randomIndex];
      passwordLength -= 1;
    }

    if (options.number) {
      characters += numbers;
      let randomIndex = Math.floor(Math.random() * numbers.length);
      generatedPassword += numbers[randomIndex];
      passwordLength -= 1;
    }

    if (options.symbol) {
      characters += symbols;
      let randomIndex = Math.floor(Math.random() * symbols.length);
      generatedPassword += symbols[randomIndex];
      passwordLength -= 1;
    }

    for (let i = 0; i < passwordLength; i++) {
      let randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }
    setPassword(generatedPassword);
  };

  const getSliderGradient = () => {
    const percentage = ((characterLength - MIN) / (MAX - MIN)) * 100;
    return `linear-gradient(to right, hsl(158, 95%, 34%) 0%, hsl(158, 95%, 34%) ${percentage}%,hsl(0, 2%, 66%) ${percentage}%, hsl(0, 2%, 66%) 100%)`;
  };

  const getPasswordStrength = () => {
    const selectedOptions = Object.keys(options).filter(
      (key) => options[key] === true
    ).length;
    switch (selectedOptions) {
      case 1: {
        return "weak";
      }
      case 2: {
        return "medium";
      }
      case 3: {
        return "medium";
      }
      case 4: {
        return "strong";
      }
      default:
        return "";
    }
  };

  return (
    <div className="app">
      <div className={`alert ${alertVisible ? "visible" : "invisible"}`}>
        Your password has been copied to the clipboard!
      </div>
      <div className="wrapper">
        <h1 className="app-title">Password Generator</h1>
        <div className="password-container">
          <p
            className={`password-text ${
              password?.length > 0 ? "active" : "inactive"
            }`}
          >
            {password?.length > 0 ? password : "P@ssw0rd"}
          </p>
          <button className="btn btn-link" onClick={copyPassword}>
            copy
          </button>
        </div>
        <div className="password-options">
          <div className="character-length-container">
            <h2 className="title">Character Length</h2>
            <p className="character-length">{characterLength}</p>
          </div>
          <input
            type="range"
            onChange={handleOnChange}
            className="slider"
            min={MIN}
            max={MAX}
            style={{
              backgroundImage: getSliderGradient(),
            }}
            value={characterLength}
            step={1}
            name="characterLength"
          />
          {checkboxData.map((option, index) => {
            return (
              <div className="checkbox-container" key={index}>
                <input
                  onChange={handleOnChange}
                  type={"checkbox"}
                  name={option.name}
                />
                <p className="checkbox-title">{option.title}</p>
              </div>
            );
          })}
          <div className="strength-container">
            <h3 className="title uppercase">Strength</h3>
            <div className="tubes">
              <p className="password-strength uppercase">
                {getPasswordStrength()}
              </p>
              {Object.keys(options)
                .filter((key) => options[key] === true)
                .map((_, index) => {
                  return <div className={`tube filled`} key={index} />;
                })}
              {Object.keys(options)
                .filter((key) => options[key] === false)
                .map((_, index) => {
                  return <div className={`tube`} key={index} />;
                })}
            </div>
          </div>
          <button
            className="btn btn-block btn-primary"
            onClick={generatePassword}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
