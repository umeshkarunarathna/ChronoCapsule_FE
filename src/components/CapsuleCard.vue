<template>
  <div class="capsule-card">
    <div class="capsule-header">
      <h3>{{ title }}</h3>
      <i class="fas fa-ellipsis-h" @click="deleteCapsule"></i>
      <div v-if="showOptions" class="options-popup">
        <p @click="deleteItem">Delete</p>
      </div>
    </div>
    <div class="capsule-body">
      <p>Unlock Date: {{ unlockDate }}</p>
      <p>Status: {{ localStatus }}</p>
      <p v-if="descriptionVisible">Description: {{ description }}</p>
      <p>Time Remaining: {{ countdownTime }}</p>
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
      localStatus: this.status, // Create a local variable for status
      descriptionVisible: false,
      countdownTime: '',
      notificationSent: false, // Track if notification is sent
    };
  },
  mounted() {
    this.startCountdown();
  },
  methods: {
    deleteCapsule() {
      this.showOptions = !this.showOptions;
    },
    async deleteItem() {
      try {
        if (this.id) {
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
          }
        } else {
          console.error('No ID provided for deletion');
        }
      } catch (error) {
        console.error('Failed to delete capsule:', error);
        alert('Failed to delete capsule.');
      }

      this.showOptions = false;
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
      const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((time % (1000 * 60)) / 1000);
      return `${hours}h ${minutes}m ${seconds}s`;
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
}

.capsule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.capsule-header h3 {
  font-size: 18px;
}

.capsule-body p {
  margin: 5px 0;
}

.options-popup {
  position: absolute;
  top: 35px;
  right: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 5px;
  z-index: 10;
}

.options-popup p {
  margin: 0;
  padding: 8px 12px;
  cursor: pointer;
}

.options-popup p:hover {
  background-color: #f0f0f0;
}
</style>
