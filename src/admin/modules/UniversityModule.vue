<template>
  <div class="dashboard">
    <div class="container">
      <div class="header">
        <h1>University Management</h1>
        <button class="add-btn" @click="openCreateModal">Add New University</button>
      </div>

      <FilterPanel
        title="Search & Filter"
        :fields="filterFields"
        v-model="searchFilters"
        @submit="handleSearch"
        @reset="handleReset"
      />

      <div v-if="isLoading && !items.length" class="loading-container">
        <div class="spinner-large"></div>
        <p>Loading universities...</p>
      </div>

      <div v-else-if="hasError && !items.length" class="error-container">
        <div class="error-icon">⚠️</div>
        <h3>Failed to Load Universities</h3>
        <p>{{ errorMessage }}</p>
        <button class="retry-btn" @click="loadData">Retry</button>
      </div>

      <div v-else class="table-container">
        <DataTable
          :data="paginatedData"
          :columns="tableColumns"
          :actions="tableActions"
          result-label="universities"
          @action="handleAction"
          @sort="handleSort"
        >
          <template #cell-logo="{ value }">
            <img v-if="value" :src="getImageUrl(value)" alt="Logo" class="uni-thumbnail" />
            <span v-else class="no-image">No Logo</span>
          </template>

          <template #cell-programs="{ value }">
            <div class="programs-cell">
              <span v-for="(prog, i) in parsePrograms(value).slice(0, 2)" :key="i" class="program-chip">{{ prog }}</span>
              <span v-if="parsePrograms(value).length > 2" class="program-chip more">+{{ parsePrograms(value).length - 2 }}</span>
              <span v-if="parsePrograms(value).length === 0" class="no-image">—</span>
            </div>
          </template>
        </DataTable>

        <Pagination
          v-model="currentPage"
          :total-items="filteredData.length"
          :page-size="itemsPerPage"
          :page-size-options="[5, 10, 20, 50]"
          item-label="universities"
          :show-first-last="true"
          :show-jump-to="true"
          @update:page-size="handlePageSizeChange"
          @page-change="handlePageChange"
        />
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════
         CUSTOM CREATE / EDIT MODAL
    ════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <div v-if="showFormModal" class="modal-overlay" @click.self="showFormModal = false">
        <div class="modal-box">

          <!-- Modal Header -->
          <div class="modal-header">
            <h2>{{ modalMode === 'create' ? 'Add New University' : 'Edit University' }}</h2>
            <button class="modal-close" @click="showFormModal = false">×</button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <form @submit.prevent="submitForm" novalidate>
              <div class="form-grid">

                <!-- University Name -->
                <div class="form-field full-width">
                  <label>University Name <span class="required">*</span></label>
                  <input v-model="form.name" type="text" placeholder="Enter university name..." />
                  <span v-if="formErrors.name" class="field-error">{{ formErrors.name }}</span>
                </div>

                <!-- Logo -->
                <div class="form-field full-width">
                  <label>University Logo <span v-if="modalMode === 'create'" class="required">*</span></label>
                  <input type="file" accept="image/*" @change="handleLogoChange" />
                  <p class="field-hint">JPG, PNG, GIF, WEBP — max 2MB</p>
                  <img v-if="logoPreview" :src="logoPreview" class="logo-preview" alt="Logo preview" />
                  <span v-if="formErrors.logo" class="field-error">{{ formErrors.logo }}</span>
                </div>

                <!-- Country -->
                <div class="form-field">
                  <label>Country <span class="required">*</span></label>
                  <select v-model="form.country_id">
                    <option value="">{{ countriesLoading ? 'Loading...' : 'Select a country...' }}</option>
                    <option v-for="c in countries" :key="c.value" :value="c.value">{{ c.label }}</option>
                  </select>
                  <span v-if="formErrors.country_id" class="field-error">{{ formErrors.country_id }}</span>
                </div>

                <!-- Address -->
                <div class="form-field">
                  <label>Address</label>
                  <input v-model="form.address" type="text" placeholder="Enter address..." />
                </div>

                <!-- Ranking -->
                <div class="form-field">
                  <label>World Ranking</label>
                  <input v-model="form.ranking" type="text" placeholder="e.g. 18" />
                </div>

                <!-- Established -->
                <div class="form-field">
                  <label>Established</label>
                  <input v-model="form.established" type="date" />
                </div>

                <!-- Students Enrolled -->
                <div class="form-field">
                  <label>Students Enrolled</label>
                  <input v-model="form.students_enrolled" type="text" placeholder="e.g. 50,000" />
                </div>

                <!-- Acceptance Rate -->
                <div class="form-field">
                  <label>Acceptance Rate (%)</label>
                  <input v-model="form.acceptance_rate" type="text" placeholder="e.g. 45" />
                </div>

                <!-- Tuition Fee -->
                <div class="form-field">
                  <label>Tuition Fee</label>
                  <input v-model="form.tuition_fee" type="text" placeholder="e.g. $25,000 / year" />
                </div>

                <!-- Duration -->
                <div class="form-field">
                  <label>Duration</label>
                  <input v-model="form.duration" type="text" placeholder="e.g. 4 Years" />
                </div>

                <!-- Intake Session -->
                <div class="form-field">
                  <label>Intake Session</label>
                  <input v-model="form.intake_session" type="text" placeholder="e.g. Sep / Jan" />
                </div>

                <!-- Language -->
                <div class="form-field">
                  <label>Language</label>
                  <input v-model="form.language" type="text" placeholder="e.g. English" />
                </div>

                <!-- Website -->
                <div class="form-field full-width">
                  <label>Official Website</label>
                  <input v-model="form.website" type="text" placeholder="https://university.edu" />
                </div>

                <!-- Programs Offered — Tags Input -->
                <div class="form-field full-width">
                  <label>Programs Offered</label>
                  <div class="tags-input-wrapper" :class="{ focused: tagsFocused }" @click="tagsInputRef?.focus()">
                    <div class="tags-list">
                      <span v-for="(tag, i) in form.programs" :key="i" class="tag-item">
                        {{ tag }}
                        <button type="button" class="tag-remove" @click.stop="removeProgram(i)">×</button>
                      </span>
                      <input
                        ref="tagsInputRef"
                        v-model="tagInput"
                        class="tags-input"
                        :placeholder="form.programs.length === 0 ? 'e.g. Computer Science, Engineering...' : 'Add more...'"
                        @keydown="handleTagKeydown"
                        @focus="tagsFocused = true"
                        @blur="handleTagBlur"
                      />
                    </div>
                  </div>
                  <p class="field-hint">Press <kbd>Enter</kbd> or <kbd>,</kbd> to add each program. <kbd>Backspace</kbd> to remove last.</p>
                </div>

              </div>
            </form>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn-cancel" @click="showFormModal = false">Cancel</button>
            <button type="button" class="btn-submit" :disabled="formSubmitting" @click="submitForm">
              <span v-if="formSubmitting" class="btn-spinner"></span>
              {{ formSubmitting ? 'Saving...' : (modalMode === 'create' ? 'Create University' : 'Save Changes') }}
            </button>
          </div>

        </div>
      </div>
    </Teleport>

    <!-- Delete Modal — keep using BaseModal, no custom fields needed -->
    <BaseModal
      v-model="showDeleteModal"
      mode="delete"
      entity-name="university"
      :initial-data="selectedItem"
      :on-submit="handleDeleteSubmit"
      delete-message="This university will be permanently removed from the system."
      @success="handleDeleteSuccess"
      @error="handleModalError"
    />

    <!-- View Modal -->
    <BaseModal
      v-model="showViewModal"
      mode="view"
      entity-name="university"
      :fields="viewFields"
      :initial-data="selectedItem"
      size="large"
    />

    <NotificationModal
      v-model="notification.show"
      :type="notification.type"
      :title="notification.title"
      :message="notification.message"
      :details="notification.details"
      :list="notification.list"
      :confirm-label="notification.confirmLabel"
      :auto-close="notification.autoClose"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { useCrudStore } from '@/store/crud'
