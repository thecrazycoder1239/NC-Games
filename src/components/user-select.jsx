import { useContext, useEffect, useState } from "react";
import { UsernameContext } from "../context/username";
import { getUsers } from "../utils/axiosData";



export default function UserSelect() {
    const { setLoggedUser } = useContext(UsernameContext);
    const [ submitUsername, setSubmitUsername] = useState("");
    const [ users, setUsers ] = useState([]);
    const [ usernameInvalid, setUsernameInvalid ] = useState(false);  

    useEffect(() => {
        getUsers().then(response => {
            setUsers(response.data.users)
        })
    }, [])


    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            let isTrueOrFalse = true;
            
            users.map(user => {
                if(user.username === submitUsername) {
                    setLoggedUser({
                        ...user
                    });
                    isTrueOrFalse = false
                }
            })
            setUsernameInvalid(isTrueOrFalse)
        }} className="log-in">
            <h2 className="log-in-title">Log in</h2>
            <label htmlFor="existing-username">username: </label>
            <input value={submitUsername} onChange={(event) => {
                setSubmitUsername(event.target.value)
            }} id="existing-username" placeholder="e.g. jessjelly"></input>
            <button className="submit-btn" type="submit">Go!</button>
            {usernameInvalid ? <p className="username-invalid">could not find existing username, please try again!</p> : null}
        </form>
    )
}