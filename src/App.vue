<template>
  <div id="chronoCapsule">
    <Header v-if="loggedIn" />
    <Dashboard v-if="loggedIn" />
    <LogIn v-else-if="showLogin" @loginSuccess="handleLoginSuccess" @register="showRegisterPage" />
    <UserRegister v-else @registrationComplete="handleRegistrationComplete" />
  </div>
</template>

<script>
import Header from './components/TimeCapsuleHeader.vue';
import Dashboard from './components/TimeCapsuleDashboard.vue';
import LogIn from './components/LogIn.vue';
import UserRegister from './components/UserRegister.vue';

export default {
  components: {
    Header,
    Dashboard,
    LogIn,
    UserRegister
  },
  data() {
    return {
      
      showLogin: false,
      loggedIn: false // Initially set to false to show the login page
    };
  },
  methods: {
    handleLoginSuccess() {
      this.loggedIn = true;
    },
    showRegisterPage() {
      this.showLogin = false; // Switch to registration page
    },
    handleRegistrationComplete() {
      // Switch to login page after registration is complete
      this.showLogin = true;
    },
  },
};
</script>