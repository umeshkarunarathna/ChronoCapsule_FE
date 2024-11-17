<template>
  <div id="chronoCapsule">
    <Header v-if="loggedIn"/>
    <router-view @loginSuccess="handleLoginSuccess" @register="showRegisterPage" @registrationComplete="handleRegistrationComplete" />
  </div>
</template>

<script>
import Header from './components/TimeCapsuleHeader.vue';

export default {
  components: {
    Header
  },
  data() {
    return {
      loggedIn: false, // Initially set to false to show the login page
    };
  },
  methods: {
    handleLoginSuccess() {
      this.loggedIn = true;
    },
    showRegisterPage() {
      this.$router.push('/register'); // Navigate to registration page
    },
    handleRegistrationComplete() {
      this.$router.push('/login'); // Navigate to login page after registration
    },
  },
};
</script>