import { useAuthStore } from '@/store/auth'
import FilterPanel       from './components/FilterComponent.vue'
import DataTable         from './components/TableComponent.vue'
import Pagination        from './components/PaginationComponent.vue'
import BaseModal         from './components/ActionModalComponent.vue'
import NotificationModal from './components/NotificationModal.vue'

// ─── Store & helpers ──────────────────────────────────────────────────────────
const crudStore   = useCrudStore()
const authStore   = useAuthStore()
const STORAGE_URL = process.env.VUE_APP_STORAGE_URL || process.env.VUE_APP_BASE_URL
const API_BASE    = process.env.VUE_APP_BASE_API

const getImageUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${STORAGE_URL}/${path.startsWith('/') ? path.slice(1) : path}`
}

const parsePrograms = (value) => {
  if (!value) return []
  if (Array.isArray(value)) return value
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return value.split(',').map(s => s.trim()).filter(Boolean)
    }
  }
  return []
}

// ─── Modal state ──────────────────────────────────────────────────────────────
const showFormModal   = ref(false)
const showDeleteModal = ref(false)
const showViewModal   = ref(false)
const modalMode       = ref('create')
const selectedItem    = ref({})

// ─── Form state ───────────────────────────────────────────────────────────────
const defaultForm = () => ({
  name: '', logo: null, country_id: '', address: '', ranking: '',
  established: '', students_enrolled: '', acceptance_rate: '',
  tuition_fee: '', duration: '', intake_session: '',
  language: '', programs: [], website: ''
})

const form           = ref(defaultForm())
const formErrors     = ref({})
const formSubmitting = ref(false)
const logoPreview    = ref('')
const logoFile       = ref(null)

// Tags input state
const tagInput     = ref('')
const tagsFocused  = ref(false)
const tagsInputRef = ref(null)

const handleLogoChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  logoFile.value   = file
  logoPreview.value = URL.createObjectURL(file)
}

const handleTagKeydown = (e) => {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault()
    addProgram()
  } else if (e.key === 'Backspace' && tagInput.value === '' && form.value.programs.length > 0) {
    removeProgram(form.value.programs.length - 1)
  }
}

const addProgram = () => {
  const val = tagInput.value.replace(/,/g, '').trim()
  if (val && !form.value.programs.includes(val)) {
    form.value.programs = [...form.value.programs, val]
  }
  tagInput.value = ''
}

const removeProgram = (index) => {
  form.value.programs = form.value.programs.filter((_, i) => i !== index)
}

const handleTagBlur = () => {
  tagsFocused.value = false
  if (tagInput.value.trim()) addProgram()
}

// ─── Form validation ──────────────────────────────────────────────────────────
const validateForm = () => {
  formErrors.value = {}
  if (!form.value.name?.trim())       formErrors.value.name       = 'University name is required.'
  if (!form.value.country_id)         formErrors.value.country_id = 'Please select a country.'
  if (modalMode.value === 'create' && !logoFile.value) {
    formErrors.value.logo = 'Please upload a logo image.'
  }
  return Object.keys(formErrors.value).length === 0
}

// ─── Submit form ──────────────────────────────────────────────────────────────
const submitForm = async () => {
  if (!validateForm()) return

  formSubmitting.value = true

  try {
    const fd = new FormData()

    // Append all text fields
    const textFields = [
      'name', 'country_id', 'address', 'ranking', 'established',
      'students_enrolled', 'acceptance_rate', 'tuition_fee',
      'duration', 'intake_session', 'language', 'website'
    ]
    textFields.forEach(key => {
      if (form.value[key]) fd.append(key, form.value[key])
    })

    // Append logo file if selected
    if (logoFile.value) {
      fd.append('logo', logoFile.value)
    }

    // Append programs as array
    form.value.programs.forEach(p => fd.append('programs[]', p))

    let result
    if (modalMode.value === 'create') {
      result = await crudStore.create('/admin/universities', fd)
    } else {
      fd.append('_method', 'PUT')
      result = await crudStore.post(`/admin/universities/${selectedItem.value.id}`, fd)
    }

    if (!result.success) throw new Error(result.error?.message || 'Request failed')

    showFormModal.value = false
    const name = result.data?.university?.name || result.data?.name || 'The university'
    showNotification('success',
      modalMode.value === 'create' ? 'University created successfully!' : 'University updated successfully!',
      { details: `${name} has been ${modalMode.value === 'create' ? 'added' : 'updated'}.`, autoClose: 3000 }
    )
    loadData()

  } catch (err) {
    const errs = err?.response?.data?.errors
    showNotification('error', err.message || 'An error occurred', errs
      ? { details: 'Please check the following fields:', list: Object.entries(errs).map(([f, m]) => `${f}: ${Array.isArray(m) ? m.join(', ') : m}`) }
      : { details: 'Please check your input and try again.' }
    )
  } finally {
    formSubmitting.value = false
  }
}

// ─── Notification ─────────────────────────────────────────────────────────────
const notification = ref({
  show: false, type: 'success', title: '', message: '',
  details: '', list: [], confirmLabel: 'OK', autoClose: 0
})
const showNotification = (type, message, options = {}) => {
  notification.value = {
    show: true, type, message,
    title:        options.title        || '',
    details:      options.details      || '',
    list:         options.list         || [],
    confirmLabel: options.confirmLabel || 'OK',
    autoClose:    options.autoClose    || 0
  }
}

// ─── Store computed ───────────────────────────────────────────────────────────
const items        = computed(() => crudStore.getAllItems)
const isLoading    = computed(() => crudStore.isLoading)
const hasError     = computed(() => crudStore.hasError)
const errorMessage = computed(() => crudStore.getError?.message || 'An error occurred')

// ─── Search / pagination ──────────────────────────────────────────────────────
const searchFilters = ref({ search: '', country_id: '' })
const currentPage   = ref(1)
const itemsPerPage  = ref(10)
const sortConfig    = ref({ by: '', order: 'asc' })

// ─── Countries via direct axios ───────────────────────────────────────────────
const countries        = ref([])
const countriesLoading = ref(false)

const loadCountries = async () => {
  countriesLoading.value = true
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`
    const res = await axios.get(`${API_BASE}/admin/countries`, { params: { limit: 500 } })
    const raw = res.data?.list || res.data?.data || res.data || []
    countries.value = raw.map(c => ({ value: c.id, label: c.name }))
  } catch (e) {
    console.error('Failed to load countries:', e)
  } finally {
    countriesLoading.value = false
  }
}

