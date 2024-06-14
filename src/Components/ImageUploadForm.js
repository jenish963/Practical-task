import React, { useState, useEffect } from 'react';
import './ImageUploadForm.css';

const ImageUploadForm = ({ onNext }) => {

  const [images, setImages] = useState([]);

  const [error, setError] = useState('');

  useEffect(() => {
    setImages([]);
    setError('');
  }, []);

  const handleImageChange = (e) => {

    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type));

    for (let file of validFiles) {
      if (images.some(image => image.name === file.name && image.size === file.size)) {
        setError(`The image "${file.name}" is already uploaded.`);
        return;
      }
    }

    if (validFiles.length !== files.length) {
      setError('Only png, jpg, and jpeg files are allowed.');
      return;
    }

    setImages([...images, ...validFiles]);
    setError('');
    
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (images.length === 0) {
      setError('Upload images');
      return;
    }

    onNext({ images });
  };

  return (
    <form className="image-upload-form" onSubmit={handleSubmit}>
      <div>
        <label>Upload Images:</label>
        <input 
          type="file" 
          multiple 
          onChange={handleImageChange} 
          accept=".png, .jpg, .jpeg" 
        />
        {error && <span className="error">{error}</span>}
      </div>
      <div className="image-preview">
        {images.map((image, index) => (
          <div key={index} className="image-thumbnail">
            <img src={URL.createObjectURL(image)} alt={`preview ${index}`} />
            <button type="button" onClick={() => handleRemoveImage(index)}>Remove</button>
          </div>
        ))}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ImageUploadForm;
