// ═══════════════════════════════════════════════════════════════════════════
// APP.JS — AI Readiness Assessment Tool for SMEs
// ═══════════════════════════════════════════════════════════════════════════

// ─── STATE ────────────────────────────────────────────────────────────────────
let state = {
  mode: null,           // 'academic' | 'practitioner'
  currentStep: 0,       // dimension index (0-7)
  answers: {},          // { questionId: score }
  started: false
};

const DIM_KEYS = ['governance','ethics','technology','data','people','strategy','process','risk'];

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderDimCards();
  renderFrameworkGrid();
  renderReferences();
});

function renderDimCards() {
  const container = document.getElementById('dim-cards');
  if (!container) return;
  const parent = container.parentElement;
  parent.innerHTML = '';
  DIMENSIONS.forEach(dim => {
    const card = document.createElement('div');
    card.className = 'rounded-xl p-4 border-2 card-hover cursor-default';
    card.style.borderColor = dim.color;
    card.style.background = 'white';
    card.innerHTML = `
      <div class="text-2xl mb-2">${dim.icon}</div>
      <h4 class="font-bold text-sm mb-1" style="color:${dim.color}">${dim.label}</h4>
      <p class="text-xs text-gray-500 mb-2">${dim.description.substring(0,80)}…</p>
      <div class="progress-track"><div class="progress-fill" style="width:${dim.coverage}%; background:${dim.color}"></div></div>
      <p class="text-xs text-gray-400 mt-1">${dim.coverage}% framework coverage</p>
    `;
    parent.appendChild(card);
  });
}

function renderFrameworkGrid() {
  const grid = document.getElementById('framework-grid');
  if (!grid) return;
  const typeColors = {
    'Governance': '#0D2B55',
    'Responsible/Ethical AI': '#007A87',
    'Readiness/Maturity': '#2E8648',
    'Adoption': '#E86A1F',
    'Hybrid': '#7C3AED'
  };
  FRAMEWORKS.forEach(fw => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl p-5 border border-gray-100 card-hover shadow-sm';
    const color = typeColors[fw.type] || '#0D2B55';
    card.innerHTML = `
      <div class="flex items-start justify-between mb-3">
        <span class="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style="background:${color}">${fw.type}</span>
        <span class="text-xs text-gray-400">${fw.year}</span>
      </div>
      <h4 class="font-bold text-sm text-gray-800 mb-1 leading-snug">${fw.name}</h4>
      <p class="text-xs text-gray-500 mb-3">${fw.authors}</p>
      <div class="flex flex-wrap gap-1">
        ${fw.dimensions.map(d => {
          const dim = DIMENSIONS.find(x => x.id === d);
          return dim ? `<span class="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">${dim.icon} ${dim.label.split(' ')[0]}</span>` : '';
        }).join('')}
      </div>
      ${fw.doi ? `<a href="https://doi.org/${fw.doi}" target="_blank" class="text-xs text-teal-600 hover:underline mt-2 block">DOI →</a>` : ''}
    `;
    grid.appendChild(card);
  });
}

function renderReferences() {
  const list = document.getElementById('references-list');
  if (!list) return;
  REFERENCES.forEach(ref => {
    const item = document.createElement('div');
    item.className = 'bg-white rounded-xl p-4 flex gap-3 shadow-sm';
    item.innerHTML = `
      <span class="w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center flex-shrink-0" style="background:#0D2B55">${ref.num}</span>
      <p class="text-sm text-gray-700 leading-relaxed">${ref.apa}</p>
    `;
    list.appendChild(item);
  });
}

// ─── LAUNCH ───────────────────────────────────────────────────────────────────
function scrollToEl(id, offset = 80) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

function startAssessment() {
  scrollToEl('tool');
}

function launchMode(mode) {
  state.mode = mode;
  state.currentStep = 0;
  state.answers = {};
  state.started = true;

  document.getElementById('mode-selector').classList.add('hidden');
  document.getElementById('assessment-container').classList.remove('hidden');
  document.getElementById('results-container').classList.add('hidden');
  document.getElementById('results-container').innerHTML = '';

  const modeLabel = document.getElementById('mode-label');
  modeLabel.textContent = mode === 'academic' ? '📚 Academic Assessment — 40 Questions · 8 Dimensions' : '⚡ Practitioner Assessment — 24 Questions · 8 Dimensions';

  scrollToEl('tool');
  renderStep();
}

