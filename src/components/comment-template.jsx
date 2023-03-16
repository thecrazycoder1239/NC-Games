import { UsernameContext } from "../context/username";
import { useContext, useState } from "react";
import { deleteYourComments } from "../utils/axiosData";

export default function CommentTemplate({comment, avatarUrl, setComments}) {
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
            setComments((currentComments) => {
                console.log(currentComments)
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
    }}>delete comment</button> : null}
        {deletingComment ? <p>deleting comment...</p> : null}
    </li>
    )
}