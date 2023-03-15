

export default function ReviewIdComments({comments, users}) {

    let returnItem = null;
    if (comments.length !== 0){
        returnItem = (
            <ol className="comments-background">
                <h2 className="comments-title">Comments</h2>
               {comments.map(comment => {
                let avatarUrl = null
                users.map(user => {
                    if(user.username === comment.author) {
                        avatarUrl = user.avatar_url
                    }
                })


                return (
                    <li key={comment.comment_id} className="comment-wrapper">
                        <img className="comment-profile-pic" alt="profile picture" src={avatarUrl}/>
                        <p className="comment-author">{comment.author}</p>
                        <p className="comment-body">{comment.body}</p>
                    </li>
                )
               })}
            </ol>
        )
    } else if (comments.length === 0) {
        returnItem = (
            <ol className="comments-background">
                <h2 className="comments-title">Comments</h2>
                <li className="no-comment" key="no-comments">There are currently no comments on this review!</li>
                <p className="no-comment">Feel free to change this and add one below</p>
            </ol>
        )
    }
    
    return <>{returnItem}</>
}