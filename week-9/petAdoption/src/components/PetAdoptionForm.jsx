import { useState } from "react";
import AdopterData from "./AdopterData";

const PetAdoptionForm = () => {
  const [formData, setFormData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [values, setValues] = useState({
    petName: "",
    petType: "Dog",
    breed: "",
    adopterName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setFormData([...formData, { values }]);
    setValues({});
    setShowTable(true);
  };

  const handleGoBack = () => setShowTable(!showTable);

  if (!showTable) {
    return (
      <div className="form">
        <div>
          <label htmlFor="petName">Pet Name</label>
          <input
            type="text"
            placeholder="Pet Name"
            name="petName"
            value={values.petName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="petType">Pet Type</label>
          <select name="petType" value={values.petType} onChange={handleChange}>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
          </select>
        </div>
        <div>
          <label htmlFor="breed">Breed</label>
          <input
            type="text"
            placeholder="Breed"
            name="breed"
            value={values.breed}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="adopterName">Your Name</label>
          <input
            type="text"
            placeholder="Your Name"
            name="adopterName"
            value={values.adopterName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={values.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    );
  }

  return (
    <AdopterData formData={formData} handleGoBack={handleGoBack}></AdopterData>
  );
};

export default PetAdoptionForm;
