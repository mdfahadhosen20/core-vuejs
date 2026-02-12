<template>
    <div class="admin-layout">
        <!-- Sidebar -->
        <aside class="sidebar" :class="{ 'collapsed': isMobile }">
            <SidebarComponent :collapsed="isMobile" />
        </aside>

        <!-- Main Content Area -->
        <div class="main-container">
            <!-- Header -->
            <header class="header">
                <HeaderComponent @toggle-sidebar="toggleSidebar" />
            </header>

            <!-- Content -->
            <main class="content">
                <slot></slot>
            </main>

            <!-- Footer -->
            <footer class="footer">
                <FooterComponent />
            </footer>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import HeaderComponent from './components/HeaderComponent.vue';
import SidebarComponent from './components/SidebarComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

const isMobile = ref(false);

const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 768;
};

const toggleSidebar = () => {
    isMobile.value = !isMobile.value;
};

onMounted(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize);
});
</script>

<style scoped>
.admin-layout {
    display: flex;
    min-height: 100vh;
    background-color: #f5f5f5;
}

/* Sidebar Styles */
.sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 260px;
    background-color: #1e293b;
    color: white;
    transition: width 0.3s ease;
    z-index: 1000;
    overflow-x: hidden;
    overflow-y: auto;
}

.sidebar.collapsed {
    width: 70px;
}

/* Scrollbar styling for sidebar */
.sidebar::-webkit-scrollbar {
    width: 6px;
}

.sidebar::-webkit-scrollbar-track {
    background: #0f172a;
}

.sidebar::-webkit-scrollbar-thumb {
    background: #475569;
    border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
    background: #64748b;
}

/* Main Container */
.main-container {
    flex: 1;
    margin-left: 260px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    transition: margin-left 0.3s ease;
}

.sidebar.collapsed ~ .main-container {
    margin-left: 70px;
}

/* Header Styles */
.header {
    position: sticky;
    top: 0;
    height: 10vh;
    min-height: 60px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 999;
    display: flex;
    align-items: center;
    padding: 0 24px;
}

/* Content Styles */
.content {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
    min-height: calc(85vh - 60px); /* Remaining height after header and footer */
}

/* Footer Styles */
.footer {
    height: 5vh;
    min-height: 40px;
    background-color: #ffffff;
    border-top: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    padding: 0 24px;
    color: #6b7280;
    font-size: 14px;
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .main-container {
        margin-left: 70px;
    }

    .sidebar {
        width: 70px;
    }

    .header {
        padding: 0 16px;
    }

    .content {
        padding: 16px;
    }

    .footer {
        padding: 0 16px;
        font-size: 12px;
    }
}

/* Tablet and smaller screens */
@media (max-width: 1024px) {
    .content {
        padding: 20px;
    }
}

/* Print styles */
@media print {
    .sidebar {
        display: none;
    }

    .main-container {
        margin-left: 0;
    }

    .header,
    .footer {
        display: none;
    }
}
</style>