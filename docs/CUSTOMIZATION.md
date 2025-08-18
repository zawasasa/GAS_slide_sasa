# 🎨 カスタマイズガイド

## 目次
1. [カラーパレットの詳細](#カラーパレットの詳細)
2. [プロンプトテーマの詳細](#プロンプトテーマの詳細)
3. [新しいパレットの追加](#新しいパレットの追加)
4. [新しいテーマの追加](#新しいテーマの追加)
5. [UIのカスタマイズ](#UIのカスタマイズ)
6. [スライドレイアウトの変更](#スライドレイアウトの変更)

---

## カラーパレットの詳細

### 既存のパレット分析

#### 1. シンプルデフォルト
```typescript
{
  id: 'simple-default',
  primary: '#4285F4',    // Google Blue - メインアクセント
  secondary: '#34A853',  // Google Green - セカンダリ
  accent: '#EA4335',     // Google Red - 強調色
  background: '#FFFFFF', // 白背景
  text: '#333333'        // ダークグレー文字
}
```
**適用場面**: ビジネス全般、プレゼンテーション
**特徴**: 読みやすさとプロフェッショナル感のバランス

#### 2. モダンコントラスト
```typescript
{
  id: 'modern-contrast',
  primary: '#000000',    // 純黒 - 強いコントラスト
  secondary: '#FF0000',  // 純赤 - インパクト
  accent: '#FF6B6B',     // ソフト赤 - 補助色
  background: '#FFFFFF', // 白背景
  text: '#333333'        // ダークグレー文字
}
```
**適用場面**: デザイン、アート、モダンビジネス
**特徴**: 大胆でインパクトのあるデザイン

#### 3. 温かみのあるアース
```typescript
{
  id: 'warm-earth',
  primary: '#8B4513',    // サドルブラウン
  secondary: '#D2691E',  // チョコレート
  accent: '#FFA500',     // オレンジ
  background: '#F5F5DC', // ベージュ
  text: '#2F2F2F'        // ダークグレー
}
```
**適用場面**: 自然、食品、ライフスタイル
**特徴**: 温かみがあり親しみやすい

#### 4. エレガントミステリー
```typescript
{
  id: 'elegant-mystery',
  primary: '#2D1B3D',    // ダークパープル
  secondary: '#4A148C',  // パープル
  accent: '#E1BEE7',     // ライトパープル
  background: '#F8F8FF', // ゴーストホワイト
  text: '#2F2F2F'        // ダークグレー
}
```
**適用場面**: 高級ブランド、アート、イベント
**特徴**: エレガントで神秘的

#### 5. ニュートラルナチュラル
```typescript
{
  id: 'neutral-natural',
  primary: '#8B7355',    // グレイッシュブラウン
  secondary: '#CD853F',  // ペルー
  accent: '#D2B48C',     // タン
  background: '#F5F5DC', // ベージュ
  text: '#2F2F2F'        // ダークグレー
}
```
**適用場面**: ナチュラル系、ウェルネス、ファッション
**特徴**: 落ち着いた自然な印象

#### 6. ポップビブラント
```typescript
{
  id: 'pop-vibrant',
  primary: '#000000',    // 黒
  secondary: '#1E3A8A',  // ネイビー
  accent: '#E6E6FA',     // ラベンダー
  background: '#00FFFF', // シアン
  text: '#000000'        // 黒文字（視認性重視）
}
```
**適用場面**: エンターテイメント、若者向け、イベント
**特徴**: ポップで目を引く鮮やかな配色

#### 7. クールプロフェッショナル
```typescript
{
  id: 'cool-professional',
  primary: '#008080',    // ティール
  secondary: '#556B2F',  // ダークオリーブ
  accent: '#4682B4',     // スチールブルー
  background: '#E0FFFF', // ライトシアン
  text: '#333333'        // ダークグレー
}
```
**適用場面**: IT、金融、コンサルティング
**特徴**: クールで信頼感のあるプロフェッショナル

#### 8. オーガニックネイチャー
```typescript
{
  id: 'organic-nature',
  primary: '#006400',    // ダークグリーン
  secondary: '#228B22',  // フォレストグリーン
  accent: '#9DC183',     // ライトグリーン
  background: '#F5F5DC', // ベージュ
  text: '#2F2F2F'        // ダークグレー
}
```
**適用場面**: 環境、農業、健康
**特徴**: 自然環境を意識したグリーン系

#### 9. モダンバランス
```typescript
{
  id: 'modern-balanced',
  primary: '#696969',    // ディムグレー
  secondary: '#008080',  // ティール
  accent: '#FFA500',     // オレンジ
  background: '#FFB6C1', // ライトピンク
  text: '#333333'        // ダークグレー
}
```
**適用場面**: 現代アート、スタートアップ、クリエイティブ
**特徴**: 現代的でバランスの取れた配色

#### 10. プライマリボールド
```typescript
{
  id: 'primary-bold',
  primary: '#1976D2',    // ブルー
  secondary: '#424242',  // グレー
  accent: '#F44336',     // レッド
  background: '#FFFFFF', // 白
  text: '#212121'        // ほぼ黒
}
```
**適用場面**: 企業プレゼン、報告書、フォーマル
**特徴**: 力強く視認性が高い

---

## プロンプトテーマの詳細

### 各テーマの特徴と活用法

#### 1. シンプル（Simple）
```typescript
{
  id: 'simple',
  name: 'シンプル',
  description: '要点を絞り、簡潔でミニマルな表現を心がける',
  prompt: '要点を絞り、簡潔でミニマルな表現を心がける。余計な装飾を避け、本質的な情報のみを伝える。'
}
```

**特徴**:
- 短文での要点整理
- 装飾的表現を避ける
- 読みやすさを重視
- 情報密度は控えめ

**適用場面**:
- 定期報告会
- 進捗確認
- 概要説明
- エグゼクティブサマリー

**生成される内容例**:
- 箇条書き中心
- 1スライド当たり3-5項目
- 短いフレーズ
- 具体的な数値

#### 2. ビジネス（Business）
```typescript
{
  id: 'business',
  name: 'ビジネス',
  description: 'フォーマルで、データや事実に基づいた説得力のある構成にする',
  prompt: 'フォーマルで、データや事実に基づいた説得力のある構成にする。専門的で信頼性の高い表現を使用する。'
}
```

**特徴**:
- フォーマルな敬語
- データと事実重視
- 論理的な構成
- 専門用語の適切な使用

**適用場面**:
- 企業プレゼンテーション
- 投資家向け説明
- 提案書
- 戦略会議

**生成される内容例**:
- 「課題」「解決策」「期待効果」の構成
- 数値データの活用
- 比較表やグラフ用データ
- ROI（投資収益率）などのビジネス指標

#### 3. クリエイティブ（Creative）
```typescript
{
  id: 'creative',
  name: 'クリエイティブ',
  description: '独創的なアイデアや比喩を取り入れ、聞き手の興味を引くような表現を用いる',
  prompt: '独創的なアイデアや比喩を取り入れ、聞き手の興味を引くような表現を用いる。想像力豊かで魅力的な表現を心がける。'
}
```

**特徴**:
- 比喩やメタファーの使用
- ストーリー性のある構成
- 感情に訴える表現
- 視覚的なイメージを喚起

**適用場面**:
- マーケティング企画
- 商品発表
- ブランディング
- 採用説明会

**生成される内容例**:
- 「旅路」「物語」などのメタファー
- 感情的な訴求
- 色彩豊かな表現
- 未来のビジョン描写

#### 4. 子供向け（For Kids）
```typescript
{
  id: 'for-kids',
  name: '子供向け',
  description: '平易な言葉と楽しい雰囲気で、子供が理解しやすいように構成する',
  prompt: '平易な言葉と楽しい雰囲気で、子供が理解しやすいように構成する。難しい用語は避け、親しみやすい表現を使用する。'
}
```

**特徴**:
- 平易な言葉
- 親しみやすい表現
- 楽しい雰囲気
- 理解しやすい構成

**適用場面**:
- 教育コンテンツ
- 家族向け説明
- 新人研修
- 啓発活動

**生成される内容例**:
- 「みんなで」「いっしょに」などの表現
- 身近な例えの使用
- ポジティブな表現
- 段階的な説明

---

## 新しいパレットの追加

### 1. カラーパレットファイルの編集

`constants/colorPalettes.ts`に新しいパレットを追加：

```typescript
// constants/colorPalettes.ts
export const COLOR_PALETTES: ColorPalette[] = [
  // 既存のパレット...
  
  // 新しいパレットを追加
  {
    id: 'custom-corporate',
    name: 'コーポレートブルー',
    description: '企業ブランドを意識した信頼感のあるブルー系',
    colors: {
      primary: '#2E5BBA',    // コーポレートブルー
      secondary: '#8AC4FF',  // ライトブルー
      accent: '#FF6B35',     // オレンジアクセント
      background: '#F8FAFC', // 非常に薄いグレー
      text: '#1E293B'        // ダークブルーグレー
    }
  }
];
```

### 2. GASテンプレートの更新

`constants.ts`のCOLOR_PALETTESにも同じパレットを追加：

```typescript
// constants.ts
COLOR_PALETTES: {
  // 既存のパレット...
  
  'custom-corporate': {
    primary_color: '#2E5BBA',
    secondary_color: '#8AC4FF',
    accent_color: '#FF6B35',
    background_color: '#F8FAFC',
    text_color: '#1E293B',
    card_bg: '#ffffff',
    card_border: '#E2E8F0'
  }
}
```

### 3. パレット設計のガイドライン

#### アクセシビリティの考慮
- **コントラスト比**: 文字と背景のコントラスト比4.5:1以上
- **色覚異常対応**: 赤緑色覚異常でも区別可能な配色
- **白黒印刷対応**: グレースケールでも識別可能

#### カラーハーモニー
- **補色**: 色相環で対極にある色の組み合わせ
- **類似色**: 隣接する色相での組み合わせ
- **三色配色**: 120度間隔の3色組み合わせ

#### 実用例：医療系パレット
```typescript
{
  id: 'medical-care',
  name: 'メディカルケア',
  description: '医療・ヘルスケア業界向けの清潔感のある配色',
  colors: {
    primary: '#0077BE',    // メディカルブルー
    secondary: '#00A651',  // ヘルスグリーン
    accent: '#FF6B6B',     // 緊急レッド
    background: '#FAFAFA', // 清潔な白
    text: '#2C3E50'        // 読みやすいダークグレー
  }
}
```

---

## 新しいテーマの追加

### 1. プロンプトテーマファイルの編集

`constants/promptThemes.ts`に新しいテーマを追加：

```typescript
// constants/promptThemes.ts
export const PROMPT_THEMES: PromptTheme[] = [
  // 既存のテーマ...
  
  {
    id: 'academic',
    name: 'アカデミック',
    description: '学術的で論理的、根拠に基づいた客観的な表現',
    prompt: '学術的で論理的な表現を使用し、根拠と出典を明確にする。客観的で分析的なアプローチを心がけ、仮説と結論を明確に区別する。'
  }
];
```

### 2. システムプロンプトの更新

`constants.ts`のSYSTEM_PROMPTにも新しいテーマの説明を追加：

```typescript
// constants.ts - SYSTEM_PROMPT内
* **Academic**: 学術的で論理的な表現を使用し、根拠に基づいた客観的な構成にする。仮説と結論を明確に区別する。
```

### 3. テーマ設計のガイドライン

#### 効果的なプロンプト設計
- **明確性**: 具体的で実行可能な指示
- **一貫性**: テーマ全体で統一された方向性
- **適応性**: 様々なコンテンツに適用可能

#### 実用例：営業向けテーマ
```typescript
{
  id: 'sales-focused',
  name: '営業特化',
  description: '顧客の課題解決と価値提案に重点を置いた営業向け表現',
  prompt: '顧客の課題を明確にし、具体的な解決策と価値を提示する。数値的な効果や成功事例を積極的に活用し、行動を促す表現を心がける。'
}
```

---

## UIのカスタマイズ

### 1. コンポーネントの拡張

#### ヘッダーのカスタマイズ
```typescript
// components/Header.tsx
const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600">
      {/* カスタムヘッダー内容 */}
    </header>
  );
};
```

#### 新しいコンポーネントの追加
```typescript
// components/AdvancedSettings.tsx
interface AdvancedSettingsProps {
  onTemplateChange: (template: string) => void;
  onLanguageChange: (lang: string) => void;
}

const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  onTemplateChange,
  onLanguageChange
}) => {
  return (
    <div className="bg-white rounded-lg p-6">
      {/* 高度な設定UI */}
    </div>
  );
};
```

### 2. スタイリングの変更

#### Tailwind CSS設定
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'custom-blue': '#2E5BBA',
        'custom-orange': '#FF6B35',
      },
      fontFamily: {
        'custom': ['Custom Font', 'sans-serif'],
      }
    }
  }
}
```

#### カスタムCSS
```css
/* styles/custom.css */
.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.slide-enter {
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
}
```

---

## スライドレイアウトの変更

### 1. レイアウト設定の調整

`constants.ts`のレイアウト設定をカスタマイズ：

```typescript
// constants.ts
const CONFIG = {
  POS_PX: {
    contentSlide: {
      title: { left: 25, top: 40, width: 830, height: 80 }, // タイトル位置調整
      body: { left: 25, top: 150, width: 910, height: 350 }, // 本文エリア調整
      // カスタムエリア追加
      sidebar: { left: 750, top: 150, width: 185, height: 350 }
    }
  }
};
```

### 2. 新しいスライドタイプの追加

#### プロンプトでの新しいパターン定義
```typescript
// constants.ts - SYSTEM_PROMPT内
* **quote（引用）** { type: 'quote', title: '...', quote: '...', author: '...', notes?: '...' }
* **stats（統計）** { type: 'stats', title: '...', metrics: [{ label: string, value: string, trend?: 'up'|'down'|'stable' }], notes?: '...' }
```

#### 対応する生成関数の実装
```javascript
// constants.ts - スライド生成関数
function createQuoteSlide(slide, data, layout, pageNum) {
  const colorPalette = getColorPalette(data.colorPalette);
  slide.getBackground().setSolidFill(colorPalette.background);
  
  // 引用符の大きなデザイン
  const quoteRect = layout.getRect('contentSlide.body');
  const quoteShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 
    quoteRect.left, quoteRect.top, quoteRect.width, quoteRect.height);
  
  const quoteText = `"${data.quote}"`;
  setStyledText(quoteShape, quoteText, { 
    size: 24, 
    italic: true, 
    color: colorPalette.text,
    align: SlidesApp.ParagraphAlignment.CENTER
  });
  
  // 著者名
  if (data.author) {
    const authorRect = { 
      left: quoteRect.left, 
      top: quoteRect.top + quoteRect.height - 50, 
      width: quoteRect.width, 
      height: 40 
    };
    const authorShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX,
      authorRect.left, authorRect.top, authorRect.width, authorRect.height);
    setStyledText(authorShape, `— ${data.author}`, {
      size: 16,
      color: colorPalette.secondary,
      align: SlidesApp.ParagraphAlignment.END
    });
  }
  
  drawBottomBarAndFooter(slide, layout, pageNum, colorPalette, data.customFooterText);
}

