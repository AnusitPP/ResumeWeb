<template>
  <div
    class="resume print-area bg-white mx-auto shadow-lg text-slate-900 leading-snug flex flex-col"
  >
    <div
      class="text-center font-sans text-3xl font-bold uppercase tracking-widest editable-section"
      style="order: 1"
      @click="$emit('sectionClick', 0)"
    >
      {{ resume.name || "Your Name" }}
    </div>
    <div
      v-if="resume.title"
      class="text-center font-sans text-base font-semibold tracking-wider uppercase mt-1 mb-2 editable-section"
      style="order: 2"
      @click="$emit('sectionClick', 0)"
    >
      {{ resume.title }}
    </div>

    <div
      class="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-slate-700 font-sans mb-1 editable-section"
      style="order: 3"
      @click="$emit('sectionClick', 0)"
    >
      <span v-if="resume.phone">{{ resume.phone }}</span>
      <a
        v-if="resume.email"
        :href="`mailto:${resume.email}`"
        class="text-slate-900"
        >{{ resume.email }}</a
      >
      <span v-if="resume.loc">{{ resume.loc }}</span>
      <a
        v-if="resume.linkedin"
        :href="
          resume.linkedin.startsWith('http')
            ? resume.linkedin
            : `https://${resume.linkedin}`
        "
        target="_blank"
        >{{ resume.linkedin }}</a
      >
      <a
        v-if="resume.github"
        :href="
          resume.github.startsWith('http')
            ? resume.github
            : `https://${resume.github}`
        "
        target="_blank"
        >{{ resume.github }}</a
      >
    </div>

    <hr class="border-t-2 border-slate-900 my-2" style="order: 4" />

    <div v-if="resume.summary" style="order: 5" class="editable-section" @click="$emit('sectionClick', 1)">
      <div class="section-title">Professional Summary</div>
      <div class="text-sm text-justify">{{ resume.summary }}</div>
    </div>

    <div v-if="resume.exps?.length" :style="{ order: getOrder('exp') }" class="editable-section" @click="$emit('sectionClick', 2)">
      <div class="section-title">Work Experience</div>
      <div v-for="(exp, index) in resume.exps" :key="index" class="mb-3">
        <div class="flex justify-between font-sans">
          <div class="font-bold text-base">{{ exp.title }}</div>
          <div class="text-sm text-slate-600 italic">{{ exp.date }}</div>
        </div>
        <div class="font-sans text-sm font-semibold">{{ exp.company }}</div>
        <div
          v-if="exp.loc"
          class="font-sans text-sm text-slate-600 italic mb-1"
        >
          {{ exp.loc }}
        </div>
        <ul v-if="exp.bullets?.length" class="list-disc pl-5 mt-1">
          <li
            v-for="(bullet, bIndex) in exp.bullets"
            :key="bIndex"
            class="text-sm mb-1"
          >
            {{ bullet }}
          </li>
        </ul>
      </div>
    </div>

    <div v-if="resume.skills?.length" :style="{ order: getOrder('skills') }" class="editable-section" @click="$emit('sectionClick', 3)">
      <div class="section-title">Technical Skills</div>
      <div class="grid grid-cols-2 gap-x-5 gap-y-1 text-sm">
        <div v-for="(skill, index) in resume.skills" :key="index">
          <strong class="font-sans font-semibold">{{ skill.cat }}: </strong
          >{{ skill.vals?.join(', ') }}
        </div>
      </div>
    </div>

    <div v-if="resume.achs?.length" :style="{ order: getOrder('achs') }" class="editable-section" @click="$emit('sectionClick', 5)">
      <div class="section-title">Key Achievements</div>
      <ul class="list-disc pl-5">
        <li
          v-for="(ach, index) in resume.achs"
          :key="index"
          class="text-sm mb-1"
        >
          {{ ach }}
        </li>
      </ul>
    </div>

    <div v-if="resume.edus?.length" :style="{ order: getOrder('edu') }" class="editable-section" @click="$emit('sectionClick', 4)">
      <div class="section-title">Education</div>
      <div v-for="(edu, index) in resume.edus" :key="index" class="mb-2">
        <div class="flex justify-between font-sans">
          <div class="font-bold text-base">{{ edu.degree }}</div>
          <div class="text-sm text-slate-600 italic">{{ edu.year }}</div>
        </div>
        <div class="font-sans text-sm font-semibold">
          {{ edu.school }}<span v-if="edu.loc"> — {{ edu.loc }}</span>
        </div>
        <div v-if="edu.note" class="text-xs text-slate-600">{{ edu.note }}</div>
      </div>
    </div>

    <div v-if="resume.langs?.length" :style="{ order: getOrder('langs') }" class="editable-section" @click="$emit('sectionClick', 6)">
      <div class="section-title">Languages</div>
      <div class="flex gap-8 text-sm">
        <div v-for="(lang, index) in resume.langs" :key="index">
          <strong class="font-sans font-semibold">{{ lang.lang }}:</strong>
          {{ lang.level }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["sectionClick"]);

const props = defineProps({
  resume: {
    type: Object,
    required: true,
  },
});

const getOrder = (section) => {
  const format = props.resume?.format || "Chronological";
  if (format === "Chronological") {
    // Standard: Exp -> Edu -> Skills -> Langs -> Achs
    const orders = { exp: 6, edu: 7, skills: 8, achs: 9, langs: 10 };
    return orders[section];
  } else if (format === "Functional") {
    // Focus on skills: Skills -> Achs -> Edu -> Exp -> Langs
    const orders = { skills: 6, achs: 7, edu: 8, exp: 9, langs: 10 };
    return orders[section];
  } else if (format === "Combination") {
    // Achs -> Exp -> Skills -> Edu -> Langs
    const orders = { achs: 6, exp: 7, skills: 8, edu: 9, langs: 10 };
    return orders[section];
  }
  return 10;
};
</script>

<style scoped>
.resume {
  width: 210mm;
  height: 297mm;
  padding: 15mm 18mm;
  font-family: "Georgia", serif;
  box-sizing: border-box;
  background: white;
  overflow: visible;
}
.editable-section {
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 4px;
  margin-left: -8px;
  margin-right: -8px;
  padding-left: 8px;
  padding-right: 8px;
}
.editable-section:hover {
  background-color: rgba(59, 130, 246, 0.05); /* Tailwind blue-50 opacity */
}
.section-title {
  font-family: Arial, sans-serif;
  font-size: 9.5pt;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #111;
  border-bottom: 1.5px solid #111;
  padding-bottom: 2px;
  margin: 14px 0 8px;
}
@media print {
  .resume {
    width: 210mm !important;
    height: 297mm !important;
    box-shadow: none;
    padding: 15mm 18mm !important;
    margin: 0 !important;
  }
  .editable-section:hover {
    background-color: transparent !important;
  }
}
</style>
