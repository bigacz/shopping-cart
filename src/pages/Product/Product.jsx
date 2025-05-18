import { useOutletContext, useParams } from 'react-router';
import './Product.module.css';

function Product() {
  let { productId } = useParams();
  let products = useOutletContext();

  const product = products.find((element) => element.id == productId);
  if (product == null) {
    return <p>No product found!</p>;
  }

  return <div></div>;
}

export default Product;
