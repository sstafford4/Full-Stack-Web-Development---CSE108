// this is the function component for the buttons
// this component acts as the interactivity of the calculator
// every button will have a value and onClick props in them

import "./Button.css"

const Button = ({className, value, onClick}) => {
    return (
        <button className={className} onClick={onClick}>{value}</button> // im pretty sure this is what assigns the button values and gives them the clicking values
    )
}

export default Button