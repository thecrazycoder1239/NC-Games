import axios from "axios";

const gamesApi = axios.create({
    baseURL: "https://my-board-game-database.onrender.com/api"
})

export function getReviews(category, sort_by, order) {
    let maybeUndefinedCategory = category
    let maybeUndefinedSortBy = sort_by
    let maybeUndefinedOrderBy = order

    if(category === "all reviews") {
        maybeUndefinedCategory = undefined
    }

    if(sort_by === "sort by") {
        maybeUndefinedSortBy = undefined
    }

    if(order === "order by") {
        maybeUndefinedOrderBy = undefined
    }

    console.log(maybeUndefinedOrderBy)

    return gamesApi.get("/reviews", {
        params: {
            "category": maybeUndefinedCategory,
            "sort_by": maybeUndefinedSortBy,
            "order_by": maybeUndefinedOrderBy
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