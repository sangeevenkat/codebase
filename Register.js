// Register.js

import React, { useState } from "react";

const Register = () => {
  const [user, setUser] = useState('');
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [termcondition,setTermcondition] = useState(false);

  const handleOptionChange = (event) => {
    setUser(event.target.value);
  };
  const handleCheckboxChange = () => {
    setTermcondition(!termcondition);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make a POST request to the backend to register the user
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user,fullname,email,phonenumber,password ,termcondition }),
      });

      // Handle the response from the backend
      if (response.ok) {
        // Registration successful, redirect or show success message
        console.log("Registration successful");
      } else {
        // Registration failed, display error message
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
      <label>
      <input
        type="radio"
        value="owner"
        checked={user === 'owner'}
        onChange={handleOptionChange}
      />
      Owner
    </label>
    <br />
    <label>
      <input
        type="radio"
        value="builder"
        checked={user === 'builder'}
        onChange={handleOptionChange}
      />
      Builder
    </label>
    <br />
    <label>
      <input
        type="radio"
        value="agent"
        checked={user === 'agent'}
        onChange={handleOptionChange}
      />
      Agent
    </label>
    <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="phonenumber"
          placeholder="Phonenumber"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>
        <input type="checkbox" checked={termcondition} onChange={handleCheckboxChange} />
        Term and conditions
      </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
