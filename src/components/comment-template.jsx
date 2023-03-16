import { UsernameContext } from "../context/username";
import { useContext, useState } from "react";
import { deleteYourComments } from "../utils/axiosData";

export default function CommentTemplate({comment, avatarUrl, setHasBeenDeleted}) {
    const { loggedUser } = useContext(UsernameContext);
    const [deletingComment, setDeletingComment] = useState(false)



    return (
    <li className="comment-wrapper">
        <img className="comment-profile-pic" alt="profile picture" src={avatarUrl}/>
        <p className="comment-author">{comment.author}</p>
        <p className="comment-body">{comment.body}</p>
        {loggedUser.username === comment.author ? <button disabled={deletingComment} className="comment-delete" onClick={() => {
        setDeletingComment(true)
        deleteYourComments(comment.comment_id).then(response => {
            setHasBeenDeleted(response.config.url)
            setDeletingComment(false)
        })
    }}>delete comment</button> : null}
        {deletingComment ? <p>deleting comment...</p> : null}
    </li>
    )
}