import React, { useEffect, useState } from 'react';
import './AnimatedPage.css';

const AnimatedPage = ({ children }: { children: React.ReactNode }) => {
  const [animationClass, setAnimationClass] = useState('page-initial');

  useEffect(() => {
    // Adiciona a classe para desativar o scroll no início da transição
    document.body.classList.add('page-transition-active');

    // Inicia a animação de entrada
    const startAnimationTimer = setTimeout(() => {
      setAnimationClass('page-enter');
    }, 10); // Pequeno delay para garantir que a classe inicial seja aplicada primeiro

    // Define um tempo para remover a classe que desativa o scroll
    // Este tempo deve ser igual ou maior que a duração da transição no CSS
    const endTransitionTimer = setTimeout(() => {
      document.body.classList.remove('page-transition-active');
    }, 300); // Duração da transição

    return () => {
      clearTimeout(startAnimationTimer);
      clearTimeout(endTransitionTimer);
      // Garante a remoção da classe ao desmontar o componente
      document.body.classList.remove('page-transition-active');
    };
  }, []);

  return (
    <div className={`page-transition ${animationClass}`}>
      {children}
    </div>
  );
};

export default AnimatedPage;
