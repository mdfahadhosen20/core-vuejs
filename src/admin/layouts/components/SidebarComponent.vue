<template>
  <aside class="sidebar-inner">
    <div class="sidebar-header" v-if="!collapsed">
      <div class="logo">
        <!-- If Logo Exists -->
        <template v-if="systemData && systemData.logo">
          <div class="logo-image">
            <img 
              :src="getLogoUrl(systemData.logo)" 
              :alt="systemData.brand_name" 
            />
          </div>
        </template>

        <!-- If Logo NOT Exists -->
        <template v-else>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#3B82F6"/>
            <path d="M16 8L22 20H10L16 8Z" fill="white"/>
          </svg>

          <span class="logo-text">
            {{ systemData?.brand_name || 'AdminPro' }}
          </span>
        </template>
      </div>
    </div>

    <div class="sidebar-header-collapsed" v-else>
      <div class="logo-image-collapsed" v-if="systemData && systemData.logo">
        <img :src="getLogoUrl(systemData.logo)" :alt="systemData.brand_name" />
      </div>
      <svg v-else width="32" height="32" viewBox="0 0 32 32" fill="none">
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
            :href="item.link || '#'"
            class="menu-link"
            :class="{ 
              'active': activeMenu === item.id,
              'has-submenu': item.submenu,
              'collapsed': collapsed
            }"
            @click="handleMenuClick($event, item)"
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
          <transition name="submenu">
            <ul 
              v-if="item.submenu && openSubmenus.includes(item.id) && !collapsed" 
              class="submenu-list"
            >
              <li 
                v-for="subitem in item.submenu" 
                :key="subitem.id"
                class="submenu-item"
              >
                <!-- Nested Submenu Item -->
                <template v-if="subitem.submenu">
                  <a 
                    href="#"
                    class="submenu-link"
                    :class="{ 'has-nested': subitem.submenu }"
                    @click="handleNestedMenuClick($event, subitem)"
                  >
                    <span class="submenu-dot"></span>
                    <span class="submenu-text">{{ subitem.label }}</span>
                    <svg 
                      class="nested-arrow"
                      :class="{ 'rotated': openNestedSubmenus.includes(subitem.id) }"
                      width="14" 
                      height="14" 
                      viewBox="0 0 16 16" 
                      fill="none"
                    >
                      <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                  </a>

                  <!-- Nested Submenu List -->
                  <transition name="nested-submenu">
                    <ul 
                      v-if="openNestedSubmenus.includes(subitem.id)" 
                      class="nested-submenu-list"
                    >
                      <li 
                        v-for="nestedItem in subitem.submenu" 
                        :key="nestedItem.id"
                        class="nested-submenu-item"
                      >
                        <a 
                          :href="nestedItem.link || '#'"
                          class="nested-submenu-link"
                          :class="{ 'active': activeSubmenu === nestedItem.id }"
                          @click="handleSubmenuClick($event, nestedItem)"
                        >
                          <span class="nested-submenu-bullet"></span>
                          <span class="nested-submenu-text">{{ nestedItem.label }}</span>
                        </a>
                      </li>
                    </ul>
                  </transition>
                </template>

                <!-- Regular Submenu Item -->
                <a 
                  v-else
                  :href="subitem.link || '#'"
                  class="submenu-link"
                  :class="{ 'active': activeSubmenu === subitem.id }"
                  @click="handleSubmenuClick($event, subitem)"
                >
                  <span class="submenu-dot"></span>
                  <span class="submenu-text">{{ subitem.label }}</span>
                </a>
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
                  <!-- Nested in collapsed mode -->
                  <template v-if="subitem.submenu">
                    <a 
                      href="#"
                      class="submenu-dropdown-link has-nested"
                      @click="handleNestedMenuClick($event, subitem)"
                    >
                      {{ subitem.label }}
                      <svg 
                        class="nested-arrow-small"
                        :class="{ 'rotated': openNestedSubmenus.includes(subitem.id) }"
                        width="12" 
                        height="12" 
                        viewBox="0 0 16 16" 
                        fill="none"
                      >
                        <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                    </a>
                    <transition name="nested-dropdown">
                      <ul 
                        v-if="openNestedSubmenus.includes(subitem.id)"
                        class="nested-dropdown-list"
                      >
                        <li 
                          v-for="nestedItem in subitem.submenu" 
                          :key="nestedItem.id"
                        >
                          <a 
                            :href="nestedItem.link || '#'"
                            class="nested-dropdown-link"
                            :class="{ 'active': activeSubmenu === nestedItem.id }"
                            @click="handleSubmenuClick($event, nestedItem)"
                          >
                            {{ nestedItem.label }}
                          </a>
                        </li>
                      </ul>
                    </transition>
                  </template>

                  <!-- Regular item in collapsed mode -->
                  <a 
                    v-else
                    :href="subitem.link || '#'"
                    class="submenu-dropdown-link"
                    :class="{ 'active': activeSubmenu === subitem.id }"
                    @click="handleSubmenuClick($event, subitem)"
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

    <!-- Version Footer -->
    <div class="sidebar-footer" v-if="!collapsed">
      <div class="version-info">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
        </svg>
        <div class="version-details">
          <div class="version-label">Version</div>
          <div class="version-number">1.0</div>
        </div>
      </div>
    </div>

    <div class="sidebar-footer-collapsed" v-else>
      <div class="version-badge" title="Version 1.0">
        <span>v1.0</span>
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
import { ref, defineProps, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const activeMenu = ref('dashboard')
const activeSubmenu = ref(null)
const openSubmenus = ref([])
const openNestedSubmenus = ref([])
const systemData = ref(null)

const menuItems = ref([
  {
    id: 'dashboard',
    label: 'Dashboard',
    link: '/admin/dashboard',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/></svg>'
  },
  {
    id: 'website',
    label: 'Website',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm5.93 7H13.9a12.3 12.3 0 00-1.02-4.06A6.02 6.02 0 0115.93 9zM10 4c.83 1.04 1.48 2.6 1.73 5H8.27C8.52 6.6 9.17 5.04 10 4zM4.07 11H6.1c.17 1.47.6 2.87 1.02 4.06A6.02 6.02 0 014.07 11zM6.1 9H4.07a6.02 6.02 0 013.05-4.06A12.3 12.3 0 006.1 9zm3.9 7c-.83-1.04-1.48-2.6-1.73-5h3.46c-.25 2.4-.9 3.96-1.73 5zm2.88-.94c.42-1.19.85-2.59 1.02-4.06h2.03a6.02 6.02 0 01-3.05 4.06z"/></svg>',
    submenu: [
      { id: 'carousel', link: '/admin/dashboard/carousel', label: 'Carousel' },
      { id: 'faq', link: '/admin/dashboard/faqs', label: 'Faq' },
      { id: 'offers', link: '/admin/dashboard/offers', label: 'Offers' },
    ]
  },
  {
    id: 'country',
    label: 'Country',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6c0 4.25 6 10 6 10s6-5.75 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z"/></svg>',
    submenu: [
      { id: 'countries', link: '/admin/dashboard/countries', label: 'Countries' },
      { id: 'universities', link: '/admin/dashboard/universities', label: 'Universities' },
    ]
  },
  {
    id: 'programs',
    link: '/admin/dashboard/programs',
    label: 'Programs',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M3 4a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4zm4 4l-2 2 2 2 1-1-1-1 1-1-1-1zm6 0l-1 1 1 1-1 1 1 1 2-2-2-2z"/></svg>'
  },
  {
    id: 'appointments',
    link: '/admin/dashboard/appointments',
    label: 'Appointments',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M6 2a1 1 0 012 0v1h4V2a1 1 0 112 0v1h1a2 2 0 012 2v2H3V5a2 2 0 012-2h1V2zM3 9h14v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9zm4 2a1 1 0 000 2h2a1 1 0 100-2H7z"/></svg>'
  },
  {
    id: 'contacts',
    link: '/admin/dashboard/contacts',
    label: 'Contacts',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>'
  },
  {
    id: 'setup',
    link: '/admin/dashboard/setup',
    label: 'Setup',
    icon: '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/></svg>',
  }
])

// Fetch System Settings
const fetchSystemSettings = async () => {
  try {
    const response = await axios.get(process.env.VUE_APP_BASE_API+'/system')
    
    if (response.data && response.data.system) {
      systemData.value = response.data.system
      console.log('System data loaded:', systemData.value)
    }
  } catch (error) {
    console.error('Error fetching system settings:', error)
  }
}

const getLogoUrl = (path) => {
  if (!path) return ''
  return process.env.VUE_APP_BASE_URL+`/${path}`
}

const handleMenuClick = (event, item) => {
  event.preventDefault()
  
  if (item.submenu) {
    // Toggle submenu
    toggleSubmenu(item)
  } else {
    // Navigate to link
    activeMenu.value = item.id
    closeAllSubmenus()
    if (item.link && router) {
      router.push(item.link)
    }
  }
}

const handleNestedMenuClick = (event, subitem) => {
  event.preventDefault()
  event.stopPropagation()
  
  const index = openNestedSubmenus.value.indexOf(subitem.id)
  
  if (index > -1) {
    openNestedSubmenus.value.splice(index, 1)
  } else {
    openNestedSubmenus.value.push(subitem.id)
  }
}

const handleSubmenuClick = (event, subitem) => {
  event.preventDefault()
  activeSubmenu.value = subitem.id
  
  if (props.collapsed) {
    closeAllSubmenus()
  }
  
  if (subitem.link && router) {
    router.push(subitem.link)
  }
}

const toggleSubmenu = (item) => {
  activeMenu.value = item.id
  const index = openSubmenus.value.indexOf(item.id)
  
  if (index > -1) {
    openSubmenus.value.splice(index, 1)
    // Close nested submenus when parent closes
    openNestedSubmenus.value = []
  } else {
    // Close other submenus when opening a new one in collapsed mode
    if (props.collapsed) {
      openSubmenus.value = [item.id]
    } else {
      openSubmenus.value.push(item.id)
    }
  }
}

const closeAllSubmenus = () => {
  openSubmenus.value = []
  openNestedSubmenus.value = []
}

// Watch for collapsed prop changes and close submenus
watch(() => props.collapsed, (newVal) => {
  if (!newVal) {
    // When expanding, close all submenus
    closeAllSubmenus()
  }
})

onMounted(() => {
  fetchSystemSettings()
})
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-image,
.logo-image-collapsed {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-image img,
.logo-image-collapsed img {
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  cursor: pointer;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.submenu-arrow,
.nested-arrow {
  margin-left: auto;
  padding-left: 8px;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  color: currentColor;
  flex-shrink: 0;
}

.nested-arrow {
  width: 14px;
  height: 14px;
  margin-left: 4px;
}

.submenu-arrow.rotated,
.nested-arrow.rotated,
.nested-arrow-small.rotated {
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

/* Submenu animations */
.submenu-list,
.nested-submenu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.submenu-enter-active,
.nested-submenu-enter-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top;
}

.submenu-leave-active,
.nested-submenu-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top;
}

.submenu-enter-from,
.nested-submenu-enter-from {
  opacity: 0;
  max-height: 0;
  transform: scaleY(0.8);
}

.submenu-enter-to,
.nested-submenu-enter-to {
  opacity: 1;
  max-height: 800px;
  transform: scaleY(1);
}

.submenu-leave-from,
.nested-submenu-leave-from {
  opacity: 1;
  max-height: 800px;
  transform: scaleY(1);
}

.submenu-leave-to,
.nested-submenu-leave-to {
  opacity: 0;
  max-height: 0;
  transform: scaleY(0.8);
}

.submenu-item,
.nested-submenu-item {
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
  cursor: pointer;
  position: relative;
}

.submenu-link.has-nested {
  padding-right: 32px;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

/* Nested submenu styles */
.nested-submenu-list {
  padding-left: 0;
  margin-top: 2px;
}

.nested-submenu-link {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  padding-left: 68px;
  color: #94a3b8;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}

.nested-submenu-link:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  transform: translateX(4px);
}

.nested-submenu-link.active {
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

.nested-submenu-link.active .nested-submenu-bullet {
  background: #3b82f6;
  box-shadow: 0 0 6px rgba(59, 130, 246, 0.6);
}

.nested-submenu-bullet {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #475569;
  transition: all 0.25s ease;
  flex-shrink: 0;
  margin-right: 10px;
}

.nested-submenu-link:hover .nested-submenu-bullet {
  background: #64748b;
}

.nested-submenu-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Mobile Dropdown Submenu */
.submenu-dropdown {
  position: fixed;
  left: 70px;
  top: 0;
  width: 240px;
  max-height: 100vh;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 0 12px 12px 0;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  overflow-y: auto;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  color: #94a3b8;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.submenu-dropdown-link.has-nested {
  padding-right: 12px;
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

.nested-arrow-small {
  width: 12px;
  height: 12px;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

/* Nested dropdown list in collapsed mode */
.nested-dropdown-list {
  list-style: none;
  padding: 4px 0 4px 16px;
  margin: 4px 0;
  border-left: 2px solid rgba(59, 130, 246, 0.2);
}

.nested-dropdown-link {
  display: block;
  padding: 8px 12px;
  color: #94a3b8;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 2px;
}

.nested-dropdown-link:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  transform: translateX(2px);
}

.nested-dropdown-link.active {
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.15);
}

/* Nested dropdown animation */
.nested-dropdown-enter-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.nested-dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.nested-dropdown-enter-from {
  opacity: 0;
  max-height: 0;
}

.nested-dropdown-enter-to {
  opacity: 1;
  max-height: 300px;
}

.nested-dropdown-leave-from {
  opacity: 1;
  max-height: 300px;
}

.nested-dropdown-leave-to {
  opacity: 0;
  max-height: 0;
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
.dropdown-enter-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.dropdown-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.dropdown-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Version Footer */
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

.version-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.version-info svg {
  width: 20px;
  height: 20px;
  color: #3b82f6;
  flex-shrink: 0;
}

.version-details {
  flex: 1;
  min-width: 0;
}

.version-label {
  font-size: 11px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}

.version-number {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.version-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.version-badge:hover {
  background: rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.5);
  transform: scale(1.05);
}

.version-badge span {
  font-size: 12px;
  font-weight: 700;
  color: #3b82f6;
}
</style>