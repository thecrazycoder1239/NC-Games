import { UsernameContext } from "../context/username";
import { useContext, useEffect, useState } from "react";
import { postComment } from "../utils/axiosData";
import { Link } from "react-router-dom";



export default function ReviewCommentAdder({ review_id, setComments }) {
    const { loggedUser } = useContext(UsernameContext);
    const [ eligibleForComment, setEligibleForComment ] = useState(true);
    const [ promptToSignIn, setPromptToSignIn] = useState(false);
    const [ commentBody, setCommentBody ] = useState("")
    const [ hasCommentBeenAdded, setHasCommentBeenAdded ] = useState(true) 

    useEffect(()=>{
        if(loggedUser.username === "guest user") {
            setEligibleForComment(false);
            setPromptToSignIn(true);
        }
    }, [])

    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            setHasCommentBeenAdded(false)
            setEligibleForComment(false)
            postComment(review_id, loggedUser, commentBody).then(commentFromApi => {
                setComments((currentComments) => {
                    setHasCommentBeenAdded(true)
                    setEligibleForComment(true)
                    return [ ...currentComments, commentFromApi.data.comment ]
                })
            })
        }}>
            <p>Commenting as</p>
            <Link to="/users" className="link">
            <img className="comment-profile" src={loggedUser.avatar_url} alt="profile picture"/>
            </Link>
            <p className="comment-username">{loggedUser.username}</p>
            {promptToSignIn ? <p>please sign in to comment</p> : null}
            <label htmlFor="comment-to-add">comment: </label>
            <input required value={commentBody} id="comment-to-add" onChange={(event) => {setCommentBody(event.target.value)}}></input>
            <button type="submit" disabled={!eligibleForComment}>Comment</button>
            {!hasCommentBeenAdded ? <p>adding comment...</p> : null}
        </form>
    )
}