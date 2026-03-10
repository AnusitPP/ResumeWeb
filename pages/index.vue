<template>
  <div class="h-screen bg-slate-100 flex flex-col font-sans overflow-hidden">
    <!-- Top Navbar -->
    <div
      class="bg-dark text-white px-8 py-3 flex justify-between items-center z-50 shrink-0 print:hidden"
    >
      <h1 class="text-xl tracking-wide font-semibold">Resume Builder</h1>
      <div class="flex gap-2 items-center">
        <!-- Zoom Controls -->
        <div class="flex items-center gap-1 bg-slate-800 rounded px-2 py-1 mr-4">
          <button class="text-white hover:bg-slate-700 w-8 h-8 rounded flex items-center justify-center font-bold text-lg" @click="zoomOut">-</button>
          <span class="text-sm font-semibold w-14 text-center select-none">{{ Math.round(zoomLevel * 100) }}%</span>
          <button class="text-white hover:bg-slate-700 w-8 h-8 rounded flex items-center justify-center font-bold text-lg" @click="zoomIn">+</button>
          <div class="w-px h-5 bg-slate-600 mx-1"></div>
          <button class="text-xs text-slate-300 hover:text-white px-2 py-1 rounded hover:bg-slate-700" @click="resetZoom">Reset</button>
        </div>
        <button class="btn btn-print" @click="handlePrint">
          Print / Save PDF
        </button>
      </div>
    </div>

    <!-- Main 3-Column Layout -->
    <div class="flex-1 flex overflow-hidden">
      
      <!-- Column 1: Menu -->
      <div class="w-64 bg-white border-r border-slate-300 flex flex-col shrink-0 overflow-y-auto print:hidden">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          class="px-6 py-4 cursor-pointer text-sm font-semibold border-l-4 transition-colors select-none"
          :class="
            activeTab === index
              ? 'bg-blue-50 border-primary text-primary'
              : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-800'
          "
          @click="activeTab = index"
        >
          {{ tab }}
        </div>
      </div>

      <!-- Column 2: Live Preview (A4 Format) -->
      <div class="flex-[1.5] bg-slate-300 overflow-y-auto p-4 md:p-8 flex justify-center items-start border-r border-slate-300 print:p-0 print:border-none print:bg-white print:block print:overflow-visible relative preview-container">
        <!-- Scale container to fit smaller screens, you can remove scale logic if you want exact A4 without zooming -->
        <div class="shadow-2xl bg-white origin-top shrink-0 print:shadow-none print:m-0 preview-page" :style="{ transform: `scale(${zoomLevel})` }">
          <ResumeOutput :resume="resumeData" />
        </div>
      </div>

      <!-- Column 3: Form Inputs -->
      <div class="flex-1 bg-slate-100 overflow-y-auto print:hidden" v-if="!isLoading">
        <div class="p-6">
          <!-- Panel 0: Personal Info -->
          <div v-show="activeTab === 0" class="panel">
            <div class="card">
              <div class="card-title">Personal Information</div>
              <div class="flex flex-col gap-4 mb-4">
                <div>
                  <label>Resume Format (Layout)</label>
                  <select v-model="resumeData.format" class="input bg-white cursor-pointer">
                    <option value="Chronological">Chronological (Standard)</option>
                    <option value="Functional">Functional (Skills-focused)</option>
                    <option value="Combination">Combination (Hybrid)</option>
                  </select>
                </div>
              </div>
              <div class="flex flex-col gap-4 mb-4">
                <div>
                  <label>Full Name</label>
                  <input v-model="resumeData.name" placeholder="e.g. Anusit Panpimsen" class="input" />
                </div>
                <div>
                  <label>Job Title / Role</label>
                  <input v-model="resumeData.title" placeholder="e.g. Flutter Mobile Developer" class="input" />
                </div>
              </div>
              <div class="flex flex-col gap-4 mb-4">
                <div>
                  <label>Phone</label>
                  <input v-model="resumeData.phone" placeholder="+66 82-002-1492" class="input" />
                </div>
                <div>
                  <label>Email</label>
                  <input v-model="resumeData.email" type="email" placeholder="you@email.com" class="input" />
                </div>
                <div>
                  <label>Location</label>
                  <input v-model="resumeData.loc" placeholder="City, Country" class="input" />
                </div>
              </div>
              <div class="flex flex-col gap-4">
                <div>
                  <label>LinkedIn URL</label>
                  <input v-model="resumeData.linkedin" placeholder="linkedin.com/in/yourname" class="input" />
                </div>
                <div>
                  <label>GitHub / Portfolio URL</label>
                  <input v-model="resumeData.github" placeholder="github.com/yourname" class="input" />
                </div>
              </div>
            </div>
          </div>

          <!-- Panel 1: Summary -->
          <div v-show="activeTab === 1" class="panel">
            <div class="card">
              <div class="card-title">Professional Summary</div>
              <div>
                <label>Summary Paragraph</label>
                <textarea v-model="resumeData.summary" rows="8" class="input h-auto resize-y"></textarea>
              </div>
            </div>
          </div>

          <!-- Panel 2: Experience -->
          <div v-show="activeTab === 2" class="panel">
            <div class="card bg-transparent shadow-none p-0 border-none">
              <div class="card-title pl-2">Work Experience</div>
              <draggable v-model="resumeData.exps" item-key="company" handle=".drag-handle" animation="200">
                <template #item="{ element: exp, index: i }">
                  <div class="item-block card !mb-4">
                    <div class="card-actions">
                      <button class="drag-handle action-btn" title="Drag to move">≡</button>
                      <button class="action-btn" @click="resumeData.exps.splice(i, 1)">Remove</button>
                    </div>
                    <div class="flex flex-col gap-4 mb-3">
                      <div>
                        <label>Job Title</label>
                        <input v-model="exp.title" class="input" />
                      </div>
                      <div>
                        <label>Company Name</label>
                        <input v-model="exp.company" class="input" />
                      </div>
                    </div>
                    <div class="flex flex-col gap-4 mb-3">
                      <div>
                        <label>Location</label>
                        <input v-model="exp.loc" class="input" />
                      </div>
                      <div>
                        <label>Date Range</label>
                        <input v-model="exp.date" class="input" />
                      </div>
                    </div>
                    <label class="mb-2 block mt-4">Responsibilities / Bullet Points</label>
                    <draggable v-model="exp.bullets" :item-key="(item, j) => j" handle=".drag-handle" animation="200">
                      <template #item="{ element: bullet, index: j }">
                        <div class="flex gap-2 mb-2">
                          <button class="drag-handle bg-slate-200 text-slate-500 rounded font-bold px-2 hover:bg-slate-300 text-lg">≡</button>
                          <input v-model="exp.bullets[j]" class="input flex-1" placeholder="Describe..." />
                          <button class="bg-slate-200 hover:bg-slate-300 px-3 rounded font-bold shrink-0" @click="exp.bullets.splice(j, 1)">&times;</button>
                        </div>
                      </template>
                    </draggable>
                    <button class="add-btn text-sm py-1 mt-2" @click="exp.bullets.push('')">+ Add Bullet</button>
                  </div>
                </template>
              </draggable>
              <button class="add-btn" @click="resumeData.exps.push({ title: '', company: '', loc: '', date: '', bullets: [''] })">+ Add Position</button>
            </div>
          </div>

          <!-- Panel 3: Skills -->
          <div v-show="activeTab === 3" class="panel">
            <div class="card bg-transparent shadow-none p-0 border-none">
              <div class="card-title pl-2">Technical Skills</div>
              <draggable v-model="resumeData.skills" item-key="cat" handle=".drag-handle" animation="200">
                <template #item="{ element: skill, index: i }">
                  <div class="item-block card !mb-4">
                    <div class="card-actions">
                      <button class="drag-handle action-btn" title="Drag to move">≡</button>
                      <button class="action-btn" @click="resumeData.skills.splice(i, 1)">Remove</button>
                    </div>
                    <div class="flex flex-col gap-4">
                      <div>
                        <label>Category (e.g. Tools, Frameworks, Languages)</label>
                        <input v-model="skill.cat" placeholder="Category Name" class="input font-semibold" />
                      </div>
                      <div class="pl-4 border-l-[3px] border-slate-300">
                        <label>Values (Items)</label>
                        <draggable v-model="skill.vals" :item-key="(item, idx) => idx" handle=".drag-handle" animation="200">
                          <template #item="{ element: val, index: j }">
                            <div class="flex gap-2 mb-2">
                              <button class="drag-handle bg-slate-200 text-slate-500 rounded font-bold px-2 hover:bg-slate-300 shrink-0 text-lg">≡</button>
                              <input v-model="skill.vals[j]" class="input flex-1 py-1" placeholder="e.g. JavaScript" />
                              <button class="bg-slate-200 hover:bg-slate-300 px-3 rounded font-bold shrink-0" @click="skill.vals.splice(j, 1)">&times;</button>
                            </div>
                          </template>
                        </draggable>
                        <button class="add-btn text-sm py-1 mt-2" @click="skill.vals.push('')">+ Add Value</button>
                      </div>
                    </div>
                  </div>
                </template>
              </draggable>
              <button class="add-btn mt-2" @click="resumeData.skills.push({ cat: '', vals: [''] })">+ Add Skill Category</button>
            </div>
          </div>

          <!-- Panel 4: Education -->
          <div v-show="activeTab === 4" class="panel">
            <div class="card bg-transparent shadow-none p-0 border-none">
              <div class="card-title pl-2">Education</div>
              <draggable v-model="resumeData.edus" item-key="school" handle=".drag-handle" animation="200">
                <template #item="{ element: edu, index: i }">
                  <div class="item-block card !mb-4">
                    <div class="card-actions">
                      <button class="drag-handle action-btn" title="Drag to move">≡</button>
                      <button class="action-btn" @click="resumeData.edus.splice(i, 1)">Remove</button>
                    </div>
                    <div class="flex flex-col gap-4 mb-3">
                      <div>
                        <label>Degree / Major</label>
                        <input v-model="edu.degree" class="input" />
                      </div>
                      <div>
                        <label>School / University</label>
                        <input v-model="edu.school" class="input" />
                      </div>
                    </div>
                    <div class="flex flex-col gap-4 mb-3">
                      <div>
                        <label>Location</label>
                        <input v-model="edu.loc" class="input" />
                      </div>
                      <div>
                        <label>Year</label>
                        <input v-model="edu.year" class="input" />
                      </div>
                    </div>
                    <div>
                      <label>Note (optional)</label>
                      <input v-model="edu.note" class="input" />
                    </div>
                  </div>
                </template>
              </draggable>
              <button class="add-btn" @click="resumeData.edus.push({ degree: '', school: '', loc: '', year: '', note: '' })">+ Add Education</button>
            </div>
          </div>

          <!-- Panel 5: Achievements -->
          <div v-show="activeTab === 5" class="panel">
            <div class="card">
              <div class="card-title">Key Achievements</div>
              <draggable v-model="resumeData.achs" :item-key="(item, idx) => idx" handle=".drag-handle" animation="200">
                <template #item="{ element: ach, index: i }">
                  <div class="flex gap-2 mb-2">
                    <button class="drag-handle bg-slate-200 text-slate-500 rounded font-bold px-2 hover:bg-slate-300 shrink-0 text-lg">≡</button>
                    <input v-model="resumeData.achs[i]" class="input flex-1" placeholder="Achievement..." />
                    <button class="bg-slate-200 hover:bg-slate-300 px-3 rounded font-bold shrink-0" @click="resumeData.achs.splice(i, 1)">&times;</button>
                  </div>
                </template>
              </draggable>
              <button class="add-btn mt-4" @click="resumeData.achs.push('')">+ Add Achievement</button>
            </div>
          </div>

          <!-- Panel 6: Languages -->
          <div v-show="activeTab === 6" class="panel">
            <div class="card">
              <div class="card-title">Languages</div>
              <draggable v-model="resumeData.langs" item-key="lang" handle=".drag-handle" animation="200">
                <template #item="{ element: lang, index: i }">
                  <div class="flex flex-col xl:flex-row gap-3 mb-4 items-center border-b pb-4 xl:border-none xl:pb-0 border-slate-200">
                    <button class="drag-handle bg-slate-200 text-slate-500 rounded font-bold px-3 py-2 hover:bg-slate-300 shrink-0 text-lg">≡</button>
                    <input v-model="lang.lang" placeholder="Language" class="input w-full xl:w-1/3" />
                    <input v-model="lang.level" placeholder="Proficiency" class="input flex-1 w-full" />
                    <button class="bg-slate-200 hover:bg-slate-300 w-full xl:w-auto px-4 py-2 rounded text-sm font-bold text-slate-600 shrink-0" @click="resumeData.langs.splice(i, 1)">Remove</button>
                  </div>
                </template>
              </draggable>
              <button class="add-btn mt-2" @click="resumeData.langs.push({ lang: '', level: '' })">+ Add Language</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";

