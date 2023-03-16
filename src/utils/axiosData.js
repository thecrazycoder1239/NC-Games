import axios from "axios";

const gamesApi = axios.create({
    baseURL: "https://my-board-game-database.onrender.com/api"
})

export function getReviews(category) {
    let maybeUndefined = category
    if(category === "all reviews") {
        maybeUndefined = undefined
    }

    return gamesApi.get("/reviews", {
        params: {
            "category": maybeUndefined
        }}).then(response => {
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

export function postComment(review_id, loggedUser, commentBody) {
    return gamesApi.post(`/reviews/${review_id}/comments`, { username: loggedUser.username, body: commentBody}).then(response => {
        return response;
    })
}

export function getCategories() {
    return gamesApi.get("/categories").then(response => {
        return response;
    })
}

export function deleteYourComments(comment_id) {
    return gamesApi.delete(`/comments/${comment_id}`).then(response => {
        return response;
    })
}