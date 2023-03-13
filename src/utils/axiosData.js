import axios from "axios";

export function getReviews() {
    return axios.get("https://my-board-game-database.onrender.com/api/reviews").then(response => {
        return response;
    })
}

export function getReview(review_id) {
    return axios.get(`https://my-board-game-database.onrender.com/api/reviews/${review_id}`).then(response => {
        return response;
    })
}