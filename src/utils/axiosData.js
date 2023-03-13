import axios from "axios";

const gamesApi = axios.create({
    baseURL: "https://my-board-game-database.onrender.com/api"
})

export function getReviews() {
    return gamesApi.get("/reviews").then(response => {
        return response;
    })
}

export function getReview(review_id) {
    return gamesApi.get(`/reviews/${review_id}`).then(response => {
        return response;
    })
}