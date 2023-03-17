import { UsernameContext } from "../context/username";
import { useContext, useEffect, useState } from "react";
import { postComment } from "../utils/axiosData";
import { Link } from "react-router-dom";



export default function ReviewCommentAdder({ review_id, setComments }) {
    const { loggedUser } = useContext(UsernameContext);
    const [ eligibleForComment, setEligibleForComment ] = useState(true);
    const [ promptToSignIn, setPromptToSignIn] = useState(false);
    const [ commentBody, setCommentBody ] = useState("");
    const [ hasCommentBeenAdded, setHasCommentBeenAdded ] = useState(true);
    const [ commentFailed, setCommentFailed ] = useState(false)

    useEffect(()=>{
        if(loggedUser.username === "guest user") {
            setEligibleForComment(false);
            setPromptToSignIn(true);
        }
    }, [loggedUser.username])

    return (
        <form className="comment-adder-form" onSubmit={(event) => {
            event.preventDefault()
            setHasCommentBeenAdded(false)
            setEligibleForComment(false)
            postComment(review_id, loggedUser, commentBody).then(commentFromApi => {
                setComments((currentComments) => {
                    setHasCommentBeenAdded(true)
                    setEligibleForComment(true)
                    setCommentBody("")
                    return [ commentFromApi.data.comment , ...currentComments ]
                })
            }).catch((err => {
                setHasCommentBeenAdded(true)
                setCommentFailed(true)
            }))
        }}>
            <p className="commenting-as">Commenting as...</p>
            <p className="comment-adder-username">{loggedUser.username}</p>
            <Link to="/users" className="link">
            <img className="comment-adder-profile" src={loggedUser.avatar_url} alt="profile"/>
            </Link>
            <textarea placeholder="comment..." required value={commentBody} id="comment-adder-input" onChange={(event) => {setCommentBody(event.target.value)}}></textarea>
            <button className="comment-adder-button" type="submit" disabled={!eligibleForComment}>Comment</button>
            {promptToSignIn ? <p className="comment-error">please <Link to="/users" id="sign-in-link">sign in</Link> to comment</p> : null}
            {!hasCommentBeenAdded ? <p className="comment-error">adding comment...</p> : null}
            {commentFailed ? <p className="comment-error">comment failed to submit, please connect to wifi</p> : null}
        </form>
    )
}