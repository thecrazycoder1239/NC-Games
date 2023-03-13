import {useState, useEffect} from "react";
import { getReviews } from "../utils/axiosData";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";


export default function ShowReviews() {
    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getReviews().then(response => {
            setReviews(response.data.reviews)
            setIsLoading(false)
        })
    },[])

    const returnItem = isLoading ? (
    <div className="progress-container">
    <h2>Loading reviews...</h2>
    <CircularProgress size={150} />
    </div>
  ) : ( 
        <ol className="review-list">
            {
                reviews.map(review => {
                    return (
                        <li key={review.review_id} className="review-card">
                            <Link to={`/reviews/${review.review_id}`}>
                                <img src={review.review_img_url} alt="review image" className="review-img"/>
                                <p className="review-title">{review.title}</p>
                                <p className="review-designer">made by {review.designer}</p>
                                <div className="card-footer">
                                    <p className="review-owner">reviewed by {review.owner}</p>
                                    <p className="review-votes">votes: {review.votes}</p>
                                </div>
                            </Link>
                        </li>
                    )
                })
            }
        </ol>
    )
    return <>{returnItem}</>
}