import { Star } from 'lucide-react';
import './StarRating.module.css';

function StarRating({ rating }) {
  const stars = [];

  let filledAmount = 5;
  if (!Number.isInteger(rating)) {
    filledAmount = 5;
  } else if (rating < 1) {
    filledAmount = 1;
  } else if (rating > 5) {
    filledAmount = 5;
  } else {
    filledAmount = rating;
  }

  for (let i = 0; i < filledAmount; i++) {
    stars.push(<Star key={i} fill="currentColor" data-testid="star-filled" />);
  }

  while (stars.length < 5) {
    stars.push(<Star key={stars.length} data-testid="star-empty" />);
  }

  return <div>{stars}</div>;
}

export default StarRating;
