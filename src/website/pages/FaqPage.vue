<template>
  <div class="faq-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-background">
        <div class="floating-icon icon-1">❓</div>
        <div class="floating-icon icon-2">💡</div>
        <div class="floating-icon icon-3">📚</div>
        <div class="floating-icon icon-4">🎓</div>
        <div class="floating-icon icon-5">✨</div>
      </div>
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Frequently Asked Questions</h1>
          <p class="hero-description">
            Find answers to common questions about studying abroad, our services, and the application process
          </p>
          
          <!-- Search Bar -->
          <!-- <div class="search-container">
            <div class="search-box">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Search for questions..."
                class="search-input"
              />
              <button v-if="searchQuery" @click="searchQuery = ''" class="clear-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <p class="search-hint" v-if="searchQuery && filteredFaqs.length === 0">
              No results found for "{{ searchQuery }}". Try different keywords.
            </p>
          </div> -->

          <!-- Quick Stats -->
          <div class="quick-stats">
            <div class="stat-item">
              <span class="stat-number">{{ categories.length }}</span>
              <span class="stat-label">Categories</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalQuestions }}</span>
              <span class="stat-label">Questions</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">24/7</span>
              <span class="stat-label">Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Filters -->
    <div class="category-section">
      <div class="container">
        <div class="category-tabs">
          <button 
            :class="['category-tab', { active: selectedCategory === 'all' }]"
            @click="selectCategory('all')"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            All Questions
            <span class="count">{{ totalQuestions }}</span>
          </button>
          <button 
            v-for="category in categories" 
            :key="category.id"
            :class="['category-tab', { active: selectedCategory === category.id }]"
            @click="selectCategory(category.id)"
          >
            <span class="category-emoji">{{ category.emoji }}</span>
            {{ category.name }}
            <span class="count">{{ category.questions.length }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- FAQ Content -->
    <div class="faq-content-section">
      <div class="container">
        <transition-group name="fade-slide" tag="div" class="faq-list">
          <div 
            v-for="(faq, index) in displayedFaqs" 
            :key="faq.id"
            class="faq-item"
            :class="{ active: activeFaq === faq.id }"
          >
            <div class="faq-question" @click="toggleFaq(faq.id)">
              <div class="question-content">
                <span class="question-number">{{ index + 1 }}</span>
                <h3 v-html="highlightSearchTerm(faq.question)"></h3>
              </div>
              <div class="faq-controls">
                <span class="category-badge">{{ faq.categoryName }}</span>
                <svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>
            <transition name="expand">
              <div v-if="activeFaq === faq.id" class="faq-answer">
                <div class="answer-content" v-html="highlightSearchTerm(faq.answer)"></div>
                <div class="answer-footer">
                  <button class="helpful-btn" @click.stop="markHelpful(faq.id)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                    </svg>
                    Helpful
                  </button>
                  <span class="helpful-count">{{ faq.helpfulCount || 0 }} found this helpful</span>
                </div>
              </div>
            </transition>
          </div>
        </transition-group>

        <div v-if="displayedFaqs.length === 0 && !searchQuery" class="no-results">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <h3>No questions in this category yet</h3>
          <p>Check back soon or browse other categories</p>
        </div>
      </div>
    </div>

    <!-- Popular Topics -->
    <!-- <div class="popular-topics-section">
      <div class="container">
        <div class="section-header">
          <h2>Popular Topics</h2>
          <p>Quick links to the most searched topics</p>
        </div>

        <div class="topics-grid">
          <div 
            v-for="topic in popularTopics" 
            :key="topic.id"
            class="topic-card"
            @click="searchForTopic(topic.keyword)"
          >
            <div class="topic-icon">{{ topic.emoji }}</div>
            <h4>{{ topic.title }}</h4>
            <p>{{ topic.description }}</p>
            <div class="topic-footer">
              <span class="question-count">{{ topic.questionCount }} questions</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- Still Have Questions -->
    <div class="contact-cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="cta-content">
            <div class="cta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div class="cta-text">
              <h3>Still have questions?</h3>
              <p>Can't find the answer you're looking for? Our expert counselors are here to help you.</p>
            </div>
          </div>
          <div class="cta-buttons">
            <button class="cta-btn primary" @click="goToContact">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Contact Us
            </button>
            <button class="cta-btn secondary" @click="bookConsultation">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Book Free Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FAQPage',
  data() {
    return {
      searchQuery: '',
      selectedCategory: 'all',
      activeFaq: null,
      
      categories: [
        {
          id: 'general',
          name: 'General',
          emoji: '💼',
          questions: [
            {
              id: 1,
              question: 'What services does StudentConsult provide?',
              answer: 'StudentConsult offers comprehensive study abroad services including university selection, application assistance, test preparation (IELTS, TOEFL, GRE, GMAT), visa processing, scholarship guidance, and pre-departure support. We also provide career counseling and help with accommodation arrangements.',
              helpfulCount: 145
            },
            {
              id: 2,
              question: 'How much do your services cost?',
              answer: 'Our first consultation is completely free! After that, we offer flexible packages based on your needs. Our basic package starts at $500 for application assistance, while comprehensive packages including test prep and visa support range from $1,500-$3,000. We also offer payment plans to make our services accessible.',
              helpfulCount: 98
            },
            {
              id: 3,
              question: 'How long does the entire process take?',
              answer: 'The timeline varies depending on your chosen program and country. Generally, the process takes 6-12 months from initial consultation to departure. This includes 2-3 months for test preparation, 3-4 months for applications, 1-2 months for visa processing, and additional time for pre-departure preparations.',
              helpfulCount: 87
            },
            {
              id: 4,
              question: 'Do you guarantee admission to universities?',
              answer: 'While we cannot guarantee admission (as final decisions rest with universities), we have a 95% success rate. We carefully evaluate your profile, shortlist suitable universities, and ensure your application is as strong as possible. Our experienced counselors know what universities look for and guide you accordingly.',
              helpfulCount: 76
            }
          ]
        },
        {
          id: 'application',
          name: 'Application Process',
          emoji: '📝',
          questions: [
            {
              id: 11,
              question: 'What documents do I need for university applications?',
              answer: 'Typically, you\'ll need: academic transcripts and certificates, English proficiency test scores (IELTS/TOEFL), standardized test scores (GRE/GMAT for graduate programs), letters of recommendation (2-3), statement of purpose, resume/CV, passport copy, and financial documents. Specific requirements vary by university and program.',
              helpfulCount: 156
            },
            {
              id: 12,
              question: 'How many universities should I apply to?',
              answer: 'We recommend applying to 6-8 universities: 2-3 "dream" schools (reach), 3-4 "target" schools (match), and 1-2 "safety" schools. This strategy balances ambition with practicality and increases your chances of admission while managing application costs.',
              helpfulCount: 123
            },
            {
              id: 13,
              question: 'Can you help write my Statement of Purpose (SOP)?',
              answer: 'Yes! Our expert writers work closely with you to craft a compelling SOP that highlights your unique story, achievements, and goals. We don\'t write it for you, but guide you through multiple drafts, providing feedback and suggestions to make it authentic and impactful.',
              helpfulCount: 134
            },
            {
              id: 14,
              question: 'What are application deadlines?',
              answer: 'Deadlines vary by country and university. For Fall intake (September/October start): US universities typically have deadlines from December to February; Canada from January to March; UK from January to June; Malaysia has rolling admissions. Spring intake deadlines are usually 6 months earlier. We help you track and meet all deadlines.',
              helpfulCount: 92
            },
            {
              id: 15,
              question: 'How do I get strong letters of recommendation?',
              answer: 'Choose recommenders who know you well academically or professionally - professors, supervisors, or mentors. Ask them at least 2 months in advance, provide your resume and key achievements, explain your goals, and offer to draft points they could include. We provide templates and guidance on this process.',
              helpfulCount: 88
            }
          ]
        },
        {
          id: 'tests',
          name: 'Tests & Scores',
          emoji: '📊',
          questions: [
            {
              id: 21,
              question: 'Which English test should I take - IELTS or TOEFL?',
              answer: 'Both are widely accepted. IELTS is more popular for UK, Canada, and Australia, while TOEFL is preferred by US universities. IELTS includes a face-to-face speaking test, while TOEFL is computer-based. Consider your strengths and target country. We offer preparation courses for both.',
              helpfulCount: 167
            },
            {
              id: 22,
              question: 'What is a competitive GRE/GMAT score?',
              answer: 'For GRE: Top universities typically expect 320+ (out of 340), good universities 310-320, and average programs 300-310. For GMAT: Top MBA programs look for 700+, good programs 650-700, average programs 600-650. However, a holistic profile matters more than just test scores.',
              helpfulCount: 143
            },
            {
              id: 23,
              question: 'How long should I prepare for these tests?',
              answer: 'We recommend 2-3 months of dedicated preparation for English tests (IELTS/TOEFL) and 3-4 months for GRE/GMAT. This includes learning test strategies, practicing regularly, and taking mock tests. Our structured preparation programs optimize your study time.',
              helpfulCount: 98
            },
            {
              id: 24,
              question: 'Can I apply without GRE/GMAT scores?',
              answer: 'Yes! Many universities now offer GRE/GMAT waivers, especially post-COVID. Requirements vary by program and your profile. Some programs waive scores for applicants with strong work experience, high GPAs, or from certain undergraduate institutions. We help identify such programs.',
              helpfulCount: 112
            }
          ]
        },
        {
          id: 'visa',
          name: 'Visa & Immigration',
          emoji: '✈️',
          questions: [
            {
              id: 31,
              question: 'How long does visa processing take?',
              answer: 'Processing times vary by country: USA (F-1 visa): 3-5 weeks; Canada (Study Permit): 4-8 weeks; UK (Student visa): 3 weeks; Malaysia (Student Pass): 6-8 weeks. We recommend applying as soon as you receive your admission letter. Our visa experts guide you through every step.',
              helpfulCount: 178
            },
            {
              id: 32,
              question: 'What are the chances of visa rejection?',
              answer: 'With proper documentation and preparation, rejection rates are low (5-10%). Common reasons for rejection include insufficient financial proof, unclear study plans, or poor interview performance. Our 95% visa success rate reflects our thorough preparation and interview coaching.',
              helpfulCount: 156
            },
            {
              id: 33,
              question: 'What financial documents are needed for visa?',
              answer: 'You\'ll need: bank statements (typically 6-12 months), proof of funds covering tuition and living expenses, sponsor letters (if applicable), loan sanction letters, property documents, income tax returns, and employment letters. Exact requirements vary by country and we provide detailed checklists.',
              helpfulCount: 134
            },
            {
              id: 34,
              question: 'Can I work while studying?',
              answer: 'Most countries allow part-time work: USA: 20 hours/week on-campus; Canada: 20 hours/week during term, full-time during breaks; UK: 20 hours/week during term; Malaysia: 20 hours/week during semester breaks. Post-study work options vary - we provide detailed guidance on work rights.',
              helpfulCount: 189
            },
            {
              id: 35,
              question: 'Do you help with visa interview preparation?',
              answer: 'Absolutely! We conduct mock interviews, provide sample questions, teach effective communication strategies, and help you prepare confident, honest answers. We also brief you on what visa officers look for and common mistakes to avoid.',
              helpfulCount: 121
            }
          ]
        },
        {
          id: 'financial',
          name: 'Finances & Scholarships',
          emoji: '💰',
          questions: [
            {
              id: 41,
              question: 'What is the average cost of studying abroad?',
              answer: 'Costs vary significantly: USA: $30,000-$60,000/year; Canada: $20,000-$35,000/year; UK: £15,000-£35,000/year; Malaysia: $5,000-$15,000/year. This includes tuition and living expenses. We help you budget effectively and find affordable options without compromising quality.',
              helpfulCount: 198
            },
            {
              id: 42,
              question: 'How can I get scholarships?',
              answer: 'Scholarships are available based on merit, need, sports, diversity, or field of study. Apply early (8-12 months before intake), maintain strong academics, demonstrate leadership, and craft compelling essays. We help identify suitable scholarships and assist with applications. Our students have won over $5M in scholarships.',
              helpfulCount: 223
            },
            {
              id: 43,
              question: 'Can I get education loans?',
              answer: 'Yes! Many banks offer education loans covering tuition, living expenses, and travel. In most countries, you can get loans without collateral up to a certain amount. Interest rates vary (typically 8-12%). We have partnerships with banks and help with loan applications and documentation.',
              helpfulCount: 167
            },
            {
              id: 44,
              question: 'Are there fully-funded scholarships available?',
              answer: 'Yes! Fully-funded scholarships covering tuition, living expenses, and even travel exist, especially for PhD programs. Examples include Fulbright (USA), Chevening (UK), Australia Awards, and university-specific fellowships. These are highly competitive but we help qualified candidates apply strategically.',
              helpfulCount: 201
            }
          ]
        },
        {
          id: 'country',
          name: 'Country-Specific',
          emoji: '🌍',
          questions: [
            {
              id: 51,
              question: 'Which country is best for studying Computer Science?',
              answer: 'USA leads in Computer Science with Silicon Valley proximity, top universities (MIT, Stanford, Carnegie Mellon), and excellent job opportunities. Canada offers quality education at lower costs with good immigration pathways. UK provides intensive 1-year master\'s programs. Choice depends on your budget, career goals, and immigration plans.',
              helpfulCount: 187
            },
            {
              id: 52,
              question: 'Can I stay and work after graduation?',
              answer: 'Post-study work options: USA: OPT (1 year, 3 years for STEM); Canada: PGWP (up to 3 years); UK: Graduate Route (2 years, 3 for PhD); Malaysia: limited. Canada and UK offer easier pathways to permanent residency. We advise on long-term immigration strategies.',
              helpfulCount: 234
            },
            {
              id: 53,
              question: 'Is it safe for international students?',
              answer: 'All our partner countries - USA, Canada, UK, and Malaysia - are generally safe with strong support systems for international students. Universities provide campus security, international student services, and 24/7 emergency support. We also provide pre-departure orientations covering safety and cultural adaptation.',
              helpfulCount: 143
            },
            {
              id: 54,
              question: 'What about cultural differences and homesickness?',
              answer: 'Cultural adjustment is normal and takes 2-3 months. Universities have international student communities, cultural clubs, and counseling services. We provide cultural orientation, connect you with alumni in your destination, and maintain contact to support you through the transition.',
              helpfulCount: 98
            }
          ]
        }
      ],

      popularTopics: [
        {
          id: 1,
          emoji: '🎓',
          title: 'Admission Requirements',
          description: 'Learn about eligibility criteria and documents needed',
          keyword: 'admission requirements documents',
          questionCount: 8
        },
        {
          id: 2,
          emoji: '💵',
          title: 'Scholarships & Funding',
          description: 'Explore financial aid and scholarship opportunities',
          keyword: 'scholarship funding',
          questionCount: 6
        },
        {
          id: 3,
          emoji: '📋',
          title: 'Visa Process',
          description: 'Everything about student visa applications',
          keyword: 'visa',
          questionCount: 7
        },
        {
          id: 4,
          emoji: '⏰',
          title: 'Timeline & Deadlines',
          description: 'Application timelines and important dates',
          keyword: 'timeline deadline',
          questionCount: 5
        },
        {
          id: 5,
          emoji: '🏆',
          title: 'Test Preparation',
          description: 'IELTS, TOEFL, GRE, GMAT guidance',
          keyword: 'test preparation GRE IELTS',
          questionCount: 6
        },
        {
          id: 6,
          emoji: '🌟',
          title: 'After Graduation',
          description: 'Post-study work and immigration options',
          keyword: 'work after graduation',
          questionCount: 4
        }
      ]
    }
  },

  computed: {
    allFaqs() {
      let faqs = []
      this.categories.forEach(category => {
        category.questions.forEach(question => {
          faqs.push({
            ...question,
            categoryId: category.id,
            categoryName: category.name
          })
        })
      })
      return faqs
    },

    filteredFaqs() {
      let faqs = this.selectedCategory === 'all' 
        ? this.allFaqs 
        : this.allFaqs.filter(faq => faq.categoryId === this.selectedCategory)

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        faqs = faqs.filter(faq => 
          faq.question.toLowerCase().includes(query) || 
          faq.answer.toLowerCase().includes(query)
        )
      }

      return faqs
    },

    displayedFaqs() {
      return this.filteredFaqs
    },

    totalQuestions() {
      return this.allFaqs.length
    }
  },

  methods: {
    toggleFaq(id) {
      this.activeFaq = this.activeFaq === id ? null : id
    },

    selectCategory(categoryId) {
      this.selectedCategory = categoryId
      this.activeFaq = null
    },

    markHelpful(id) {
      const faq = this.allFaqs.find(f => f.id === id)
      if (faq) {
        faq.helpfulCount = (faq.helpfulCount || 0) + 1
      }
    },

    searchForTopic(keyword) {
      this.searchQuery = keyword
      this.selectedCategory = 'all'
      window.scrollTo({ top: 400, behavior: 'smooth' })
    },

    highlightSearchTerm(text) {
      if (!this.searchQuery) return text
      
      const query = this.searchQuery.trim()
      const regex = new RegExp(`(${query})`, 'gi')
      return text.replace(regex, '<mark>$1</mark>')
    },

    goToContact() {
      // Navigate to contact page
      console.log('Navigate to contact page')
    },

    bookConsultation() {
      // Navigate to booking page
      console.log('Navigate to consultation booking')
    }
  }
}
</script>

