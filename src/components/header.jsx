import { useContext } from "react";
import { UsernameContext } from "../context/username";
import { Link } from "react-router-dom";

export default function Header() {
    const { loggedUser } = useContext(UsernameContext);

    return (
        <>
            <Link to="/" className="link">
                <h1 className="header">NC-Games</h1>
            </Link>
            <Link to="/users" className="link">
                <img className="profile-picture" src={loggedUser.avatar_url}alt="profile picture"/>
            </Link>
        </>
    )
}