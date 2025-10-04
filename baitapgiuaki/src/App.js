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
  const [wishlist, setWishlist] = useState([]);

  // Load data từ localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('perfumeShopCart');
    const savedWishlist = localStorage.getItem('perfumeShopWishlist');
    
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      // Đảm bảo mỗi item trong cart có đầy đủ thuộc tính
      const validatedCart = parsedCart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description,
        quantity: item.quantity || 1
      }));
      setCartItems(validatedCart);
    }
    
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Lắng nghe hash changes để chuyển trang
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['home', 'products', 'cart', 'orders'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('perfumeShopCart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('perfumeShopWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // HÀM ADD TO CART - FIX LỖI HÌNH ẢNH
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id 
            ? { 
                ...item, 
                quantity: Math.min(item.quantity + 1, 100),
                image: product.image,
                name: product.name,
                price: product.price,
                description: product.description
              }
            : item
        );
      } else {
        return [...prevItems, { 
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          quantity: 1
        }];
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

  const addToWishlist = (product) => {
    setWishlist(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'products':
        return <Products addToCart={addToCart} addToWishlist={addToWishlist} wishlist={wishlist} />;
      case 'cart':
        return (
          <Cart 
            cartItems={cartItems}
            updateCartItem={updateCartItem}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            onPageChange={setCurrentPage}
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
        onPageChange={(page) => {
          setCurrentPage(page);
          window.location.hash = page;
        }}
      />
      
      <main className="main-content">
        {renderPage()}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;