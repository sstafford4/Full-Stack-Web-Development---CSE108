// Here, Im going to import all of the components I made in other files
// in this case, i think that its specifying the specific component to import
// syntax: import {component} from {file}
import Wrapper from "./components/Wrapper.js"
import Screen from "./components/Screen.js"
import ButtonBox from "./components/ButtonBox.js"
import Button from "./components/Button.js"

import React, {useState} from "react" // this is importing useState so that we can use it for the calculations

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");


// btnMap is an array of arrays
const btnValues = [
  ["C", "+/-", "%", "/"],
  [7, 8, 9, "*"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="]
];

const App = () => {
  // object to set all states at once
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });
  let [selectedOperator, setSelectedOperator] = useState(""); // New state to track the selected operator

  let [last, setLast] = useState({sign:"", num: 0}); // this is going to track the last operator used
  // this is the function for buttons 0-9. 
  // it ensures that: 
  // -no whole numbers start with zero
  // -there are no multiple zeros before the comma
  // -the format will be “0.” if “.” is pressed first
  // -numbers are entered up to 16 integers long
  const numClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        const numStr = calc.num.toString(); // needs to be treated as a string bc calc.num cannot be used with .length

        if (numStr.length < 16){
          setCalc({
            ...calc,num: calc.num === 0 && value === "0" ? "0" //... is the spread operator, which is used to spread arrays
            : calc.num % 1 === 0 ? Number(calc.num + value)
            : calc.num + value, res: !calc.sign ? 0 : calc.res,
          });
        }
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
    setSelectedOperator("");
  }

  // inverts the sign of the result
  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: "",
    });
  }

  // only gets fired if the decimal point is clicked
  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,num : !calc.num.toString().includes(".") ? calc.num + value 
      : calc.num,
    })
  }

  // ensures that:
  // -you can only click equals once. 
  // -users cant divide by 0
  const equalsClickHandler = () => {
      if (calc.sign && calc.num) {
      math();
      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Invalid" //prevents division by 0
            : math(Number(calc.res), Number(calc.num), calc.sign),
        sign: "",
        num: 0,
      });
      setLast({
        sign: calc.sign,
        num: calc.num,
      })
    }
    else if (last.sign && calc.res) {
      // If the equals button is pressed again, repeat the last operation
      math();

      // Perform the last operation again using the result as the first number
      setCalc({
        ...calc,
        res: math(Number(calc.res), Number(last.num), last.sign),
      });
    }
    setSelectedOperator(""); // resets the selected operator for highlighting 
  }

  // this does all of the calculations
  const math = (a, b, sign) =>
    // this does all of the calculations 
    sign === "+" ? a + b // addition
    :sign === "-" ? a - b //subtraction
    :sign === "*" ? a * b // multiplication
    :sign === "/" ? a / b // division
    : a;


  // only gets fired when an operator is clicked
  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    // If there's already an operator and a second number is input, treat it like equals was clicked
    if (calc.sign && calc.num) {
      const result = math(Number(calc.res), Number(calc.num), calc.sign);
      setCalc({
        ...calc,
        res: result,
        num: 0, // Reset the input for the next number
        sign: value, // Set the new operator
      });
    } else {
      // If no second number yet, just set the operator
      setCalc({
        ...calc,
        sign: value,
        res: !calc.res && calc.num ? calc.num : calc.res, // Move the number to res if it's not already there
        num: 0, // Reset the input number
      });
    }

    // Highlight the new operator
    setSelectedOperator(value);
  }

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(calc.num) : 0;
    let res = calc.res ? parseFloat(calc.res) : 0;
  
    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  }

  return (
    <Wrapper>
      {/* if calc.num is not null, then it sends calc.num to the screen. Otherwise, it sends calc.res */}
      {/* this is pretty much the syntax for an alternative if/else statement */}
      <Screen value={calc.num ? calc.num : calc.res}/> 
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : btn==="C" ? "clear" : btn === selectedOperator ? "highlight"
                :btn === "+" || btn==="-" || btn==="*" || btn==="/" ? "operator": ""} // conditional that sets the className to appropriate name depending on what is pressed.
                
                value={btn}
                onClick={
                  // it changes the function being used based on which btn has been pressed
                  btn==="C" ? resetClickHandler //these are all of the functions that im gonna make
                  :btn==="+/-" ? invertClickHandler
                  :btn==="%" ? percentClickHandler
                  :btn==="=" ? equalsClickHandler
                  :btn==="+" || btn==="-" || btn==="*" || btn==="/" ? signClickHandler
                  :btn==="." ? commaClickHandler
                  : numClickHandler
                }
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};


export default App;
