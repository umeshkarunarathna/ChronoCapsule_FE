<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Login to Chrono Capsule</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" placeholder="Enter username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" placeholder="Enter password" required />
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
      
      <!-- Link to navigate to registration page -->
      <a @click.prevent="goToRegisterPage" class="register-link">
        Not registered? Register here
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8080/api/users/login', {
        username: this.username,
        password: this.password,
      }, {
         headers: {
        'Content-Type': 'application/json',
      }
      })
        const token = response.data.token;
        localStorage.setItem('token', token);
        alert('Login successful');

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const emailResponse = await axios.get('http://localhost:8080/api/users/email', {
          headers: {
            Authorization: `Bearer ${token}`, 
          }
        });
        const userEmail = emailResponse.data;
        localStorage.setItem('userEmail', userEmail);
        this.$router.push('/dashboard'); 
      } catch (error) {
        console.error('Failed to login:', error);
        alert('Invalid username or password');
      }
    },
    goToRegisterPage() {
      this.$router.push('/register'); // Navigate to the registration page
    }
  }
};
</script>

<style scoped>
/* Centering the login form on the page */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1abc9c; /* Background color matching the header */
}

/* Styling for the login card */
.login-card {
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
.login-button {
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

.login-button:hover {
  background-color: #f39c12; /* Orange hover effect to match theme */
}

/* Styling for the registration link */
.register-link {
  margin-top: 20px;
  display: inline-block;
  color: #2980b9; /* Blue color to indicate a clickable link */
  cursor: pointer;
  font-size: 16px;
  text-decoration: underline;
  transition: color 0.3s;
}

.register-link:hover {
  color: #f39c12; /* Hover color for link */
}

h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
}
</style>
