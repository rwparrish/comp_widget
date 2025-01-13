import React from 'react';
import BlockStack from './components/BlockStack';
import './App.css';

function App() {
  return (
    <div className="app">
      <BlockStack position="left" />
      <BlockStack position="right" />
    </div>
  );
}

export default App;
