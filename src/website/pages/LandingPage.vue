<template>
  <CarouselComponentOne />
  <section class="services-section">
    <!-- Program Categories Section -->
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Our Services</span>
        <h2 class="section-title">Study Programs We Specialize In</h2>
        <p class="section-description">
          Expert guidance for every stage of your academic journey. Choose your path and let us help you achieve your dreams.
        </p>
      </div>

      <div class="programs-grid">
        <!-- Undergraduate -->
        <router-link to="/service/1" class="program-card" @click="selectProgram('undergraduate')">
          <div class="program-image">
            <svg class="program-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            <div class="program-overlay"></div>
          </div>
          <div class="program-content">
            <h3 class="program-title">Undergraduate Programs</h3>
            <p class="program-description">
              Bachelor's degree programs for high school graduates ready to start their university journey abroad.
            </p>
            <ul class="program-features">
              <li>Foundation & Pathway Programs</li>
              <li>Bachelor's Degree Admissions</li>
              <li>Scholarship Assistance</li>
              <li>SAT/ACT Preparation</li>
            </ul>
            <div class="program-cta">
              <span>Learn More</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </router-link>

        <!-- Graduate -->
        <router-link to="/service/1" class="program-card featured" @click="selectProgram('graduate')">
          <div class="featured-badge">Most Popular</div>
          <div class="program-image">
            <svg class="program-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <div class="program-overlay"></div>
          </div>
          <div class="program-content">
            <h3 class="program-title">Graduate Programs</h3>
            <p class="program-description">
              Master's degree programs for career advancement and specialized knowledge in your field of interest.
            </p>
            <ul class="program-features">
              <li>Master's Degree Admissions</li>
              <li>GRE/GMAT Preparation</li>
              <li>Research Opportunities</li>
              <li>Assistantship Guidance</li>
            </ul>
            <div class="program-cta">
              <span>Learn More</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </router-link>

        <!-- Postgraduate -->
        <router-link to="/service/1" class="program-card" @click="selectProgram('postgraduate')">
          <div class="program-image">
            <svg class="program-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              <path d="M12 7v10"/>
              <path d="M8 10l4-3 4 3"/>
            </svg>
            <div class="program-overlay"></div>
          </div>
          <div class="program-content">
            <h3 class="program-title">Postgraduate Programs</h3>
            <p class="program-description">
              PhD and doctoral programs for those pursuing advanced research and academic excellence.
            </p>
            <ul class="program-features">
              <li>PhD & Doctoral Admissions</li>
              <li>Research Proposal Help</li>
              <li>Funding & Grants</li>
              <li>Supervisor Matching</li>
            </ul>
            <div class="program-cta">
              <span>Learn More</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Countries Section -->
    <div class="countries-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Study Destinations</span>
          <h2 class="section-title">Countries We Serve</h2>
          <p class="section-description">
            We have partnerships with top universities across four premier study destinations
          </p>
        </div>

        <div class="countries-grid">
          <!-- USA -->
          <div class="country-card" @click="selectCountry('usa')">
            <div class="country-flag">
              <svg viewBox="0 0 60 30" class="flag-svg">
                <rect width="60" height="30" fill="#B22234"/>
                <path d="M0,3.46h60M0,6.92h60M0,10.38h60M0,13.84h60M0,17.3h60M0,20.76h60M0,24.22h60M0,27.68h60" stroke="#fff" stroke-width="2.31"/>
                <rect width="24" height="15" fill="#3C3B6E"/>
                <g fill="#fff">
                  <circle cx="3" cy="2" r="0.8"/>
                  <circle cx="6" cy="2" r="0.8"/>
                  <circle cx="9" cy="2" r="0.8"/>
                  <circle cx="12" cy="2" r="0.8"/>
                  <circle cx="15" cy="2" r="0.8"/>
                  <circle cx="18" cy="2" r="0.8"/>
                  <circle cx="21" cy="2" r="0.8"/>
                  <circle cx="4.5" cy="4" r="0.8"/>
                  <circle cx="7.5" cy="4" r="0.8"/>
                  <circle cx="10.5" cy="4" r="0.8"/>
                  <circle cx="13.5" cy="4" r="0.8"/>
                  <circle cx="16.5" cy="4" r="0.8"/>
                  <circle cx="19.5" cy="4" r="0.8"/>
                </g>
              </svg>
            </div>
            <div class="country-content">
              <h3 class="country-name">United States</h3>
              <p class="country-description">Home to world's top universities including Ivy League institutions</p>
              <div class="country-stats">
                <div class="stat-item">
                  <span class="stat-number">5,000+</span>
                  <span class="stat-label">Universities</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">1M+</span>
                  <span class="stat-label">Int'l Students</span>
                </div>
              </div>
              <div class="country-features">
                <span class="feature-tag">STEM Excellence</span>
                <span class="feature-tag">Work Opportunities</span>
                <span class="feature-tag">Research Hub</span>
              </div>
            </div>
          </div>

          <!-- Canada -->
          <div class="country-card" @click="selectCountry('canada')">
            <div class="country-flag">
              <svg viewBox="0 0 60 30" class="flag-svg">
                <rect width="60" height="30" fill="#fff"/>
                <rect width="15" height="30" fill="#FF0000"/>
                <rect x="45" width="15" height="30" fill="#FF0000"/>
                <path d="M30,8l2,6h6l-5,4 2,6-5-4-5,4 2-6-5-4h6z" fill="#FF0000"/>
              </svg>
            </div>
            <div class="country-content">
              <h3 class="country-name">Canada</h3>
              <p class="country-description">Affordable, high-quality education with excellent immigration pathways</p>
              <div class="country-stats">
                <div class="stat-item">
                  <span class="stat-number">400+</span>
                  <span class="stat-label">Universities</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">600K+</span>
                  <span class="stat-label">Int'l Students</span>
                </div>
              </div>
              <div class="country-features">
                <span class="feature-tag">PR Pathways</span>
                <span class="feature-tag">Safe & Welcoming</span>
                <span class="feature-tag">Co-op Programs</span>
              </div>
            </div>
          </div>

          <!-- UK -->
          <div class="country-card" @click="selectCountry('uk')">
            <div class="country-flag">
              <svg viewBox="0 0 60 30" class="flag-svg">
                <rect width="60" height="30" fill="#012169"/>
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="4"/>
                <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
                <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/>
              </svg>
            </div>
            <div class="country-content">
              <h3 class="country-name">United Kingdom</h3>
              <p class="country-description">Historic universities with globally recognized degrees and rich culture</p>
              <div class="country-stats">
                <div class="stat-item">
                  <span class="stat-number">160+</span>
                  <span class="stat-label">Universities</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">500K+</span>
                  <span class="stat-label">Int'l Students</span>
                </div>
              </div>
              <div class="country-features">
                <span class="feature-tag">Oxford & Cambridge</span>
                <span class="feature-tag">1-Year Masters</span>
                <span class="feature-tag">PSW Visa</span>
              </div>
            </div>
          </div>

          <!-- Malaysia -->
          <div class="country-card" @click="selectCountry('malaysia')">
            <div class="country-flag">
              <svg viewBox="0 0 60 30" class="flag-svg">
                <rect width="60" height="30" fill="#fff"/>
                <rect width="60" height="2.14" fill="#CC0001" y="0"/>
                <rect width="60" height="2.14" fill="#CC0001" y="4.28"/>
                <rect width="60" height="2.14" fill="#CC0001" y="8.56"/>
                <rect width="60" height="2.14" fill="#CC0001" y="12.84"/>
                <rect width="60" height="2.14" fill="#CC0001" y="17.12"/>
                <rect width="60" height="2.14" fill="#CC0001" y="21.4"/>
                <rect width="60" height="2.14" fill="#CC0001" y="25.68"/>
                <rect width="30" height="15" fill="#010066"/>
                <path d="M15,3 l3,9 h9 l-7,5 3,9-8-6-8,6 3-9-7-5h9z" fill="#FC0" transform="translate(3,-1)"/>
                <path d="M20,8 a5,5 0 1,0 0,7 a4,4 0 1,1 0-7" fill="#FC0"/>
              </svg>
            </div>
            <div class="country-content">
              <h3 class="country-name">Malaysia</h3>
              <p class="country-description">Affordable Asian education hub with diverse culture and quality programs</p>
              <div class="country-stats">
                <div class="stat-item">
                  <span class="stat-number">70+</span>
                  <span class="stat-label">Universities</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">150K+</span>
                  <span class="stat-label">Int'l Students</span>
                </div>
              </div>
              <div class="country-features">
                <span class="feature-tag">Low Cost</span>
                <span class="feature-tag">English Medium</span>
                <span class="feature-tag">Gateway to Asia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Additional Services -->
    <div class="additional-services">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Complete Support Services</h2>
          <p class="section-description">
            Beyond admissions, we provide comprehensive support throughout your journey
          </p>
        </div>

        <div class="services-grid">
          <div class="service-item">
            <div class="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <h4>Application Assistance</h4>
            <p>Complete guidance on university applications and documentation</p>
          </div>

          <div class="service-item">
            <div class="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <h4>Visa Processing</h4>
            <p>Expert visa consultation and application support</p>
          </div>

          <div class="service-item">
            <div class="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h4>Profile Building</h4>
            <p>SOP, LOR, and CV preparation by experts</p>
          </div>

          <div class="service-item">
            <div class="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <h4>Test Preparation</h4>
            <p>IELTS, TOEFL, GRE, GMAT coaching programs</p>
          </div>

          <div class="service-item">
            <div class="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h4>Scholarship Guidance</h4>
            <p>Find and apply for scholarships and financial aid</p>
          </div>

          <div class="service-item">
            <div class="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <h4>Pre-Departure Support</h4>
            <p>Accommodation, travel, and settling-in assistance</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Ready to Start Your Journey?</h2>
          <p class="cta-description">
            Book a free consultation with our expert counselors today and take the first step towards your dream university
          </p>
          <div class="cta-buttons">
            <button class="cta-button primary">Schedule Free Consultation</button>
            <button class="cta-button secondary">Download Brochure</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import CarouselComponentOne from './component/CarouselComponentOne.vue';

