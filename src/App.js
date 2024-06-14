import React, { useState } from 'react';
import PersonalDetailsForm from './Components/PersonalDetailsForm';
import ImageUploadForm from './Components/ImageUploadForm';
import Modal from './Components/Modal';
import './App.css';

function App() {

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    contactNo: '',
    images: []
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [submittedData, setSubmittedData] = useState([]);

  const handleNextStep = (data) => {
    setFormData({ ...formData, ...data });
    if (step === 2) {
      setSubmittedData([...submittedData, { ...formData, ...data }]);
      setIsSubmitted(true);
      resetForm();
    } else {
      setStep(step + 1);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      contactNo: '',
      images: []
    });
    setStep(1);
  };

  const closeModal = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="app">
      <div className="step-indicator">Step {step} of 2</div>
      {step === 1 && <PersonalDetailsForm onNext={handleNextStep} />}
      {step === 2 && <ImageUploadForm onNext={handleNextStep} />}
      {isSubmitted && <Modal message="Form submitted successfully!" onClose={closeModal} />}
      <SubmittedDataTable data={submittedData} />
    </div>
  );
}

const SubmittedDataTable = ({ data }) => {
  return (
    <div className="submitted-data-table">
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Contact Number</th>
              <th>Images</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td>{entry.firstName}</td>
                <td>{entry.lastName}</td>
                <td>{entry.email}</td>
                <td>{entry.dob}</td>
                <td>{entry.contactNo}</td>
                <td>
                  {entry.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={URL.createObjectURL(image)}
                      alt={`img-${imgIndex}`}
                      className="thumbnail"
                    />
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
