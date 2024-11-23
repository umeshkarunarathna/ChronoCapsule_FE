<template>
  <div class="dashboard">
    <TimeCapsuleHeader></TimeCapsuleHeader>
    <br>
    <div class="header">
      <h2>Capsule Summary</h2>
      <button class="create-btn" @click="popupModal">Create Capsule</button>
    </div>

    <div class="capsule-grid">
      <CapsuleCard
        v-for="(capsule, index) in capsules"
        :key="index"
        :id="capsule.id"
        :title="capsule.title"
        :description="capsule.description"
        :unlockDate="capsule.unlockDate"
        :status="capsule.status"
        @delete="removeCapsule(capsule.id)"
        @updateUnlockDate="updateCapsuleUnlockDate"
      />
    </div>

    
    <div v-if="showModal" class="modal-overlay" @click.self="popupModal">
  <div class="modal-content">
    <h2 class="modal-title">Create a New Capsule</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Title:</label>
        <input
          type="text"
          v-model="newCapsule.title"
          id="title"
          class="input-field"
          placeholder="Enter the title"
          required
        />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea
          v-model="newCapsule.description"
          id="description"
          class="textarea-field"
          placeholder="Enter the Description"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <label for="unlockDate">Unlock Date:</label>
        <input
          type="date"
          v-model="newCapsule.unlockDate"
          id="unlockDate"
          class="input-field"
          required
          :min="currentDate"
        />
      </div>
      <div class="button-group">
        <button type="submit" class="submit-btn">Create</button>
        <button type="button" class="cancel-btn" @click="popupModal"> Cancel</button>
      </div>
    </form>
  </div>
</div>

  </div>
</template>

<script>
import TimeCapsuleHeader from './TimeCapsuleHeader.vue'
import CapsuleCard from './CapsuleCard.vue';
import axios from 'axios';
export default {
  components: {
    TimeCapsuleHeader,
    CapsuleCard,
  },
  data() {
    return {
      capsules: [],
      showModal: false,
      newCapsule: {
        title: '',
        description: '',
        unlockDate: '',
      },
      apiUrl: 'http://localhost:8080/api/capsules',
      currentDate: this.getCurrentDate()
    };
  },
  created() {
  this.getCapsules();
 },
 methods: {

  getCurrentDate() {
      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1; 
      let dd = today.getDate();

      if (mm < 10) mm = '0' + mm;
      if (dd < 10) dd = '0' + dd;

      return `${yyyy}-${mm}-${dd}`;
    },

  async getCapsules() {
    try {
      const response = await axios.get(`${this.apiUrl}/my-capsules`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // assuming the token is stored in localStorage
        },
      });
      this.capsules = response.data;
      console.log(response.data);
    } catch (error) {
      console.error('Failed to fetch capsules:', error);
    }
  },
  popupModal() {
    this.showModal = !this.showModal;
  },
  removeCapsule(capsuleId) {
      this.capsules = this.capsules.filter(capsule => capsule.id !== capsuleId);
    },
  async submitForm() {
    try {
      const response = await axios.post(
        `${this.apiUrl}/create`,
        {
          title: this.newCapsule.title,
          description: this.newCapsule.description,
          unlockDate: this.newCapsule.unlockDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Capsule created successfully');
        this.getCapsules(); // Refresh the capsules list
        this.popupModal();
      }
    } catch (error) {
      console.error('Failed to create capsule:', error);
    }
  },
  updateCapsuleUnlockDate(updatedCapsule) {
    const capsuleIndex = this.capsules.findIndex(capsule => capsule.id === updatedCapsule.id);
    if (capsuleIndex !== -1) {
      this.capsules[capsuleIndex].unlockDate = updatedCapsule.unlockDate;
    }
  }
},
};
</script>


<style scoped>


.dashboard {
  padding: 20px;
  background-color: #6f8793; 
  min-height: 100vh; 
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: #34495e;
  color: #ecf0f1;
  padding: 15px;
  border-radius: 8px;
}

.create-btn {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px; 
  cursor: pointer;
  height: 45px; 
  background: linear-gradient(145deg, #1abc9c, #16a085); 
  color: #fff; 
  font-size: 16px; 
  font-weight: bold;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1); 
  transition: all 0.3s ease; 
  transform: translateY(-2px); 
}

.create-btn:hover {
  color: black;
  background: linear-gradient(145deg, #72b13b, #5c7e3f); 
  transform: translateY(-6px); 
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2); 
}

.create-btn:active {
  transform: translateY(-2px); 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); 
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
  height: auto;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}


.modal-overlay {
  font-size: 1rem;
  font-weight: bold;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: linear-gradient(to bottom right, #ffffff, #e8f8f5);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.modal-title {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  font-size: 1rem;
  margin-bottom: 8px;
  display: block;
  color: #34495e;
}

.input-field,
.textarea-field {
  width: 100%;
  padding: 12px 15px;
  margin-top: 5px;
  border: 1px solid #bdc3c7;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

.input-field:focus,
.textarea-field:focus {
  border-color: #1abc9c;
  box-shadow: 0 0 5px rgba(26, 188, 156, 0.5);
}

.textarea-field {
  min-height: 80px;
  resize: vertical;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.submit-btn,
.cancel-btn {
  flex: 1;
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.2s;
}

.submit-btn {
  background-color: #1abc9c;
  color: white;
}

.submit-btn:hover {
  background-color: rgb(72, 157, 72);
  transform: translateY(-2px);
}

.cancel-btn {
  background-color: rgb(234, 118, 105);
  color: white;
}

.cancel-btn:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
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
  width: 98%;
}


@media (min-width: 768px) {
  .header {
    flex-direction: row; 
  }

  .create-btn {
    width: auto; 
  }

  .submit-btn, .cancel-btn {
    width: auto; 
    margin-bottom: 0;
  }
  
}
</style>
