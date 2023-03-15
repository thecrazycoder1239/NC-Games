import { patchReview } from "../utils/axiosData";
import { Link } from "react-router-dom";
import {useState, useEffect} from "react";

export default function ReviewCard({ review, setReviews, review_id }) {
    const [err, setErr] = useState(false);
    const [userVote, setUserVote] = useState(0);
    
    const onClick = () => {
        setErr(false);
        setUserVote(1);
        patchReview(review.review_id).catch(() => {
            setUserVote(0);
            setErr(true);
        })
    }

    return (
        <li className="review-card">
            <Link to={`/reviews/${review.review_id}`} className="link">
            <img src={review.review_img_url} alt="review image" className="review-img"/>
            {err ? <p>{err}</p> : null}
            <p className="review-title">{review.title}</p>
            <p className="review-designer">made by {review.designer}</p>
            </Link>
            <div className="card-footer">
                <p className="review-votes">votes: {review.votes + userVote}</p>
                <button onClick={onClick} disabled={userVote !== 0} className="vote-btn">vote</button>
            </div>
        </li>
    )
}