<style scoped>
/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  padding: 80px 0 100px;
  position: relative;
  overflow: hidden;
  color: white;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.floating-icon {
  position: absolute;
  font-size: 40px;
  opacity: 0.15;
  animation: float 6s ease-in-out infinite;
}

.icon-1 {
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.icon-2 {
  top: 20%;
  right: 15%;
  animation-delay: 1s;
}

.icon-3 {
  bottom: 20%;
  left: 20%;
  animation-delay: 2s;
}

.icon-4 {
  bottom: 15%;
  right: 10%;
  animation-delay: 3s;
}

.icon-5 {
  top: 50%;
  left: 50%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(5deg);
  }
  50% {
    transform: translateY(-10px) rotate(-5deg);
  }
  75% {
    transform: translateY(-15px) rotate(3deg);
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-description {
  font-size: 20px;
  line-height: 1.6;
  opacity: 0.95;
  margin-bottom: 48px;
}

/* Search Bar */
.search-container {
  margin-bottom: 48px;
}

.search-box {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  color: #9CA3AF;
}

.search-input {
  width: 100%;
  padding: 18px 60px 18px 60px;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  background: white;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.25);
}

.clear-btn {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border: none;
  background: #F3F4F6;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: #E5E7EB;
}

.clear-btn svg {
  width: 16px;
  height: 16px;
  color: #6B7280;
}

.search-hint {
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  opacity: 0.9;
}

/* Quick Stats */
.quick-stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 40px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 36px;
  font-weight: 800;
  color: #FCA5A5;
  line-height: 1;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
}

