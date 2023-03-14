

export default function ReviewCard({ review }) {
    return (
        <>
            <img src={review.review_img_url} alt="review image" className="review-img"/>
            <p className="review-title">{review.title}</p>
            <p className="review-designer">made by {review.designer}</p>
            <div className="card-footer">
                <p className="review-owner">reviewed by {review.owner}</p>
            </div>
        </>
    )
}