// ─── Filter / table config ────────────────────────────────────────────────────
const filterFields = computed(() => [
  { name: 'search',     label: 'University Name', type: 'text',   placeholder: 'Search by name...' },
  { name: 'country_id', label: 'Country',         type: 'select', placeholder: 'All Countries', options: countries.value }
])

// Fields used only by the View modal (no tags type needed there)
const viewFields = [
  { name: 'name',              label: 'University Name'     },
  { name: 'country_id',        label: 'Country'             },
  { name: 'address',           label: 'Address'             },
  { name: 'ranking',           label: 'World Ranking'       },
  { name: 'established',       label: 'Established'         },
  { name: 'students_enrolled', label: 'Students Enrolled'   },
  { name: 'acceptance_rate',   label: 'Acceptance Rate (%)'  },
  { name: 'tuition_fee',       label: 'Tuition Fee'         },
  { name: 'duration',          label: 'Duration'            },
  { name: 'intake_session',    label: 'Intake Session'      },
  { name: 'language',          label: 'Language'            },
  { name: 'website',           label: 'Website'             },
]

const tableColumns = [
  { key: 'id',             label: 'ID',          sortable: true,  width: '60px'   },
  { key: 'logo',           label: 'Logo',        sortable: false, width: '80px'   },
  { key: 'name',           label: 'University',  sortable: true                   },
  { key: 'country.name',   label: 'Country',     sortable: false                  },
  { key: 'ranking',        label: 'Ranking',     sortable: true                   },
  { key: 'tuition_fee',    label: 'Tuition Fee', sortable: false                  },
  { key: 'duration',       label: 'Duration',    sortable: false                  },
  { key: 'intake_session', label: 'Intake',      sortable: false                  },
  { key: 'programs',       label: 'Programs',    sortable: false                  },
  { key: 'created_at',     label: 'Added',       type: 'date',   sortable: true   },
  { key: 'actions',        label: 'Actions',     type: 'actions', align: 'center' }
]