const { resumeData, isLoading } = useResume();

const zoomLevel = ref(1);
const zoomIn = () => { if (zoomLevel.value < 2.0) zoomLevel.value += 0.1; };
const zoomOut = () => { if (zoomLevel.value > 0.3) zoomLevel.value -= 0.1; };
const resetZoom = () => { zoomLevel.value = 1; };

const tabs = [
  "Personal Info",
  "Summary",
  "Experience",
  "Skills",
  "Education",
  "Achievements",
  "Languages",
];
const activeTab = ref(0);

const handlePrint = () => {
  window.print();
};
</script>

<style scoped>
.card {
  @apply bg-white rounded-md p-6 shadow-sm mb-5 border border-slate-200;
}
.card-title {
  @apply text-lg font-bold text-dark mb-4 pb-2 border-b-2 border-slate-200;
}
label {
  @apply block text-sm font-semibold text-slate-600 mb-1;
}
.input {
  @apply w-full px-3 py-2 border-2 border-slate-300 rounded text-sm text-slate-800 bg-slate-50 transition-colors;
}
.input:focus {
  @apply outline-none border-slate-500 bg-white;
}
.item-block {
  @apply relative;
}
.card-actions {
  @apply absolute top-4 right-6 flex gap-2;
}
.action-btn {
  @apply bg-slate-200 text-slate-600 border-none rounded px-3 py-1 text-xs cursor-pointer font-bold transition-all hover:bg-slate-300 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-200 disabled:hover:text-slate-600;
}
.drag-handle {
  @apply cursor-grab active:cursor-grabbing text-xl px-2 opacity-60 hover:opacity-100 transition-opacity;
}
.add-btn {
  @apply bg-slate-100 text-slate-700 border-2 border-dashed border-slate-400 rounded px-5 py-2 text-sm font-semibold cursor-pointer w-full mt-1 transition-colors hover:bg-slate-200;
}

/* Render preview at exact 1:1 A4 scale with scrollbars */
.preview-page {
  width: 210mm;
  height: 297mm;
  overflow: visible;
}

@media print {
  :deep(body *) {
    visibility: hidden;
  }
  :deep(.print-area),
  :deep(.print-area *) {
    visibility: visible;
  }
  :deep(.print-area) {
    position: absolute;
    left: 0;
    top: 0;
  }
  .preview-page {
    transform: scale(1) !important;
  }
  /* Remove flex scaling on print to allow original component styling to show up properly */
  .preview-container {
    display: block !important;
    overflow: visible !important;
  }
}
</style>
