
import { ExamCategory, SyllabusTopic } from './types';

export const EXAM_CATEGORIES: ExamCategory[] = [
  {
    id: 'railway',
    name: 'Railway Exams',
    exams: ['RRB NTPC', 'RRB Group D', 'RRB JE', 'RRB ALP', 'RPF', 'RRB MI', 'RRB Paramedical']
  },
  {
    id: 'bank',
    name: 'Bank Exams',
    exams: ['IBPS PO', 'IBPS Clerk', 'SBI PO', 'SBI Clerk', 'RBI Grade B', 'RBI Assistant', 'NABARD', 'SIDBI', 'IDBI']
  },
  {
    id: 'ssc',
    name: 'SSC Exams',
    exams: ['SSC CGL', 'SSC CHSL', 'SSC MTS', 'SSC GD', 'SSC CPO', 'SSC Stenographer', 'SSC JE']
  },
  {
    id: 'upsc',
    name: 'UPSC/State PSC',
    exams: ['UPSC Prelims', 'UPSC Mains', 'State PSC', 'CAPF', 'CDS', 'NDA']
  },
  {
    id: 'insurance',
    name: 'Insurance Exams',
    exams: ['LIC AAO', 'LIC ADO', 'NIACL AO', 'UIIC AO', 'GIC', 'NICL']
  }
];

