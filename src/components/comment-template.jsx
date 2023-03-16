import { UsernameContext } from "../context/username";
import { useContext, useState } from "react";
import { deleteYourComments } from "../utils/axiosData";
import dayjs from "dayjs";

export default function CommentTemplate({comment, avatarUrl, setComments}) {
    const { loggedUser } = useContext(UsernameContext);
    const [deletingComment, setDeletingComment] = useState(false)

    let today = dayjs();
    let then = dayjs(comment.created_at);
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
    <li className="comment-wrapper">
        <img className="comment-profile-pic" alt="profile picture" src={avatarUrl}/>
        <p className="comment-author">{comment.author}</p>
        <p className="comment-body">{comment.body}</p>
        <div className="comment-footer">
            <p className="comment-date">{timePasted}</p>
            {loggedUser.username === comment.author ? <button disabled={deletingComment} className="comment-delete" onClick={() => {
            setDeletingComment(true)
            deleteYourComments(comment.comment_id).then(response => {
                setComments((currentComments) => {
                    let finalArrayOfComments = []
                    currentComments.map(commentToSend => {
                        if (commentToSend.comment_id !== comment.comment_id) {
                            finalArrayOfComments.push(commentToSend)
                        }
                    }) 
                    return finalArrayOfComments;
                })
                setDeletingComment(false)
            })
    }} class="comment-remover-btn">delete comment</button> : null}
    </div>
        {deletingComment ? <p>deleting comment...</p> : null}
    </li>
    )
}