import React from "react";

class UserClass extends React.Component {

    constructor(props){
        super(props);

        this.state= {
            userInfo: {
                name: "Dummy",
                location: "Default",
            },
        };
    }
    

   async componentDidMount() {
        const data = await fetch("https://api.github.com/users/shubhamphadtare11");
        const json = await data.json();
        
        this.setState({
            userInfo: json,
        });
    }

    componentDidUpdate(){
        console.log("Component Did Update");
    }

    componentWillUnmount(){
        console.log("Component Will Update");
    }

    render(){
        const {name, location, avatar_url} = this.state.userInfo;

        return (
            <div className="user-card">
            <img src={avatar_url}/>
            <h2>Name: {name}</h2>
            <h3>Location: {location}</h3>
            </div>
        );
    }

}

export default UserClass;


/*
--Mounting--

Constructor(dummy)
Rending (dummy)
    <HTML Dummy>
Component Did Mounting  
    <API Call>
    <this.setState>

--Update

render(API Data)
<HTML (new API data)>
componentDidUpdate)(It will call on every render)

-componentWillUnmount will call when we move to different component.

*/