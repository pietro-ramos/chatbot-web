import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './Chat.module.css';
import dialogo from '../../../../../server/src/handlers/dialogo.json';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [currentStep, setCurrentStep] = useState('welcome');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setMessages([{
      text: dialogo.welcome,
      user: false
    }]);
    
    const cityOptions = Object.keys(dialogo.cities).map(city => ({
      text: city,
      value: city
    }));
    setCurrentOptions(cityOptions);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOptionClick = async (option) => {
    const newMessage = { text: option.text, user: true };
    setMessages(prev => [...prev, newMessage]);

    try {
      if (currentStep === 'welcome') {
        setSelectedCity(option.value);
        const cityMenu = dialogo.cities[option.value].menu;
        const botMessage = { text: cityMenu, user: false };
        setMessages(prev => [...prev, botMessage]);
        
        const serviceTypes = [
          { text: 'Saúde', value: 'saude' },
          { text: 'Segurança', value: 'seguranca' },
          { text: 'Justiça', value: 'justica' },
          { text: 'Órgãos Públicos', value: 'orgaos_publicos' }
        ];
        setCurrentOptions(serviceTypes);
        setCurrentStep('service');
      } 
      else if (currentStep === 'service') {
        const serviceMenu = dialogo[option.value].menu;
        const botMessage = { text: serviceMenu, user: false };
        setMessages(prev => [...prev, botMessage]);

        const specificOptions = Object.entries(dialogo[option.value])
          .filter(([key]) => key !== 'menu')
          .map(([key, value]) => ({
            text: value,
            value: value
          }));
        setCurrentOptions(specificOptions);
        setCurrentStep('specific');
      }
      else if (currentStep === 'specific') {
        const response = await axios.get(`/api/service/${selectedCity}/${option.value}`);
        const botMessage = { text: response.data.response, user: false };
        setMessages(prev => [...prev, botMessage]);

        setCurrentOptions([
          { text: 'Iniciar Nova Consulta', value: 'restart' }
        ]);
        setCurrentStep('restart');
      }
      else if (currentStep === 'restart') {
        setMessages([{
          text: dialogo.welcome,
          user: false
        }]);
        const cityOptions = Object.keys(dialogo.cities).map(city => ({
          text: city,
          value: city
        }));
        setCurrentOptions(cityOptions);
        setSelectedCity('');
        setCurrentStep('welcome');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { 
        text: 'Desculpe, ocorreu um erro ao buscar as informações.', 
        user: false 
      };
      setMessages(prev => [...prev, errorMessage]);
      setCurrentOptions([
        { text: 'Tentar Novamente', value: 'restart' }
      ]);
      setCurrentStep('restart');
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesContainer}>
        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`${styles.message} ${msg.user ? styles.userMessage : styles.botMessage}`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className={styles.optionsContainer}>
        {currentOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className={styles.optionButton}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chat;