<template>
  <div class="capsule-card">
    <div class="capsule-header">
      <h3>{{ title }}</h3>
      <i class="fas fa-ellipsis-h" @click="toggleOptions"></i>
      <div v-if="showOptions" class="options-popup">
        <p @click="deleteItem">Delete</p>
        <p @click="startEditing">Edit</p>
      </div>
    </div>
    <div class="capsule-body">
      <p>Unlock Date: {{ unlockDate }}</p>
      <p>Status: {{ localStatus }}</p>
      <p v-if="descriptionVisible">Description: {{ description }}</p>
      <p>Time Remaining: {{ countdownTime }}</p>
      
      <div v-if="isEditing" class="edit-form">
        <label for="newUnlockDate">New Unlock Date:</label>
        <input type="date" v-model="currentUnlockDate" id="newUnlockDate" required :min="this.getCurrentDate()" />
        <button @click="saveEdit">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id', 'title', 'description', 'unlockDate', 'status'],
  data() {
    return {
      showOptions: false,
      isEditing: false,
      currentUnlockDate: this.unlockDate,
      localStatus: this.status,
      descriptionVisible: false,
      countdownTime: '',
      notificationSent: false, // Track if notification is sent
    };
    
  },
  mounted() {
    this.startCountdown();
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

    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
    async deleteItem() {
      try {
        if (!this.id) {
          alert('No ID provided for deletion.');
          return;
        }

        const response = await axios.delete(
          `http://localhost:8080/api/capsules/${this.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (response.status === 200) {
          alert('Capsule deleted successfully');
          this.$emit('delete');
        } else {
          console.error(`Unexpected response status: ${response.status}`);
          alert('Failed to delete capsule due to unexpected server response.');
        }
      } catch (error) {
        if (error.response) {
          console.error('Server error:', error.response.data);
          alert(`Failed to delete capsule: ${error.response.data.message || 'Server error'}`);
        } else if (error.request) {
          console.error('No response received:', error.request);
          alert('Failed to delete capsule: No response from the server.');
        } else {
          console.error('Error:', error.message);
          alert(`Failed to delete capsule: ${error.message}`);
        }
      } finally {
        this.showOptions = false;
      }
    },
    startEditing() {
      this.isEditing = true;
      this.showOptions = false; // Hide options after clicking edit
    },
    cancelEdit() {
      this.isEditing = false;
      this.currentUnlockDate = this.unlockDate; // Revert back to original date if canceled
    },
    async saveEdit() {
    try {
      if (this.id) {
        const response = await axios.put(
          `http://localhost:8080/api/capsules/${this.id}`,
          {
            id: this.id,
            title: this.title,
            description: this.description,
            unlockDate: this.currentUnlockDate, // Update unlock date
            status: this.localStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          alert('Unlock date updated successfully');
          this.isEditing = false; // Exit edit mode
          this.$emit('updateUnlockDate', { id: this.id, unlockDate: this.currentUnlockDate }); // Emit the updated date to the parent
          this.startCountdown(); // Restart countdown with the new unlock date
        }
      } else {
        console.error('No ID provided for editing');
      }
    } catch (error) {
      console.error('Failed to update unlock date:', error);
      alert('Failed to update unlock date.');
    }
  },
    startCountdown() {
      const unlockDateTime = new Date(this.unlockDate).getTime();
      const interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeRemaining = unlockDateTime - currentTime;

        if (timeRemaining <= 0) {
          clearInterval(interval);
          this.countdownTime = 'Complete';
          this.localStatus = 'Unlocked';
          this.descriptionVisible = true;

          // Send email notification for unlocked capsule
          this.sendNotificationEmail('Capsule is now unlocked');
        } else {
          // Update the countdown
          this.localStatus = 'Locked';
          this.countdownTime = this.formatTimeRemaining(timeRemaining);

          // Send notification if within 24 hours and not already sent
          if (timeRemaining <= 24 * 60 * 60 * 1000 && !this.notificationSent) {
            this.sendNotificationEmail('Capsule will unlock in less than 24 hours');
            this.notificationSent = true;
          }
        }
      }, 1000);
    },
    formatTimeRemaining(time) {
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((time % (1000 * 60)) / 1000);
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    },
    async sendNotificationEmail(message) {
      try {
        const useremail = localStorage.getItem('userEmail');
        // Send email notification
        await axios.post(
          'http://localhost:8080/api/email/send',
          {
            email: useremail,
            title: 'Capsule Notification',
            description: message,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          }
        );
      } catch (error) {
        console.error('Failed to send notification email:', error);
      }
    },
  },
};
</script>

<style scoped>
.capsule-card {
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e0e0e0; /* Add subtle border */
  border-radius: 12px; /* Slightly larger rounding for a solid feel */
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); /* Enhanced shadow for depth */
}

.capsule-header {
  text-align: center;
  text-transform: capitalize;
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.capsule-header h3 {
  font-size: 20px;
  font-weight: 600;
}

.capsule-body p {
  margin: 10px 0;
}

.options-popup {
  position: absolute;
  top: 40px;
  right: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 5px;
  z-index: 10;
  transition: opacity 0.3s ease;
}

.options-popup p {
  margin: 0;
  padding: 8px 12px;
  cursor: pointer;
}

.options-popup p:hover {
  background-color: #f5f5f5;
}

.edit-form {
  margin-top: 10px;
}

.edit-form label {
  display: block;
  margin-bottom: 5px;
}

.edit-form input {
  margin-bottom: 10px;
  padding: 5px;
}

.edit-form button {
  margin-right: 10px;
}

.capsule-card:hover {
  transform: translateY(-7px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
</style>
