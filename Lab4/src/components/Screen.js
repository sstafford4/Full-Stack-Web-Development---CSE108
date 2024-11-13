// the purpose of this file is to act as the "top" of the wrapper
// and to act as the display for all of the values

import { Textfit } from "react-textfit" // this is importing from the textfit library which is for changing the size of larger values on the screen
import "./Screen.css" // tis is for importing the css file

const Screen = ({value}) => {
    return (
        <Textfit className="screen" mode="single" max={70}>
         {value} 
         </Textfit>);
}

export default Screen