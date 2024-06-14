import React, { useState } from 'react';
import './PersonalDetailsForm.css';

const PersonalDetailsForm = ({ onNext }) => {

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    contactNo: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length === 0) {
      onNext(values);
    } else {
      setErrors(validationErrors);
    }
  };

  const validate = (values) => {
    const errors = {};

    switch (true) {
      case !values.firstName:
        errors.firstName = 'Enter first name';
        break;
      case !values.lastName:
        errors.lastName = 'Enter last name';
        break;
      case !values.email:
        errors.email = 'Enter email address';
        break;
      case values.email && !/\S+@\S+\.\S+/.test(values.email):
        errors.email = 'Invalid email format';
        break;
      case !values.dob:
        errors.dob = 'Select date of birth';
        break;
      case !values.contactNo:
        errors.contactNo = 'Enter contact number';
        break;
      case values.contactNo && !/^\d{10}$/.test(values.contactNo):
        errors.contactNo = 'Enter 10 digit number';
        break;
      default:
        break;
    }
    return errors;
  };

  return (
    <form className="personal-details-form" onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input 
          type="text" 
          name="firstName" 
          value={values.firstName} 
          onChange={handleChange} 
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>
      <div>
        <label>Last Name:</label>
        <input 
          type="text" 
          name="lastName" 
          value={values.lastName} 
          onChange={handleChange} 
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input 
          type="text" 
          name="email" 
          value={values.email} 
          onChange={handleChange} 
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <label>Date of Birth:</label>
        <input 
          type="date" 
          name="dob" 
          value={values.dob} 
          onChange={handleChange} 
          max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]} 
        />
        {errors.dob && <span className="error">{errors.dob}</span>}
      </div>
      <div>
        <label>Contact Number:</label>
        <input 
          type="text" 
          name="contactNo" 
          value={values.contactNo} 
          onChange={handleChange} 
        />
        {errors.contactNo && <span className="error">{errors.contactNo}</span>}
      </div>
      <button type="submit">Next</button>
    </form>
  );
};

export default PersonalDetailsForm;
