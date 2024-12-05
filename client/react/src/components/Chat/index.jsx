import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './Chat.module.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [currentStep, setCurrentStep] = useState('welcome');
  const messagesEndRef = useRef(null);

  // Service type mapping
  const serviceTypes = {
    saude: 'Saúde',
    seguranca: 'Segurança',
    justica: 'Justiça',
    orgaos_publicos: 'Órgãos Públicos'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    console.log('Initial render - Setting welcome message');
    setMessages([{
      text: "Bem-vindo! Por favor, escolha a cidade para a qual deseja informações:",
      user: false
    }]);
    
    setCurrentOptions([
      { text: 'Osório', value: 'osorio' },
      { text: 'Tramandaí', value: 'tramandai' },
      { text: 'Santo Antônio da Patrulha', value: 'santo_antonio' },
      { text: 'Capão da Canoa', value: 'capao' }
    ]);
  }, []);

  useEffect(() => {
    console.log('Messages updated:', messages);
    scrollToBottom();
  }, [messages]);

  const formatServiceResponse = (response) => {
    if (response === 'Serviço não encontrado.') {
      return `Desculpe, não encontramos serviços desta categoria para a cidade selecionada.`;
    }
    return response;
  };

  const handleOptionClick = async (option) => {
    console.log('Option clicked:', option);
    console.log('Current step:', currentStep);
    console.log('Selected city:', selectedCity);

    const newMessage = { text: option.text, user: true };
    setMessages(prev => [...prev, newMessage]);

    try {
      if (currentStep === 'welcome') {
        console.log('Processing city selection:', option.value);
        setSelectedCity(option.value);
        const botMessage = {
          text: `Você escolheu ${option.text}. Qual tipo de serviço você deseja consultar?`,
          user: false
        };
        setMessages(prev => [...prev, botMessage]);
        
        setCurrentOptions([
          { text: 'Saúde', value: 'saude' },
          { text: 'Segurança', value: 'seguranca' },
          { text: 'Justiça', value: 'justica' },
          { text: 'Órgãos Públicos', value: 'orgaos_publicos' }
        ]);
        setCurrentStep('service');
      } 
      else if (currentStep === 'service') {
        console.log('Making API request for:', selectedCity, option.value);
        console.log('API URL:', `/api/service/${selectedCity}/${option.value}`);
        
        const response = await axios.get(`/api/service/${selectedCity}/${option.value}`);
        console.log('API response:', response.data);
        
        const formattedResponse = formatServiceResponse(response.data.response);
        const botMessage = {
          text: `Serviços de ${serviceTypes[option.value]} em ${selectedCity}:\n\n${formattedResponse}`,
          user: false
        };
        setMessages(prev => [...prev, botMessage]);

        setCurrentOptions([
          { text: 'Realizar Nova Consulta', value: 'restart' }
        ]);
        setCurrentStep('restart');
      }
      else if (currentStep === 'restart') {
        console.log('Restarting chat');
        setMessages([{
          text: "Bem-vindo! Por favor, escolha a cidade para a qual deseja informações:",
          user: false
        }]);
        setCurrentOptions([
          { text: 'Osório', value: 'osorio' },
          { text: 'Tramandaí', value: 'tramandai' },
          { text: 'Santo Antônio da Patrulha', value: 'santo_antonio' },
          { text: 'Capão da Canoa', value: 'capao' }
        ]);
        setSelectedCity('');
        setCurrentStep('welcome');
      }
    } catch (error) {
      console.error('Error details:', error.response || error);
      const errorMessage = { 
        text: 'Desculpe, ocorreu um erro ao buscar as informações. Por favor, tente novamente.', 
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