import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import './Articles.css';

const MontrePromo = () => {
  const { addToCart } = useContext(CartContext);
  const [notification, setNotification] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);
  const [userId, setUserId] = useState('You'); // Mock current user ID

  useEffect(() => {
    // Load reviews from localStorage
    const storedReviews = JSON.parse(localStorage.getItem('montrePromoReviews')) || [
      { id: 1, text: "Great value for money. Love the design!", author: "Alice", rating: 5, userId: "Alice" },
      { id: 2, text: "Good quality but the strap could be improved.", author: "Bob", rating: 4, userId: "Bob" },
    ];
    setReviews(storedReviews);
  }, []);

  useEffect(() => {
    // Save reviews to localStorage whenever reviews change
    localStorage.setItem('montrePromoReviews', JSON.stringify(reviews));
  }, [reviews]);

  const product = {
    id: 13,
    name: 'Montre Promo',
    price: '39.99$',
    image: `${process.env.PUBLIC_URL}/assets/montre1.jpg`,
    description: 'Elegant and functional watches for all occasions. Special promo price!',
    advantages: [
      'Precise timekeeping',
      'Stylish design',
      'Durable build',
    ],
  };

  const handleAddToCart = () => {
    addToCart(product);
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
    }, 3000); // Notification visible pendant 3 secondes
  };

  const handleAddReview = () => {
    if (newReview.trim()) {
      setReviews([...reviews, { id: Date.now(), text: newReview, author: 'You', rating, userId }]);
      setNewReview('');
      setRating(5);
    }
  };

  const handleDeleteReview = (id) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  return (
    <div className="product-detail">
      <div className="breadcrumb">
        <Link to="/">Accueil</Link> {'>'} <Link to="/products">Products</Link> {'>'} Montre Promo
      </div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <div className="text-content">
        <p>Price: {product.price}</p>
        <p>{product.description}</p>
        <h3>Advantages:</h3>
        <ul>
          {product.advantages.map((advantage, index) => (
            <li key={index}>{advantage}</li>
          ))}
        </ul>
      </div>
      <button className="add-to-cart" onClick={handleAddToCart}>Ajouter au panier</button>
      {notification && <div className="notification">Produit ajouté au panier !</div>}

      <div className="reviews-section">
        <h3>Reviews:</h3>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className="review-card">
              <p>{review.text}</p>
              <p><strong>{review.author}</strong></p>
              <p>{"⭐".repeat(review.rating)}</p>
              {review.userId === userId && (
                <button onClick={() => handleDeleteReview(review.id)} className="delete-review-button">Supprimer</button>
              )}
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}

        <div className="add-review">
          <h3>Add Your Review:</h3>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here..."
          />
          <div>
            <label>Rating:</label>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[5, 4, 3, 2, 1].map(num => (
                <option key={num} value={num}>{num} ⭐</option>
              ))}
            </select>
          </div>
          <button onClick={handleAddReview}>Submit Review</button>
        </div>
      </div>
    </div>
  );
};

export default MontrePromo;
