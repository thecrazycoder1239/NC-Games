import {useState, useEffect} from "react";
import { getReviews } from "../utils/axiosData";
import CircularProgress from "@mui/material/CircularProgress";
import ReviewCard from "./review-card";



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
                                <ReviewCard review={review}
                                key={review.review_id}/>
                            )
                })
            }
        </ol>
    )
    return <>{returnItem}</>
}