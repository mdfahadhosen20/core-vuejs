<template>
  <aside class="sidebar-inner">
    <div class="sidebar-header" v-if="!collapsed">
      <div class="logo">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#3B82F6"/>
          <path d="M16 8L22 20H10L16 8Z" fill="white"/>
        </svg>
        <span class="logo-text">AdminPro</span>
      </div>
    </div>

    <div class="sidebar-header-collapsed" v-else>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#3B82F6"/>
        <path d="M16 8L22 20H10L16 8Z" fill="white"/>
      </svg>
    </div>

    <nav class="sidebar-nav">
      <ul class="menu-list">
        <li 
          v-for="item in menuItems" 
          :key="item.id"
          class="menu-item"
        >
          <a 
            href="#"
            class="menu-link"
            :class="{ 
              'active': activeMenu === item.id,
              'has-submenu': item.submenu,
              'collapsed': collapsed
            }"
            @click.prevent="toggleSubmenu(item)"
            :title="collapsed ? item.label : ''"
          >
            <span class="menu-icon" v-html="item.icon"></span>
            <span class="menu-text" v-if="!collapsed">{{ item.label }}</span>
            <svg 
              v-if="item.submenu && !collapsed" 
              class="submenu-arrow"
              :class="{ 'rotated': openSubmenus.includes(item.id) }"
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none"
            >
              <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span 
              v-if="item.submenu && collapsed" 
              class="submenu-indicator"
            ></span>
          </a>

          <!-- Desktop/Expanded Submenu -->
          <transition 
            name="submenu"
            @enter="onEnter"
            @after-enter="onAfterEnter"
            @leave="onLeave"
          >
            <ul 
              v-if="item.submenu && openSubmenus.includes(item.id) && !collapsed" 
              class="submenu-list"
            >
              <li 
                v-for="subitem in item.submenu" 
                :key="subitem.id"
                class="submenu-item"
              >
                <router-link 
                  :to="subitem.link"
                  class="submenu-link"
                  :class="{ 'active': activeSubmenu === subitem.id }"
                  @click.prevent="setActiveSubmenu(subitem.id)"
                >
                  <span class="submenu-dot"></span>
                  <span class="submenu-text">{{ subitem.label }}</span>
                </router-link>
              </li>
            </ul>
          </transition>

          <!-- Mobile/Collapsed Submenu Dropdown -->
          <transition name="dropdown">
            <div 
              v-if="item.submenu && openSubmenus.includes(item.id) && collapsed" 
              class="submenu-dropdown"
              @click.stop
            >
              <div class="submenu-dropdown-header">
                {{ item.label }}
              </div>
              <ul class="submenu-dropdown-list">
                <li 
                  v-for="subitem in item.submenu" 
                  :key="subitem.id"
                  class="submenu-dropdown-item"
                >
                  <a 
                    href="#"
                    class="submenu-dropdown-link"
                    :class="{ 'active': activeSubmenu === subitem.id }"
                    @click.prevent="setActiveSubmenu(subitem.id)"
                  >
                    {{ subitem.label }}
                  </a>
                </li>
              </ul>
            </div>
          </transition>
        </li>
      </ul>
    </nav>

    <div class="sidebar-footer" v-if="!collapsed">
      <div class="user-info">
        <div class="user-avatar">
          <img src="https://i.pravatar.cc/40?img=33" alt="User">
        </div>
        <div class="user-details">
          <div class="user-name">John Doe</div>
          <div class="user-role">Administrator</div>
        </div>
      </div>
    </div>

    <div class="sidebar-footer-collapsed" v-else>
      <div class="user-avatar-collapsed">
        <img src="https://i.pravatar.cc/40?img=33" alt="User">
      </div>
    </div>

    <!-- Backdrop for mobile dropdown -->
    <div 
      v-if="collapsed && openSubmenus.length > 0" 
      class="submenu-backdrop"
      @click="closeAllSubmenus"
    ></div>
  </aside>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue';

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
});

const activeMenu = ref('dashboard');
const activeSubmenu = ref(null);
const openSubmenus = ref([]);

const menuItems = ref([
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/></svg>'
  },
  {
    id: 'website',
    label: 'Website',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>',
    submenu: [
      { id: 'carousel', link: '/admin/dashboard/carousel', label: 'Carousel' },
      { id: 'faq', link: '/admin/dashboard/carousel', label: 'Faq' },
      { id: 'offers', link: '/admin/dashboard/carousel', label: 'Offers' },
    ]
  },
  // {
  //   id: 'user',
  //   label: 'Users',
  //   icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>',
  //   submenu: [
  //     { id: 'carousel', link: '/admin/dashboard/carousel', label: 'Carousel' },
  //     { id: 'add-user', label: 'Add User' },
  //     { id: 'user-roles', label: 'User Roles' },
  //     { id: 'permissions', label: 'Permissions' }
  //   ]
  // },
  {
    id: 'services',
    label: 'Services',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/></svg>',
    submenu: [
      { id: 'services', link: '/admin/dashboard/services', label: 'All Services' },
      { id: 'countries', link: '/admin/dashboard/countries', label: 'Countries' },
      { id: 'general-services', label: 'General Services' }
    ]
  },
  {
    id: 'appointments',
    label: 'Appointments',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>'
  },
  {
    id: 'contacts',
    label: 'Contacts',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>'
  },
  // {
  //   id: 'analytics',
  //   label: 'Analytics',
  //   icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>'
  // },
  {
    id: 'setup',
    label: 'Setup',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/></svg>',
  },
  // {
  //   id: 'settings',
  //   label: 'Settings',
  //   icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/></svg>',
  //   submenu: [
  //     { id: 'general', label: 'General' },
  //     { id: 'security', label: 'Security' },
  //     { id: 'notifications', label: 'Notifications' },
  //     { id: 'integrations', label: 'Integrations' }
  //   ]
  // }
]);

