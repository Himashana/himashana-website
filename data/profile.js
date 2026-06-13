// =============================================================================
// profile.js — SINGLE SOURCE OF TRUTH for the whole site.
//
// Edit ONLY this file to update your bio, contact details, social links,
// skills, or education. The hero, every section, the footer, and the
// interactive terminal all read from this object — change it here once and
// the entire site (and terminal commands) update automatically.
//
// Fields marked "VERIFY" were merged from previously inconsistent copies —
// double-check they're correct.
// =============================================================================

export const profile = {
  // --- Who you are (hero + footer + terminal `whoami`) --------------------
  identity: {
    fullName: "Kavindu Himashana Suraweera",
    shortName: "Himashana", // navbar brand
    title: "Associate Software Engineer",
    greeting: "Hi there, I'm",
    photo: "assets/images/me.jpg",
  },

  // --- Contact details (about-me + contact section + terminal `contact`) --
  contact: {
    email: "contact@himashana.me",
    phone: "+94 70 151 7713", // VERIFY: canonical (old copies disagreed)
    phoneHref: "+94701517713", // tel: link target — digits only, with country code
    location: "Gonulla, Gonawila, NWP, Sri Lanka", // VERIFY
    locationShort: "Sri Lanka", // used where a short label fits
  },

  // --- Social links (hero icons + terminal `social`) ----------------------
  // VERIFY each URL. `icon` uses Font Awesome classes already loaded in the page.
  social: [
    {
      name: "LinkedIn",
      icon: "fab fa-linkedin",
      url: "https://linkedin.com/in/himashana",
    },
    {
      name: "GitHub",
      icon: "fab fa-github",
      url: "https://github.com/himashana",
    },
    {
      name: "Twitter",
      icon: "fab fa-twitter",
      url: "https://twitter.com/himashana",
    },
    {
      name: "Instagram",
      icon: "fab fa-instagram",
      url: "https://instagram.com/himashana",
    },
  ],

  // --- About / bio (about-me section + terminal `about`) ------------------
  bio: {
    heading: "Software Engineer & Developer",
    // Each string becomes its own paragraph. Plain text only.
    paragraphs: [
      "I am a passionate Associate Software Engineer with strong foundations in both frontend and backend programming. Experienced in software, web and mobile applications and 3D game development, I thrive on solving complex problems and creating efficient, scalable solutions.",
      "My journey combines academic excellence from University of West London and Edith Cowan University with hands-on experience in modern technology stacks. I'm driven by curiosity and committed to continuous learning in the evolving tech landscape.",
    ],
    // Shown in the terminal `about` command.
    specializations: [
      "Software Development",
      "Web & Mobile Applications",
      "3D Game Development",
      "Full Stack Development",
    ],
  },

  // --- Skills (skills section cards + terminal `skills`) ------------------
  // Each category renders one card. `color` is a Bootstrap/utility text color
  // class used to tint the icon. For each item, `level` (0-100) drives the
  // progress bar; set `soft: true` for soft skills (bar shown, no % label).
  skills: [
    {
      title: "Programming Languages",
      icon: "fas fa-code",
      color: "text-primary",
      items: [
        { name: "Python, C++, HTML, CSS, JavaScript, PHP", level: 95 },
        { name: "Java, Kotlin", level: 70 },
      ],
    },
    {
      title: "Web Development",
      icon: "fas fa-globe",
      color: "text-success",
      items: [
        { name: "React, Angular, Next.js", level: 86 },
        { name: "WordPress", level: 95 },
      ],
    },
    {
      title: "Mobile Development",
      icon: "fas fa-mobile-alt",
      color: "text-info",
      items: [{ name: "React Native", level: 88 }],
    },
    {
      title: "OOP & Databases",
      icon: "fas fa-layer-group",
      color: "text-warning",
      items: [
        { name: "Object-oriented Programming", level: 92 },
        { name: "SQL, NoSQL & Database Concepts", level: 90 },
      ],
    },
    {
      title: "Game Development",
      icon: "fas fa-gamepad",
      color: "text-danger",
      items: [{ name: "Unity, C#", level: 92 }],
    },
    {
      title: "Soft Skills",
      icon: "fas fa-heart",
      color: "text-pink",
      items: [
        { name: "Team Leadership", level: 90, soft: true },
        { name: "Interpersonal Communication", level: 92, soft: true },
        { name: "Problem Solving", level: 95, soft: true },
      ],
    },
  ],

  // --- Education timeline (education section + terminal `education`) -------
  // Listed top-to-bottom as written here (newest first looks best).
  education: [
    {
      date: "2025 - 2026",
      title: "MSc in Software Engineering",
      institution: "University of West London",
    },
    {
      date: "2021 - 2024",
      title: "BSc in Computer Science",
      institution: "Edith Cowan University",
    },
    {
      date: "2020 - 2021",
      title: "Foundation",
      institution: "Australian College of Business & Technology",
    },
  ],

  // --- Resume (terminal `resume` + any download button) -------------------
  // Leave "" until you have a hosted resume; the terminal shows a friendly
  // "coming soon" message while empty.
  resumeUrl: "",
};
