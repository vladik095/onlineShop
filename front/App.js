import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: #ffffff;
`;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 12.2px;
  box-sizing: border-box;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
`;

const Logo = styled.div`
  font-size: 32px;
  font-weight: bold;
  background: linear-gradient(45deg, #e1bd2e, #e45249);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #4aa4ff, #ffffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const ContactInfo = styled.div`
  font-size: 18px;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 20px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 5px 10px;
`;

const SearchBar = styled.input`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  background: transparent;
  color: #ffffff;
  width: 300px;
  &::placeholder {
    color: #d1d1d1;
  }
`;

const MainContent = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 80px);
  margin-top: 80px;
`;

const CategoryContainer = styled.div`
  width: 200px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-right: 2px solid #ffffff;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: -4px;
  position: fixed;
  height: calc(100vh - 80px);
  overflow-y: auto;
`;

const CategoryButton = styled.button`
  background-color: #8a2be2;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 15px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  &:hover {
    background-color: #6a1b9a;
    transform: translateY(-2px);
  }
`;

const ProductList = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.1);
  margin-left: 240px;
  height: calc(100vh - 80px);
`;

const ProductRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  margin-bottom: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ProductName = styled.div`
  font-size: 20px;
  font-weight: bold;
  width: 30%;
`;

const ProductDescription = styled.div`
  font-size: 16px;
  color: #d1d1d1;
  width: 50%;
  text-align: center;
`;

const ProductPrice = styled.div`
  font-size: 18px;
  color: #d1d1d1;
  width: 20%;
  text-align: right;
`;

const AuthContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const CartButton = styled.button`
  background-color: #8a2be2;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 10px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #6a1b9a;
    transform: translateY(-2px);
  }
`;

const AuthButton = styled.button`
  background-color: #8a2be2;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #6a1b9a;
    transform: translateY(-2px);
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  margin-left: 240px;
  height: calc(100vh - 80px);
  overflow-y: auto;
`;

const Title = styled.h1`
  background-image: linear-gradient(to right, #ffffff, #d1d1d1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 4rem;
  margin-bottom: 20px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  padding: 30px;
  border-radius: 15px;
  width: 60%;
  max-width: 700px;
  color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

const ProductDetailsContainer = styled.div`
  display: flex;
  gap: 30px;
`;

const ProductImage = styled.div`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ProductTitle = styled.h2`
  margin: 0;
  font-size: 28px;
`;

const ProductDescriptionModal = styled.p`
  margin: 10px 0;
`;

const ProductSpecs = styled.div`
  margin-top: 15px;
`;

const SpecItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const AddToCartButton = styled.button`
  background-color: #8a2be2;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 15px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #6a1b9a;
    transform: translateY(-2px);
  }
