export interface PromptTheme {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

export const PROMPT_THEMES: PromptTheme[] = [
  {
    id: 'simple',
    name: 'シンプル',
    description: '要点を絞り、簡潔でミニマルな表現を心がける',
    prompt: '要点を絞り、簡潔でミニマルな表現を心がける。余計な装飾を避け、本質的な情報のみを伝える。'
  },
  {
    id: 'business',
    name: 'ビジネス',
    description: 'フォーマルで、データや事実に基づいた説得力のある構成にする',
    prompt: 'フォーマルで、データや事実に基づいた説得力のある構成にする。専門的で信頼性の高い表現を使用する。'
  },
  {
    id: 'creative',
    name: 'クリエイティブ',
    description: '独創的なアイデアや比喩を取り入れ、聞き手の興味を引くような表現を用いる',
    prompt: '独創的なアイデアや比喩を取り入れ、聞き手の興味を引くような表現を用いる。想像力豊かで魅力的な表現を心がける。'
  },
  {
    id: 'for-kids',
    name: '子供向け',
    description: '平易な言葉と楽しい雰囲気で、子供が理解しやすいように構成する',
    prompt: '平易な言葉と楽しい雰囲気で、子供が理解しやすいように構成する。難しい用語は避け、親しみやすい表現を使用する。'
  }
];

export const DEFAULT_PROMPT_THEME = PROMPT_THEMES[0];
