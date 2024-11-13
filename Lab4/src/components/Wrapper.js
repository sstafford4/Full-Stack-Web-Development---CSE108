//this is the "wrapper" component, that will house everything and allow us to center the entire application
import "./Wrapper.css" //importing the css file

//this is a function component in react using arrow function syntax (which is the standard)
const Wrapper = ({children}) => { // {children} is a prop
    return <div className="wrapper">{children}</div>
}

export default Wrapper // export keyword allows for components to be used by other files
// I guess it sort of acts as a "class" in this way? using export makes components public? 

// all function components in React must act "pure", meaning that they should never modify the values of their own props

