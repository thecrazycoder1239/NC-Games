import { patchReview } from "../utils/axiosData";
import { Link } from "react-router-dom";
import {useState, useContext, useEffect} from "react";
import { UsernameContext } from "../context/username";
import dayjs from "dayjs";


export default function ReviewCard({ review }) {
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

    let today = dayjs();
    let then = dayjs(review.created_at);
    let seconds = today.diff(then, 'seconds');
    let minutes = today.diff(then, 'minutes');
    let hours = today.diff(then, 'hours');
    let days = today.diff(then, 'days');
    let weeks = today.diff(then, 'weeks');
    let months = today.diff(then, 'months');
    let years = today.diff(then, 'years');

    let timePasted = null;

    if(seconds === 1) {
        timePasted = `posted ${seconds} second ago`
    } else if (seconds < 60) {
        timePasted = `posted ${seconds} seconds ago`
    } else if (minutes === 1) {
        timePasted = `posted ${minutes} minute ago`
    } else if (minutes < 60) {
        timePasted = `posted ${minutes} minutes ago`
    } else if (hours === 1) {
        timePasted = `posted ${hours} hour ago`
    } else if (hours < 24) {
        timePasted = `posted ${hours} hours ago`
    } else if (days === 1) {
        timePasted = `posted ${days} day ago`
    } else if (days < 7) {
        timePasted = `posted ${days} days ago`
    } else if (weeks === 1) {
        timePasted = `posted ${weeks} week ago`
    } else if (weeks < 4) {
        timePasted = `posted ${weeks} weeks ago`
    } else if (months === 1) {
        timePasted = `posted ${months} month ago`
    } else if (months < 12) {
        timePasted = `posted ${months} months ago`
    } else if (years === 1) {
        timePasted = `posted ${years} year ago`
    } else if (years) {
        timePasted = `posted ${years} years ago`
    }

    return (
        <li className="review-card">
            <Link to={`/reviews/${review.review_id}`} className="link">
            <img src={review.review_img_url} alt="review image" className="review-img"/>
            <p className="review-title">{review.title}</p>
            <div className="review-info">
                <p className="review-comment-count">{review.comment_count} comments</p>
                <p className="review-date">{timePasted}</p>
            </div>
            </Link>
            <div className="card-footer">
                <button onClick={onClick} disabled={userVote !== 0 || err || userErr} className="vote-btn">{review.votes + userVote} 👍</button>
                {err ? <p className="vote-error">please connect to wifi to vote</p> : null}
            </div>
        </li>
    )
}