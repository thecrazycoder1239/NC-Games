import {useState, useEffect} from "react";
import getReviews from "../utils/axiosData";


export default function ShowReviews() {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        getReviews().then(response => {
            setReviews(response.data.reviews)
        })
    },[])

    return (
        <ol className="review-list">
            {
                reviews.map(review => {
                    return (
                        <li key={review.review_id} className="review-card">
                            <img src={review.review_img_url} alt="review image" className="review-img"/>
                            <p className="review-title">{review.title}</p>
                            <p className="review-designer">made by {review.designer}</p>
                            <div className="card-footer">
                                <p className="review-owner">reviewed by {review.owner}</p>
                                <p className="review-votes">votes: {review.votes}</p>
                            </div>
                        </li>
                    )
                })
            }
        </ol>
    )
}