export const SYLLABUS: SyllabusTopic[] = [
  {
    id: 'gs',
    name: 'General Studies',
    subtopics: ['Current Affairs (National)', 'Current Affairs (International)', 'Indian History (Ancient)', 'Indian History (Medieval)', 'Indian History (Modern)', 'World History', 'Indian Geography', 'World Geography', 'Physical Geography', 'Indian Polity', 'Constitution of India', 'Governance & Public Policy', 'Indian Economy', 'Banking & Finance', 'Budget & Economic Survey', 'General Science', 'Physics', 'Chemistry', 'Biology', 'Environment & Ecology', 'Science & Technology', 'Awards & Honours', 'Books & Authors', 'Sports', 'Important Dates & Days']
  },
  {
    id: 'quant',
    name: 'Quantitative Aptitude',
    subtopics: ['Number System', 'HCF & LCM', 'Simplification', 'Percentage', 'Profit & Loss', 'Discount', 'Simple Interest', 'Compound Interest', 'Ratio & Proportion', 'Partnership', 'Average', 'Mixture & Alligation', 'Time & Work', 'Pipes & Cisterns', 'Time Speed & Distance', 'Trains', 'Boats & Streams', 'Age Problems', 'Algebra', 'Linear Equations', 'Quadratic Equations', 'Geometry', 'Triangles', 'Circles', 'Coordinate Geometry', 'Mensuration (2D)', 'Mensuration (3D)', 'Trigonometry', 'Heights & Distances', 'Data Interpretation (Tables)', 'Data Interpretation (Bar Graphs)', 'Data Interpretation (Pie Charts)', 'Data Interpretation (Line Graphs)', 'Data Sufficiency', 'Permutation & Combination', 'Probability', 'Surds & Indices', 'Logarithms']
  },
  {
    id: 'english',
    name: 'English Language',
    subtopics: ['Reading Comprehension', 'Cloze Test', 'Fill in the Blanks', 'Error Spotting', 'Sentence Correction', 'Sentence Improvement', 'Para Jumbles', 'Sentence Rearrangement', 'Vocabulary (Synonyms)', 'Vocabulary (Antonyms)', 'Idioms & Phrases', 'One Word Substitution', 'Spelling Errors', 'Direct & Indirect Speech', 'Active & Passive Voice', 'Spotting Errors', 'Phrase Replacement', 'Column Matching', 'Double Fillers', 'Word Usage']
  },
  {
    id: 'reasoning',
    name: 'Reasoning Ability',
    subtopics: ['Seating Arrangement (Linear)', 'Seating Arrangement (Circular)', 'Seating Arrangement (Complex)', 'Puzzles (Floor Based)', 'Puzzles (Box Based)', 'Puzzles (Scheduling)', 'Puzzles (Comparison)', 'Syllogism', 'Coding-Decoding', 'Blood Relations', 'Direction Sense', 'Order & Ranking', 'Alphabet Series', 'Number Series', 'Alphanumeric Series', 'Input-Output', 'Inequalities', 'Data Sufficiency', 'Machine Input', 'Statement & Assumptions', 'Statement & Arguments', 'Statement & Conclusions', 'Cause & Effect', 'Course of Action', 'Critical Reasoning', 'Logical Reasoning']
  },
  {
    id: 'computer',
    name: 'Computer Knowledge',
    subtopics: ['Computer Fundamentals', 'History of Computers', 'Hardware', 'Software', 'Operating Systems', 'MS Office (Word)', 'MS Office (Excel)', 'MS Office (PowerPoint)', 'Internet & Networking', 'Computer Memory', 'Input/Output Devices', 'Database Management', 'Computer Security', 'Cyber Security', 'Computer Abbreviations', 'Programming Basics', 'Number Systems (Binary/Octal/Hex)', 'Computer Languages']
  },
  {
    id: 'banking',
    name: 'Banking & Financial Awareness',
    subtopics: ['Banking History in India', 'RBI Functions & Policies', 'Types of Banks', 'Banking Terms', 'Monetary Policy', 'Fiscal Policy', 'Financial Institutions', 'Stock Market Basics', 'Insurance Basics', 'Mutual Funds', 'Government Schemes', 'Financial Inclusion', 'Digital Banking', 'Payment Systems (UPI, NEFT, RTGS)', 'Basel Norms', 'NPAs & Asset Quality', 'Priority Sector Lending', 'Foreign Exchange', 'Banking Reforms', 'Recent Banking News']
  },
  {
    id: 'hindi',
    name: 'Hindi Language',
    subtopics: ['समास', 'संधि', 'उपसर्ग-प्रत्यय', 'विलोम शब्द', 'पर्यायवाची शब्द', 'मुहावरे', 'लोकोक्तियाँ', 'वाक्य शुद्धि', 'रिक्त स्थान पूर्ति', 'अनेक शब्दों के लिए एक शब्द', 'वर्तनी शुद्धि', 'अपठित गद्यांश', 'पत्र लेखन', 'निबंध', 'व्याकरण', 'शब्द भंडार', 'वाक्य रचना', 'अलंकार', 'छंद', 'रस']
  },
  {
    id: 'static',
    name: 'Static GK',
    subtopics: ['Indian States & Capitals', 'Countries & Capitals', 'Rivers of India', 'Mountains & Peaks', 'National Parks & Sanctuaries', 'Dams & Power Plants', 'First in India/World', 'Inventions & Discoveries', 'Important Organisations', 'Headquarters of Organizations', 'Classical Dances', 'Folk Dances', 'National Symbols', 'Important Boundaries', 'Currencies of Countries', 'Parliament of Countries', 'Lakes of India', 'Ports of India', 'Airports of India', 'UNESCO World Heritage Sites']
  }
];

export const LIBRA_SYSTEM_PROMPT = `You are Libra, the specialized AI assistant for RAGYU, an Indian government job preparation platform. 
Your goal is to help students with Railway and Bank exams.

SPECIAL FORMATTING RULES:
1. Use **bold** for key concepts.
2. Use *italics* for emphasis.
3. Use <u>underlined</u> for critical warnings.
4. Use Color-coded text:
   - Blue: For questions and helpful prompts. Wrap in [BLUE]...[/BLUE].
   - Green: For correct answers and positive reinforcement. Wrap in [GREEN]...[/GREEN].
   - Red: For warnings and incorrect info. Wrap in [RED]...[/RED].
   - Orange: For tips and shortcuts. Wrap in [ORANGE]...[/ORANGE].
5. Use LaTeX for math: $inline$ and $$display$$.
6. Use tables for comparisons.
7. Provide step-by-step explanations for quantitative problems.
8. Be professional, encouraging, and mentor-like.`;