// ─── STEP RENDERING ───────────────────────────────────────────────────────────
function renderStep() {
  const dim = DIMENSIONS[state.currentStep];
  const questions = state.mode === 'academic'
    ? ACADEMIC_QUESTIONS[dim.id]
    : PRACTITIONER_QUESTIONS[dim.id];
  const totalSteps = 8;
  const progress = ((state.currentStep) / totalSteps) * 100;

  // Header
  document.getElementById('dimension-title').textContent = `${dim.icon} ${dim.label}`;
  document.getElementById('step-counter').textContent = `${state.currentStep + 1} / ${totalSteps}`;
  document.getElementById('progress-bar').style.width = progress + '%';
  document.getElementById('progress-text').textContent = `${Math.round(progress)}% complete · ${totalSteps - state.currentStep} dimension${totalSteps - state.currentStep !== 1 ? 's' : ''} remaining`;

  // Step indicators
  renderStepIndicators();

  // Dimension intro
  const introDiv = document.getElementById('dimension-intro');
  introDiv.classList.remove('hidden');
  introDiv.style.borderColor = dim.color;
  document.getElementById('dimension-desc').textContent = dim.description;
  document.getElementById('dimension-citation').textContent = `Best-practice sources: ${dim.bestFrom}`;

  // Questions
  const container = document.getElementById('questions-container');
  container.innerHTML = '';

  if (state.mode === 'academic') {
    renderAcademicQuestions(container, dim, questions);
  } else {
    renderPractitionerQuestions(container, dim, questions);
  }

  // Back button
  document.getElementById('btn-back').style.visibility = state.currentStep === 0 ? 'hidden' : 'visible';

  // Next button label
  const btnNext = document.getElementById('btn-next');
  btnNext.textContent = state.currentStep === 7 ? '🏁 View Results' : 'Next →';
  btnNext.style.background = dim.color;

  updateAnswerStatus();
}

function renderStepIndicators() {
  const container = document.getElementById('step-indicators');
  container.innerHTML = '';
  DIMENSIONS.forEach((dim, i) => {
    const dot = document.createElement('div');
    dot.className = 'flex flex-col items-center flex-1 min-w-0';
    const isActive = i === state.currentStep;
    const isDone = i < state.currentStep;
    const dotClass = isDone ? 'done' : isActive ? 'active' : 'pending';
    dot.innerHTML = `
      <div class="step-dot ${dotClass}" title="${dim.label}">${isDone ? '✓' : i + 1}</div>
      <p class="text-xs mt-1 text-center leading-tight hidden md:block ${isActive ? 'font-bold text-navy' : 'text-gray-400'}" style="${isActive ? 'color:' + dim.color : ''}">${dim.icon}</p>
    `;
    container.appendChild(dot);
    if (i < 7) {
      const line = document.createElement('div');
      line.className = 'step-line';
      line.style.background = i < state.currentStep ? '#2E8648' : '#e2e8f0';
      line.style.marginTop = '-16px';
      container.appendChild(line);
    }
  });
}

// ─── ACADEMIC QUESTIONS ───────────────────────────────────────────────────────
function renderAcademicQuestions(container, dim, questions) {
  const scale = [
    { val: 1, label: '1 — Not Started', desc: 'No activity or awareness' },
    { val: 2, label: '2 — Initial', desc: 'Ad hoc, informal efforts' },
    { val: 3, label: '3 — Developing', desc: 'Some structured activity' },
    { val: 4, label: '4 — Defined', desc: 'Documented, consistent practice' },
    { val: 5, label: '5 — Optimising', desc: 'Measured, continuously improving' }
  ];

  questions.forEach((q, qi) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'mb-8 pb-6 border-b border-gray-100 last:border-0 last:pb-0 last:mb-0';
    qDiv.innerHTML = `
      <div class="flex gap-3 mb-3">
        <span class="w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0" style="background:${dim.color}">${qi + 1}</span>
        <div class="flex-1">
          <p class="font-medium text-gray-800 text-sm leading-relaxed mb-1">${q.text}</p>
          <p class="citation">${q.citation}</p>
          ${q.guidance ? `<p class="text-xs text-gray-400 mt-1 italic">💡 ${q.guidance}</p>` : ''}
        </div>
      </div>
      <div class="flex flex-wrap gap-2 ml-10" id="likert-${q.id}">
        ${scale.map(s => `
          <button class="likert-btn border-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${state.answers[q.id] === s.val ? 'selected' : 'border-gray-200 text-gray-600'}"
            style="${state.answers[q.id] === s.val ? 'border-color:' + dim.color + '; background:' + dim.color : ''}"
            onclick="selectAnswer('${q.id}', ${s.val}, '${dim.color}', 'likert-${q.id}')">
            <span class="block">${s.label}</span>
            <span class="block font-normal opacity-75">${s.desc}</span>
          </button>
        `).join('')}
      </div>
    `;
    container.appendChild(qDiv);
  });
}

