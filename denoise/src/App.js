import Promise from 'bluebird'
import React, { useRef, useState } from 'react'
import './App.css'
import { Button } from '@material-ui/core'

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
      <p>
        Low Dose CT Denoising Tool: Upload your test image, prediction download
        will begin automatically.
      </p>
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
            <li>{name}</li>
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
        <h1>uploaded files:</h1>
        <ol>
          {uploadedFiles.map((file) => (
            <li><a href={file}><img src={file} />{file}</a></li>
          ))}
        </ol>
        </>
      ) : (
        ''
      )}
      <div className="image">
      </div>
      <div className="footer">
        <p> Made with ❤ by Sepehr Ataei and LC</p>
      </div>
    </div>
  )
}

export default App
