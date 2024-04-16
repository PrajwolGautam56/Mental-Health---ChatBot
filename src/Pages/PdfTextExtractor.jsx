import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Document, pdfjs } from 'react-pdf';

// Set the worker URL for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfTextExtractor = ({ userId }) => {
  const [text, setText] = useState('');

  const onFileChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const typedArray = new Uint8Array(event.target.result);
      const pdf = await pdfjs.getDocument(typedArray).promise;
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(' ');
        fullText += pageText + '\n';
      }
      setText(fullText);

      // Send text to the server
      sendTextToServer(fullText);
    };

    reader.readAsArrayBuffer(file);
  };

  const sendTextToServer = async (text) => {
    try {
      const response = await fetch('http://localhost:3000/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });
      if (!response.ok) {
        throw new Error('Failed to send text to server');
      }
      console.log('Text sent successfully');
    } catch (error) {
      console.error('Error sending text to server:', error.message);
    }
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      {text && (
        <pre>
          {text}
        </pre>
      )}
    </div>
  );
};

export default PdfTextExtractor;
