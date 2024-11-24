<template>
  <div class="register-container">
    <div class="register-card">
      
      <div class="logo-section">
        <img src="@/assets/ccLogo.png" alt="Chrono Capsule Logo" class="logo" />
      </div>
      <h2>User Registration Chrono Capsule</h2>
      <p class="subtitle">Your memories secured in time.....</p>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" placeholder="Enter username" required />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" placeholder="Enter Email" required />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" placeholder="Enter password" required />
        </div>

        <button type="submit" class="register-button">Register</button>
      </form>

      <div class="link-to-login">
        <p>Already have an account? <router-link to="/login"><strong>Login here</strong></router-link></p>
      </div>
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
          // Redirect to the login page after successful registration
          alert('Registration successful');
          this.$router.push('/login');
        }


      } catch (error) {
        alert('Registration failed !');
        window.location.reload();
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
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("@/assets/CapsuleBackground.jpg") center/cover no-repeat;
}

.register-card {
  width: 400px;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
}

.logo-section {
  margin-bottom: 20px;
}

.logo {
  max-width: 120px;
  height: auto;
  display: block;
  margin: 0 auto;
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
  margin-bottom: 8px;
  color: #2c3e50;
  font-size: 14px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.register-button {
  width: 100%;
  padding: 10px;
  background: #1abc9c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.register-button:hover {
  background: #16a085;
}

h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
}

.link-to-login {
  display: inline-block;
  margin-top: 20px;
  color: #1abc9c;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s;
}

.link-to-login :hover{
  color: #16a085;
}
</style>

