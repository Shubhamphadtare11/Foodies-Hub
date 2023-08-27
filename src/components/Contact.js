import UserContext from "../utils/UserContext";
import { useContext } from "react";

const Contact = () => {

    const {loggedInUser, setUserName} = useContext(UserContext);

    return(
        <div >
            <h1 className="text-xl font-bold">fetch data from context api and updated</h1>
              <div className="search m-4 p-4 flex items-center">
                    <label>User : </label>
                    <input className="border border-black p-2" value={loggedInUser} onChange={(e) => setUserName(e.target.value)} />
            </div>
        </div>
    );
};

export default Contact;