<template>
  <header class="app-header">
    <div class="logo-and-title">
      <img src="@/assets/ccLogo.png" alt="Logo" class="logo" />
      <h1>Chrono Capsule</h1>
    </div>

    <div class="header-icons">
      <div class="profile-dropdown">
        <i class="fas fa-user" title="Settings" @click="toggleSettingsMenu"></i>
        <div :class="{'dropdown-menu': true, 'show': showSettingsMenu}" id="settings">
          <ul>
            <li @click="viewProfile">Profile</li>
            <li @click="logout">Logout</li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import axios from 'axios';

export default {
  name: "AppHeader",
  data() {
    return {
      showSettingsMenu: false,
    };
  },
  methods: {
    toggleSettingsMenu() {
      this.showSettingsMenu = !this.showSettingsMenu;
    },

    viewProfile() {
      // Code to navigate to the profile page, if needed
    },

    async logout() {
      try {
        // Call the logout API to invalidate the token
        await axios.post('http://localhost:8080/api/users/logout', {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        // Clear the local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');

        // Redirect to the login page
        this.$router.push('/login');
        alert('Logout successful');
      } catch (error) {
        console.error('Failed to logout:', error);
        alert('Failed to logout. Please try again.');
      } finally {
        // Hide the settings menu after logout attempt
        this.showSettingsMenu = false;
      }
    },
  },
};
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  background-color: #1abc9c; 
  border: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); 
}

.logo-and-title {
  font-size: large;
  display: flex;
  align-items: center;
  color: #34495e;;
}

.logo {
  height: 60px;
  border-radius: 30px;
  margin-right: 10px;
}

.header-icons {
  display: flex;
  height: 30px;
  align-items: center;
  gap: 40px; 
}

.header-icons i {
  font-size: 28px;
}

.profile-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  background-color: #2c3e50;  
  border: 1px solid #34495e;  
  border-radius: 6px; 
  width: 180px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 20;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0s 0.3s; 
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 12px 16px;
  cursor: pointer;
  font-size: 15px;
  color: #ecf0f1; 
  transition: background-color 0.2s ease, color 0.2s ease;
}

.dropdown-menu li:hover {
  background-color: #4a7e7e; 
  color: #ffffff;
}

.fas {
  font-size: 20px;
  color: #ecf0f1; 
  cursor: pointer;
}

.fas:hover {
  color: #000000; 
  transition: color 0.2s ease;
}

</style>