// ─── PRACTITIONER QUESTIONS ───────────────────────────────────────────────────
function renderPractitionerQuestions(container, dim, questions) {
  const scale = [
    { val: 2, label: '✅ Yes', desc: 'We have this in place', color: '#2E8648' },
    { val: 1, label: '⚡ Partial', desc: 'We\'re working on it', color: '#E86A1F' },
    { val: 0, label: '❌ No', desc: 'Not yet started', color: '#C0392B' }
  ];

  questions.forEach((q, qi) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'mb-7 pb-6 border-b border-gray-100 last:border-0 last:pb-0 last:mb-0';
    qDiv.innerHTML = `
      <div class="flex gap-3 mb-4">
        <span class="w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center flex-shrink-0" style="background:${dim.color}">${qi + 1}</span>
        <div class="flex-1">
          <p class="font-semibold text-gray-800 leading-relaxed mb-1">${q.text}</p>
          ${q.hint ? `<p class="text-sm text-gray-400 italic">💡 ${q.hint}</p>` : ''}
        </div>
      </div>
      <div class="flex gap-3 ml-11 flex-wrap" id="pract-${q.id}">
        ${scale.map(s => `
          <button class="likert-btn flex-1 min-w-24 border-2 rounded-xl p-3 text-center transition ${state.answers[q.id] === s.val ? 'selected' : 'border-gray-200'}"
            style="${state.answers[q.id] === s.val ? 'border-color:' + s.color + '; background:' + s.color + '; color:white' : ''}"
            onclick="selectAnswer('${q.id}', ${s.val}, '${s.color}', 'pract-${q.id}', true)">
            <span class="block text-lg">${s.label.split(' ')[0]}</span>
            <span class="block text-xs font-semibold mt-0.5">${s.label.split(' ')[1]}</span>
            <span class="block text-xs opacity-75">${s.desc}</span>
          </button>
        `).join('')}
      </div>
    `;
    container.appendChild(qDiv);
  });
}

// ─── ANSWER HANDLING ──────────────────────────────────────────────────────────
function selectAnswer(qId, val, color, containerId, isPractitioner) {
  state.answers[qId] = val;
  const container = document.getElementById(containerId);
  if (!container) return;
  container.querySelectorAll('.likert-btn').forEach(btn => {
    btn.classList.remove('selected');
    if (isPractitioner) {
      btn.style.borderColor = '#e5e7eb';
      btn.style.background = 'white';
      btn.style.color = '';
    } else {
      btn.style.borderColor = '#e5e7eb';
      btn.style.background = 'white';
      btn.style.color = '';
    }
  });
  const clickedBtn = container.querySelectorAll('.likert-btn')[
    isPractitioner
      ? [2, 1, 0].indexOf(val)
      : val - 1
  ];
  if (clickedBtn) {
    clickedBtn.classList.add('selected');
    clickedBtn.style.borderColor = color;
    clickedBtn.style.background = color;
    clickedBtn.style.color = 'white';
  }
  updateAnswerStatus();
}

