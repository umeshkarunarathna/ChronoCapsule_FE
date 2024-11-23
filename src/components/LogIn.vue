<template>
  <div class="login-container" >
    <div class="login-card">
      <!-- Application Logo -->
      <div class="logo-container">
        <img src="@/assets/ccLogo.png" alt="Chrono Capsule Logo" class="app-logo" />
      </div>

      <!-- Heading -->
      <h2>Welcome to Chrono Capsule</h2>
      <p class="subtitle">Your memories secured in time.....</p>

      <!-- Login Form -->
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter username"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>

      <a @click.prevent="goToRegisterPage" class="register-link">
        Not a user? <strong>Register here</strong>
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
      this.$router.push('/register'); 
    }
  }
};

</script>

<style scoped>

.login-container {
  background: url("@/assets/CapsuleBackground.jpg") center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
}

.login-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); 
  z-index: -1;
}


.login-card {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 100%;
}


.app-logo {
  width: 100px;
  height: auto;
}


h2 {
  color: #34495e;
  margin-bottom: 10px;
  font-size: 28px;
  font-weight: bold;
}
.subtitle {
  font-size: 18px;
  font-style: italic;
  color: #7f8c8d;
  margin-bottom: 20px;
}


.form-group {
  margin-bottom: 20px;
  text-align: left;
}
.form-group label {
  display: block;
  margin-bottom: 6px;
  color: #2c3e50;
  font-size: 14px;
  font-weight: bold;
}
.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  transition: border-color 0.3s;
}
.form-group input:focus {
  outline: none;
  border-color: #1abc9c;
}


.login-button {
  width: 100%;
  padding: 12px;
  background: #1abc9c;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}
.login-button:hover {
  background: #16a085;
}

.register-link {
  display: inline-block;
  margin-top: 20px;
  color: #1abc9c;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s;
}
.register-link:hover {
  color: #16a085;
}
</style>
