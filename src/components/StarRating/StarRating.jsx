import { Star } from 'lucide-react';
import styles from './StarRating.module.css';

function StarRating({ rating, className }) {
  const stars = [];

  const roundedRating = Math.round(rating);

  let filledAmount = 5;
  if (!Number.isInteger(roundedRating)) {
    filledAmount = 5;
  } else if (roundedRating < 1) {
    filledAmount = 1;
  } else if (roundedRating > 5) {
    filledAmount = 5;
  } else {
    filledAmount = roundedRating;
  }

  for (let i = 0; i < filledAmount; i++) {
    stars.push(<Star key={i} fill="currentColor" data-testid="star-filled" />);
  }

  while (stars.length < 5) {
    stars.push(<Star key={stars.length} data-testid="star-empty" />);
  }

  const wrapperClasses = [styles.wrapper, className].join(' ');

  return <div className={wrapperClasses}>{stars}</div>;
}

export default StarRating;
