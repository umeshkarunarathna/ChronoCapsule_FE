<template>
  <div class="dashboard">
    <div class="header">
      <h2>Capsule Summary</h2>
      <button class="create-btn" @click="popupModal">Create Capsule</button>
    </div>

    <div class="capsule-grid">
      <CapsuleCard
        v-for="(capsule, index) in capsules"
        :key="index"
        :title="capsule.title"
        :unlockDate="capsule.unlockDate"
        :status="capsule.status"
      />
    </div>

    <!-- Modal Popup -->
    <div v-if="showModal" class="modal-overlay" @click.self="popupModal">
      <div class="modal-content">
        <h2>Create New Capsule</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="title">Title: </label>
            <input type="text" v-model="newCapsule.title" id="title" required />
          </div>
          <div class="form-group">
            <label for="description">Description: </label>
            <input type="text" v-model="newCapsule.description" id="description" required>
          </div>
          <div class="form-group">
            <label for="unlockDate">Unlock Date: </label>
            <input type="date" v-model="newCapsule.unlockDate" id="unlockDate" required />
          </div>
          <button type="submit" class="submit-btn">Create</button>
          <button type="button" class="cancel-btn" @click="popupModal">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import CapsuleCard from './CapsuleCard.vue';

export default {
  components: {
    CapsuleCard,
  },
  data() {
    return {
      capsules: [
        { title: 'Capsule 1', unlockDate: '2024-10-15', status: 'Locked' },
        { title: 'Capsule 2', unlockDate: '2025-12-01', status: 'Locked' },
        { title: 'Capsule 3', unlockDate: '2023-10-10', status: 'Unlocked' },
        { title: 'Capsule 4', unlockDate: '2024-10-21', status: 'Locked' },
      ],
      showModal: false,
      newCapsule: {
        title: '',
        unlockDate: '',
      },
    };
  },
  methods: {
    popupModal() {
      this.showModal = !this.showModal;
    },
  },
};
</script>


<style scoped>


.dashboard {
  padding: 20px;
  background-color: #ccd2d5; 
  min-height: 100vh; 
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: #34495e;
  color: #ecf0f1;
  padding: 15px;
  border-radius: 8px;
}

.create-btn {
  padding: 15px;
  background-color: cadetblue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 40px;
  background-color: #1abc9c; 
  color: #ecf0f1; 
  transition: background-color 0.3s ease;
}

.capsule-grid {
  border-style: solid;
  border-radius: 8px;
  border: 2px solid #b2bec3;
  height: 60vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  background-color: #dfe6e9; 
  padding: 10px;

  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}


.modal-overlay {
  font-size: medium;
  font-weight:bold ;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: rgb(174, 223, 193);
  padding: 30px;
  border-radius: 8px;
  width: 400px;
}

.form-group {
  padding: 20px;
  margin-bottom: 15px;
  color: #2c3e50; 
}

.submit-btn, .cancel-btn {
  padding: 10px 15px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-btn {
  background-color: cadetblue;
  color: white;
}

.cancel-btn {
  background-color: grey;
  color: white;
}

.capsule-grid .capsule-card {
  background-color: #ffffff; 
  border: 2px solid #2980b9; 
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

#description{
  height: 150px;
  width: 300px;
}
</style>
