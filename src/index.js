import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


let DATA = [];

fetch("http://localhost:8000/tasks")
.then(res => res.json())
.then(
  (result) => {
     console.log(result.data);
    DATA = result.data;
    ReactDOM.render(
    <React.StrictMode>
      <App tasks={DATA} />
    </React.StrictMode>,
    document.getElementById('root')
  );
  },
  (error) => {
  }
)


