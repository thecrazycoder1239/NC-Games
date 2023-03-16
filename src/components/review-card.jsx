import { patchReview } from "../utils/axiosData";
import { Link } from "react-router-dom";
import {useState, useContext, useEffect} from "react";
import { UsernameContext } from "../context/username";

export default function ReviewCard({ review, setReviews, review_id }) {
    const [err, setErr] = useState(false);
    const [userErr, setUserErr] = useState(false);
    const [userVote, setUserVote] = useState(0);
    const { loggedUser } = useContext(UsernameContext)
    
    
    const onClick = () => {
        setErr(false);
        setUserVote(1);
        patchReview(review.review_id).catch(() => {
            setUserVote(0);
            setErr(true);
        })
    }

    useEffect(() => {
        if(loggedUser.username === "guest user") {
            setUserErr(true)
        } else if(loggedUser.username !== "guest user") {
            setUserErr(false)
        }
    }, [])

    return (
        <li className="review-card">
            <Link to={`/reviews/${review.review_id}`} className="link">
            <img src={review.review_img_url} alt="review image" className="review-img"/>
            <p className="review-title">{review.title}</p>
            <p className="review-designer">made by {review.designer}</p>
            </Link>
            <div className="card-footer">
                <button onClick={onClick} disabled={userVote !== 0 || err || userErr} className="vote-btn">{review.votes} 👍</button>
                {err ? <p className="vote-error">please connect to wifi to vote</p> : null}
            </div>
        </li>
    )
}