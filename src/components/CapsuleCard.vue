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
      <p>Status: {{ status }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['id','title','description', 'unlockDate', 'status'],
  data() {
    return {
      showOptions: false,
    };
  },
  methods: {
  deleteCapsule() {
    this.showOptions = !this.showOptions;
  },
  async deleteItem() {
  try {
    if (this.id) {
      const response = await axios.delete(
        `http://localhost:8080/api/capsules/${this.id}`, // Use the id prop for the DELETE endpoint
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Capsule deleted successfully');
        this.$emit('delete'); // Emit event to parent component to remove item from list
      }
    } else {
      console.error('No ID provided for deletion');
    }
  } catch (error) {
    console.error('Failed to delete capsule:', error);
    alert('Failed to delete capsule.');
  }

  this.showOptions = false;
}

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
