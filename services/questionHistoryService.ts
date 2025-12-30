const HISTORY_KEY = 'ragyu_question_history';
const MAX_HISTORY_SIZE = 500;
const COOLDOWN_DAYS = 7;

interface QuestionRecord {
  hash: string;
  text: string;
  subject: string;
  exam: string;
  askedAt: number;
}

function generateHash(text: string): string {
  const normalized = text.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 100);
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

function extractKeywords(text: string): string[] {
  const stopWords = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'were', 'of', 'in', 'to', 'for', 'on', 'with', 'at', 'by', 'from', 'what', 'which', 'who', 'how', 'when', 'where', 'if', 'find', 'calculate', 'determine']);
  return text.toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3 && !stopWords.has(w));
}

export function getQuestionHistory(): QuestionRecord[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveQuestionHistory(history: QuestionRecord[]): void {
  try {
    const trimmed = history.slice(-MAX_HISTORY_SIZE);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.warn('Failed to save question history:', e);
  }
}

export function recordAskedQuestions(questions: { text: string; id: string }[], exam: string, subject: string): void {
  const history = getQuestionHistory();
  const now = Date.now();
  
  for (const q of questions) {
    const hash = generateHash(q.text);
    const existing = history.findIndex(h => h.hash === hash);
    
    if (existing >= 0) {
      history[existing].askedAt = now;
    } else {
      history.push({
        hash,
        text: q.text.slice(0, 200),
        subject,
        exam,
        askedAt: now
      });
    }
  }
  
  saveQuestionHistory(history);
}

export function getRecentQuestionContext(exam: string, subject: string, limit = 20): string {
  const history = getQuestionHistory();
  const cooldownMs = COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
  const now = Date.now();
  
  const recent = history
    .filter(h => 
      (h.exam === exam || h.subject === subject) &&
      (now - h.askedAt) < cooldownMs
    )
    .sort((a, b) => b.askedAt - a.askedAt)
    .slice(0, limit);
  
  if (recent.length === 0) return '';
  
  const keywords = new Set<string>();
  const summaries: string[] = [];
  
  for (const r of recent) {
    extractKeywords(r.text).forEach(k => keywords.add(k));
    summaries.push(r.text);
  }
  
  return `
PREVIOUSLY ASKED QUESTIONS (avoid similar questions, create variations with different numbers/scenarios):
${summaries.map((s, i) => `${i + 1}. ${s}`).join('\n')}

Avoid these topic keywords in their exact form: ${Array.from(keywords).slice(0, 30).join(', ')}
`;
}

export function clearOldHistory(): void {
  const history = getQuestionHistory();
  const cutoff = Date.now() - (30 * 24 * 60 * 60 * 1000);
  const filtered = history.filter(h => h.askedAt > cutoff);
  saveQuestionHistory(filtered);
}
