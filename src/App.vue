<template>
  <div id="chronoCapsule">
    <Header />
    <Dashboard />
  </div>
</template>

<script>
import Header from './components/TimeCapsuleHeader.vue';
import Dashboard from './components/TimeCapsuleDashboard.vue';

export default {
  components: {
    Header,
    Dashboard
  },
};
</script>