import React from 'react';
import BlockStack from './components/BlockStack';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="block-stack-container">
        <BlockStack position="left" />
        <BlockStack position="right" />
      </div>
    </div>
  );
}

export default App;