/* Category Section */
.category-section {
  background: white;
  padding: 32px 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.category-tabs {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.category-tabs::-webkit-scrollbar {
  height: 6px;
}

.category-tabs::-webkit-scrollbar-track {
  background: #F3F4F6;
  border-radius: 3px;
}

.category-tabs::-webkit-scrollbar-thumb {
  background: #9CA3AF;
  border-radius: 3px;
}

.category-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #F9FAFB;
  border: 2px solid #E5E7EB;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 600;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.category-tab svg {
  width: 20px;
  height: 20px;
}

.category-tab:hover {
  border-color: #1E40AF;
  color: #1E40AF;
  background: white;
}

.category-tab.active {
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  color: white;
  border-color: transparent;
}

.category-emoji {
  font-size: 20px;
}

.count {
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
}

.category-tab.active .count {
  background: rgba(255, 255, 255, 0.25);
}

.category-tab:not(.active) .count {
  background: #E5E7EB;
  color: #6B7280;
}

/* FAQ Content */
.faq-content-section {
  padding: 60px 0;
  background: #F9FAFB;
  min-height: 500px;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 900px;
  margin: 0 auto;
}

.faq-item {
  background: white;
  border-radius: 12px;
  border: 2px solid #E5E7EB;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover {
  border-color: #1E40AF;
  box-shadow: 0 4px 16px rgba(30, 64, 175, 0.1);
}

.faq-item.active {
  border-color: #1E40AF;
  box-shadow: 0 8px 24px rgba(30, 64, 175, 0.15);
}

.faq-question {
  padding: 24px 28px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.question-content {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.question-number {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}

.question-content h3 {
  font-size: 18px;
  font-weight: 700;
  color: #1E3A8A;
  line-height: 1.4;
  margin: 0;
}

.faq-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.category-badge {
  background: #F3F4F6;
  color: #6B7280;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.toggle-icon {
  width: 24px;
  height: 24px;
  color: #1E40AF;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.faq-item.active .toggle-icon {
  transform: rotate(180deg);
}

.faq-answer {
  border-top: 2px solid #F3F4F6;
  overflow: hidden;
}

.answer-content {
  padding: 28px;
  font-size: 16px;
  color: #4B5563;
  line-height: 1.8;
}

.answer-footer {
  padding: 0 28px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.helpful-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #F3F4F6;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  color: #6B7280;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.helpful-btn:hover {
  background: #1E40AF;
  border-color: #1E40AF;
  color: white;
}

.helpful-btn svg {
  width: 18px;
  height: 18px;
}

.helpful-count {
  font-size: 13px;
  color: #9CA3AF;
}

/* Highlight Search Terms */
.answer-content mark,
.question-content mark {
  background: #FEF3C7;
  color: #92400E;
  padding: 2px 4px;
  border-radius: 4px;
  font-weight: 600;
}

/* No Results */
.no-results {
  text-align: center;
  padding: 80px 20px;
}

.no-results svg {
  width: 80px;
  height: 80px;
  color: #D1D5DB;
  margin-bottom: 24px;
}

.no-results h3 {
  font-size: 24px;
  font-weight: 700;
  color: #6B7280;
  margin-bottom: 12px;
}

.no-results p {
  font-size: 16px;
  color: #9CA3AF;
}

/* Popular Topics */
.popular-topics-section {
  padding: 80px 0;
  background: white;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-header h2 {
  font-size: 42px;
  font-weight: 800;
  color: #1E3A8A;
  margin-bottom: 16px;
}

.section-header p {
  font-size: 18px;
  color: #6B7280;
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.topic-card {
  background: #F9FAFB;
  padding: 32px;
  border-radius: 16px;
  border: 2px solid #E5E7EB;
  cursor: pointer;
  transition: all 0.3s ease;
}

.topic-card:hover {
  border-color: #1E40AF;
  background: white;
  box-shadow: 0 8px 24px rgba(30, 64, 175, 0.12);
  transform: translateY(-4px);
}

.topic-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.topic-card h4 {
  font-size: 20px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 12px;
}

.topic-card p {
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 20px;
}

.topic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 2px solid #E5E7EB;
}

.question-count {
  font-size: 13px;
  color: #9CA3AF;
  font-weight: 600;
}

.topic-footer svg {
  width: 20px;
  height: 20px;
  color: #1E40AF;
}

/* Contact CTA */
.contact-cta-section {
  padding: 80px 0;
  background: #F9FAFB;
}

.cta-card {
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  padding: 60px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  position: relative;
  overflow: hidden;
}

.cta-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%);
  border-radius: 50%;
}

.cta-content {
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;
  position: relative;
  z-index: 2;
}

.cta-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cta-icon svg {
  width: 40px;
  height: 40px;
  color: white;
}

.cta-text h3 {
  font-size: 32px;
  font-weight: 800;
  color: white;
  margin-bottom: 8px;
}

.cta-text p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  position: relative;
  z-index: 2;
}

.cta-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  white-space: nowrap;
}

