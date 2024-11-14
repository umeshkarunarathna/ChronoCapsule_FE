<template>
    <div class="register-container">
      <div class="register-card">
        <h2>User Registration Chrono Capsule</h2>
        <form @submit.prevent="registerUser">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" placeholder="Enter username" required />
          </div>

          <div class="form-group">
            <label for="username">Email</label>
            <input type="email" id="username" v-model="email" placeholder="Enter Email" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" placeholder="Enter password" required />
          </div>
          <button type="submit" class="register-button" >Register</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';

  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      async registerUser() {
      try {
        const response = await axios.post('http://localhost:8080/api/users/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
      
        if (response.status === 200) {
          //alert('Registration successful');
          // You can redirect the user to the login page or dashboard after successful registration
          console.log(this.$router);
          this.$router.push('/login'); // Assuming you have a login route
        }
      } catch (error) {
        console.error('Registration error:', error);
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message;
      
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      }
    },
  },
  };
  </script>
  
  <style scoped>
  /* Centering the login form on the page */
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #1abc9c; /* Background color matching the header */
  }
  
  /* Styling for the login card */
  .register-card {
    width: 400px;
    padding: 30px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  
  /* Form styling */
  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    color: #2c3e50;
    font-size: 14px;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  /* Button styling */
  .register-button {
    width: 100%;
    padding: 10px;
    background-color: #2980b9; /* Matching the blue color in the theme */
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .register-button:hover {
    background-color: #f39c12; /* Orange hover effect to match theme */
  }
  
  h2 {
    color: #333;
    margin-bottom: 20px;
    font-size: 24px;
  }
  </style>
  