
import UserClass from "./UserClass";
import {Component} from "react";
   
class About extends Component {
    
    constructor(props){
        super(props); 
    }

    render(){
        return(
            <div>
            <h1>About</h1>
            <h2>This is About</h2>
            <UserClass  />
        </div>
        )
    }
}



// const About = () => {
//     return (
//         <div>
//             <h1>About</h1>
//             <h2>This is About</h2>
//             <User name={"Shubham Phadtare (function)"} />

//             <UserClass name={"Shubham Phadtare (class)"} location={"Dehradun (class)"} />
//         </div>
//     );
// };

export default About;