const tableActions = [
  { name: 'view',   label: 'View',   class: 'btn-view'   },
  { name: 'edit',   label: 'Edit',   class: 'btn-edit'   },
  { name: 'delete', label: 'Delete', class: 'btn-delete' }
]

// ─── Filtered + paginated ─────────────────────────────────────────────────────
const filteredData = computed(() => {
  let data = items.value.filter(item => {
    const matchesSearch  = !searchFilters.value.search ||
      item.name?.toLowerCase().includes(searchFilters.value.search.toLowerCase())
    const matchesCountry = !searchFilters.value.country_id ||
      String(item.country_id) === String(searchFilters.value.country_id)
    return matchesSearch && matchesCountry
  })
  if (sortConfig.value.by) {
    data.sort((a, b) => {
      const av = a[sortConfig.value.by], bv = b[sortConfig.value.by]
      if (av < bv) return sortConfig.value.order === 'asc' ? -1 : 1
      if (av > bv) return sortConfig.value.order === 'asc' ?  1 : -1
      return 0
    })
  }
  return data
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredData.value.slice(start, start + itemsPerPage.value)
})

// ─── Load data ────────────────────────────────────────────────────────────────
const loadData = async () => {
  crudStore.clearError()
  const params = {
    page: currentPage.value, limit: itemsPerPage.value,
    ...(searchFilters.value.search     && { search:     searchFilters.value.search     }),
    ...(searchFilters.value.country_id && { country_id: searchFilters.value.country_id }),
    ...(sortConfig.value.by            && { sort_by: sortConfig.value.by, sort_order: sortConfig.value.order })
  }
  const result = await crudStore.fetchAll('/admin/universities', params)
  if (!result.success) {
    showNotification('error', 'Failed to load universities', {
      details: result.error?.message || 'Please try again later.'
    })
  }
}

