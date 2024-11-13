// the frame for all of the buttons 
// pm just wrapper for buttons

import "./ButtonBox.css"

const ButtonBox = ({children}) => {
    return <div className="buttonBox">{children}</div>
}

export default ButtonBox