`;

function App() {
  const [step, setStep] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products] = useState([
    {
      id: 1,
      name: 'Смартфон',
      price: 500,
      description: 'Новый флагман с потрясающим дисплеем и камерой',
      specs: {
        'Экран': '6.7" AMOLED',
        'Процессор': 'Snapdragon 888',
        'Память': '128 ГБ',
        'ОЗУ': '8 ГБ',
        'Камера': '108 МП + 12 МП + 8 МП',
        'Батарея': '5000 мАч'
      },
      category: 'smartphone'
    },
    {
      id: 2,
      name: 'Ноутбук',
      price: 1200,
      description: 'Мощный и стильный ноутбук для работы и игр',
      specs: {
        'Экран': '15.6" IPS',
        'Процессор': 'Intel Core i7',
        'Видеокарта': 'NVIDIA RTX 3060',
        'Память': '512 ГБ SSD',
        'ОЗУ': '16 ГБ',
        'ОС': 'Windows 11'
      },
      category: 'laptop'
    },
    {
      id: 3,
      name: 'Наушники',
      price: 150,
      description: 'С шумоподавлением',
      specs: {
        'Тип': 'Накладные',
        'Звук': 'Hi-Res Audio',
        'Шумоподавление': 'Активное',
        'Аккумулятор': '30 часов работы',
        'Вес': '250 г'
      },
      category: 'headphones'
    },
    {
      id: 4,
      name: 'Планшет',
      price: 400,
      description: 'Легкий и компактный',
      specs: {
        'Экран': '10.5" IPS',
        'Процессор': 'Snapdragon 860',
        'Память': '64 ГБ',
        'ОЗУ': '4 ГБ',
        'Батарея': '7000 мАч',
        'ОС': 'Android 12'
      },
      category: 'tablet'
    },
    {
      id: 5,
      name: 'Умные часы',
      price: 250,
      description: 'С функцией отслеживания здоровья',
      specs: {
        'Экран': '1.78" AMOLED',
        'Совместимость': 'Android/iOS',
        'Давление': 'Измерение давления',
        'Пульс': 'Мониторинг пульса',
        'Водозащита': '5 ATM',
        'Батарея': '7 дней работы'
      },
      category: 'smartwatch'
    }
  ]);

  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        return prevCart.map(item =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    closeProductModal();
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);

      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
            item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
      } else {
        return prevCart.filter(item => item.id !== productId);
      }
    });
  };

  const removeProductCompletely = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
      <Container>
        {selectedProduct && (
            <ModalOverlay onClick={closeProductModal}>
              <ModalContent onClick={e => e.stopPropagation()}>
                <CloseButton onClick={closeProductModal}>×</CloseButton>
                <ProductDetailsContainer>
                  <ProductImage>
                    {selectedProduct.name} Image
                  </ProductImage>
                  <ProductInfo>
                    <ProductTitle>{selectedProduct.name}</ProductTitle>
                    <ProductPrice>${selectedProduct.price}</ProductPrice>
                    <ProductDescriptionModal>{selectedProduct.description}</ProductDescriptionModal>

                    <ProductSpecs>
                      <h3>Характеристики:</h3>
                      {Object.entries(selectedProduct.specs).map(([key, value]) => (
                          <SpecItem key={key}>
                            <span>{key}:</span>
                            <span>{value}</span>
                          </SpecItem>
                      ))}
                    </ProductSpecs>

                    <AddToCartButton onClick={() => addToCart(selectedProduct)}>
                      Добавить в корзину
                    </AddToCartButton>
                  </ProductInfo>
                </ProductDetailsContainer>
              </ModalContent>
            </ModalOverlay>
        )}

        <HeaderContainer>
          <Logo onClick={() => {
            setStep('home');
            setSearchQuery('');
          }}>ZibertZone</Logo>
          <SearchBarContainer>
            <span>🔍</span>
            <SearchBar
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchBarContainer>
          <ContactInfo>
            <span>Контактные данные:</span>
            <span>+375-44-550-33-62</span>
          </ContactInfo>
          <AuthContainer>
            <CartButton onClick={() => setStep('cart')}>
              🛒 {getCartItemCount() > 0 && <span>({getCartItemCount()})</span>}
            </CartButton>
            <AuthButton onClick={() => setStep('register')}>Регистрация</AuthButton>
            <AuthButton onClick={() => setStep('login')}>Авторизация</AuthButton>
          </AuthContainer>
        </HeaderContainer>

        <MainContent>
          <CategoryContainer>
            <CategoryButton onClick={() => setStep('smartphones')}>Смартфоны</CategoryButton>
            <CategoryButton onClick={() => setStep('laptops')}>Ноутбуки</CategoryButton>
            <CategoryButton onClick={() => setStep('headphones')}>Наушники</CategoryButton>
            <CategoryButton onClick={() => setStep('tablets')}>Планшеты</CategoryButton>
            <CategoryButton onClick={() => setStep('smartwatches')}>Умные часы</CategoryButton>
            <CategoryButton onClick={() => setStep('fitness')}>Фитнес-браслеты</CategoryButton>
          </CategoryContainer>

          {step === 'home' && (
              <ProductList>
                {products
                    .filter(product =>
                        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((product) => (
                        <ProductRow key={product.id} onClick={() => openProductModal(product)}>
                          <ProductName>{product.name}</ProductName>
                          <ProductDescription>{product.description}</ProductDescription>
                          <ProductPrice>${product.price}</ProductPrice>
                        </ProductRow>
                    ))}
              </ProductList>
          )}

          {step === 'cart' && (
              <ContentContainer>
                <Title>Корзина</Title>
                {cart.length === 0 ? (
                    <p>Ваша корзина пуста</p>
                ) : (
                    <>
                      <div style={{ width: '100%', maxWidth: '800px' }}>
                        {cart.map((item) => (
                            <ProductRow key={item.id}>
                              <ProductName>{item.name}</ProductName>
                              <ProductDescription>{item.description}</ProductDescription>
                              <div>
                                <button onClick={(e) => {
                                  e.stopPropagation();
                                  removeFromCart(item.id);
                                }}>-</button>
                                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                                <button onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(item);
                                }}>+</button>
                              </div>
                              <ProductPrice>${item.price * item.quantity}</ProductPrice>
                              <button onClick={(e) => {
                                e.stopPropagation();
                                removeProductCompletely(item.id);
                              }}>Удалить</button>
                            </ProductRow>
                        ))}
                      </div>
                      <div style={{ marginTop: '20px', fontSize: '24px', fontWeight: 'bold' }}>
                        Общая сумма: ${getTotalPrice()}
                      </div>
                      <button
                          style={{
                            marginTop: '20px',
                            padding: '15px 30px',
                            fontSize: '18px',
                            backgroundColor: '#8a2be2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer'
                          }}
                          onClick={() => alert('Заказ оформлен! Спасибо за покупку!')}
                      >
                        Оформить заказ
                      </button>
                    </>
                )}
              </ContentContainer>
          )}

          {step !== 'home' && step !== 'cart' && (
              <ContentContainer>
                {step === 'smartphones' && <Title>Смартфоны</Title>}
                {step === 'laptops' && <Title>Ноутбуки</Title>}
                {step === 'headphones' && <Title>Наушники</Title>}
                {step === 'tablets' && <Title>Планшеты</Title>}
                {step === 'smartwatches' && <Title>Умные часы</Title>}
                {step === 'fitness' && <Title>Фитнес-браслеты</Title>}
                {step === 'register' && <Title>Регистрация</Title>}
                {step === 'login' && <Title>Авторизация</Title>}

                <div style={{ marginTop: '20px', width: '80%' }}>
                  {step === 'smartphones' && (
                      <ProductList>
                        {products.filter(p => p.category === 'smartphone').map(product => (
                            <ProductRow key={product.id} onClick={() => openProductModal(product)}>
                              <ProductName>{product.name}</ProductName>
                              <ProductDescription>{product.description}</ProductDescription>
                              <ProductPrice>${product.price}</ProductPrice>
                            </ProductRow>
                        ))}
                      </ProductList>
                  )}

                  {step === 'laptops' && (
                      <ProductList>
                        {products.filter(p => p.category === 'laptop').map(product => (
                            <ProductRow key={product.id} onClick={() => openProductModal(product)}>
                              <ProductName>{product.name}</ProductName>
                              <ProductDescription>{product.description}</ProductDescription>
                              <ProductPrice>${product.price}</ProductPrice>
                            </ProductRow>
                        ))}
                      </ProductList>
                  )}

                  {step === 'headphones' && (
                      <ProductList>
                        {products.filter(p => p.category === 'headphones').map(product => (
                            <ProductRow key={product.id} onClick={() => openProductModal(product)}>
                              <ProductName>{product.name}</ProductName>
                              <ProductDescription>{product.description}</ProductDescription>
                              <ProductPrice>${product.price}</ProductPrice>
                            </ProductRow>
                        ))}
                      </ProductList>
                  )}

                  {step === 'tablets' && (
                      <ProductList>
                        {products.filter(p => p.category === 'tablet').map(product => (
                            <ProductRow key={product.id} onClick={() => openProductModal(product)}>
                              <ProductName>{product.name}</ProductName>
                              <ProductDescription>{product.description}</ProductDescription>
                              <ProductPrice>${product.price}</ProductPrice>
                            </ProductRow>
                        ))}
                      </ProductList>
                  )}

                  {step === 'smartwatches' && (
                      <ProductList>
                        {products.filter(p => p.category === 'smartwatch').map(product => (
                            <ProductRow key={product.id} onClick={() => openProductModal(product)}>
                              <ProductName>{product.name}</ProductName>
                              <ProductDescription>{product.description}</ProductDescription>
                              <ProductPrice>${product.price}</ProductPrice>
                            </ProductRow>
                        ))}
                      </ProductList>
                  )}

                  {['register', 'login', 'fitness'].includes(step) && (
                      <p>Здесь будет происходить что-то интересное в будущем!</p>
                  )}
                </div>
              </ContentContainer>
          )}
        </MainContent>
      </Container>
  );
}

export default App;