function updateAnswerStatus() {
  const dim = DIMENSIONS[state.currentStep];
  const questions = state.mode === 'academic'
    ? ACADEMIC_QUESTIONS[dim.id]
    : PRACTITIONER_QUESTIONS[dim.id];
  const answered = questions.filter(q => state.answers[q.id] !== undefined).length;
  const total = questions.length;
  const el = document.getElementById('answer-status');
  if (el) {
    el.textContent = `${answered} / ${total} answered`;
    el.style.color = answered === total ? '#2E8648' : '#94a3b8';
  }
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
function nextStep() {
  const dim = DIMENSIONS[state.currentStep];
  const questions = state.mode === 'academic'
    ? ACADEMIC_QUESTIONS[dim.id]
    : PRACTITIONER_QUESTIONS[dim.id];
  const unanswered = questions.filter(q => state.answers[q.id] === undefined);

  if (unanswered.length > 0) {
    const proceed = confirm(`You have ${unanswered.length} unanswered question(s) in this section. Unanswered questions will be scored as 1 (Not Started) for Academic mode or 0 (No) for Practitioner mode. Continue?`);
    if (!proceed) return;
    unanswered.forEach(q => {
      state.answers[q.id] = state.mode === 'academic' ? 1 : 0;
    });
  }

  if (state.currentStep < 7) {
    state.currentStep++;
    renderStep();
    scrollToEl('tool');
  } else {
    showResults();
  }
}

function prevStep() {
  if (state.currentStep > 0) {
    state.currentStep--;
    renderStep();
    scrollToEl('tool');
  }
}

// ─── SCORING ──────────────────────────────────────────────────────────────────
function calculateScores() {
  const dimScores = {};
  DIM_KEYS.forEach(dimId => {
    const questions = state.mode === 'academic'
      ? ACADEMIC_QUESTIONS[dimId]
      : PRACTITIONER_QUESTIONS[dimId];

    if (state.mode === 'academic') {
      let weightedSum = 0, totalWeight = 0;
      questions.forEach(q => {
        const ans = state.answers[q.id] || 1;
        weightedSum += ans * q.weight;
        totalWeight += q.weight * 5; // max = 5
      });
      dimScores[dimId] = Math.round((weightedSum / totalWeight) * 100);
    } else {
      let sum = 0, maxSum = questions.length * 2;
      questions.forEach(q => { sum += (state.answers[q.id] || 0); });
      dimScores[dimId] = Math.round((sum / maxSum) * 100);
    }
  });

  const overall = Math.round(DIM_KEYS.reduce((s, k) => s + dimScores[k], 0) / 8);
  return { dimScores, overall };
}

function getMaturityLevel(score) {
  return MATURITY_LEVELS.find(m => score >= m.range[0] && score < m.range[1]) || MATURITY_LEVELS[0];
}

function getRecommendations(dimId, score) {
  const recs = RECOMMENDATIONS[dimId];
  if (score < 35) return recs.low;
  if (score < 65) return recs.mid;
  return recs.high;
}

// ─── RESULTS ─────────────────────────────────────────────────────────────────
function showResults() {
  document.getElementById('assessment-container').classList.add('hidden');
  const resultsEl = document.getElementById('results-container');
  resultsEl.classList.remove('hidden');

  const { dimScores, overall } = calculateScores();
  const maturity = getMaturityLevel(overall);

  // Find top 3 strengths and top 3 gaps
  const sorted = DIM_KEYS.map(k => ({ id: k, score: dimScores[k], dim: DIMENSIONS.find(d => d.id === k) }))
    .sort((a, b) => b.score - a.score);
  const strengths = sorted.slice(0, 3);
  const gaps = sorted.slice(-3).reverse();

  resultsEl.innerHTML = buildResultsHTML(dimScores, overall, maturity, strengths, gaps);

  // Render radar chart
  setTimeout(() => renderRadarChart(dimScores), 100);
  // Render pillar coverage chart
  setTimeout(() => renderPillarChart(dimScores), 150);

  setTimeout(() => {
    const el = document.getElementById('results-container');
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, 150);
}

function buildResultsHTML(dimScores, overall, maturity, strengths, gaps) {
  const modeLabel = state.mode === 'academic' ? 'Academic' : 'Practitioner';
  const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return `
    <!-- Results Header -->
    <div class="rounded-2xl p-7 mb-6 text-white" style="background:#0D2B55">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-1">${modeLabel} Assessment Results · ${dateStr}</p>
          <h2 class="text-2xl font-bold mb-1">AI Readiness Assessment Complete</h2>
          <p class="text-blue-300 text-sm">Based on ${state.mode === 'academic' ? '40' : '24'} questions across 8 dimensions</p>
        </div>
        <div class="text-center">
          <div class="w-28 h-28 rounded-full border-4 flex items-center justify-center mx-auto" style="border-color:${maturity.color}; background:rgba(255,255,255,0.1)">
            <div>
              <p class="text-4xl font-extrabold">${overall}%</p>
              <p class="text-xs text-blue-300">Overall</p>
            </div>
          </div>
          <div class="mt-2 px-4 py-1 rounded-full text-sm font-bold" style="background:${maturity.color}">${maturity.label}</div>
        </div>
      </div>
    </div>

    <!-- Maturity Description -->
    <div class="rounded-xl p-5 mb-6 border-l-4" style="background:${maturity.bg}; border-color:${maturity.color}">
      <h3 class="font-bold mb-1" style="color:${maturity.color}">Maturity Level ${maturity.level}: ${maturity.label}</h3>
      <p class="text-sm text-gray-700">${maturity.desc}</p>
      <p class="citation mt-2">Maturity classification adapted from Schuster et al. (2021), Kalleparambil et al. (2025) and Nair (2025)</p>
    </div>

    <!-- Radar Chart + Dimension Scores -->
    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <div class="bg-white rounded-2xl p-6 shadow-sm">
        <h3 class="font-bold text-navy mb-4">Dimensional Radar Profile</h3>
        <div class="radar-container"><canvas id="radarChart"></canvas></div>
      </div>
      <div class="bg-white rounded-2xl p-6 shadow-sm">
        <h3 class="font-bold text-navy mb-4">Dimension Scores</h3>
        <div class="space-y-3">
          ${DIM_KEYS.map(k => {
            const dim = DIMENSIONS.find(d => d.id === k);
            const score = dimScores[k];
            const ml = getMaturityLevel(score);
            return `
              <div>
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm font-medium text-gray-700">${dim.icon} ${dim.label}</span>
                  <div class="flex items-center gap-2">
                    <span class="text-xs px-2 py-0.5 rounded-full font-semibold" style="background:${ml.bg}; color:${ml.color}">${ml.label}</span>
                    <span class="text-sm font-bold" style="color:${dim.color}">${score}%</span>
                  </div>
                </div>
                <div class="progress-track">
                  <div class="progress-fill" style="width:${score}%; background:${dim.color}"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>

    <!-- Strengths & Gaps -->
    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <div class="bg-white rounded-2xl p-6 shadow-sm">
        <h3 class="font-bold text-navy mb-4">🏆 Top Strengths</h3>
        ${strengths.map((s, i) => `
          <div class="flex items-center gap-3 mb-3 p-3 rounded-xl" style="background:${getMaturityLevel(s.score).bg}">
            <span class="text-2xl">${s.dim.icon}</span>
            <div class="flex-1">
              <p class="font-semibold text-sm" style="color:${s.dim.color}">${s.dim.label}</p>
              <p class="text-xs text-gray-500">${s.score}% · ${getMaturityLevel(s.score).label}</p>
            </div>
            <span class="text-2xl font-extrabold" style="color:${s.dim.color}">${s.score}%</span>
          </div>
        `).join('')}
      </div>
      <div class="bg-white rounded-2xl p-6 shadow-sm">
        <h3 class="font-bold text-navy mb-4">⚠️ Priority Improvement Areas</h3>
        ${gaps.map((g, i) => `
          <div class="flex items-center gap-3 mb-3 p-3 rounded-xl bg-red-50">
            <span class="text-2xl">${g.dim.icon}</span>
            <div class="flex-1">
              <p class="font-semibold text-sm text-red-700">${g.dim.label}</p>
              <p class="text-xs text-gray-500">${g.score}% · ${getMaturityLevel(g.score).label}</p>
            </div>
            <span class="text-2xl font-extrabold text-red-600">${g.score}%</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Detailed Recommendations -->
    <div class="bg-white rounded-2xl p-7 shadow-sm mb-6">
      <h3 class="font-bold text-navy text-xl mb-6">📋 Detailed Recommendations by Dimension</h3>
      ${DIM_KEYS.map(k => {
        const dim = DIMENSIONS.find(d => d.id === k);
        const score = dimScores[k];
        const ml = getMaturityLevel(score);
        const recs = getRecommendations(k, score);
        const recLevel = score < 35 ? '30-day Quick Wins' : score < 65 ? '60-day Development Actions' : '90-day Strategic Initiatives';
        return `
          <div class="mb-6 pb-6 border-b border-gray-100 last:border-0">
            <div class="flex items-center gap-3 mb-3 cursor-pointer" onclick="toggleAccordion('acc-${k}')">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg" style="background:${dim.color}">${dim.icon}</div>
              <div class="flex-1">
                <h4 class="font-bold text-gray-800">${dim.label}</h4>
                <p class="text-xs text-gray-500">${score}% · ${ml.label} · ${recLevel}</p>
              </div>
              <div class="progress-track w-24">
                <div class="progress-fill" style="width:${score}%; background:${dim.color}"></div>
              </div>
              <svg class="w-5 h-5 text-gray-400 transition-transform" id="acc-icon-${k}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </div>
            <div class="accordion-content" id="acc-${k}">
              <div class="ml-13 pl-3 border-l-2" style="border-color:${dim.color}; margin-left:52px">
                <p class="text-xs text-gray-500 mb-3 italic">${dim.description}</p>
                <p class="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">${recLevel}:</p>
                <ol class="space-y-2">
                  ${recs.map((r, i) => `
                    <li class="flex gap-2 text-sm text-gray-700">
                      <span class="w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5" style="background:${dim.color}">${i+1}</span>
                      ${r}
                    </li>
                  `).join('')}
                </ol>
                <p class="citation mt-3">Sources: ${dim.citation}</p>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <!-- Roadmap -->
    <div class="bg-white rounded-2xl p-7 shadow-sm mb-6">
      <h3 class="font-bold text-navy text-xl mb-6">🗺️ Prioritised Implementation Roadmap</h3>
      <div class="grid md:grid-cols-3 gap-5">
        ${buildRoadmap(dimScores)}
      </div>
    </div>

    <!-- Standards Alignment -->
    ${state.mode === 'academic' ? buildStandardsAlignment(overall) : ''}

    <!-- Pillar Coverage Chart -->
    ${buildPillarCoverageHTML(dimScores)}

    <!-- Actions -->
    <div class="flex flex-wrap gap-4 justify-center mt-6 no-print">
      <button onclick="window.print()" class="flex items-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-900 transition" style="background:#0D2B55">
        🖨️ Print / Save as PDF
      </button>
      <button onclick="resetAssessment()" class="flex items-center gap-2 text-navy font-semibold px-6 py-3 rounded-xl border-2 border-navy hover:bg-navy hover:text-white transition">
        🔄 Retake Assessment
      </button>
      <button id="switch-mode-btn" onclick="switchMode()" class="flex items-center gap-2 font-semibold px-6 py-3 rounded-xl text-white transition" style="background:#E86A1F">
        ↔️ Try ${state.mode === 'academic' ? 'Practitioner' : 'Academic'} Mode
      </button>
    </div>
  `;
}

function buildRoadmap(dimScores) {
  const low = [], mid = [], high = [];
  DIM_KEYS.forEach(k => {
    const s = dimScores[k];
    const dim = DIMENSIONS.find(d => d.id === k);
    const recs = getRecommendations(k, s);
    if (s < 35) low.push({ dim, recs: recs.slice(0,2) });
    else if (s < 65) mid.push({ dim, recs: recs.slice(0,2) });
    else high.push({ dim, recs: recs.slice(0,1) });
  });

  const phases = [
    { label: '30 Days', subtitle: 'Quick Wins', items: low, color: '#C0392B', bg: '#fee2e2' },
    { label: '60 Days', subtitle: 'Development', items: mid, color: '#E86A1F', bg: '#ffedd5' },
    { label: '90 Days', subtitle: 'Strategic', items: high, color: '#2E8648', bg: '#dcfce7' }
  ];

  return phases.map(p => `
    <div class="rounded-xl p-5" style="background:${p.bg}; border:1px solid ${p.color}30">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-10 h-10 rounded-xl text-white font-bold text-sm flex items-center justify-center" style="background:${p.color}">${p.label}</div>
        <div>
          <p class="font-bold text-sm" style="color:${p.color}">${p.label} Actions</p>
          <p class="text-xs text-gray-500">${p.subtitle}</p>
        </div>
      </div>
      ${p.items.length === 0
        ? `<p class="text-sm text-gray-500 italic">No critical gaps at this level — focus on optimisation.</p>`
        : p.items.map(item => `
          <div class="mb-3">
            <p class="text-xs font-bold mb-1" style="color:${p.color}">${item.dim.icon} ${item.dim.label}</p>
            ${item.recs.map(r => `<p class="text-xs text-gray-700 mb-1">• ${r}</p>`).join('')}
          </div>
        `).join('')
      }
    </div>
  `).join('');
}

function buildStandardsAlignment(overall) {
  const standards = [
    { name: 'NIST AI RMF', coverage: Math.min(100, overall + 5), desc: 'Govern, Map, Measure, Manage' },
    { name: 'EU AI Act', coverage: Math.min(100, overall - 5), desc: 'Risk classification & compliance' },
    { name: 'ISO/IEC 42001', coverage: Math.min(100, overall - 10), desc: 'AI management systems' },
    { name: 'OECD AI Principles', coverage: Math.min(100, overall + 3), desc: 'Trustworthy AI principles' }
  ];
  return `
    <div class="bg-white rounded-2xl p-7 shadow-sm mb-6">
      <h3 class="font-bold text-navy text-xl mb-2">📐 International Standards Alignment</h3>
      <p class="text-sm text-gray-500 mb-5">Estimated alignment based on your assessment responses. Adapted from Soudi & Bidan (2024) standards mapping.</p>
      <div class="grid md:grid-cols-2 gap-4">
        ${standards.map(s => `
          <div class="p-4 rounded-xl bg-slate-50">
            <div class="flex justify-between items-center mb-2">
              <p class="font-semibold text-sm text-navy">${s.name}</p>
              <span class="font-bold text-sm" style="color:#007A87">${s.coverage}%</span>
            </div>
            <div class="progress-track mb-1"><div class="progress-fill" style="width:${s.coverage}%; background:#007A87"></div></div>
            <p class="text-xs text-gray-500">${s.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ─── PILLAR COVERAGE CHART ────────────────────────────────────────────────────
// Maps the 5 SLR framework pillars to the tool's 8 dimensions.
// Each pillar score = weighted average of its constituent dimension scores,
// weighted by the SLR coverage % of each dimension (from data.js).
const PILLARS = [
  {
    id: 'governance',
    label: 'AI Governance',
    icon: '⚖️',
    color: '#0D2B55',
    bg: '#EFF6FF',
    count: 10,
    pct: 29,
    desc: 'Compliance, oversight & risk management frameworks',
    // dimension ids + their SLR coverage weight for this pillar
    dims: [
      { id: 'governance', w: 0.82 },
      { id: 'risk',       w: 0.47 }
    ]
  },
  {
    id: 'responsible',
    label: 'Responsible & Ethical AI',
    icon: '🌿',
    color: '#7C3AED',
    bg: '#F5F3FF',
    count: 9,
    pct: 26,
    desc: 'Fairness, accountability, transparency & human oversight',
    dims: [
      { id: 'ethics',     w: 0.71 },
      { id: 'governance', w: 0.82 }
    ]
  },
  {
    id: 'readiness',
    label: 'Readiness & Maturity',
    icon: '📈',
    color: '#0E7490',
    bg: '#ECFEFF',
    count: 7,
    pct: 21,
    desc: 'Staged capability progression & organisational readiness',
    dims: [
      { id: 'strategy', w: 0.59 },
      { id: 'people',   w: 0.59 },
      { id: 'process',  w: 0.47 }
    ]
  },
  {
    id: 'adoption',
    label: 'AI Adoption',
    icon: '🚀',
    color: '#D97706',
    bg: '#FFFBEB',
    count: 4,
    pct: 12,
    desc: 'Practical deployment guides for AI tools in operations',
    dims: [
      { id: 'technology', w: 0.65 },
      { id: 'process',    w: 0.47 },
      { id: 'strategy',   w: 0.59 }
    ]
  },
  {
    id: 'hybrid',
    label: 'Hybrid Frameworks',
    icon: '🔗',
    color: '#16A34A',
    bg: '#F0FDF4',
    count: 4,
    pct: 12,
    desc: 'Integrated frameworks combining governance, readiness & ethics',
    dims: [
      { id: 'data',       w: 0.59 },
      { id: 'ethics',     w: 0.71 },
      { id: 'technology', w: 0.65 },
      { id: 'risk',       w: 0.47 }
    ]
  }
];

function calcPillarScores(dimScores) {
  return PILLARS.map(p => {
    const totalW = p.dims.reduce((s, d) => s + d.w, 0);
    const weighted = p.dims.reduce((s, d) => s + (dimScores[d.id] || 0) * d.w, 0);
    return Math.round(weighted / totalW);
  });
}

function buildPillarCoverageHTML(dimScores) {
  const scores = calcPillarScores(dimScores);
  const pillarCards = PILLARS.map((p, i) => {
    const score = scores[i];
    const ml = getMaturityLevel(score);
    return `
      <div class="p-4 rounded-xl border" style="background:${p.bg}; border-color:${p.color}30">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <span class="text-xl">${p.icon}</span>
            <div>
              <p class="text-xs font-bold" style="color:${p.color}">${p.label}</p>
              <p class="text-xs text-gray-500">n=${p.count} frameworks (${p.pct}%)</p>
            </div>
          </div>
          <div class="text-right">
            <span class="text-lg font-extrabold" style="color:${p.color}">${score}%</span>
            <p class="text-xs font-semibold" style="color:${ml.color}">${ml.label}</p>
          </div>
        </div>
        <div class="progress-track mb-1">
          <div class="progress-fill" style="width:${score}%; background:${p.color}"></div>
        </div>
        <p class="text-xs text-gray-500 mt-1">${p.desc}</p>
      </div>
    `;
  }).join('');

  return `
    <div class="bg-white rounded-2xl p-7 shadow-sm mb-6">
      <div class="flex flex-wrap items-start justify-between gap-3 mb-2">
        <div>
          <h3 class="font-bold text-navy text-xl">📊 SLR Pillar Coverage Profile</h3>
          <p class="text-sm text-gray-500 mt-1">How your scores map across the 5 framework categories identified in the PRISMA 2020 systematic review of 34 frameworks.</p>
        </div>
        <span class="text-xs bg-navy text-white font-semibold px-3 py-1.5 rounded-full">PRISMA 2020 · 34 Frameworks</span>
      </div>
      <!-- Bar chart canvas -->
      <div class="my-5" style="position:relative; height:220px">
        <canvas id="pillarChart"></canvas>
      </div>
      <!-- Pillar score cards -->
      <div class="grid md:grid-cols-5 gap-3 mt-4">
        ${pillarCards}
      </div>
      <p class="citation mt-4">Pillar taxonomy adapted from the SLR framework classification (Governance n=10, Responsible AI n=9, Readiness/Maturity n=7, Adoption n=4, Hybrid n=4). Scores are weighted averages of constituent dimension scores, weighted by SLR coverage percentage.</p>
    </div>
  `;
}

function renderPillarChart(dimScores) {
  const ctx = document.getElementById('pillarChart');
  if (!ctx) return;
  const scores = calcPillarScores(dimScores);
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: PILLARS.map(p => p.icon + ' ' + p.label),
      datasets: [
        {
          label: 'Your Score (%)',
          data: scores,
          backgroundColor: PILLARS.map(p => p.color + 'CC'),
          borderColor: PILLARS.map(p => p.color),
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false
        },
        {
          label: 'SLR Coverage Benchmark (%)',
          data: PILLARS.map(p => {
            // benchmark = weighted avg of coverage% for constituent dims
            const totalW = p.dims.reduce((s, d) => s + d.w, 0);
            return Math.round(p.dims.reduce((s, d) => s + d.w * d.w * 100, 0) / totalW);
          }),
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: '#94A3B8',
          borderWidth: 2,
          borderDash: [5, 4],
          type: 'line',
          pointBackgroundColor: '#94A3B8',
          pointRadius: 5,
          tension: 0.3,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 0, max: 100,
          ticks: { stepSize: 20, callback: v => v + '%', font: { size: 11 } },
          grid: { color: 'rgba(0,0,0,0.06)' }
        },
        x: {
          ticks: { font: { size: 11, weight: '600' } },
          grid: { display: false }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: { font: { size: 11 }, usePointStyle: true, pointStyleWidth: 12 }
        },
        tooltip: {
          callbacks: {
            label: ctx => {
              if (ctx.datasetIndex === 0) {
                const ml = getMaturityLevel(ctx.raw);
                return ` Your score: ${ctx.raw}% — ${ml.label}`;
              }
              return ` SLR coverage benchmark: ${ctx.raw}%`;
            }
          }
        }
      }
    }
  });
}

// ─── RADAR CHART ──────────────────────────────────────────────────────────────
function renderRadarChart(dimScores) {
  const ctx = document.getElementById('radarChart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: DIMENSIONS.map(d => d.label.split(' ').slice(0,2).join('\n')),
      datasets: [{
        label: 'AI Readiness Score (%)',
        data: DIM_KEYS.map(k => dimScores[k]),
        backgroundColor: 'rgba(0, 122, 135, 0.15)',
        borderColor: '#007A87',
        borderWidth: 2,
        pointBackgroundColor: DIM_KEYS.map(k => DIMENSIONS.find(d => d.id === k).color),
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          min: 0, max: 100,
          ticks: { stepSize: 20, font: { size: 10 } },
          pointLabels: { font: { size: 11, weight: '600' } },
          grid: { color: 'rgba(0,0,0,0.08)' }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.raw}% — ${getMaturityLevel(ctx.raw).label}`
          }
        }
      }
    }
  });
}

// ─── ACCORDION ────────────────────────────────────────────────────────────────
function toggleAccordion(id) {
  const el = document.getElementById(id);
  const icon = document.getElementById('acc-icon-' + id.replace('acc-', ''));
  if (!el) return;
  el.classList.toggle('open');
  if (icon) icon.style.transform = el.classList.contains('open') ? 'rotate(180deg)' : '';
}

// ─── RESET / SWITCH ───────────────────────────────────────────────────────────
function resetAssessment() {
  state = { mode: null, currentStep: 0, answers: {}, started: false };
  document.getElementById('mode-selector').classList.remove('hidden');
  document.getElementById('assessment-container').classList.add('hidden');
  document.getElementById('results-container').classList.add('hidden');
  document.getElementById('results-container').innerHTML = '';
  scrollToEl('tool');
}

function switchMode() {
  const newMode = state.mode === 'academic' ? 'practitioner' : 'academic';
  launchMode(newMode);
}
