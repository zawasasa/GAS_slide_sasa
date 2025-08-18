export interface ColorPalette {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'simple-default',
    name: 'シンプルデフォルト',
    description: 'Googleカラーを基調とした、読みやすくシンプルなデザイン',
    colors: {
      primary: '#4285F4',
      secondary: '#34A853',
      accent: '#EA4335',
      background: '#FFFFFF',
      text: '#333333'
    }
  },
  {
    id: 'modern-contrast',
    name: 'モダンコントラスト',
    description: '大胆でコントラストが強く、モダンな印象',
    colors: {
      primary: '#000000',
      secondary: '#FF0000',
      accent: '#FF6B6B',
      background: '#FFFFFF',
      text: '#333333'
    }
  },
  {
    id: 'warm-earth',
    name: '温かみのあるアース',
    description: '温かみがあり、秋や自然を連想させるアースカラー',
    colors: {
      primary: '#8B4513',
      secondary: '#D2691E',
      accent: '#FFA500',
      background: '#F5F5DC',
      text: '#2F2F2F'
    }
  },
  {
    id: 'elegant-mystery',
    name: 'エレガントミステリー',
    description: 'エレガントでミステリアスな、落ち着いたトーン',
    colors: {
      primary: '#2D1B3D',
      secondary: '#4A148C',
      accent: '#E1BEE7',
      background: '#F8F8FF',
      text: '#2F2F2F'
    }
  },
  {
    id: 'neutral-natural',
    name: 'ニュートラルナチュラル',
    description: '柔らかく、肌の色合いや自然な素材を思わせるニュートラルなトーン',
    colors: {
      primary: '#8B7355',
      secondary: '#CD853F',
      accent: '#D2B48C',
      background: '#F5F5DC',
      text: '#2F2F2F'
    }
  },
  {
    id: 'pop-vibrant',
    name: 'ポップビブラント',
    description: 'ポップで遊び心があり、鮮やかなコントラストが特徴',
    colors: {
      primary: '#000000',
      secondary: '#1E3A8A',
      accent: '#E6E6FA',
      background: '#00FFFF',
      text: '#000000'
    }
  },
  {
    id: 'cool-professional',
    name: 'クールプロフェッショナル',
    description: 'クールで落ち着いた、プロフェッショナルな印象',
    colors: {
      primary: '#008080',
      secondary: '#556B2F',
      accent: '#4682B4',
      background: '#E0FFFF',
      text: '#333333'
    }
  },
  {
    id: 'organic-nature',
    name: 'オーガニックネイチャー',
    description: '自然や環境を連想させる、穏やかでオーガニックなトーン',
    colors: {
      primary: '#006400',
      secondary: '#228B22',
      accent: '#9DC183',
      background: '#F5F5DC',
      text: '#2F2F2F'
    }
  },
  {
    id: 'modern-balanced',
    name: 'モダンバランス',
    description: '現代的でバランスが取れており、アクセントカラーが目を引く',
    colors: {
      primary: '#696969',
      secondary: '#008080',
      accent: '#FFA500',
      background: '#FFB6C1',
      text: '#333333'
    }
  },
  {
    id: 'primary-bold',
    name: 'プライマリボールド',
    description: '力強く、シンプルで視認性の高い印象',
    colors: {
      primary: '#1976D2',
      secondary: '#424242',
      accent: '#F44336',
      background: '#FFFFFF',
      text: '#212121'
    }
  }
];

export const DEFAULT_PALETTE = COLOR_PALETTES[0];