// ─── Modal openers ────────────────────────────────────────────────────────────
const openCreateModal = () => {
  form.value        = defaultForm()
  formErrors.value  = {}
  logoPreview.value = ''
  logoFile.value    = null
  tagInput.value    = ''
  modalMode.value   = 'create'
  showFormModal.value = true
}

const openEditModal = async (item) => {
  const result = await crudStore.fetchById('/admin/universities/', item.id)
  if (result.success) {
    const data = result.data?.university || result.data
    form.value = {
      name:              data.name              || '',
      logo:              null,
      country_id:        data.country_id        || '',
      address:           data.address           || '',
      ranking:           data.ranking           || '',
      established:       data.established       || '',
      students_enrolled: data.students_enrolled || '',
      acceptance_rate:   data.acceptance_rate   || '',
      tuition_fee:       data.tuition_fee       || '',
      duration:          data.duration          || '',
      intake_session:    data.intake_session    || '',
      language:          data.language          || '',
      programs:          parsePrograms(data.programs),
      website:           data.website           || '',
    }
    logoPreview.value = data.logo ? getImageUrl(data.logo) : ''
    logoFile.value    = null
    formErrors.value  = {}
    tagInput.value    = ''
    selectedItem.value = data
    modalMode.value    = 'edit'
    showFormModal.value = true
  } else {
    showNotification('error', 'Failed to load university details', { details: result.error?.message })
  }
}

const openDeleteModal = (item) => {
  selectedItem.value    = { ...item }
  showDeleteModal.value = true
}

const openViewModal = async (item) => {
  const result = await crudStore.fetchById('/admin/universities/', item.id)
  if (result.success) {
    const data = result.data?.university || result.data
    selectedItem.value  = { ...data, programs: parsePrograms(data.programs).join(', ') }
    showViewModal.value = true
  } else {
    showNotification('error', 'Failed to load university details', { details: result.error?.message })
  }
}

