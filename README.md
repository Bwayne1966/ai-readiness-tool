[README.md](https://github.com/user-attachments/files/28578940/README.md)
# 🤖 AI Readiness Assessment Tool

> A research-backed, interactive web application for assessing organisational AI readiness across eight key dimensions — grounded in a PRISMA 2020 Systematic Literature Review of 34 frameworks.

---

## Table of Contents

1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Assessment Modes](#assessment-modes)
4. [Dimensions Assessed](#dimensions-assessed)
5. [Maturity Levels](#maturity-levels)
6. [File Structure](#file-structure)
7. [Tech Stack](#tech-stack)
8. [Setup & Installation](#setup--installation)
9. [Usage Guide](#usage-guide)
10. [Customisation Guide](#customisation-guide)
11. [Deployment](#deployment)
12. [Research Basis](#research-basis)
13. [License](#license)

---

## Overview

The **AI Readiness Assessment Tool** helps organisations — particularly Small and Medium Enterprises (SMEs) — evaluate their preparedness to adopt Artificial Intelligence responsibly. It is built on findings from a systematic review of 34 AI readiness and responsible adoption frameworks, covering both academic and practitioner perspectives.

The tool provides:
- A structured, evidence-based questionnaire (Academic or Practitioner mode)
- Weighted scoring across 8 organisational dimensions
- Visual radar chart with maturity-level classification
- Prioritised gap analysis and actionable recommendations
- A personalised 30/60/90-day implementation roadmap
- Alignment scores against international AI standards (NIST AI RMF, EU AI Act, ISO/IEC 42001, OECD AI Principles)
- PDF export of the full results report

---

## Key Features

| Feature | Description |
|---------|-------------|
| 🎓 **Academic Mode** | 40 evidence-based questions with Likert scale (1–5), weighted scoring, inline citations, and guidance notes |
| 🏢 **Practitioner Mode** | 24 plain-language questions with Yes / Partial / No responses and practical hints |
| 📊 **Radar Chart** | Chart.js visualisation of all 8 dimension scores |
| 🏅 **Maturity Classification** | 6-level maturity model from *Unaware* to *Optimising* |
| 🔍 **Gap Analysis** | Automatically identifies top 3 strengths and top 3 priority gaps |
| 📋 **Recommendations** | Dimension-specific, tiered recommendations (low / mid / high score) |
| 🗓️ **30/60/90-Day Roadmap** | Prioritised action plan based on maturity level and weakest dimensions |
| 🌐 **Standards Alignment** | Alignment scores for NIST AI RMF, EU AI Act, ISO/IEC 42001, OECD |
| 🖨️ **PDF Export** | Clean, print-optimised stylesheet for generating PDF reports via browser |
| 📚 **Framework Evidence Base** | Browsable grid of all 34 source frameworks with type, year, and DOI links |
| 🔄 **Mode Switching** | Switch between Academic and Practitioner modes without losing context |

---

## Assessment Modes

### 🎓 Academic Mode
- **40 questions** across 8 dimensions (5 per dimension)
- **5-point Likert scale**: 1 (Not Started) → 5 (Optimising)
- Each question carries a **weight** (1.0–1.3) reflecting its relative importance
- Includes **inline citations** to source frameworks and **guidance notes**
- Scoring formula: `(Σ weight × score) / (Σ weight × 5) × 100`
- Suitable for: Researchers, consultants, academic assessments

### 🏢 Practitioner Mode
- **24 questions** across 8 dimensions (3 per dimension)
- **3-button scale**: Yes (2) / Partial (1) / No (0)
- Plain-language questions with practical **hints** (no jargon)
- Scoring formula: `(Σ score) / (n × 2) × 100`
- Suitable for: Business owners, managers, non-technical stakeholders

---

## Dimensions Assessed

| # | Dimension | Description |
|---|-----------|-------------|
| 1 | **Governance & Accountability** | Policies, roles, oversight structures for AI decision-making |
| 2 | **Ethics & Responsible AI** | Fairness, transparency, bias mitigation, explainability |
| 3 | **Technology & Infrastructure** | Computing resources, cloud readiness, integration capability |
| 4 | **Data Management** | Data quality, pipelines, privacy, storage, and governance |
| 5 | **People & Skills** | AI literacy, training, talent strategy, change management |
| 6 | **Strategy & Business Alignment** | AI vision, leadership buy-in, ROI measurement, roadmap |
| 7 | **Process & Operations** | Workflow integration, process documentation, agile practices |
| 8 | **Risk Management & Security** | Cyber risk, AI-specific risk frameworks, compliance, continuity |

---

## Maturity Levels

| Level | Label | Score Range | Description |
|-------|-------|-------------|-------------|
| 0 | **Unaware** | 0–20% | AI readiness has not been considered. No policies, infrastructure, or awareness in place. |
| 1 | **Initial** | 20–40% | Ad hoc awareness of AI. Some informal discussions but no systematic approach or policies. |
| 2 | **Developing** | 40–60% | Active efforts underway. Some policies and tools exist but are inconsistent or incomplete. |
| 3 | **Defined** | 60–75% | Structured AI readiness approach. Documented policies, dedicated resources, and clear ownership. |
| 4 | **Managed** | 75–88% | AI readiness is measured and managed. Continuous improvement processes in place. |
| 5 | **Optimising** | 88–100% | AI is deeply embedded. Continuous learning, innovation, and responsible AI leadership. |

---

## File Structure

```
ai_readiness_tool_web/
│
├── index.html          # Main HTML page (318 lines, 20.7 KB)
│   ├── Navigation bar with logo and menu links
│   ├── Hero section with mode selector and stat cards
│   ├── About section with detailed mode cards
│   ├── 8 Dimension cards with framework coverage bars
│   ├── Assessment tool section (mode selector + assessment + results)
│   ├── Framework evidence base grid (34 frameworks)
│   ├── Key references section (15 APA-formatted citations)
│   └── Footer with methodology note
│
├── data.js             # Data layer (531 lines, 38.6 KB)
│   ├── DIMENSIONS[]              — 8 dimension objects with metadata
│   ├── ACADEMIC_QUESTIONS{}      — 40 weighted questions with citations
│   ├── PRACTITIONER_QUESTIONS{}  — 24 plain-language questions with hints
│   ├── MATURITY_LEVELS[]         — 6 maturity level descriptors
│   ├── FRAMEWORKS[]              — 34 source frameworks with DOI links
│   ├── REFERENCES[]              — 15 APA-formatted references
│   └── RECOMMENDATIONS{}         — Tiered recommendations per dimension
│
├── app.js              # Application logic (699 lines, 31.5 KB)
│   ├── State management          — mode, currentStep, answers, started
│   ├── Rendering functions       — dimensions, frameworks, references
│   ├── Assessment flow           — renderStep, nextStep, prevStep
│   ├── Scoring engine            — calculateScores, getMaturityLevel
│   ├── Results rendering         — showResults, buildResultsHTML
│   ├── Radar chart               — renderRadarChart (Chart.js)
│   ├── Roadmap builder           — buildRoadmap (30/60/90-day)
│   ├── Standards alignment       — buildStandardsAlignment
│   └── Utilities                 — scrollToEl, toggleAccordion, reset
│
└── README.md           # This documentation file
```

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **HTML5** | — | Semantic page structure |
| **Tailwind CSS** | 3.x (CDN) | Utility-first responsive styling |
| **Vanilla JavaScript** | ES6+ | Application logic, state management |
| **Chart.js** | 4.x (CDN) | Radar chart visualisation |
| **Google Fonts** | Inter | Typography |

> ✅ **No build tools required.** No npm, no webpack, no framework dependencies. The tool runs entirely in the browser as a static site.

---

## Setup & Installation

### Option 1: Open Directly in Browser (Simplest)

```bash
# Clone or download the repository
git clone <your-repo-url>
cd ai_readiness_tool_web

# Open index.html directly in your browser
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

> ⚠️ Some browsers may block local JavaScript modules when opening `file://` URLs. Use Option 2 if you encounter issues.

---

### Option 2: Local Development Server (Recommended)

**Using Node.js / npx (no install needed):**
```bash
cd ai_readiness_tool_web
npx serve .
# → Serving at http://localhost:3000
```

**Using Python:**
```bash
cd ai_readiness_tool_web
python3 -m http.server 8080
# → Serving at http://localhost:8080
```

**Using VS Code Live Server:**
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Right-click `index.html` → **Open with Live Server**

---

### Option 3: Docker

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

```bash
docker build -t ai-readiness-tool .
docker run -p 8080:80 ai-readiness-tool
# → Visit http://localhost:8080
```

---

## Usage Guide

### Starting an Assessment

1. **Open the tool** in your browser (see Setup above)
2. **Choose your mode** from the hero section or About cards:
   - Click **"Start Academic Assessment"** for the full 40-question research-grade evaluation
   - Click **"Start Practitioner Assessment"** for the quick 24-question business-friendly evaluation
3. The assessment will scroll to the **Step 1: Governance & Accountability** dimension

### Completing the Assessment

- **Academic Mode**: For each question, click a score from **1 (Not Started)** to **5 (Optimising)**. The answer count (e.g., *3 / 5 answered*) updates in real time.
- **Practitioner Mode**: For each question, click **Yes**, **Partial**, or **No**.
- Use **"← Back"** and **"Next →"** buttons to navigate between the 8 dimensions.
- A **progress bar** and **step indicators** show your position.
- The **"Next →"** button on the final step (Step 8) becomes **"View Results →"**.

### Reading Your Results

After completing all 8 dimensions, the results page displays:

| Section | Description |
|---------|-------------|
| **Overall Score** | Percentage score with maturity level badge |
| **Radar Chart** | Visual overview of all 8 dimension scores |
| **Dimension Scores** | Individual score, progress bar, and maturity badge per dimension |
| **Top Strengths** | Your 3 highest-scoring dimensions |
| **Priority Gaps** | Your 3 lowest-scoring dimensions (focus areas) |
| **Recommendations** | Expandable accordion with tailored actions per dimension |
| **30/60/90-Day Roadmap** | Phased implementation plan with specific action items |
| **Standards Alignment** | Alignment % with NIST AI RMF, EU AI Act, ISO/IEC 42001, OECD *(Academic mode only)* |

### Exporting as PDF

1. Click the **"🖨️ Print / Save as PDF"** button in the results section
2. In the browser print dialog, set **Destination** to **"Save as PDF"**
3. The print stylesheet automatically hides navigation, hero, and footer sections
4. Click **Save** to download your report

### Switching Modes & Retaking

- Click **"↔️ Try Practitioner/Academic Mode"** to switch modes and restart the assessment
- Click **"🔄 Retake Assessment"** to clear all answers and start fresh in the same mode

---

## Customisation Guide

All customisation is done in `data.js` — no changes to `app.js` or `index.html` are required for most modifications.

### Adding or Editing Questions

**Academic questions** are in the `ACADEMIC_QUESTIONS` object, keyed by dimension ID:

```javascript
// data.js — ACADEMIC_QUESTIONS
governance: [
  {
    id: 'gov_1',
    text: 'Your question text here.',
    weight: 1.2,                          // Importance weight (1.0–1.5 recommended)
    citation: 'Author et al. (Year)',     // Source citation
    guidance: 'Guidance text for users.'  // Optional help text
  },
  // ... up to 5 questions per dimension
]
```

**Practitioner questions** follow the same structure but use `hint` instead of `citation`/`guidance`:

```javascript
// data.js — PRACTITIONER_QUESTIONS
governance: [
  {
    id: 'p_gov_1',
    text: 'Plain-language question?',
    hint: 'Practical hint for business users.'
  }
]
```

### Adding a New Dimension

1. Add an entry to `DIMENSIONS[]` in `data.js`:

```javascript
{
  id: 'sustainability',
  label: 'Sustainability & ESG',
  icon: '🌱',
  color: '#16a34a',
  coverage: 45,
  description: 'Environmental and social considerations in AI deployment.',
  citation: 'Author et al. (Year)',
  bestFrom: 'Framework Name'
}
```

2. Add corresponding questions to `ACADEMIC_QUESTIONS.sustainability` and `PRACTITIONER_QUESTIONS.sustainability`
3. Add recommendations to `RECOMMENDATIONS.sustainability` with `low[]`, `mid[]`, `high[]` arrays

### Editing Recommendations

Recommendations are tiered by score in `RECOMMENDATIONS`:

```javascript
// data.js — RECOMMENDATIONS
governance: {
  low: [
    'Appoint an AI governance lead or champion.',
    'Draft a basic AI usage policy document.'
  ],
  mid: [
    'Establish a cross-functional AI steering committee.',
    'Implement quarterly AI governance reviews.'
  ],
  high: [
    'Pursue ISO/IEC 42001 AI management system certification.',
    'Publish an annual AI transparency report.'
  ]
}
```

- **`low`**: Score < 40% — foundational actions
- **`mid`**: Score 40–70% — intermediate improvements
- **`high`**: Score > 70% — advanced optimisation

### Adding Frameworks to the Evidence Base

Append entries to `FRAMEWORKS[]`:

```javascript
{
  name: 'Your Framework Name',
  authors: 'Author et al.',
  year: 2024,
  type: 'Academic',          // 'Academic', 'Industry', 'Government', 'Standard'
  dimensions: ['governance', 'ethics', 'technology'],
  doi: 'https://doi.org/10.xxxx/xxxxx'
}
```

### Changing Maturity Level Thresholds

Edit `MATURITY_LEVELS[]` in `data.js`:

```javascript
{ level: 2, label: 'Developing', range: [40, 60], color: '#D97706', bg: '#fef3c7',
  desc: 'Active efforts underway...' }
```

---

## Deployment

### Static Hosting (Recommended)

Since the tool is a **pure static site** (HTML + JS, no backend), it can be deployed to any static hosting provider:

| Platform | Command / Steps |
|----------|----------------|
| **Netlify** | Drag-and-drop the `ai_readiness_tool_web/` folder at [app.netlify.com](https://app.netlify.com) |
| **Vercel** | `npx vercel` inside the project folder |
| **GitHub Pages** | Push to a repo → Settings → Pages → Deploy from branch |
| **Cloudflare Pages** | Connect repo → Build command: *(none)* → Output: `/` |
| **AWS S3 + CloudFront** | Upload files to S3 bucket with static website hosting enabled |

### Manual Server Deployment

```bash
# Copy files to your web server's document root
scp -r ai_readiness_tool_web/* user@yourserver.com:/var/www/html/ai-readiness/
```

### Environment Notes

- No environment variables required
- No API keys or backend services needed
- All data is bundled in `data.js` — fully self-contained
- HTTPS is recommended for production (required for print/PDF in some browsers)

---

## Research Basis

This tool is grounded in a **PRISMA 2020 Systematic Literature Review** examining AI readiness and responsible adoption frameworks for SMEs.

| Metric | Value |
|--------|-------|
| Frameworks reviewed | 34 |
| Dimensions identified | 8 |
| SME-specific frameworks | 76% |
| Maturity levels modelled | 5 (+ Unaware = 6 total) |
| Academic questions | 40 |
| Practitioner questions | 24 |

**Key source frameworks include:**
- NIST AI Risk Management Framework (NIST AI RMF, 2023)
- EU AI Act Readiness Framework (European Commission, 2024)
- ISO/IEC 42001 AI Management Systems Standard (ISO, 2023)
- OECD AI Principles Implementation Framework (OECD, 2023)
- McKinsey AI Readiness Index (2022)
- MIT Sloan AI Strategy Framework (2021)
- + 28 additional academic and industry frameworks

Full references are available in the `REFERENCES` array in `data.js` and in the **Key References** section of the live tool.

---

## Contributing

Contributions are welcome! To suggest improvements:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/add-new-dimension`
3. Make your changes to `data.js` (questions, frameworks, recommendations)
4. Test locally using `npx serve .`
5. Submit a pull request with a description of your changes

**Areas where contributions are especially valued:**
- Additional validated questions with peer-reviewed citations
- New framework entries with DOI links
- Translations to other languages (questions in `data.js`)
- Accessibility improvements (WCAG 2.1 AA compliance)

---

## License

This tool is released for **academic and non-commercial use**. If you use this tool or its underlying research in published work, please cite:

```
Author(s). (2026). AI Readiness Assessment Tool for SMEs [Web application].
Based on a PRISMA 2020 Systematic Literature Review of 34 AI Readiness Frameworks.
Retrieved from https://9a15i26h.scispace.co
```

---

## Contact & Support

For questions about the research methodology, framework coverage, or tool functionality, please refer to the **Key References** section within the live tool or the `REFERENCES` array in `data.js`.

---

*Built with ❤️ for the SME research community · Powered by SciSpace*
