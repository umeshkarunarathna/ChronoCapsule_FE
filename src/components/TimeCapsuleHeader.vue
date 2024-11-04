<template>
  <header class="app-header">
    <div class="logo-and-title">
      
      <img src="@/assets/ccLogo.png" alt="Logo" class="logo" />
      <h1>Chrono Capsule</h1>
    </div>

    <div class="search-bar-container">
      <div class="search-bar">
        <input type="text" placeholder="Search..." />
        <i class="fas fa-search" title="Search"></i>
      </div>
    </div>

    <div class="header-icons">
      
      <i class="fas fa-bell" title="Notifications"></i>

      <div class="settings-dropdown">
        <i class="fas fa-cog" title="Settings" @click="toggleSettingsMenu"></i>
        <div v-if="showSettingsMenu" class="dropdown-menu" id="settings">
          <ul>
            <li @click="openAccountSettings">Account Settings</li>
            <li @click="openPreferences">Preferences</li>
          </ul>
        </div>
      </div>
      
      <div class="profle-dropdown">
        <i class="fas fa-user" title="User Profile" @click="toggleProfileMenu"></i>
        <div v-if="showProfileMenu" class="dropdown-menu" id="profile">
          <ul>
            <li>Profile</li>
            <li>Logout</li>
          </ul>
        </div>
      </div>
      
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      showSettingsMenu: false, 
      showProfileMenu: false,
    };
  },
  methods: {

    toggleProfileMenu() {
      this.showProfileMenu = !this.showProfileMenu;
    },
    
    toggleSettingsMenu() {
      this.showSettingsMenu = !this.showSettingsMenu; 
    },
    openAccountSettings() {
      
      //console.log("Account Settings clicked test");
      this.showSettingsMenu = false;
    },
    openPreferences() {
      
      //console.log("Preferences clicke test");
      this.showSettingsMenu = false;
    },
    logout() {
      
      //console.log("Log Out clicke test");
      this.showSettingsMenu = false;
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
  display: flex;
  align-items: center;
}

.logo {
  height: 60px;
  border-radius: 30px;
  margin-right: 10px;
}

.search-bar-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.search-bar {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 4px;
}

.search-bar input {
  border: none;
  outline: none;
  padding: 5px;
  font-size: 16px;
}

.search-bar i {
  margin-left: 5px;
  font-size: 20px;
  cursor: pointer;
  color: #333;
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

.settings-dropdown, .profile-dropdown {
  position: relative;
}


#settings{top: 40px;}

#profile{top: 80px;}

.dropdown-menu {
  position: absolute;
  right: 0;
  background-color: #cec4b3;
  border: 1px solid #cec4b3; 
  border-radius: 4px;
  width: 150px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  color: black;
}

.dropdown-menu li:hover {
  background-color: #e67e22; 
}

</style>
