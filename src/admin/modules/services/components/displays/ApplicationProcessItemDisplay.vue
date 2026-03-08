<template>
  <div class="item-display">
    <div class="item-header">
      <div>
        <h4 class="item-title">{{ item.title || 'Unnamed Process' }}</h4>
        <p v-if="item.short_description" class="item-subtitle">{{ item.short_description }}</p>
      </div>
      <div class="item-meta">
        <span v-if="item.id" class="item-id">#{{ item.id }}</span>
        <span class="status-badge" :class="'status-' + (item.status || 'active')">
          {{ item.status || 'active' }}
        </span>
      </div>
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
  align-items: flex-start;
  gap: 16px;
}

.item-title {
  font-size: 16px;
  font-weight: 600;
  color: #495057;
  margin: 0 0 4px 0;
}

.item-subtitle {
  font-size: 14px;
  color: #6c757d;
  margin: 0;
  line-height: 1.5;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.item-id {
  font-size: 12px;
  color: #6c757d;
  background: #e9ecef;
  padding: 4px 8px;
  border-radius: 4px;
}

.status-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 12px;
  text-transform: uppercase;
}

.status-active {
  background: #d4edda;
  color: #155724;
}

.status-inactive {
  background: #f8d7da;
  color: #721c24;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}
</style>