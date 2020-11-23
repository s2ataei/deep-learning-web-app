import Promise from 'bluebird'
import React, { useRef, useState } from 'react'
import './App.css'
import { Button } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';


const uploadFile = (file) =>
  fetch(`https://rndao4oe18.execute-api.ca-central-1.amazonaws.com/api/upload/${file.name}`, {
    headers: {
      Accept: 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    body: file,
  })

const uploadFiles = (...files) => Promise.mapSeries(files, uploadFile)
  .map(response => response.json())
  .map(({ file_name }) => file_name)



const App = () => {
  const calculateHistogram = (file) => {
    console.log(file)
    let n = file.uploadedFiles[0].indexOf(".com/")
    let fileName = file.uploadedFiles[0].substr(n+5)
    fetch(`https://rndao4oe18.execute-api.ca-central-1.amazonaws.com/api/histogram/${fileName}`, {
      method: 'GET',
      mode: 'cors',
    })
    .then(response => response.json())
    .then(({ hist_name }) => updateHistograms(hist_name))
  }

  const [histograms, updateHistograms] = useState([])
  const uploadRef = useRef(null)
  const [files, setFiles] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([])
  const updateFiles = () => setFiles([...uploadRef.current.files])
  const submitFiles = async () => {
    const filenames = await uploadFiles(...files)
    setUploadedFiles(filenames)
  }

  return (
    <div className="App">
      <h2>
        Image Processing Tool: Please upload a PNG image. 
      </h2>
      <input
        id="file-input"
        type="file"
        accept="image/*,application/dicom"
        multiple
        ref={uploadRef}
        onChange={updateFiles}
        style={{ display: 'none' }}
      />
      <label htmlFor="file-input">
        <Button variant="contained" color="primary" component="span">
          Select Images
        </Button>
      </label>
      <br />
      {files.length ? `${files.length} files selected` : ''}
      <div className="submit-button">
        <Button variant="contained" type="submit" onClick={submitFiles}>
          Upload Images
        </Button>
      </div>
      <div className="image-container">
        <a href={uploadedFiles}><img src={uploadedFiles}/></a>
        <a href={histograms}><img src={histograms}/></a>
      </div>
      {uploadedFiles.length ? (
        <div className="buttons">
          <a href={uploadedFiles}><Button className="buttons" variant="contained" color="primary" startIcon={<SaveIcon />}>Save Image</Button></a>
          <Button className="buttons" variant="contained" onClick={() => calculateHistogram({uploadedFiles})}>Histogram</Button>
        </div>
      ) : (
        ''
      )}
      <div className="footer">
        <p> Made with ❤ by Sepehr Ataei</p>
      </div>
    </div>
  )
}

export default App
