import { useContext } from "react";
import { UsernameContext } from "../context/username";

export default function UserSelect() {
    const { setLoggedUser } = useContext(UsernameContext);
}