// ─── Delete ───────────────────────────────────────────────────────────────────
const handleDeleteSubmit = async (data) => {
  const result = await crudStore.delete('/admin/universities/', data.id)
  if (!result.success) throw new Error(result.error?.message)
  return result.data
}

const handleDeleteSuccess = () => {
  showNotification('success', 'University deleted successfully!', {
    details: 'The university has been permanently removed.', autoClose: 3000
  })
  loadData()
}

const handleModalError = ({ error }) => {
  const msg  = error?.message || 'An unexpected error occurred.'
  const errs = error?.response?.data?.errors || error?.errors
  showNotification('error', msg, errs
    ? { details: 'Please check the following fields:', list: Object.entries(errs).map(([f, m]) => `${f}: ${Array.isArray(m) ? m.join(', ') : m}`) }
    : { details: 'Please check your input and try again.' }
  )
}

// ─── Search / sort / pagination ───────────────────────────────────────────────
const handleSearch = () => {
  currentPage.value = 1
  loadData()
  showNotification('info', 'Filters applied', { details: `Found ${filteredData.value.length} university(s).`, autoClose: 2000 })
}

const handleReset = () => {
  searchFilters.value = { search: '', country_id: '' }
  currentPage.value   = 1
  loadData()
  showNotification('info', 'Filters reset', { details: 'All filters cleared.', autoClose: 2000 })
}

const handleSort           = (s) => { sortConfig.value = s; loadData() }
const handlePageChange     = (p) => { currentPage.value = p; loadData() }
const handlePageSizeChange = (n) => { itemsPerPage.value = n; currentPage.value = 1; loadData() }
const handleAction = ({ action, row }) =>
  ({ view: openViewModal, edit: openEditModal, delete: openDeleteModal })[action]?.(row)

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(async () => {
  await loadCountries()
  await loadData()
})

onBeforeUnmount(() => crudStore.clearCurrentItem())
</script>

<style scoped>
.dashboard { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; min-height: 100vh; background: #f0f2f5; }
.container { max-width: 1400px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); overflow: hidden; }

.header { background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%); color: white; padding: 30px 40px; display: flex; justify-content: space-between; align-items: center; }
.header h1 { font-size: 28px; font-weight: 600; margin: 0; }
.add-btn { background: white; color: #1E40AF; border: none; padding: 12px 24px; border-radius: 6px; font-size: 15px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.3s ease; }
.add-btn::before { content: '+'; font-size: 20px; font-weight: bold; }
.add-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }

.loading-container, .error-container { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 40px; text-align: center; }
.spinner-large { width: 60px; height: 60px; border: 4px solid #f3f3f3; border-top-color: #1E40AF; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px; }
@keyframes spin { to { transform: rotate(360deg); } }
.loading-container p, .error-container p { font-size: 16px; color: #6c757d; margin: 0 0 20px; }
.error-icon { font-size: 64px; margin-bottom: 20px; }
.error-container h3 { font-size: 24px; color: #dc3545; margin: 0 0 10px; }
.retry-btn { padding: 12px 32px; background: #1E40AF; color: white; border: none; border-radius: 6px; font-size: 15px; font-weight: 600; cursor: pointer; }
.retry-btn:hover { background: #1E3A8A; }

.table-container { padding: 40px; }
.uni-thumbnail { width: 60px; height: 60px; object-fit: contain; border-radius: 8px; border: 1px solid #e9ecef; background: #f8f9fa; padding: 4px; }
.no-image { color: #6c757d; font-size: 12px; font-style: italic; }
.programs-cell { display: flex; flex-wrap: wrap; gap: 4px; }
.program-chip { background: #EFF6FF; color: #1E40AF; font-size: 11px; font-weight: 500; padding: 2px 8px; border-radius: 20px; border: 1px solid #DBEAFE; }
.program-chip.more { background: #F3F4F6; color: #6B7280; border-color: #E5E7EB; }

/* ── Custom Modal ─────────────────────────────────────────── */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 9999; padding: 20px;
}
.modal-box {
  background: white; border-radius: 16px; width: 100%; max-width: 860px;
  max-height: 90vh; display: flex; flex-direction: column;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}
.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 24px 28px; border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(135deg, #1E40AF, #1E3A8A);
  border-radius: 16px 16px 0 0;
}
.modal-header h2 { font-size: 20px; font-weight: 700; color: white; margin: 0; }
.modal-close { background: rgba(255,255,255,0.2); border: none; color: white; width: 32px; height: 32px; border-radius: 50%; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; line-height: 1; }
.modal-close:hover { background: rgba(255,255,255,0.35); }

.modal-body { padding: 28px; overflow-y: auto; flex: 1; }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.form-field { display: flex; flex-direction: column; gap: 6px; }
.form-field.full-width { grid-column: 1 / -1; }
.form-field label { font-size: 13px; font-weight: 600; color: #374151; }
.required { color: #ef4444; margin-left: 2px; }
.form-field input[type="text"],
.form-field input[type="date"],
.form-field select {
  padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 8px;
  font-size: 14px; color: #374151; background: white;
  transition: border-color 0.2s, box-shadow 0.2s; outline: none;
}
.form-field input[type="text"]:focus,
.form-field input[type="date"]:focus,
.form-field select:focus {
  border-color: #1E40AF;
  box-shadow: 0 0 0 3px rgba(30,64,175,0.1);
}
.form-field input[type="file"] { font-size: 13px; color: #374151; }
.field-hint { font-size: 11px; color: #9CA3AF; margin: 2px 0 0; }
.field-hint kbd { background: #F3F4F6; border: 1px solid #D1D5DB; border-radius: 3px; padding: 1px 5px; font-size: 11px; }
.field-error { font-size: 12px; color: #ef4444; }
.logo-preview { width: 80px; height: 80px; object-fit: contain; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb; padding: 4px; margin-top: 6px; }

/* Tags Input */
.tags-input-wrapper {
  border: 1px solid #d1d5db; border-radius: 8px; padding: 8px 10px;
  background: white; cursor: text; transition: border-color 0.2s, box-shadow 0.2s; min-height: 44px;
}
.tags-input-wrapper.focused { border-color: #1E40AF; box-shadow: 0 0 0 3px rgba(30,64,175,0.1); }
.tags-list { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.tag-item {
  display: inline-flex; align-items: center; gap: 5px;
  background: #EFF6FF; color: #1E40AF; border: 1px solid #DBEAFE;
  padding: 3px 10px; border-radius: 20px; font-size: 13px; font-weight: 500; white-space: nowrap;
}
.tag-remove { background: none; border: none; color: #1E40AF; cursor: pointer; font-size: 16px; line-height: 1; padding: 0; opacity: 0.6; transition: opacity 0.2s; }
.tag-remove:hover { opacity: 1; }
.tags-input { border: none; outline: none; font-size: 14px; color: #374151; min-width: 180px; flex: 1; padding: 2px 0; background: transparent; height: 28px; display: inline-block; }

.modal-footer {
  display: flex; align-items: center; justify-content: flex-end; gap: 12px;
  padding: 20px 28px; border-top: 1px solid #e5e7eb; background: #f9fafb;
  border-radius: 0 0 16px 16px;
}
.btn-cancel { padding: 10px 24px; background: white; color: #374151; border: 1.5px solid #d1d5db; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.btn-cancel:hover { background: #f3f4f6; }
.btn-submit { padding: 10px 28px; background: linear-gradient(135deg, #1E40AF, #1E3A8A); color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s; }
.btn-submit:hover:not(:disabled) { box-shadow: 0 4px 12px rgba(30,64,175,0.35); transform: translateY(-1px); }
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.4); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; }

@media (max-width: 768px) {
  .header { flex-direction: column; gap: 20px; text-align: center; }
  .table-container, .loading-container, .error-container { padding: 20px; }
  .uni-thumbnail { width: 48px; height: 48px; }
  .form-grid { grid-template-columns: 1fr; }
  .modal-box { max-height: 95vh; }
}
</style>