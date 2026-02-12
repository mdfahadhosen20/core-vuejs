<template>
    <TopbarComponent />
    <HeaderComponent />
    <div>
        <slot></slot>
    </div>
    <FooterComponent />
</template>

<script setup>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import TopbarComponent from './components/TopbarComponent.vue';
</script>