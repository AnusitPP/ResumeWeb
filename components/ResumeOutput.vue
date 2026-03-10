<template>
  <div
    class="resume print-area bg-white mx-auto shadow-lg text-slate-900 leading-snug flex flex-col"
  >
    <div
      class="text-center font-sans text-3xl font-bold uppercase tracking-widest"
      style="order: 1"
    >
      {{ resume.name || "Your Name" }}
    </div>
    <div
      v-if="resume.title"
      class="text-center font-sans text-base font-semibold tracking-wider uppercase mt-1 mb-2"
      style="order: 2"
    >
      {{ resume.title }}
    </div>

    <div
      class="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-slate-700 font-sans mb-1"
      style="order: 3"
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

    <div v-if="resume.summary" style="order: 5">
      <div class="section-title">Professional Summary</div>
      <div class="text-sm text-justify">{{ resume.summary }}</div>
    </div>

    <div v-if="resume.exps?.length" :style="{ order: getOrder('exp') }">
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

    <div v-if="resume.skills?.length" :style="{ order: getOrder('skills') }">
      <div class="section-title">Technical Skills</div>
      <div class="grid grid-cols-2 gap-x-5 gap-y-1 text-sm">
        <div v-for="(skill, index) in resume.skills" :key="index">
          <strong class="font-sans font-semibold">{{ skill.cat }}: </strong
          >{{ skill.vals?.join(', ') }}
        </div>
      </div>
    </div>

    <div v-if="resume.achs?.length" :style="{ order: getOrder('achs') }">
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

    <div v-if="resume.edus?.length" :style="{ order: getOrder('edu') }">
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

    <div v-if="resume.langs?.length" :style="{ order: getOrder('langs') }">
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
}
</style>
