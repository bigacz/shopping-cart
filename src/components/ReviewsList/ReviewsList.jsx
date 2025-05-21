function ReviewsList({ reviews = [] }) {
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
      <div key={reviewerName}>
        <h2>Reviews</h2>
        <span>{reviewerName}</span>
        <span>{ratingTexts[rating - 1]}</span>
        <span>{comment}</span>
        <span>{formattedDate}</span>
      </div>
    );
  });

  return <div>{reviewsElements}</div>;
}

const ratingTexts = [
  'Disappointed',
  'Could be better',
  'Decent',
  'Liked it',
  'Loved it',
];

export default ReviewsList;
