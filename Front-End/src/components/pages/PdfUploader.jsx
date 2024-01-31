import React, { useState } from 'react';

function PdfUploader() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('fileName', file.name);
    formData.append('description', description);

    try {
      const response = await fetch('http://localhost:8000/submitForm', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Form submitted successfully');
      } else {
        alert('Error submitting form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-gray-100 rounded-md">
      <h1 className="text-2xl font-semibold mb-4">PDF Uploader</h1>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Upload PDF File:</label>
        <input
          type="file"
          accept=".pdf"
          onChange={onFileChange}
          className="border rounded p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
        <textarea
          rows="4"
          onChange={onDescriptionChange}
          value={description}
          className="border rounded p-2 w-full"
        />
      </div>

      {file && (
        <div className="mb-4">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            className="border rounded p-2"
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <div className="flex justify-between mt-2">
            <button onClick={prevPage} className="bg-blue-500 text-white px-4 py-2 rounded">
              Previous
            </button>
            <button onClick={nextPage} className="bg-blue-500 text-white px-4 py-2 rounded">
              Next
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Page {pageNumber} of {numPages}
          </p>
        </div>
      )}

      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default PdfUploader;
