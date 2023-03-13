import {useEffect, useState} from 'react';
import { getReview } from '../utils/axiosData';
import { useParams } from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress";

export default function ReviewId() {
    const [review, setReview] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    
    const { review_id } = useParams()


    useEffect(() => {
        getReview(review_id).then(response => {
            setReview(response.data.review)
            setIsLoading(false)
        })
    }, []);

    const returnItem = isLoading ? (
        <div className="progress-container">
        <h2>Loading review...</h2>
        <CircularProgress size={150} />
        </div>
      ) : (
        <section>
            <img src={review.review_img_url} alt="review image" className="review-id-img"/>
            <p className="review-title">{review.title}</p>
            <p className="review-designer">made by {review.designer}</p>
            <p>{review.review_body}</p>
            <div className="reviw-card-id-footer">
                <p className="review-owner">reviewed by {review.owner}</p>
                <p className="review-votes">votes: {review.votes}</p>
            </div>
         </section>
    )

    return <>{returnItem}</>
}