const toggleSubmenu = (item) => {
  if (!item.submenu) {
    activeMenu.value = item.id;
    closeAllSubmenus();
    return;
  }

  activeMenu.value = item.id;
  const index = openSubmenus.value.indexOf(item.id);
  
  if (index > -1) {
    openSubmenus.value.splice(index, 1);
  } else {
    // Close other submenus when opening a new one in collapsed mode
    if (props.collapsed) {
      openSubmenus.value = [item.id];
    } else {
      openSubmenus.value.push(item.id);
    }
  }
};

const setActiveSubmenu = (id) => {
  activeSubmenu.value = id;
  if (props.collapsed) {
    closeAllSubmenus();
  }
};

const closeAllSubmenus = () => {
  openSubmenus.value = [];
};

const onEnter = (el) => {
  el.style.height = '0';
  el.style.opacity = '0';
};

const onAfterEnter = (el) => {
  el.style.height = el.scrollHeight + 'px';
  el.style.opacity = '1';
};

const onLeave = (el) => {
  el.style.height = el.scrollHeight + 'px';
  el.offsetHeight; // Force reflow
  el.style.height = '0';
  el.style.opacity = '0';
};

// Watch for collapsed prop changes and close submenus
watch(() => props.collapsed, (newVal) => {
  if (!newVal) {
    // When expanding, close all submenus
    closeAllSubmenus();
  }
});
</script>

<style scoped>
.sidebar-inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  position: relative;
}

.sidebar-header {
  padding: 24px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.sidebar-header-collapsed {
  padding: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.5px;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  overflow-x: visible;
  padding: 16px 0;
}

.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  margin-bottom: 4px;
  padding: 0 12px;
  position: relative;
}

.menu-link {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: #94a3b8;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  font-size: 14px;
  font-weight: 500;
  gap: 0;
}

.menu-link.collapsed {
  justify-content: center;
  padding: 12px;
}

.menu-link:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  transform: translateX(2px);
}

.menu-link.collapsed:hover {
  transform: translateX(0);
}

.menu-link.active {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.menu-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 12px;
}

.menu-link.collapsed .menu-icon {
  margin-right: 0;
}

.menu-text {
  /* flex: 1; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.submenu-arrow {
  margin-left: auto;
  padding-left: 8px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: currentColor;
  flex-shrink: 0;
}

.submenu-arrow.rotated {
  transform: rotate(180deg);
}

.submenu-indicator {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #3b82f6;
}

.submenu-list {
  list-style: none;
  padding: 0;
  margin: 8px 0 0 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.submenu-item {
  margin-bottom: 2px;
}

.submenu-link {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  padding-left: 48px;
  color: #94a3b8;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 13px;
  font-weight: 500;
  gap: 0;
}

.submenu-link:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  transform: translateX(4px);
}

.submenu-link.active {
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

.submenu-link.active .submenu-dot {
  background: #3b82f6;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
}

.submenu-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #475569;
  transition: all 0.25s ease;
  flex-shrink: 0;
  margin-right: 12px;
}

.submenu-link:hover .submenu-dot {
  background: #64748b;
}

.submenu-text {
  /* flex: 1; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Mobile Dropdown Submenu */
.submenu-dropdown {
  position: fixed;
  left: 70px;
  top: 0;
  width: 220px;
  max-height: 100vh;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 0 12px 12px 0;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  overflow-y: auto;
  animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.submenu-dropdown-header {
  padding: 20px 16px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(59, 130, 246, 0.1);
}

.submenu-dropdown-list {
  list-style: none;
  padding: 12px;
  margin: 0;
}

.submenu-dropdown-item {
  margin-bottom: 4px;
}

.submenu-dropdown-link {
  display: block;
  padding: 12px 16px;
  color: #94a3b8;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 14px;
  font-weight: 500;
}

.submenu-dropdown-link:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  transform: translateX(4px);
}

.submenu-dropdown-link.active {
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.15);
}

.submenu-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Dropdown transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Smooth animation transitions */
.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.sidebar-footer-collapsed {
  padding: 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-info:hover {
  background: rgba(255, 255, 255, 0.08);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(59, 130, 246, 0.5);
  flex-shrink: 0;
}

.user-avatar-collapsed {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(59, 130, 246, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-avatar-collapsed:hover {
  border-color: rgba(59, 130, 246, 0.8);
  transform: scale(1.05);
}

.user-avatar img,
.user-avatar-collapsed img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  font-size: 12px;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>