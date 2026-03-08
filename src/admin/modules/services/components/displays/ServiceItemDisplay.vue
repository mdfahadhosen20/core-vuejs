<template>
  <div class="item-display">
    <div class="item-header">
      <h4 class="item-title">Service Details</h4>
      <span v-if="item.id" class="item-id">#{{ item.id }}</span>
    </div>
    <div class="item-body">
      <p class="item-description">{{ item.service_details || 'No details provided' }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  item: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.item-display {
  width: 100%;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.item-title {
  font-size: 16px;
  font-weight: 600;
  color: #495057;
  margin: 0;
}

.item-id {
  font-size: 12px;
  color: #6c757d;
  background: #e9ecef;
  padding: 4px 8px;
  border-radius: 4px;
}

.item-body {
  color: #6c757d;
  line-height: 1.6;
}

.item-description {
  margin: 0;
  white-space: pre-wrap;
}
</style>