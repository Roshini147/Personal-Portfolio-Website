import {
  EducationItem,
  SkillCategory,
  InternshipItem,
  CertificateItem,
  ProjectItem,
  SocialLink,
} from '../types';

export const personalInfo = {
  name: 'ROSHINI A',
  title: 'Full-Stack Developer',
  subtitles: [
    'Full-Stack Developer',
    'Software Engineer',
    'AI & Machine Learning Enthusiast',
  ],
  tagline: 'Code with Purpose. Build with Innovation. Create the Future.',
  shortBio:
    "I'm Roshini A, a Computer Science Engineering student and Full-Stack Developer passionate about transforming ideas into reliable, high-quality digital solutions.",
  about: {
    p1: "I'm Roshini A, a Full-Stack Developer and Computer Science Engineering student at J.N.N. Institute of Engineering, passionate about transforming ideas into innovative, reliable, and high-quality digital solutions.",
    p2: "I work across frontend and backend development, leveraging technologies such as HTML, CSS, JavaScript, React.js, Node.js, Java, Python, SQL, and MongoDB to design and develop responsive websites, dynamic web applications, and efficient software solutions.",
    p3: "From understanding project requirements and designing intuitive user interfaces to developing backend functionality, integrating databases, and delivering complete applications, I focus on providing end-to-end development solutions.",
  },
  location: 'Chennai, India',
  email: 'roshini120075@gmail.com',
  phone: '+91 9363120075',
  profileImage: '/assets/profile/roshini-image.png',
  resumeFile: '/assets/resume/resume.png',
  stats: [
    { label: 'CGPA', value: '8.89 / 10' },
    { label: 'Internships', value: '5' },
    { label: 'Certifications', value: '6' },
    { label: 'Core Technologies', value: '12+' },
  ],
};

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/Roshini147',
    label: 'github.com/Roshini147',
    icon: 'Github',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/roshini-a-156324338',
    label: 'linkedin.com/in/roshini-a-156324338',
    icon: 'Linkedin',
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/u/WqnEbyLC83/',
    label: 'leetcode.com/u/WqnEbyLC83',
    icon: 'Code2',
  },
  {
    name: 'HackerRank',
    url: 'https://www.hackerrank.com/profile/roshini120075',
    label: 'hackerrank.com/profile/roshini120075',
    icon: 'Terminal',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    category: 'languages',
    skills: [
      { name: 'Java', level: 'Advanced', description: 'Core Java, OOP, Collections, Concurrency' },
      { name: 'Python', level: 'Proficient', description: 'Data processing, Machine Learning models' },
      { name: 'JavaScript (ES6+)', level: 'Advanced', description: 'Asynchronous workflows, Modern APIs' },
      { name: 'SQL', level: 'Proficient', description: 'Relational querying, Indexing, Schema design' },
    ],
  },
  {
    title: 'Frontend Development',
    category: 'frontend',
    skills: [
      { name: 'React.js', level: 'Advanced', description: 'Component architecture, State hooks, Performance' },
      { name: 'HTML5', level: 'Advanced', description: 'Semantic structure, Modern standards' },
      { name: 'CSS3 / Tailwind', level: 'Advanced', description: 'Responsive layouts, Grid, Flexbox' },
      { name: 'JavaScript', level: 'Advanced', description: 'DOM manipulation, Event-driven architecture' },
    ],
  },
  {
    title: 'Backend Development',
    category: 'backend',
    skills: [
      { name: 'Node.js', level: 'Proficient', description: 'REST APIs, Middleware, Service routes' },
      { name: 'Spring Boot', level: 'Intermediate', description: 'Enterprise backend structure, Dependency injection' },
      { name: 'Java Backend', level: 'Proficient', description: 'Business logic layers, Server integration' },
    ],
  },
  {
    title: 'Databases',
    category: 'database',
    skills: [
      { name: 'MySQL', level: 'Proficient', description: 'Relational data modeling, Transactions' },
      { name: 'MongoDB', level: 'Intermediate', description: 'Document stores, Aggregation pipelines' },
    ],
  },
  {
    title: 'Developer Tools',
    category: 'tools',
    skills: [
      { name: 'Git', level: 'Proficient', description: 'Version control, Branching, Collaboration' },
      { name: 'GitHub', level: 'Proficient', description: 'Remote repositories, Reviews, Workflows' },
      { name: 'Visual Studio Code', level: 'Advanced', description: 'Development workspace, Debugging' },
    ],
  },
  {
    title: 'Core Concepts',
    category: 'concepts',
    skills: [
      { name: 'Object-Oriented Programming', level: 'Solid', description: 'Encapsulation, Inheritance, Polymorphism' },
      { name: 'Data Structures & Algorithms', level: 'Solid', description: 'Efficiency, Linear and Non-linear structures' },
      { name: 'Problem Solving', level: 'Active', description: 'Algorithmic optimization, Clean implementation' },
    ],
  },
  {
    title: 'Professional Skills',
    category: 'soft',
    skills: [
      { name: 'Communication', level: 'High', description: 'Clear technical documentation and teamwork' },
      { name: 'Teamwork', level: 'High', description: 'Cross-functional engineering collaboration' },
      { name: 'Analytical Thinking', level: 'High', description: 'Systematic debugging and problem breakdown' },
      { name: 'Adaptability', level: 'High', description: 'Fast adoption of modern tools and stacks' },
    ],
  },
];

