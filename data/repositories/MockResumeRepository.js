import { ResumeEntity } from "~/domain/entities/ResumeEntity.js";
import { IResumeRepository } from "~/domain/repositories/IResumeRepository.js";

export class MockResumeRepository extends IResumeRepository {
  async getResumeData() {
    return new ResumeEntity({
      name: "Anusit Panpimsen",
      title: "Mobile Developer",
      phone: "+66 82-002-1492",
      email: "anusit.panpimsen@gmail.com",
      loc: "Chiang Mai, Thailand 50150",
      linkedin: "linkedin.com/in/yourname",
      github: "github.com/yourname",
      summary:
        "Results-driven Flutter Mobile Developer with hands-on experience designing and delivering scalable, cross-platform mobile applications using Clean Architecture (feature-first structure). Proficient in REST API integration, state management with Riverpod and flutter_bloc, Firebase services, and CI/CD pipelines. Proven ability to refactor legacy codebases, enforce clean layer separation, and collaborate within Agile/Scrum teams to ship production-grade, maintainable software on schedule.",
      exps: [
        {
          title: "Mobile Application Developer",
          company: "Nextate Technology Company Limited",
          loc: "Chiang Mai, Thailand",
          date: "Jan 2025 – Present",
          bullets: [
            "Architected and refactored legacy codebase into Clean Architecture (data/domain/presentation layers) with repository abstraction, improving maintainability and reducing recurring bugs.",
            "Designed a modular feature-first project structure to enable scalable development and future expansion.",
            "Mapped API response models (DTOs) to domain entities, enforcing strict clean-layer separation and improving testability.",
            "Integrated multiple third-party REST APIs into mobile applications, expanding feature sets and improving end-user experience.",
            "Prevented duplicate API calls using fine-grained state isolation with Riverpod.",
            "Collaborated with backend engineers to align API contracts and data models.",
            "Translated business requirements into scalable Flutter features within Agile sprints.",
            "Conducted thorough pre-release testing and bug triage, ensuring production-grade stability.",
            "Estimated development effort and tracked sprint progress using Scrum methodology.",
          ],
        },
      ],
      skills: [
        { cat: "Languages & Frameworks", vals: ["Flutter", "Dart"] },
        {
          cat: "Architecture",
          vals: ["Clean Architecture", "Feature-First Structure", "Repository Pattern"],
        },
        { cat: "State Management", vals: ["Riverpod", "flutter_bloc"] },
        {
          cat: "Backend & APIs",
          vals: ["REST API Integration", "DTO Mapping", "API Contract Design"],
        },
        { cat: "Firebase", vals: ["FCM", "App Distribution", "Firestore"] },
        { cat: "CI/CD & DevOps", vals: ["GitHub Actions", "Git"] },
        { cat: "Databases", vals: ["SQLite", "Firebase Firestore"] },
        { cat: "Methodologies", vals: ["Agile", "Scrum", "SDLC"] },
        { cat: "AI-Assisted Dev", vals: ["ChatGPT", "GitHub Copilot"] },
      ],
      edus: [],
      achs: [
        "Led codebase migration to Clean Architecture, significantly reducing regressions and improving developer onboarding.",
        "Eliminated duplicate API calls via Riverpod state isolation, improving performance and reducing unnecessary server load.",
        "Established consistent DTO-to-domain mapping conventions, reducing API integration bugs across multiple sprints.",
        "Set up GitHub Actions CI/CD pipelines to automate build, test, and Firebase App Distribution delivery.",
      ],
      langs: [
        { lang: "Thai", level: "Native" },
        { lang: "English", level: "Professional Working Proficiency" },
      ],
    });
  }
}
