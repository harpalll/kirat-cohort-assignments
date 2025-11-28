import React, { Component } from "react";

export class AdopterData extends Component {
  render() {
    const { formData, handleGoBack } = this.props;
    console.log(formData);

    /* 
    
    petName: "",
    petType: "Dog",
    breed: "",
    adopterName: "",
    email: "",
    phone: "",

    */

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Pet Name</th>
              <th>Pet Type</th>
              <th>Breed</th>
              <th>Adopter Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((petData) => (
              <tr key={petData.values.email}>
                <td>{petData.values.petName}</td>
                <td>{petData.values.petType}</td>
                <td>{petData.values.breed}</td>
                <td>{petData.values.adopterName}</td>
                <td>{petData.values.email}</td>
                <td>{petData.values.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button style={{ width: "fit-content" }} onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    );
  }
}

export default AdopterData;
