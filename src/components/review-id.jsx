

export default function ReviewId({ review }) {
    return (
        <section className="review-id-card">
            <img src={review.review_img_url} alt="review" className="review-id-img"/>
            <p className="review-id-title">{review.title}</p>
            <p className="review-id-designer">made by {review.designer}</p>
            <section className="review-id-review">
                <p className="review-id-body">{review.review_body}</p>
                <p className="review-id-owner">... reviewed by {review.owner}</p>
            </section>
         </section>
    )
}