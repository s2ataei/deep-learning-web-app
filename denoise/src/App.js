import React, { useRef, useState } from 'react'
import './App.css'
import { Button } from '@material-ui/core'

const uploadFile = (file) =>
  fetch('/upload_image', {
    method: 'POST',
    mode: 'cors',
    body: file,
  })

const uploadFiles = (...files) => files.map(uploadFile)

const App = () => {
  const uploadRef = useRef(null)
  const [files, setFiles] = useState([])
  const updateFiles = () => setFiles([...uploadRef.current.files])
  const submitFiles = () => uploadFiles(...files)

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
      <div className="footer">
        <p> Made with by Sepehr Ataei</p>
      </div>
    </div>
  )
}

export default App
