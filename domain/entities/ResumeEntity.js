export class ResumeEntity {
  constructor({
    name = "",
    title = "",
    phone = "",
    email = "",
    loc = "",
    linkedin = "",
    github = "",
    summary = "",
    exps = [],
    skills = [],
    edus = [],
    achs = [],
    langs = [],
    format = "Chronological",
  } = {}) {
    this.name = name;
    this.title = title;
    this.phone = phone;
    this.email = email;
    this.loc = loc;
    this.linkedin = linkedin;
    this.github = github;
    this.summary = summary;
    this.exps = exps;
    this.skills = skills;
    this.edus = edus;
    this.achs = achs;
    this.langs = langs;
    this.format = format;
  }
}
