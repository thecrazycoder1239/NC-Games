import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UsernameContext } from "../context/username";
import { getReviews } from "../utils/axiosData";


export default function Homepage() {
    const {loggedUser} = useContext(UsernameContext)
    const [hasSignedIn, setHasSignedIn] = useState(false)
    const [reviews, setReviews] = useState([])
    const [mostRecentReview, setMostRecentReview] = useState("")

    useEffect(() => {
        getReviews().then(response => {
            const reviews = response.data.reviews;
            setReviews(reviews)
            setMostRecentReview(reviews[0])
        })
    }, [])

    useEffect(() => {
        if(loggedUser.username !== 'guest user') {
            setHasSignedIn(true)
        }
    }, [])

    return (
    <>
        {!hasSignedIn ? <p className="welcome-message">Hello there! Just here for a browse? Feel free, but consider <Link to="/users" id="sign-in-link">signing in</Link> to like and comment on our board game reviews. </p> : <p className="welcome-message">Welcome back {loggedUser.name}!<br/> Browse, comment on and like our reviews to your hearts content</p>}

        <Link to={`/reviews/${mostRecentReview.review_id}`} className="most-recent-review">
            <img src={mostRecentReview.review_img_url} className="most-recent-review-img"/>
            <p className="check-out-this-review">check out our most recent review...</p>
            <p className="most-recent-review-title">
            {mostRecentReview.title}</p>
            <p className="most-recent-review-designer">made by {mostRecentReview.designer}</p>
        </Link>

        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

        <Link to="/search" className="btn-style-none">
            <button className="all-reviews-btn">Search all reviews</button>
        </Link>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </>
    )
}