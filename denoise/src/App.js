import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Button } from '@material-ui/core';


function App() {
  return (
    <div className="App">
      <p> Low Dose CT Denoising Tool: Upload your test image, prediction download will begin automatically. </p>

      <Button variant="contained" id="main">Upload Images</Button>

      <div className="footer">
      <p> Made with by Sepehr Ataei</p>
      </div>
    </div>
  );
}

export default App;
