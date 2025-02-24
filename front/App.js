import React, { useState } from 'react';
import axios from 'axios';
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
  margin-bottom: 15px; /* Опустили линию на 15 пикселей (5 + 10) */
`;

const Logo = styled.div`
  font-size: 32px;
  font-weight: bold;
  background: linear-gradient(45deg, #e1bd2e, #e45249); /* Градиент для текста */
  -webkit-background-clip: text; /* Применяем градиент к тексту */
  -webkit-text-fill-color: transparent; /* Делаем текст прозрачным */
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #4aa4ff, #ffffff); /* Градиент при наведении */
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
  margin-top: -4px; /* Ещё немного приподняли */
  position: fixed; /* Фиксируем боковую панель */
  height: calc(100vh - 80px); /* Высота равна высоте экрана минус верхняя панель */
  overflow-y: auto; /* Добавляем скролл, если категорий много */
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
  background-color: rgba(255, 255, 255, 0.1); /* Новый цвет для лучшей читаемости */
  margin-left: 240px; /* Отступ для боковой панели */
  height: calc(100vh - 80px); /* Высота равна высоте экрана минус верхняя панель */
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
  background-color: rgba(255, 255, 255, 0.1); /* Новый цвет для лучшей читаемости */
  margin-left: 240px; /* Отступ для боковой панели */
  height: calc(100vh - 80px); /* Высота равна высоте экрана минус верхняя панель */
  overflow-y: auto; /* Добавляем скролл */
`;

const Title = styled.h1`
  background-image: linear-gradient(to right, #ffffff, #d1d1d1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 4rem;
  margin-bottom: 20px;
`;

function App() {
  const [step, setStep] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([
    { id: 1, name: 'Смартфон', price: 500, description: 'Новый флагман' },
    { id: 2, name: 'Ноутбук', price: 1200, description: 'Мощный и стильный' },
    { id: 3, name: 'Наушники', price: 150, description: 'С шумоподавлением' },
    { id: 4, name: 'Планшет', price: 400, description: 'Легкий и компактный' },
    { id: 5, name: 'Умные часы', price: 250, description: 'С функцией отслеживания здоровья' },
    { id: 6, name: 'Фитнес-браслет', price: 80, description: 'Для активного образа жизни' },
    { id: 7, name: 'Камера', price: 700, description: '4K видео и 20 МП фото' },
    { id: 8, name: 'Монитор', price: 300, description: '27 дюймов, 144 Гц' },
    { id: 9, name: 'Клавиатура', price: 100, description: 'Механическая, RGB подсветка' },
    { id: 10, name: 'Мышь', price: 50, description: 'Игровая, 6 кнопок' },
    { id: 11, name: 'Колонки', price: 120, description: 'Стерео, мощный бас' },
    { id: 12, name: 'Микрофон', price: 90, description: 'Студийное качество звука' },
    { id: 13, name: 'Внешний жесткий диск', price: 80, description: '1 ТБ, USB 3.0' },
    { id: 14, name: 'SSD накопитель', price: 120, description: '500 ГБ, высокая скорость' },
    { id: 15, name: 'Роутер', price: 100, description: 'Wi-Fi 6, высокая скорость' },
    { id: 16, name: 'Игровая консоль', price: 500, description: 'Новое поколение' },
    { id: 17, name: 'Проектор', price: 600, description: 'Full HD, 3000 люмен' },
    { id: 18, name: 'Электронная книга', price: 150, description: 'Экран E-Ink, 8 ГБ' },
    { id: 19, name: 'Смарт-лампа', price: 50, description: 'Управление через приложение' },
    { id: 20, name: 'Беспроводной зарядник', price: 40, description: 'Быстрая зарядка' },
    { id: 21, name: 'Виртуальные очки', price: 400, description: 'Иммерсивный опыт' },
    { id: 22, name: 'Дрон', price: 300, description: '4K камера, стабилизация' },
    { id: 23, name: 'Электросамокат', price: 500, description: 'Дальность 30 км' },
    { id: 24, name: 'Умный термостат', price: 200, description: 'Экономия энергии' },
    { id: 25, name: 'Робот-пылесос', price: 400, description: 'Автономная уборка' },
  ]);

  const resetState = () => {
    setStep('home');
  };

  return (
      <Container>
        <HeaderContainer>
          <Logo onClick={resetState}>ZibertZone</Logo>
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
            <CartButton onClick={() => setStep('cart')}>🛒</CartButton>
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
                {products.map((product) => (
                    <ProductRow key={product.id}>
                      <ProductName>{product.name}</ProductName>
                      <ProductDescription>{product.description}</ProductDescription>
                      <ProductPrice>${product.price}</ProductPrice>
                    </ProductRow>
                ))}
              </ProductList>
          )}
          {step !== 'home' && (
              <ContentContainer>
                {step === 'smartphones' && <Title>Смартфоны</Title>}
                {step === 'laptops' && <Title>Ноутбуки</Title>}
                {step === 'headphones' && <Title>Наушники</Title>}
                {step === 'tablets' && <Title>Планшеты</Title>}
                {step === 'smartwatches' && <Title>Умные часы</Title>}
                {step === 'fitness' && <Title>Фитнес-браслеты</Title>}
                {step === 'register' && <Title>Регистрация</Title>}
                {step === 'login' && <Title>Авторизация</Title>}
                {step === 'cart' && <Title>Корзина</Title>}
                <p>Здесь будет происходить что-то интересное в будущем!</p>
              </ContentContainer>
          )}
        </MainContent>
      </Container>
  );
}

export default App;