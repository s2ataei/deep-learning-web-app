import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Button } from '@material-ui/core';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <p> Low Dose CT Denoising Tool: Upload your test image, prediction download will begin automatically. </p>

      <input type="file" className="form-control" name="upload_file" id="main" />

      <div className="submit-button">
        <Button variant="contained" type="submit" onClick={()=>this.submit()}>Upload Image</Button>
      </div>

      <div className="footer">
      <p> Made with by Sepehr Ataei</p>
      </div>
    </div>
  );
}

export default App;

submit(){

    const data = new FormData() 

    data.append('file', this.state.selectedFile)

    console.warn(this.state.selectedFile);

    let url = "/upload/";


    axios.post(url, data, { // receive two parameter endpoint url ,form data

    })

    .then(res => { // then print response status

        console.warn(res);

    })


}
