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

export function getCommentsByReview(review_id) {
    return gamesApi.get(`/reviews/${review_id}/comments`).then(response => {
        return response;
    })
}

export function getUsers() {
    return gamesApi.get("/users").then(response => {
        return response;
    })
}

export function patchReview(review_id) {
    return gamesApi.patch(`/reviews/${review_id}`, { inc_votes: 1 }).then(response => {
        return response;
    })
}