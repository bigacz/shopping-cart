import styles from './ReviewsList.module.css';

function ReviewsList({ reviews = [], className }) {
  if (reviews.length === 0) {
    return <p>There are no reviews for this product</p>;
  }
  const reviewsElements = reviews.map((review) => {
    const { reviewerName, rating, comment, date } = review;

    const dateObject = new Date(date);

    const formattedDate = dateObject.toLocaleString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    return (
      <div key={reviewerName} className={styles.review}>
        <span className={styles.rating}>{ratingTexts[rating - 1]}</span>
        <span className={styles.date}>{formattedDate}</span>
        <span className={styles.comment}>{comment}</span>
        <span className={styles.name}>{reviewerName}</span>
      </div>
    );
  });

  const wrapperClasses = [styles.wrapper, className].join(' ');

  return (
    <div className={wrapperClasses}>
      <h2>Reviews</h2>
      {reviewsElements}
    </div>
  );
}

const ratingTexts = [
  'Disappointed',
  'Could be better',
  'Decent',
  'Liked it',
  'Loved it',
];

export default ReviewsList;