function selectProgram(program) {
    console.log('Selected program:', program)
    // Handle program selection - could route to details page or open modal
}

function selectCountry(country) {
    console.log('Selected country:', country)
    // Handle country selection - could route to details page or open modal
}
</script>

<style scoped>
.services-section {
  background: #F9FAFB;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 60px;
  padding-top: 80px;
}

.section-badge {
  display: inline-block;
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-title {
  font-size: 42px;
  font-weight: 800;
  color: #1E3A8A;
  margin-bottom: 16px;
  line-height: 1.2;
}

.section-description {
  font-size: 18px;
  color: #6B7280;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Programs Grid */
.programs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 80px;
}

.program-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  text-decoration: none;
}

.program-card.featured {
  transform: scale(1.05);
  box-shadow: 0 20px 40px rgba(30, 58, 138, 0.15);
}

.featured-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #EF4444;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  z-index: 10;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.program-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(30, 58, 138, 0.15);
}

.program-card.featured:hover {
  transform: scale(1.05) translateY(-8px);
}

.program-image {
  height: 200px;
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.program-icon {
  width: 80px;
  height: 80px;
  color: white;
  z-index: 2;
  position: relative;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.program-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 30%, rgba(239, 68, 68, 0.3) 0%, transparent 70%);
}

.program-content {
  padding: 32px 28px;
}

