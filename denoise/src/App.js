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

const calculateHistogram = (file) => {
  console.log(file);
  let n = file.file.indexOf(".com/")
  let fileName = file.file.substr(n+5)
  console.log(fileName)
  console.log(n)
  fetch(`https://rndao4oe18.execute-api.ca-central-1.amazonaws.com/api/histogram/${fileName}`, {

    method: 'GET',
    mode: 'cors',
  })
}

const App = () => {
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
        Low Dose CT Denoising Tool: Upload your test image, prediction download
        will begin automatically.
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
      {files.length ? (
        <ol>
          {files.map(({ name }) => (
            <li>{name}
            </li>
          ))}
        </ol>
      ) : (
        ''
      )}
      <div className="submit-button">
        <Button variant="contained" type="submit" onClick={submitFiles}>
          Upload Images
        </Button>
      </div>
      {uploadedFiles.length ? (
        <>
        <h4>uploaded files:</h4>
        <ol>
          {uploadedFiles.map((file) => (
            <li>
              <a href={file}><img src={file} /><Button className="buttons" variant="contained" color="primary" startIcon={<SaveIcon />}>Save Image</Button></a>
              <Button className="buttons" variant="contained" onClick={() => calculateHistogram({file})}>Histogram</Button>
            </li>
          ))}
        </ol>
        </>
      ) : (
        ''
      )}
      <div className="footer">
        <p> Made with ❤ by Sepehr Ataei and LC</p>
      </div>
    </div>
  )
}

export default App