export const educationHistory: EducationItem[] = [
  {
    degree: 'Bachelor of Engineering — Computer Science Engineering',
    institution: 'J.N.N. Institute of Engineering, Thiruvallur',
    location: 'Thiruvallur, Tamil Nadu',
    period: '2024 – 2028',
    score: '8.89 / 10',
    scoreLabel: 'CGPA (up to IV Semester)',
    highlights: [
      'Strong academic performance in core Computer Science subjects.',
      'Active focus on Full-Stack engineering, Algorithms, and Machine Learning.',
    ],
  },
  {
    degree: 'Higher Secondary — Class XII',
    institution: 'Dhanish Matric Higher Secondary School, Chennai',
    location: 'Chennai, Tamil Nadu',
    period: '2024',
    score: '81.6%',
    scoreLabel: 'Score',
    highlights: [
      'Mathematics, Physics, Chemistry, and Computer Science stream.',
    ],
  },
  {
    degree: 'Secondary School — Class X',
    institution: 'Dhanish Matric Higher Secondary School, Chennai',
    location: 'Chennai, Tamil Nadu',
    period: '2022',
    score: '81.2%',
    scoreLabel: 'Score',
    highlights: [
      'Foundational studies in Science, Mathematics, and Languages.',
    ],
  },
];

export const internshipExperiences: InternshipItem[] = [
  {
    id: 'levelshift',
    company: 'LevelShift',
    role: 'Java Full Stack Developer Intern',
    location: 'Chengalpattu',
    mode: 'On-site',
    displayPeriod: 'July 2026 – August 2026',
    resumePeriod: 'Jul 2026 – Aug 2026',
    hasDiscrepancy: false,
    responsibilities: [
      'Assisted in Java-based software development and testing.',
      'Worked with Java, SQL, and web technologies.',
      'Collaborated with the development team on assigned tasks.',
    ],
    technologies: ['Java', 'SQL', 'Web Technologies', 'Testing'],
    offerLetter: {
      title: 'LevelShift Offer Letter',
      type: 'offer_letter',
      filePath: '',
      isAvailable: false,
    },
    completionCertificate: {
      title: 'LevelShift Completion Certificate',
      type: 'completion_certificate',
      filePath: '/assets/internships/levelshift/completion-certificate/levelshift.png',
      isAvailable: true,
      date: '31 August 2026',
      issuer: 'LevelShift (PreludeSys India)',
      signatory: 'Prasad Reddy (AVP - HR & IT)',
    },
  },
  {
    id: 'staxtech',
    company: 'StaxTech',
    role: 'Full-Stack Developer Intern',
    location: 'Remote',
    mode: 'Virtual',
    displayPeriod: 'July 2025 – August 2025',
    resumePeriod: 'July 2025 – August 2025',
    hasDiscrepancy: false,
    responsibilities: [
      'Developed web applications with frontend and backend integration.',
      'Worked with APIs and databases.',
      'Contributed to application functionality and usability.',
    ],
    technologies: ['Full-Stack', 'APIs', 'Databases', 'JavaScript'],
    offerLetter: {
      title: 'StaxTech Offer Letter',
      type: 'offer_letter',
      filePath: '',
      isAvailable: false,
    },
    completionCertificate: {
      title: 'StaxTech Certificate of Internship',
      type: 'completion_certificate',
      filePath: '/assets/internships/staxtech/completion-certificate/staxtech.jpg',
      isAvailable: true,
      date: 'August 1, 2025',
      idOrRef: 'STAXP589',
      issuer: 'StaxTech',
      signatory: 'Pawan Kushwaha (Founder & CEO)',
    },
  },
  {
    id: 'cognifyz',
    company: 'Cognifyz Technologies',
    role: 'Software Development Intern',
    location: 'Remote',
    mode: 'Virtual',
    displayPeriod: 'December 2025 – January 2026',
    resumePeriod: 'Dec 2025 – Jan 2026',
    hasDiscrepancy: false,
    responsibilities: [
      'Contributed to software development and debugging.',
      'Applied programming concepts to solve technical problems.',
      'Followed basic SDLC practices.',
    ],
    technologies: ['Software Development', 'Debugging', 'SDLC', 'Problem Solving'],
    offerLetter: {
      title: 'Cognifyz Technologies Offer Letter',
      type: 'offer_letter',
      filePath: '/assets/internships/cognifyz/offer-letter/cognifyz.jpg',
      isAvailable: true,
    },
    completionCertificate: {
      title: 'Cognifyz Technologies Completion Certificate',
      type: 'completion_certificate',
      filePath: '/assets/internships/cognifyz/completion-certificate/cognifyz.jpeg',
      isAvailable: true,
      date: '18/01/2026',
      idOrRef: 'CTI/A1/C271808',
      issuer: 'Cognifyz Technologies',
      signatory: 'Sahil Lambat',
    },
  },
  {
    id: 'codsoft',
    company: 'CodSoft',
    role: 'Web Development Intern',
    location: 'Remote',
    mode: 'Virtual',
    displayPeriod: 'July 2025',
    resumePeriod: 'Jul 2025 – Aug 2025',
    hasDiscrepancy: false,
    responsibilities: [
      'Developed responsive websites using HTML, CSS, and JavaScript.',
      'Implemented interactive web components.',
      'Improved website responsiveness and user experience.',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    offerLetter: {
      title: 'CodSoft Offer Letter',
      type: 'offer_letter',
      filePath: '',
      isAvailable: false,
    },
    completionCertificate: {
      title: 'CodSoft Certificate of Completion',
      type: 'completion_certificate',
      filePath: '/assets/internships/codsoft/completion-certificate/codsoft.jpg',
      isAvailable: true,
      date: '03/08/2025',
      idOrRef: 'ab57ad4',
      issuer: 'CodSoft',
    },
  },
  {
    id: 'edufyi',
    company: 'Elythra Edufyi Tech Solutions',
    role: 'Artificial Intelligence and Data Science Intern',
    location: 'Remote',
    mode: 'Virtual',
    displayPeriod: 'April 2026 – June 2026',
    resumePeriod: 'Apr 2026 – Jun 2026',
    hasDiscrepancy: false,
    responsibilities: [
      'Developed and implemented AI/ML models using Python and machine learning techniques.',
      'Performed data preprocessing, exploratory data analysis, and visualization.',
      'Worked on practical AI and Data Science projects.',
      'Applied model training, evaluation, and performance optimization techniques.',
    ],
    technologies: ['Python', 'Machine Learning', 'Data Preprocessing', 'Model Evaluation'],
    offerLetter: {
      title: 'Edufyi Offer Letter',
      type: 'offer_letter',
      filePath: '',
      isAvailable: false,
    },
    completionCertificate: {
      title: 'Edufyi Completion Certificate',
      type: 'completion_certificate',
      filePath: '/assets/internships/edufyi/completion-certificate/edufyi.jpg',
      isAvailable: true,
      date: '01/06/2026',
      issuer: 'Edufyi Tech Solutions',
      signatory: 'Jagadish (Founder & CEO)',
    },
  },
];

export const certifications: CertificateItem[] = [
  {
    id: 'infosys-ai',
    title: 'Artificial Intelligence',
    issuer: 'Infosys Springboard',
    issueDate: 'June 11, 2025',
    verificationUrl: 'https://verify.onwingspan.com',
    imagePath: '/assets/certificates/infosys/infosys.jpg',
    isAvailable: true,
    skills: ['Artificial Intelligence', 'Machine Learning', 'Neural Networks'],
    summary:
      'Course completion accredited by Infosys Springboard under Education, Training & Assessment (ETA).',
  },
  {
    id: 'microsoft-genai',
    title: 'Career Essentials in Generative AI',
    issuer: 'Microsoft & LinkedIn Learning',
    issueDate: 'June 13, 2025',
    credentialId: 'e9c39cefbce9fdcb7e65aa5418c89b458c5d7e6a677a9263ebb4632de8d152ee',
    imagePath: '/assets/certificates/microsoft/microsoft.jpg',
    isAvailable: true,
    skills: ['Generative AI', 'Microsoft Copilot', 'Responsible AI'],
    summary:
      'Professional learning path covering foundational Generative AI principles and responsible AI frameworks.',
  },
  {
    id: 'hp-datascience',
    title: 'Data Science & Analytics',
    issuer: 'HP LIFE',
    issueDate: 'June 16, 2025',
    credentialId: 'a5b73aff-304d-4678-ae09-4a324a302ba0',
    imagePath: '/assets/certificates/hp/HP.jpg',
    isAvailable: true,
    skills: ['Data Science', 'Data Analytics', 'Business Intelligence'],
    summary:
      'Course completion on data science practices, methodologies, and data-driven decision making.',
  },
  {
    id: 'google-cloud-imagegen',
    title: 'Introduction to Image Generation',
    issuer: 'Google Cloud & Simplilearn',
    issueDate: 'June 17, 2025',
    credentialId: '8476646',
    imagePath: '/assets/certificates/google-cloud/google-cloud.jpg',
    isAvailable: true,
    skills: ['Image Generation', 'Diffusion Models', 'Generative AI'],
    summary:
      'Google Cloud course on the fundamentals of visual AI generation and diffusion architectures.',
  },
  {
    id: 'accenture-software-eng',
    title: 'Software Engineering Job Simulation',
    issuer: 'Accenture & Forage',
    issueDate: 'June 18, 2025',
    credentialId: 'KLq47d9WnehqAo3kZ',
    verificationUrl: 'https://www.theforage.com',
    imagePath: '/assets/certificates/accenture/accenture.png',
    isAvailable: true,
    skills: ['System Architecture', 'Security', 'Programming', 'Testing', 'Agile'],
    summary:
      'Practical software engineering simulation covering architecture, security, programming, and testing.',
  },
  {
    id: 'ibm-webdev',
    title: 'Web Development Fundamentals',
    issuer: 'IBM SkillsBuild',
    issueDate: 'June 26, 2025',
    verificationUrl: 'https://www.credly.com/badges/74f4d8f7-8a80-4bee-a712-b3a25c908ef9',
    imagePath: '/assets/certificates/ibm/IBM.jpg',
    isAvailable: true,
    skills: ['Web Architecture', 'HTML5 & CSS3', 'JavaScript'],
    summary:
      'Verified digital credential covering the core concepts and standards of modern web development.',
  },
];

export const projects: ProjectItem[] = [
  {
    id: 'hazardiq',
    title: 'HAZARDIQ',
    category: 'AI & GIS Disaster Response',
    badge: 'Working Prototype',
    status: 'Working Prototype',
    featured: true,
    description:
      'An AI-powered, GIS-based disaster decision-support platform that helps government authorities identify high-risk areas, assess community vulnerability, evaluate shelter availability, and prioritize disaster response.',
    bulletPoints: [
      'Developed a working prototype of an AI-powered, GIS-based disaster decision-support platform.',
      'Helps government authorities identify high-risk areas, assess community vulnerability, evaluate shelter availability, and prioritize disaster response.',
      'Integrates geographical information, weather data, population vulnerability indicators, and verified field reports.',
    ],
    technologies: ['React.js', 'Python', 'Machine Learning', 'GIS', 'REST APIs', 'Tailwind CSS'],
  },
  {
    id: 'fullstack-dev-suite',
    title: 'DevPortal Web Application',
    category: 'Full-Stack Development',
    badge: 'Completed',
    status: 'Completed',
    featured: false,
    description:
      'A responsive web application with structured frontend components, secure user authentication, and relational database integration.',
    bulletPoints: [
      'Built with React and Tailwind CSS for responsive and fast client-side performance.',
      'Implemented backend API endpoints in Node.js and Java with MySQL database persistence.',
      'Designed clean user interfaces following modern design and accessibility standards.',
    ],
    technologies: ['React.js', 'Node.js', 'Java', 'MySQL', 'Tailwind CSS'],
  },
  {
    id: 'ai-vision-studio',
    title: 'Machine Learning Exploration Lab',
    category: 'AI & Machine Learning',
    badge: 'In Progress',
    status: 'In Progress',
    featured: false,
    description:
      'A machine learning project testing data preprocessing, model evaluation techniques, and generative AI concepts using Python.',
    bulletPoints: [
      'Applied data preprocessing and exploratory data analysis using Python libraries.',
      'Explored model training workflows and image generation concepts.',
      'Created interactive demonstrations to test and visualize model outputs.',
    ],
    technologies: ['Python', 'Machine Learning', 'Generative AI', 'React.js'],
  },
];