.program-title {
  font-size: 24px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 12px;
}

.program-description {
  font-size: 15px;
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 20px;
}

.program-features {
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
}

.program-features li {
  padding: 8px 0;
  color: #374151;
  font-size: 14px;
  position: relative;
  padding-left: 24px;
}

.program-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #EF4444;
  font-weight: 700;
}

.program-cta {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1E40AF;
  font-weight: 600;
  font-size: 15px;
  transition: gap 0.3s ease;
}

.program-card:hover .program-cta {
  gap: 12px;
}

.program-cta svg {
  transition: transform 0.3s ease;
}

.program-card:hover .program-cta svg {
  transform: translateX(4px);
}

/* Countries Section */
.countries-section {
  background: white;
  padding: 80px 0;
}

.countries-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-bottom: 40px;
}

.country-card {
  background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%);
  border-radius: 16px;
  padding: 32px;
  border: 2px solid #E5E7EB;
  transition: all 0.4s ease;
  cursor: pointer;
}

.country-card:hover {
  border-color: #1E40AF;
  box-shadow: 0 12px 32px rgba(30, 64, 175, 0.15);
  transform: translateY(-4px);
}

.country-flag {
  width: 80px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 24px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.flag-svg {
  width: 100%;
  height: 100%;
}

.country-content {
  flex: 1;
}

.country-name {
  font-size: 28px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 12px;
}

.country-description {
  font-size: 15px;
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 24px;
}

.country-stats {
  display: flex;
  gap: 32px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid #E5E7EB;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 24px;
  font-weight: 800;
  color: #EF4444;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: #6B7280;
  font-weight: 500;
}

.country-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feature-tag {
  background: white;
  color: #1E40AF;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  border: 1.5px solid #1E40AF;
}

/* Additional Services */
.additional-services {
  background: #F9FAFB;
  padding: 80px 0;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.service-item {
  background: white;
  padding: 32px 24px;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.service-item:hover {
  border-color: #EF4444;
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(239, 68, 68, 0.15);
}

.service-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
}

.service-icon svg {
  width: 32px;
  height: 32px;
}

.service-item h4 {
  font-size: 18px;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 12px;
}

.service-item p {
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(30%, -30%);
}

.cta-content {
  text-align: center;
  position: relative;
  z-index: 2;
}

.cta-title {
  font-size: 42px;
  font-weight: 800;
  color: white;
  margin-bottom: 16px;
}

.cta-description {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  max-width: 700px;
  margin: 0 auto 40px;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  padding: 16px 36px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.cta-button.primary {
  background: #EF4444;
  color: white;
  border-color: #EF4444;
}

.cta-button.primary:hover {
  background: #DC2626;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
}

.cta-button.secondary {
  background: transparent;
  color: white;
  border-color: white;
}

.cta-button.secondary:hover {
  background: white;
  color: #1E40AF;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .programs-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .program-card.featured {
    transform: scale(1);
  }

  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 32px;
  }

  .section-description {
    font-size: 16px;
  }

  .programs-grid,
  .countries-grid,
  .services-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .program-card.featured {
    transform: scale(1);
  }

  .country-stats {
    gap: 20px;
  }

  .cta-title {
    font-size: 32px;
  }

  .cta-description {
    font-size: 16px;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .cta-button {
    width: 100%;
  }
}
</style>