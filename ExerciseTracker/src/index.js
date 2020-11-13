import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
//not writing any custom css else would have imported that as well, hence commenting
import App from './App'; //./App is where we are gonna do our react app 


//ReactDOM.render renders the app and put it at the document.getElementById('root') as discussed in index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

