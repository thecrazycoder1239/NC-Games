import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UsernameContext } from "../context/username";
import { getReviews } from "../utils/axiosData";
import ReviewCard from "./review-card";
import CircularProgress from "@mui/material/CircularProgress";


export default function Homepage() {
    const {loggedUser} = useContext(UsernameContext)
    const [hasSignedIn, setHasSignedIn] = useState(false)
    const [popularReviews, setPopularReviews] = useState([])
    const [trendyReviews, setTrendyReviews] = useState([])
    const [mostRecentReview, setMostRecentReview] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getReviews().then(response => {
            const reviews = response.data.reviews;
            setMostRecentReview(reviews[0])
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {
        getReviews(undefined, 'votes', 'desc').then(response => {
            const reviews = response.data.reviews;
            setPopularReviews(reviews.slice(0, 5))
        })
    }, [])

    useEffect(() => {
        getReviews(undefined, 'created_at', 'desc').then(response => {
            const reviews = response.data.reviews;
            setTrendyReviews(reviews.slice(0, 5))
        })
    }, [])

    useEffect(() => {
        if(loggedUser.username !== 'guest user') {
            setHasSignedIn(true)
        }
    }, [loggedUser.username])

    const returnItem = isLoading ? (
        <div className="progress-container">
        <h2>Loading reviews...</h2>
        <CircularProgress size={150} />
        </div>
      ) : (
    <>
        {!hasSignedIn ? <p className="welcome-message">Hello there! Just here for a browse? Feel free, but consider <Link to="/users" id="sign-in-link">signing in</Link> to like and comment on our board game reviews. </p> : <p className="welcome-message">Welcome back {loggedUser.name}!<br/> Browse, comment on and like our reviews to your hearts content</p>}

        <Link to={`/reviews/${mostRecentReview.review_id}`} className="most-recent-review">
            <img src={mostRecentReview.review_img_url} className="most-recent-review-img" alt="most-recent-review"/>
            <p className="check-out-this-review">check out our most recent review...</p>
            <p className="most-recent-review-title">
            {mostRecentReview.title}</p>
            <p className="most-recent-review-designer">made by {mostRecentReview.designer}</p>
        </Link>

        <Link to="/search" className="btn-style-none">
            <button className="all-reviews-btn">Search all reviews</button>
        </Link>

        <section className="most-popular-reviews">
            <h3 className="most-popular-reviews-title">Most popular reviews</h3>
            <ol className="review-list">
            {
            popularReviews.map(review => {
                    return (
                                <ReviewCard review={review}
                                key={review.review_id}/>
                            )
                })
            }
        </ol>
        </section>

        <section className="trendy-reviews">
            <h3 className="most-popular-reviews-title">Trending reviews</h3>
            <ol className="review-list">
            {
            trendyReviews.map(review => {
                    return (
                                <ReviewCard review={review}
                                key={review.review_id}/>
                            )
                })
            }
        </ol>
        </section>
        <br/><br/><br/><br/><br/><br/><br/><br/>
    </>
    )
    return returnItem;
}