// スライドジェネレーターに追加
const slideGenerators = {
  // 既存のジェネレーター...
  quote: createQuoteSlide
};
```

### 3. 高度なレイアウトカスタマイズ

#### 複数列レイアウト
```javascript
function createThreeColumnSlide(slide, data, layout, pageNum) {
  const colorPalette = getColorPalette(data.colorPalette);
  
  const area = layout.getRect('contentSlide.body');
  const columnWidth = (area.width - 40) / 3; // 3列、間隔20px
  
  data.columns.forEach((column, index) => {
    const colRect = {
      left: area.left + index * (columnWidth + 20),
      top: area.top,
      width: columnWidth,
      height: area.height
    };
    
    const colShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX,
      colRect.left, colRect.top, colRect.width, colRect.height);
    setBulletsWithInlineStyles(colShape, column.items, colorPalette);
  });
}
```

---

## まとめ

このカスタマイズガイドを活用することで、以下が可能になります：

### ✅ できること
- 独自ブランドカラーの追加
- 業界特化テーマの作成
- レイアウトの柔軟な変更
- 新しいスライドタイプの実装
- UIコンポーネントの拡張

### 🚀 発展的な使い方
- 企業ブランドガイドラインに準拠したカスタマイゼーション
- 業界特有のテンプレート作成
- 多言語対応の拡張
- APIエンドポイントの追加

### 🤝 コミュニティ貢献
作成したカスタマイズを[GitHub](https://github.com/zawasasa/GAS_slide_sasa)でシェアして、コミュニティに貢献することを歓迎します。

---

**🎨 創造性を発揮して、あなた独自のスライド生成体験を作り上げてください！**