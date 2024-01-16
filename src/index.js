import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import loginSlice from './slices/loginSlice';
import turnedSlice from './slices/turnedSlice';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom';

console.warn = () => {};
console.error = () => {};


axios.defaults.baseURL = 'http://localhost:8000/';
const store = configureStore({
  reducer: { login: loginSlice, turned: turnedSlice }
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ChakraProvider>

        <App />

      </ChakraProvider>

    </BrowserRouter>



  </Provider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