.cta-btn svg {
  width: 20px;
  height: 20px;
}

.cta-btn.primary {
  background: #EF4444;
  color: white;
}

.cta-btn.primary:hover {
  background: #DC2626;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
}

.cta-btn.secondary {
  background: white;
  color: #1E40AF;
}

.cta-btn.secondary:hover {
  background: #F3F4F6;
  transform: translateY(-2px);
}

/* Transitions */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease;
}

.expand-enter-from, .expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to, .expand-leave-from {
  opacity: 1;
  max-height: 600px;
}

/* Responsive */
@media (max-width: 1024px) {
  .topics-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .cta-card {
    flex-direction: column;
    text-align: center;
  }

  .cta-content {
    flex-direction: column;
  }

  .cta-buttons {
    flex-direction: column;
    width: 100%;
  }

  .cta-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }

  .hero-description {
    font-size: 16px;
  }

  .quick-stats {
    gap: 32px;
  }

  .stat-number {
    font-size: 28px;
  }

  .category-tabs {
    flex-wrap: nowrap;
    overflow-x: auto;
  }

  .topics-grid {
    grid-template-columns: 1fr;
  }

  .faq-question {
    padding: 20px;
  }

  .question-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .faq-controls {
    flex-direction: column;
    align-items: flex-end;
  }

  .answer-content {
    padding: 20px;
  }

  .answer-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .cta-card {
    padding: 40px 24px;
  }

  .cta-text h3 {
    font-size: 24px;
  }

  .section-header h2 {
    font-size: 32px;
  }
}
</style>