import { useContext, useEffect, useState } from "react";
import { UsernameContext } from "../context/username";
import { getUsers } from "../utils/axiosData";



export default function UserSelect() {
    const { setLoggedUser } = useContext(UsernameContext);
    const [ submitUsername, setSubmitUsername] = useState("");
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        getUsers().then(response => {
            setUsers(response.data.users)
        })
    }, [])


    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            users.map(user => {
                if(user.username === submitUsername) {
                    setLoggedUser({
                        ...user
                    });
                }
            });
        }}>
            <h2>Log in</h2>
            <label htmlFor="existing-username">username: </label>
            <input value={submitUsername} onChange={(event) => {
                setSubmitUsername(event.target.value)
            }} id="existing-username" placeholder="e.g. jessjelly"></input>
            <button type="submit">Go!</button>
        </form>
    )
}