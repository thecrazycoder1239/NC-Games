import axios from "axios";

export default function getReviews() {
    return axios.get("https://my-board-game-database.onrender.com/api/reviews").then(response => {
        return response;
    })
}