import {useEffect, useState} from "react";
import {getCommentsByReview} from "../utils/axiosData";
import { useParams } from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress";

export default function ReviewIdComments() {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const {review_id} = useParams();


    useEffect(() => {
        getCommentsByReview(review_id).then(response => {
            setComments(response.data.comments)
            setIsLoading(false)
        })
    }, [])

    const returnItem = isLoading ? (
        <div className="progress-container">
        <h2>Loading review...</h2>
        <CircularProgress size={150} />
        </div>
      ) : (
        <ol className="comments-background">
           {comments.map(comment => {
            return (
                <li className="comment-wrapper">
                    <p className="comment-author">{comment.author}</p>
                    <p className="comment-body">{comment.body}</p>
                    <p className="comment-votes">votes = {comment.votes}</p>
                </li>
            )
           })}
        </ol>
    )
    
    return <>{returnItem}</>
}