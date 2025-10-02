import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage khi component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('perfumeShopCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage khi cartItems thay đổi
  useEffect(() => {
    localStorage.setItem('perfumeShopCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Nếu sản phẩm đã có trong giỏ, tăng số lượng
        return prevItems.map(item =>
          item.id === product.id 
            ? { ...item, quantity: Math.min(item.quantity + 1, 100) }
            : item
        );
      } else {
        // Nếu sản phẩm chưa có, thêm mới
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCartItem = (productId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'products':
        return <Products addToCart={addToCart} />;
      case 'cart':
        return (
          <Cart 
            cartItems={cartItems}
            updateCartItem={updateCartItem}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
          />
        );
      case 'orders':
        return <Orders />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <Header 
        cartItems={cartItems}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      
      <main className="main-content">
        {renderPage()}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;