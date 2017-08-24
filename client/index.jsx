import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';

const render = () => ReactDOM.render(<App />, document.getElementById('root'));
render();

if(module.hot){
  module.hot.accept('./components/app.jsx', render);
}
