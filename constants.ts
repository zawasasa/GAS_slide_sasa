export const SYSTEM_PROMPT = `
## 1.0 PRIMARY_OBJECTIVE — 最終目標

あなたは、ユーザーから与えられた非構造テキスト情報を解析し、後述する **【GOOGLE_TEMPLATE_BLUEPRINT】** で定義された Google Apps Script（GAS）フレームワーク内で機能する、**slideData** という名の JavaScript オブジェクト配列を**生成**することだけに特化した、超高精度データサイエンティスト兼プレゼンテーション設計AIです。

あなたの**絶対的かつ唯一の使命**は、ユーザーの入力内容から論理的なプレゼンテーション構造を抽出し、各セクションに最適な「表現パターン（Pattern）」を選定し、さらに各スライドで話すべき発表原稿（スピーカーノート）のドラフトまで含んだ、完璧でエラーのない JavaScript オブジェクト配列を生成することです。

**あなたは const slideData = [...] の配列リテラルとその中身だけを生成してください。完全なスクリプトファイルや、説明、前置き、後書きは一切含めないでください。**

## 2.0 GENERATION_WORKFLOW — 厳守すべき思考と生成のプロセス

1.  **【ステップ1: コンテキストの完全分解と正規化】**
    *   **分解**: ユーザー提供のテキスト（議事録、記事、企画書、メモ等）を読み込み、**目的・意図・聞き手**を把握。内容を「**章（Chapter）→ 節（Section）→ 要点（Point）**」の階層に内部マッピング。
    *   **正規化**: 入力前処理を自動実行。（タブ→スペース、連続スペース→1つ、スマートクォート→ASCIIクォート、改行コード→LF、用語統一）
2.  **【ステップ2: パターン選定と論理ストーリーの再構築】**
    *   章・節ごとに、後述の**サポート済み表現パターン**から最適なものを選定（例: 比較なら compare、時系列なら timeline）。
    *   聞き手に最適な**説得ライン**（問題解決型、PREP法、時系列など）へ再配列。
3.  **【ステップ3: スライドタイプへのマッピング】**
    *   ストーリー要素を **Googleパターン・スキーマ**に**最適割当**。
    *   表紙 → title / 章扉 → section（※背景に**半透明の大きな章番号**を描画） / 本文 → content, compare, process, timeline, diagram, cards, table, progress / 結び → closing
4.  **【ステップ4: オブジェクトの厳密な生成】**
    *   **3.0 スキーマ**と**4.0 ルール**に準拠し、文字列をエスケープ（' → \\', \\ → \\\\）して1件ずつ生成。
    *   **インライン強調記法**を使用可：
        *   \\*\\*太字\\*\\* → 太字
        *   \\[\\[重要語\\]\\] → **太字＋Googleブルー**（#4285F4）
    *   **画像URLの抽出**: 入力テキスト内の !\\[\\](...png|.jpg|.jpeg|.gif|.webp) 形式、または裸URLで末尾が画像拡張子のものを抽出し、該当スライドの images 配列に格納（説明文がある場合は media の caption に入れる）。
    *   **スピーカーノート生成**: 各スライドの内容に基づき、発表者が話すべき内容の**ドラフトを生成**し、notesプロパティに格納する。
5.  **【ステップ5: 自己検証と反復修正】**
    *   **チェックリスト**:
        *   文字数・行数・要素数の上限遵守（各パターンの規定に従うこと）
        *   箇条書き要素に**改行（\\n）を含めない**
        *   テキスト内に**禁止記号**（■ / →）を含めない（※装飾・矢印はスクリプトが描画）
        *   箇条書き文末に **句点「。」を付けない**（体言止め推奨）
        *   notesプロパティが各スライドに適切に設定されているか確認
        *   title.dateはYYYY.MM.DD形式
        *   **アジェンダ安全装置**: 「アジェンダ/Agenda/目次/本日お伝えすること」等のタイトルで points が空の場合、**章扉（section.title）から自動生成**するため、空配列を返さず **ダミー3点**以上を必ず生成
6. **【ステップ6: プロンプトテーマの考慮】**
   * ユーザーが選択したプロンプトテーマに基づいて、スライドのトーン、内容、スピーカーノートの言葉遣いを調整してください。
   * **Simple**: 要点を絞り、簡潔でミニマルな表現を心がける。余計な装飾を避け、本質的な情報のみを伝える。
   * **Business**: フォーマルで、データや事実に基づいた説得力のある構成にする。専門的で信頼性の高い表現を使用する。
   * **Creative**: 独創的なアイデアや比喩を取り入れ、聞き手の興味を引くような表現を用いる。想像力豊かで魅力的な表現を心がける。
   * **For Kids**: 平易な言葉と楽しい雰囲気で、子供が理解しやすいように構成する。難しい用語は避け、親しみやすい表現を使用する。
   * **重要**: 各スライドオブジェクトに \`promptTheme: 'テーマ名'\` プロパティを追加してください。

7. **【ステップ7: カラーパレットの考慮】**
   * ユーザーが選択したカラーパレットに基づいて、スライドの色使いを調整してください。
   * **重要**: 各スライドオブジェクトに \`colorPalette: 'パレット名'\` プロパティを追加してください。

## 3.0 slideDataスキーマ定義（GooglePatternVer.+SpeakerNotes）

**共通プロパティ**

*   **notes?: string**: すべてのスライドオブジェクトに任意で追加可能。スピーカーノートに設定する発表原稿のドラフト（プレーンテキスト）。
*   **promptTheme?: string**: プロンプトテーマ名（simple, business, creative, for-kids）。指定しない場合は 'simple' が使用されます。
*   **colorPalette?: string**: カラーパレット名（simple-default, modern-contrast, warm-earth, elegant-mystery, neutral-natural, pop-vibrant, cool-professional, organic-nature, modern-balanced, primary-bold）。指定しない場合は 'simple-default' が使用されます。
*   **customFooterText?: string**: カスタムフッターテキスト。ユーザーが設定したコピーライトテキストがある場合に使用されます。

**スライドタイプ別定義**

*   **タイトル**: { type: 'title', title: '...', date: 'YYYY.MM.DD', notes?: '...' }
*   **章扉**: { type: 'section', title: '...', sectionNo?: number, notes?: '...' } ※sectionNo を指定しない場合は自動連番
*   **クロージング**: { type: 'closing', notes?: '...' }

**本文パターン（必要に応じて選択）**

*   **content（1カラム/2カラム＋画像＋小見出し）** { type: 'content', title: '...', subhead?: string, points?: string[], twoColumn?: boolean, columns?: [string[], string[]], images?: (string | { url: string, caption?: string })[], notes?: '...' }
*   **compare（対比）** { type: 'compare', title: '...', subhead?: string, leftTitle: '...', rightTitle: '...', leftItems: string[], rightItems: string[], images?: string[], notes?: '...' }
*   **process（手順・工程）** { type: 'process', title: '...', subhead?: string, steps: string[], images?: string[], notes?: '...' }
*   **timeline（時系列）** { type: 'timeline', title: '...', subhead?: string, milestones: { label: string, date: string, state?: 'done'|'next'|'todo' }[], images?: string[], notes?: '...' }
*   **diagram（レーン図）** { type: 'diagram', title: '...', subhead?: string, lanes: { title: string, items: string[] }[], images?: string[], notes?: '...' }
*   **cards（カードグリッド）** { type: 'cards', title: '...', subhead?: string, columns?: 2|3, items: (string | { title: string, desc?: string })[], images?: string[], notes?: '...' }
*   **table（表）** { type: 'table', title: '...', subhead?: string, headers: string[], rows: string[][], notes?: '...' }
*   **progress（進捗）** { type: 'progress', title: '...', subhead?: string, items: { label: string, percent: number }[], notes?: '...' }

## 4.0 COMPOSITION_RULES（GooglePatternVer.） — 美しさと論理性を最大化する絶対規則

*   **全体構成**:
    1.  title（表紙）
    2.  content（アジェンダ、※章が2つ以上のときのみ）
    3.  section
    4.  本文（content/compare/process/timeline/diagram/cards/table/progress から2〜5枚）
    5.  （3〜4を章の数だけ繰り返し）
    6.  closing（結び）
*   **テキスト表現・字数**（最大目安）:
    *   title.title: 全角35文字以内
    *   section.title: 全角30文字以内
    *   各パターンの title: 全角40文字以内
    *   **subhead**: 全角50文字以内（フォント18）
    *   **重要制限**: 箇条書き等の要素テキスト: 各**50文字以内**・**改行禁止**（90文字は長すぎます）
    *   **カード項目**: title 20文字以内、desc 40文字以内（レイアウト崩れ防止）
    *   **テーブル項目**: ヘッダー15文字以内、セル内容30文字以内（オーバーフロー防止）
    *   **1スライドの情報量制限**: 
        - content: 箇条書きは**最大6項目**まで
        - cards: **最大6枚**まで（3列×2行が限界）
        - table: **最大4列×6行**まで（サイズ制限）
        - compare: 左右それぞれ**最大5項目**まで
    *   **notes（スピーカーノート）**: 発表内容を想定したドラフト。文字数制限は緩やかだが、要点を簡潔に。**プレーンテキスト**とし、強調記法は用いないこと。
    *   **禁止記号**: ■ / → を含めない（矢印や区切りはスクリプト側で描画）
    *   箇条書き文末の句点「。」**禁止**（体言止め推奨）
    *   **インライン強調記法**: \\*\\*太字\\*\\* と \\[\\[重要語\\]\\]（太字＋Googleブルー）を必要箇所に使用可
    *   **文字重複防止**: 各スライドの要素（タイトル、箇条書き、説明文）は重複しないよう、内容を適切に分散させてください。特に同じ内容を複数のスライドに配置しないでください。
    *   **情報過多時の分割**: 1スライドに収まらない情報量の場合は、**必ず複数スライドに分割**してください。レイアウトを壊すよりも情報を分けることを優先してください。

## 5.0 SAFETY_GUIDELINES — GASエラー回避とAPI負荷の配慮

*   スライド上限: **最大50枚**
*   画像制約: **50MB未満・25MP以下**の **PNG/JPEG/GIF/WebP**
*   実行時間: Apps Script 全体で約 **6分**
*   テキストオーバーフロー回避: 本命令の**上限値厳守**
*   フォント: Arial が無い環境では標準サンセリフに自動フォールバック
*   文字列リテラルの安全性: ' と \\ を確実にエスケープ
`;

export const GOOGLE_TEMPLATE_BLUEPRINT = `/** 
* @OnlyCurrentDoc 
* このスクリプトは、Google風デザインテンプレートに基づきGoogleスライドを自動生成します。 
* Version: 12.1 (Universal Google Design - Custom Logo) 
* Author: Googleスライド自動生成マスター 
* Description: 指定されたslideData配列を元に、Google風デザインに準拠したスライドを生成します。 
*/

// --- 1. 実行設定 --- 
const SETTINGS = { 
  SHOULD_CLEAR_ALL_SLIDES: true, 
  TARGET_PRESENTATION_ID: null 
};

// --- ロゴデータ (Base64形式のデータURI) ---
const CUSTOM_LOGO_BASE64 = "LOGO_BASE64_PLACEHOLDER";

// --- 2. マスターデザイン設定 (Google Design Ver.) --- 
const CONFIG = { 
  BASE_PX: { W: 960, H: 540 },
  POS_PX: { 
    titleSlide: { 
      headerLogo: { right: 20, top: 20, width: 75 },
      title: { left: 50, top: 150, width: 800, height: 90 }, // タイトルをさらに上に
      date: { left: 50, top: 420, width: 250, height: 40 }, // 日付をさらに下に
    },
    contentSlide: { 
      headerLogo: { right: 20, top: 20, width: 75 }, 
      title: { left: 25, top: 60, width: 830, height: 65 }, 
      titleUnderline: { left: 25, top: 128, width: 260, height: 4 }, 
      subhead: { left: 25, top: 140, width: 830, height: 30 }, 
      body: { left: 25, top: 172, width: 910, height: 303 }, 
      twoColLeft: { left: 25, top: 172, width: 440, height: 303 }, 
      twoColRight: { left: 495, top: 172, width: 440, height: 303 } 
    }, 
    compareSlide: { 
      headerLogo: { right: 20, top: 20, width: 75 }, 
      title: { left: 25, top: 60, width: 830, height: 65 }, 
      titleUnderline: { left: 25, top: 128, width: 260, height: 4 }, 
      subhead: { left: 25, top: 140, width: 830, height: 30 }, 
      leftBox: { left: 25, top: 172, width: 430, height: 303 }, 
      rightBox: { left: 505, top: 172, width: 430, height: 303 } 
    }, 
    processSlide: { 
      headerLogo: { right: 20, top: 20, width: 75 }, 
      title: { left: 25, top: 60, width: 830, height: 65 }, 
      titleUnderline: { left: 25, top: 128, width: 260, height: 4 }, 
      subhead: { left: 25, top: 140, width: 830, height: 30 }, 
      area: { left: 25, top: 172, width: 910, height: 303 } 
    }, 
    timelineSlide: { 
      headerLogo: { right: 20, top: 20, width: 75 }, 
      title: { left: 25, top: 60, width: 830, height: 65 }, 
      titleUnderline: { left: 25, top: 128, width: 260, height: 4 }, 
      subhead: { left: 25, top: 140, width: 830, height: 30 }, 
      area: { left: 25, top: 172, width: 910, height: 303 } 
    }, 
    diagramSlide: { 
      headerLogo: { right: 20, top: 20, width: 75 }, 
      title: { left: 25, top: 60, width: 830, height: 65 }, 
      titleUnderline: { left: 25, top: 128, width: 260, height: 4 }, 
      subhead: { left: 25, top: 140, width: 830, height: 30 }, 
      lanesArea: { left: 25, top: 172, width: 910, height: 303 } 
    }, 
    cardsSlide: { 
      headerLogo: { right: 20, top: 20, width: 75 }, 
      title: { left: 25, top: 60, width: 830, height: 65 }, 
      titleUnderline: { left: 25, top: 128, width: 260, height: 4 }, 
      subhead: { left: 25, top: 140, width: 830, height: 30 }, 
      gridArea: { left: 25, top: 172, width: 910, height: 303 } 
    }, 
    tableSlide: { 
      headerLogo: { right: 20, top: 20, width: 75 }, 
      title: { left: 25, top: 60, width: 830, height: 65 }, 
      titleUnderline: { left: 25, top: 128, width: 260, height: 4 }, 
      subhead: { left: 25, top: 140, width: 830, height: 30 }, 
      area: { left: 25, top: 172, width: 910, height: 303 } 
    }, 
    progressSlide: { 
      headerLogo: { right: 20, top: 20, width: 75 }, 
      title: { left: 25, top: 60, width: 830, height: 65 }, 
      titleUnderline: { left: 25, top: 128, width: 260, height: 4 }, 
      subhead: { left: 25, top: 140, width: 830, height: 30 }, 
      area: { left: 25, top: 172, width: 910, height: 303 } 
    },
    sectionSlide: { 
      headerLogo: { right: 20, top: 20, width: 75 },
      title: { left: 55, top: 230, width: 840, height: 80 }, 
      ghostNum: { left: 35, top: 120, width: 300, height: 200 } 
    },
    footer: { 
      leftText: { left: 15, top: 505, width: 250, height: 20 }, 
      rightPage: { right: 15, top: 505, width: 50, height: 20 } 
    }, 
    bottomBar: { left: 0, top: 534, width: 960, height: 6 } 
  },
  FONTS: { 
    family: 'Arial', 
    sizes: { 
      title: 45, date: 16, sectionTitle: 38, contentTitle: 28, subhead: 18, body: 14, footer: 9, chip: 11, laneTitle: 13, small: 10, processStep: 14, axis: 12, ghostNum: 180 
    } 
  }, 
  COLORS: { 
    primary_blue: '#4285F4', google_red: '#EA4335', google_yellow: '#FBBC04', google_green: '#34A853', text_primary: '#333333', background_white: '#FFFFFF', background_gray: '#f8f9fa', faint_gray: '#e8eaed', lane_title_bg: '#f5f5f3', lane_border: '#dadce0', card_bg: '#ffffff', card_border: '#dadce0', neutral_gray: '#9e9e9e', ghost_gray: '#efefed' 
  }, 
  COLOR_PALETTES: {
    'simple-default': {
      primary_color: '#4285F4',
      secondary_color: '#34A853',
      accent_color: '#EA4335',
      background_color: '#FFFFFF',
      text_color: '#333333',
      card_bg: '#ffffff',
      card_border: '#dadce0'
    },
    'modern-contrast': {
      primary_color: '#000000',
      secondary_color: '#FF0000',
      accent_color: '#FF6B6B',
      background_color: '#FFFFFF',
      text_color: '#333333',
      card_bg: '#ffffff',
      card_border: '#dadce0'
    },
    'warm-earth': {
      primary_color: '#8B4513',
      secondary_color: '#D2691E',
      accent_color: '#FFA500',
      background_color: '#F5F5DC',
      text_color: '#2F2F2F',
      card_bg: '#ffffff',
      card_border: '#e0e0e0'
    },
    'elegant-mystery': {
      primary_color: '#2D1B3D',
      secondary_color: '#4A148C',
      accent_color: '#E1BEE7',
      background_color: '#F8F8FF',
      text_color: '#2F2F2F',
      card_bg: '#ffffff',
      card_border: '#e1bee7'
    },
    'neutral-natural': {
      primary_color: '#8B7355',
      secondary_color: '#CD853F',
      accent_color: '#D2B48C',
      background_color: '#F5F5DC',
      text_color: '#2F2F2F',
      card_bg: '#ffffff',
      card_border: '#d2b48c'
    },
    'pop-vibrant': {
      primary_color: '#000000',
      secondary_color: '#1E3A8A',
      accent_color: '#E6E6FA',
      background_color: '#00FFFF',
      text_color: '#000000',
      card_bg: '#ffffff',
      card_border: '#c5cae9'
    },
    'cool-professional': {
      primary_color: '#008080',
      secondary_color: '#556B2F',
      accent_color: '#4682B4',
      background_color: '#E0FFFF',
      text_color: '#333333',
      card_bg: '#ffffff',
      card_border: '#b2ebf2'
    },
    'organic-nature': {
      primary_color: '#006400',
      secondary_color: '#228B22',
      accent_color: '#9DC183',
      background_color: '#F5F5DC',
      text_color: '#2F2F2F',
      card_bg: '#ffffff',
      card_border: '#c8e6c9'
    },
    'modern-balanced': {
      primary_color: '#696969',
      secondary_color: '#008080',
      accent_color: '#FFA500',
      background_color: '#FFB6C1',
      text_color: '#333333',
      card_bg: '#ffffff',
      card_border: '#ffe0b2'
    },
    'primary-bold': {
      primary_color: '#1976D2',
      secondary_color: '#424242',
      accent_color: '#F44336',
      background_color: '#FFFFFF',
      text_color: '#212121',
      card_bg: '#ffffff',
      card_border: '#E0E0E0'
    }
  },
  DIAGRAM: { 
    laneGap_px: 24, lanePad_px: 10, laneTitle_h_px: 30, cardGap_px: 12, cardMin_h_px: 48, cardMax_h_px: 70, arrow_h_px: 10, arrowGap_px: 8 
  },
  FOOTER_TEXT: '© ' + new Date().getFullYear() + ' Your Organization' 
};

// --- カラーパレット情報取得関数 ---
function getColorPalette(paletteName = 'simple-default') {
  const palette = CONFIG.COLOR_PALETTES[paletteName] || CONFIG.COLOR_PALETTES['simple-default'];
  return {
    primary: palette.primary_color,
    secondary: palette.secondary_color,
    accent: palette.accent_color,
    background: palette.background_color,
    text: palette.text_color,
    cardBg: palette.card_bg,
    cardBorder: palette.card_border
  };
}

// --- 3. スライドデータ (このブロックはAIによって置換されます) --- 
// SLIDEDATA_PLACEHOLDER

// --- 4. メイン実行関数 --- 
let __SECTION_COUNTER = 0;
function generatePresentation() { 
  let presentation; 
  try { 
    presentation = SETTINGS.TARGET_PRESENTATION_ID 
      ? SlidesApp.openById(SETTINGS.TARGET_PRESENTATION_ID) 
      : SlidesApp.getActivePresentation(); 
    if (!presentation) throw new Error('対象のプレゼンテーションが見つかりません。');
    if (SETTINGS.SHOULD_CLEAR_ALL_SLIDES) { 
      const slides = presentation.getSlides(); 
      for (let i = slides.length - 1; i >= 0; i--) slides[i].remove(); 
    }
    __SECTION_COUNTER = 0;
    const layout = createLayoutManager(presentation.getPageWidth(), presentation.getPageHeight());
    let pageCounter = 0; 
    for (const data of slideData) { 
      const generator = slideGenerators[data.type]; 
      if (data.type !== 'title' && data.type !== 'closing') pageCounter++; 
      if (generator) { 
        const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK); 
        generator(slide, data, layout, pageCounter); 
        if (data.notes) { 
          try { 
            const notesShape = slide.getNotesPage().getSpeakerNotesShape(); 
            if (notesShape) { 
              notesShape.getText().setText(data.notes); 
            } 
          } catch (e) { 
            Logger.log('スピーカーノートの設定に失敗しました: ' + e.message); 
          } 
        } 
      } 
    } 
  } catch (e) { 
    Logger.log('処理が中断されました: ' + e.message + '\\nStack: ' + e.stack); 
  } 
}

// --- 5. スライド生成ディスパッチャ --- 
const slideGenerators = { 
  title: createTitleSlide, 
  section: createSectionSlide, 
  content: createContentSlide, 
  compare: createCompareSlide, 
  process: createProcessSlide, 
  timeline: createTimelineSlide, 
  diagram: createDiagramSlide, 
  cards: createCardsSlide, 
  table: createTableSlide, 
  progress: createProgressSlide, 
  closing: createClosingSlide 
};

// --- 6. スライド生成関数群 --- 
function createTitleSlide(slide, data, layout) { 
  const colorPalette = getColorPalette(data.colorPalette);
  slide.getBackground().setSolidFill(colorPalette.background);
  drawCustomLogo(slide, layout, 'titleSlide');
  const titleRect = layout.getRect('titleSlide.title'); 
  const titleShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, titleRect.left, titleRect.top, titleRect.width, titleRect.height); 
  setStyledText(titleShape, data.title, { size: CONFIG.FONTS.sizes.title, bold: true, color: colorPalette.text });
  const dateRect = layout.getRect('titleSlide.date'); 
  const dateShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, dateRect.left, dateRect.top, dateRect.width, dateRect.height); 
  dateShape.getText().setText(data.date || ''); 
  applyTextStyle(dateShape.getText(), { size: CONFIG.FONTS.sizes.date, color: colorPalette.text });
  drawBottomBar(slide, layout, colorPalette.primary); 
}

function createSectionSlide(slide, data, layout, pageNum) { 
  const colorPalette = getColorPalette(data.colorPalette);
  slide.getBackground().setSolidFill(colorPalette.background);
  drawCustomLogo(slide, layout, 'sectionSlide');
  __SECTION_COUNTER++; 
  const parsedNum = (() => { 
    if (Number.isFinite(data.sectionNo)) return Number(data.sectionNo); 
    const m = String(data.title || '').match(/^\\s*(\\d+)[\\.\\．]/); 
    return m ? Number(m[1]) : __SECTION_COUNTER; 
  })(); 
  const num = String(parsedNum).padStart(2, '0');
  const ghostRect = layout.getRect('sectionSlide.ghostNum'); 
  const ghost = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, ghostRect.left, ghostRect.top, ghostRect.width, ghostRect.height); 
  ghost.getText().setText(num); 
  applyTextStyle(ghost.getText(), { size: CONFIG.FONTS.sizes.ghostNum, color: CONFIG.COLORS.ghost_gray, bold: true }); 
  try { ghost.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE); } catch(e) {}
  const titleRect = layout.getRect('sectionSlide.title'); 
  const titleShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, titleRect.left, titleRect.top, titleRect.width, titleRect.height); 
  titleShape.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE); 
  setStyledText(titleShape, data.title, { size: CONFIG.FONTS.sizes.sectionTitle, bold: true, align: SlidesApp.ParagraphAlignment.CENTER, color: colorPalette.text });
  addGoogleFooter(slide, layout, pageNum, colorPalette, data.customFooterText); 
}

function createContentSlide(slide, data, layout, pageNum) { 
  const colorPalette = getColorPalette(data.colorPalette);
  slide.getBackground().setSolidFill(colorPalette.background); 
  drawStandardTitleHeader(slide, layout, 'contentSlide', data.title, colorPalette); 
  const dy = drawSubheadIfAny(slide, layout, 'contentSlide', data.subhead, colorPalette);
  const isAgenda = isAgendaTitle(data.title || ''); 
  let points = [];
  if (Array.isArray(data.points)) {
    points = data.points.slice(0);
  } else if (typeof data.points === 'string') {
    points = [data.points];
  }
  if (isAgenda && (!points || points.length === 0)) { 
    points = buildAgendaFromSlideData(); 
    if (points.length === 0) points = ['本日の目的', '進め方', '次のアクション']; 
  }
  const hasImages = Array.isArray(data.images) && data.images.length > 0; 
  const isTwo = !!(data.twoColumn || data.columns);
  
  // アジェンダの場合、項目が多いときは自動的に2列表示にする
  const shouldUseTwoColumns = isTwo || (isAgenda && points.length > 4);
  
  if ((shouldUseTwoColumns && (data.columns || points)) || (!shouldUseTwoColumns && points && points.length > 0)) { 
    if (shouldUseTwoColumns) { 
      let L = [], R = []; 
      if (Array.isArray(data.columns) && data.columns.length === 2) { 
        L = data.columns[0] || []; R = data.columns[1] || []; 
      } else { 
        const mid = Math.ceil(points.length / 2); 
        L = points.slice(0, mid); R = points.slice(mid); 
      } 
      const leftRect = offsetRect(layout.getRect('contentSlide.twoColLeft'), 0, dy); 
      const rightRect = offsetRect(layout.getRect('contentSlide.twoColRight'), 0, dy); 
      const leftShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, leftRect.left, leftRect.top, leftRect.width, leftRect.height); 
      const rightShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, rightRect.left, rightRect.top, rightRect.width, rightRect.height); 
      setBulletsWithInlineStyles(leftShape, L, colorPalette, isAgenda); 
      setBulletsWithInlineStyles(rightShape, R, colorPalette, isAgenda); 
    } else { 
      const bodyRect = offsetRect(layout.getRect('contentSlide.body'), 0, dy); 
      const bodyShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, bodyRect.left, bodyRect.top, bodyRect.width, bodyRect.height); 
      setBulletsWithInlineStyles(bodyShape, points, colorPalette, isAgenda); 
    } 
  }
  if (hasImages) { 
    const area = offsetRect(layout.getRect('contentSlide.body'), 0, dy); 
    renderImagesInArea(slide, layout, area, normalizeImages(data.images)); 
  }
  drawBottomBarAndFooter(slide, layout, pageNum, colorPalette, data.customFooterText); 
}

function createCompareSlide(slide, data, layout, pageNum) { 
  const colorPalette = getColorPalette(data.colorPalette);
  slide.getBackground().setSolidFill(colorPalette.background); 
  drawStandardTitleHeader(slide, layout, 'compareSlide', data.title, colorPalette); 
  const dy = drawSubheadIfAny(slide, layout, 'compareSlide', data.subhead, colorPalette);
  const leftBox = offsetRect(layout.getRect('compareSlide.leftBox'), 0, dy); 
  const rightBox = offsetRect(layout.getRect('compareSlide.rightBox'), 0, dy); 
  drawCompareBox(slide, leftBox, data.leftTitle || '選択肢A', data.leftItems || [], colorPalette); 
  drawCompareBox(slide, rightBox, data.rightTitle || '選択肢B', data.rightItems || [], colorPalette);
  drawBottomBarAndFooter(slide, layout, pageNum, colorPalette, data.customFooterText); 
} 
function drawCompareBox(slide, rect, title, items, colorPalette) { 
  const box = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, rect.left, rect.top, rect.width, rect.height); 
  box.getFill().setSolidFill(colorPalette.cardBg); 
  box.getBorder().getLineFill().setSolidFill(colorPalette.cardBorder); 
  box.getBorder().setWeight(1); 
  const titleRect = { left: rect.left + 12, top: rect.top + 12, width: rect.width - 24, height: 30 }; 
  const titleShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, titleRect.left, titleRect.top, titleRect.width, titleRect.height); 
  setStyledText(titleShape, title, { size: CONFIG.FONTS.sizes.contentTitle, bold: true, color: colorPalette.text }); 
  const bodyRect = { left: rect.left + 12, top: rect.top + 50, width: rect.width - 24, height: rect.height - 62 }; 
  const bodyShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, bodyRect.left, bodyRect.top, bodyRect.width, bodyRect.height); 
  setBulletsWithInlineStyles(bodyShape, items, colorPalette); 
}

function createProcessSlide(slide, data, layout, pageNum) { 
  const colorPalette = getColorPalette(data.colorPalette);
  slide.getBackground().setSolidFill(colorPalette.background); 
  drawStandardTitleHeader(slide, layout, 'processSlide', data.title, colorPalette); 
  const dy = drawSubheadIfAny(slide, layout, 'processSlide', data.subhead, colorPalette);
  const area = offsetRect(layout.getRect('processSlide.area'), 0, dy); 
  let steps = [];
  if (Array.isArray(data.steps)) {
    steps = data.steps;
  } else if (typeof data.steps === 'string') {
    steps = [data.steps];
  }
  if (steps.length > 0) { 
    const stepHeight = area.height / steps.length; 
    steps.forEach((step, idx) => { 
      const stepRect = { left: area.left, top: area.top + idx * stepHeight, width: area.width, height: stepHeight }; 
      const stepBox = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, stepRect.left, stepRect.top, stepRect.width, stepRect.height); 
      stepBox.getFill().setSolidFill(colorPalette.cardBg); 
      stepBox.getBorder().getLineFill().setSolidFill(colorPalette.cardBorder); 
      stepBox.getBorder().setWeight(1);
      const numRect = { left: stepRect.left + 12, top: stepRect.top + 12, width: 40, height: 40 }; 
      const numShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, numRect.left, numRect.top, numRect.width, numRect.height); 
      numShape.getText().setText(String(idx + 1)); 
      applyTextStyle(numShape.getText(), { size: CONFIG.FONTS.sizes.processStep, bold: true, color: colorPalette.primary }); 
      try { numShape.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE); } catch(e) {}
      const textRect = { left: stepRect.left + 60, top: stepRect.top + 12, width: stepRect.width - 72, height: stepRect.height - 24 }; 
      const textShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, textRect.left, textRect.top, textRect.width, textRect.height); 
      setStyledText(textShape, step, { size: CONFIG.FONTS.sizes.body, color: colorPalette.text }); 
      if (idx < steps.length - 1) { 
        drawArrowBetweenRects(slide, stepRect, { left: area.left, top: area.top + (idx + 1) * stepHeight, width: area.width, height: stepHeight }, 10, 8, colorPalette.primary); 
      } 
    }); 
  }
  if (Array.isArray(data.images) && data.images.length > 0) { 
    renderImagesInArea(slide, layout, area, normalizeImages(data.images)); 
  }
  drawBottomBarAndFooter(slide, layout, pageNum, colorPalette, data.customFooterText); 
}

function createTimelineSlide(slide, data, layout, pageNum) { 
  const colorPalette = getColorPalette(data.colorPalette);
  slide.getBackground().setSolidFill(colorPalette.background); 
  drawStandardTitleHeader(slide, layout, 'timelineSlide', data.title, colorPalette); 
  const dy = drawSubheadIfAny(slide, layout, 'timelineSlide', data.subhead, colorPalette);
  const area = offsetRect(layout.getRect('timelineSlide.area'), 0, dy); 
  let milestones = [];
  if (Array.isArray(data.milestones)) {
    milestones = data.milestones;
  } else if (typeof data.milestones === 'string') {
    milestones = [{ label: data.milestones, date: '', state: 'done' }];
  }
  if (milestones.length > 0) { 
    const timelineHeight = area.height / milestones.length; 
    milestones.forEach((milestone, idx) => { 
      const milestoneRect = { left: area.left, top: area.top + idx * timelineHeight, width: area.width, height: timelineHeight }; 
      const milestoneBox = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, milestoneRect.left, milestoneRect.top, milestoneRect.width, milestoneRect.height); 
      milestoneBox.getFill().setSolidFill(colorPalette.cardBg); 
      milestoneBox.getBorder().getLineFill().setSolidFill(colorPalette.cardBorder); 
      milestoneBox.getBorder().setWeight(1); 
      const dateRect = { left: milestoneRect.left + 12, top: milestoneRect.top + 12, width: 120, height: 30 }; 
      const dateShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, dateRect.left, dateRect.top, dateRect.width, dateRect.height); 
      setStyledText(dateShape, milestone.date || '', { size: CONFIG.FONTS.sizes.small, bold: true, color: colorPalette.primary }); 
      const labelRect = { left: milestoneRect.left + 140, top: milestoneRect.top + 12, width: milestoneRect.width - 152, height: 30 }; 
      const labelShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, labelRect.left, labelRect.top, labelRect.width, labelRect.height); 
      setStyledText(labelShape, milestone.label || '', { size: CONFIG.FONTS.sizes.body, color: colorPalette.text }); 
    }); 
  }
  if (Array.isArray(data.images) && data.images.length > 0) { 
    renderImagesInArea(slide, layout, area, normalizeImages(data.images)); 
  }
  drawBottomBarAndFooter(slide, layout, pageNum, colorPalette, data.customFooterText); 
}

function createDiagramSlide(slide, data, layout, pageNum) { 
  const colorPalette = getColorPalette(data.colorPalette);
  slide.getBackground().setSolidFill(colorPalette.background); 
  drawStandardTitleHeader(slide, layout, 'diagramSlide', data.title, colorPalette); 
  const dy = drawSubheadIfAny(slide, layout, 'diagramSlide', data.subhead, colorPalette);
  let lanes = [];
  if (Array.isArray(data.lanes)) {
    lanes = data.lanes;
  } else if (typeof data.lanes === 'string') {
    lanes = [{ title: 'Lane 1', items: [data.lanes] }];
  }
  if (lanes.length > 0) { 
    const laneArea = offsetRect(layout.getRect('diagramSlide.lanesArea'), 0, dy); 
    const laneWidth = laneArea.width / lanes.length; 
    lanes.forEach((lane, idx) => { 
      const laneRect = { left: laneArea.left + idx * laneWidth, top: laneArea.top, width: laneWidth, height: laneArea.height }; 
      const laneBox = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, laneRect.left, laneRect.top, laneRect.width, laneRect.height); 
      laneBox.getFill().setSolidFill(colorPalette.cardBg); 
      laneBox.getBorder().getLineFill().setSolidFill(colorPalette.cardBorder); 
      laneBox.getBorder().setWeight(1); 
      const titleRect = { left: laneRect.left + 12, top: laneRect.top + 12, width: laneRect.width - 24, height: 30 }; 
      const titleShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, titleRect.left, titleRect.top, titleRect.width, titleRect.height); 
      setStyledText(titleShape, lane.title || '', { size: CONFIG.FONTS.sizes.laneTitle, bold: true, color: colorPalette.primary }); 
      const itemsRect = { left: laneRect.left + 12, top: laneRect.top + 50, width: laneRect.width - 24, height: laneRect.height - 62 }; 
      const itemsShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, itemsRect.left, itemsRect.top, itemsRect.width, itemsRect.height); 
      setBulletsWithInlineStyles(itemsShape, lane.items || [], colorPalette); 
    }); 
  }
  if (Array.isArray(data.images) && data.images.length > 0) { 
    const area = offsetRect(layout.getRect('diagramSlide.lanesArea'), 0, dy); 
    renderImagesInArea(slide, layout, area, normalizeImages(data.images)); 
  }
  drawBottomBarAndFooter(slide, layout, pageNum, colorPalette, data.customFooterText); 
}

function createCardsSlide(slide, data, layout, pageNum) { 
  const colorPalette = getColorPalette(data.colorPalette);
  slide.getBackground().setSolidFill(colorPalette.background); 
  drawStandardTitleHeader(slide, layout, 'cardsSlide', data.title, colorPalette); 
  const dy = drawSubheadIfAny(slide, layout, 'cardsSlide', data.subhead, colorPalette);
  const area = offsetRect(layout.getRect('cardsSlide.gridArea'), 0, dy); 
  let items = [];
  if (Array.isArray(data.items)) {
    items = data.items;
  } else if (typeof data.items === 'string') {
    items = [data.items];
  }
  const columns = data.columns || 2; 
  if (items.length > 0) { 
    const rows = Math.ceil(items.length / columns); 
    const cardWidth = (area.width - 24 * (columns - 1)) / columns; 
    
    // カードの高さをより適切に計算（項目数に応じて動的調整）
    const minCardHeight = Math.max(100, area.height / (rows * 1.5)); // 項目数に応じて最小高さを調整
    const maxCardHeight = 150; // 最大カード高さ
    const calculatedHeight = (area.height - 24 * (rows - 1)) / rows;
    const cardHeight = Math.max(minCardHeight, Math.min(maxCardHeight, calculatedHeight));
    
    items.forEach((item, idx) => { 
      const row = Math.floor(idx / columns); 
      const col = idx % columns; 
      const cardLeft = area.left + col * (cardWidth + 24); 
      const cardTop = area.top + row * (cardHeight + 24); 
      const card = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, cardLeft, cardTop, cardWidth, cardHeight); 
      card.getFill().setSolidFill(colorPalette.cardBg); 
      card.getBorder().getLineFill().setSolidFill(colorPalette.cardBorder); 
      card.getBorder().setWeight(1); 
      
      if (typeof item === 'string') { 
        // シンプルな文字列の場合
        const cardText = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, cardLeft + 12, cardTop + 12, cardWidth - 24, cardHeight - 24); 
        setStyledText(cardText, item, { size: CONFIG.FONTS.sizes.body, color: colorPalette.text }); 
        try { 
          cardText.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE); 
          // テキストの自動調整を有効にする
          cardText.getText().getTextStyle().setFontSize(Math.min(CONFIG.FONTS.sizes.body, 14));
        } catch(e) {}
      } else if (item && typeof item.title === 'string') { 
        // タイトルと説明文がある場合
        const titleHeight = 30;
        const padding = 12;
        const availableHeight = cardHeight - (padding * 2);
        
        // タイトル
        const titleText = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, cardLeft + padding, cardTop + padding, cardWidth - (padding * 2), titleHeight); 
        setStyledText(titleText, item.title, { size: CONFIG.FONTS.sizes.contentTitle, bold: true, color: colorPalette.primary }); 
        
        // 説明文（タイトルの下に配置）
        if (item.desc) { 
          const descHeight = availableHeight - titleHeight - 8; // 8pxの間隔
          const descText = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, cardLeft + padding, cardTop + padding + titleHeight + 8, cardWidth - (padding * 2), descHeight); 
          setStyledText(descText, item.desc, { size: CONFIG.FONTS.sizes.body, color: colorPalette.text }); 
          try { 
            // 説明文のフォントサイズを自動調整
            descText.getText().getTextStyle().setFontSize(Math.min(CONFIG.FONTS.sizes.body, 12));
          } catch(e) {}
        } 
      } 
    }); 
  }
  if (Array.isArray(data.images) && data.images.length > 0) { 
    renderImagesInArea(slide, layout, area, normalizeImages(data.images)); 
  }
  drawBottomBarAndFooter(slide, layout, pageNum, colorPalette, data.customFooterText); 
}

function createTableSlide(slide, data, layout, pageNum) { 
  const colorPalette = getColorPalette(data.colorPalette);
  slide.getBackground().setSolidFill(colorPalette.background); 
  drawStandardTitleHeader(slide, layout, 'tableSlide', data.title, colorPalette); 
  const dy = drawSubheadIfAny(slide, layout, 'tableSlide', data.subhead, colorPalette);
  const area = offsetRect(layout.getRect('tableSlide.area'), 0, dy); 
  let headers = [];
  let rows = [];
  if (Array.isArray(data.headers)) {
    headers = data.headers;
  } else if (typeof data.headers === 'string') {
    headers = [data.headers];
  }
  if (Array.isArray(data.rows)) {
    rows = data.rows;
  } else if (typeof data.rows === 'string') {
    rows = [[data.rows]];
  }
  if (headers.length > 0 && rows.length > 0) { 
    const tableWidth = area.width; 
    const tableHeight = area.height; 
    const headerHeight = 40; 
    const minRowHeight = 40; // 最小行の高さを増加
    const maxRows = Math.min(6, rows.length); // 最大6行に制限
    const availableHeight = tableHeight - headerHeight;
    const rowHeight = Math.max(minRowHeight, availableHeight / maxRows); 
    const colWidth = tableWidth / headers.length; 
    // ヘッダー行
    headers.forEach((header, colIdx) => { 
      const headerRect = { left: area.left + colIdx * colWidth, top: area.top, width: colWidth, height: headerHeight }; 
      const headerCell = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, headerRect.left, headerRect.top, headerRect.width, headerRect.height); 
      headerCell.getFill().setSolidFill(colorPalette.primary); 
      headerCell.getBorder().getLineFill().setSolidFill(colorPalette.cardBorder); 
      headerCell.getBorder().setWeight(1); 
      const headerText = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, headerRect.left + 8, headerRect.top + 8, headerRect.width - 16, headerRect.height - 16); 
      setStyledText(headerText, header, { size: CONFIG.FONTS.sizes.body, bold: true, color: colorPalette.background }); 
    }); 
    // データ行（最大6行まで）
    rows.slice(0, maxRows).forEach((row, rowIdx) => { 
      row.forEach((cell, colIdx) => { 
        const cellRect = { left: area.left + colIdx * colWidth, top: area.top + headerHeight + rowIdx * rowHeight, width: colWidth, height: rowHeight }; 
        const cellShape = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, cellRect.left, cellRect.top, cellRect.width, cellRect.height); 
        cellShape.getFill().setSolidFill(colorPalette.cardBg); 
        cellShape.getBorder().getLineFill().setSolidFill(colorPalette.cardBorder); 
        cellShape.getBorder().setWeight(1); 
        const cellText = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, cellRect.left + 8, cellRect.top + 8, cellRect.width - 16, cellRect.height - 16); 
        setStyledText(cellText, cell, { size: CONFIG.FONTS.sizes.body, color: colorPalette.text }); 
      }); 
    }); 
  }
  drawBottomBarAndFooter(slide, layout, pageNum, colorPalette, data.customFooterText); 
}

function createProgressSlide(slide, data, layout, pageNum) { 
  const colorPalette = getColorPalette(data.colorPalette);
  slide.getBackground().setSolidFill(colorPalette.background); 
  drawStandardTitleHeader(slide, layout, 'progressSlide', data.title, colorPalette); 
  const dy = drawSubheadIfAny(slide, layout, 'progressSlide', data.subhead, colorPalette);
  const area = offsetRect(layout.getRect('progressSlide.area'), 0, dy); 
  let items = [];
  if (Array.isArray(data.items)) {
    items = data.items;
  } else if (typeof data.items === 'string') {
    items = [{ label: data.items, percent: 50 }];
  }
  if (items.length > 0) { 
    const itemHeight = area.height / items.length; 
    items.forEach((item, idx) => { 
      const itemRect = { left: area.left, top: area.top + idx * itemHeight, width: area.width, height: itemHeight }; 
      const itemBox = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, itemRect.left, itemRect.top, itemRect.width, itemRect.height); 
      itemBox.getFill().setSolidFill(colorPalette.cardBg); 
      itemBox.getBorder().getLineFill().setSolidFill(colorPalette.cardBorder); 
      itemBox.getBorder().setWeight(1); 
      const labelRect = { left: itemRect.left + 12, top: itemRect.top + 12, width: itemRect.width - 24, height: 30 }; 
      const labelShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, labelRect.left, labelRect.top, labelRect.width, labelRect.height); 
      setStyledText(labelShape, item.label || '', { size: CONFIG.FONTS.sizes.body, color: colorPalette.text }); 
      const progressRect = { left: itemRect.left + 12, top: itemRect.top + 50, width: itemRect.width - 24, height: 20 }; 
      const progressBg = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, progressRect.left, progressRect.top, progressRect.width, progressRect.height); 
      progressBg.getFill().setSolidFill(colorPalette.cardBorder); 
      progressBg.getBorder().setTransparent(); 
      const progressWidth = (progressRect.width * (item.percent || 0)) / 100; 
      if (progressWidth > 0) { 
        const progressBar = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, progressRect.left, progressRect.top, progressWidth, progressRect.height); 
        progressBar.getFill().setSolidFill(colorPalette.primary); 
        progressBar.getBorder().setTransparent(); 
      } 
      const percentText = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, progressRect.left + progressRect.width + 8, progressRect.top, 60, progressRect.height); 
      setStyledText(percentText, String(item.percent || 0) + '%', { size: CONFIG.FONTS.sizes.small, bold: true, color: colorPalette.primary }); 
    }); 
  }
  drawBottomBarAndFooter(slide, layout, pageNum, colorPalette, data.customFooterText); 
}

function createClosingSlide(slide, data, layout) { 
  slide.getBackground().setSolidFill(CONFIG.COLORS.background_white); 
  const thanksRect = { left: 0, top: 0, width: layout.pageW_pt, height: layout.pageH_pt };
  const thanksShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, thanksRect.left, thanksRect.top, thanksRect.width, thanksRect.height);
  thanksShape.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE);
  setStyledText(thanksShape, "Thank you", { size: CONFIG.FONTS.sizes.sectionTitle, bold: true, align: SlidesApp.ParagraphAlignment.CENTER });
}

// --- 7. ユーティリティ関数群 --- 
function createLayoutManager(pageW_pt, pageH_pt) { 
  const pxToPt = (px) => px * 0.75; 
  const baseW_pt = pxToPt(CONFIG.BASE_PX.W); 
  const baseH_pt = pxToPt(CONFIG.BASE_PX.H); 
  const scaleX = pageW_pt / baseW_pt; 
  const scaleY = pageH_pt / baseH_pt;
  const getPositionFromPath = (path) => path.split('.').reduce((obj, key) => obj[key], CONFIG.POS_PX); 
  return { 
    scaleX, scaleY, pageW_pt, pageH_pt, pxToPt, 
    getRect: (spec) => { 
      const pos = typeof spec === 'string' ? getPositionFromPath(spec) : spec; 
      let left_px = pos.left; 
      if (pos.right !== undefined && pos.left === undefined) { 
        left_px = CONFIG.BASE_PX.W - pos.right - pos.width; 
      } 
      return { 
        left: left_px !== undefined ? pxToPt(left_px) * scaleX : undefined, 
        top: pos.top !== undefined ? pxToPt(pos.top) * scaleY : undefined, 
        width: pos.width !== undefined ? pxToPt(pos.width) * scaleX : undefined, 
        height: pos.height !== undefined ? pxToPt(pos.height) * scaleY : undefined, 
      }; 
    } 
  }; 
}

function offsetRect(rect, dx, dy) { 
  return { left: rect.left + (dx || 0), top: rect.top + (dy || 0), width: rect.width, height: rect.height }; 
}

function drawCustomLogo(slide, layout, key) {
  if (!CUSTOM_LOGO_BASE64 || !CUSTOM_LOGO_BASE64.startsWith('data:image')) return;
  try {
    const [meta, data] = CUSTOM_LOGO_BASE64.split(',');
    const mimeType = meta.split(':')[1].split(';')[0];
    const blob = Utilities.newBlob(Utilities.base64Decode(data), mimeType, 'logo');
    
    const logoRect = layout.getRect(key + '.headerLogo');
    if (!logoRect) return;

    const logo = slide.insertImage(blob);
    const asp = logo.getHeight() / logo.getWidth();
    
    logo.setLeft(logoRect.left).setTop(logoRect.top).setWidth(logoRect.width).setHeight(logoRect.width * asp);
  } catch (e) {
    Logger.log('Failed to insert custom logo: ' + e.message);
  }
}

function drawStandardTitleHeader(slide, layout, key, title, colorPalette) {
  drawCustomLogo(slide, layout, key);
  const titleRect = layout.getRect(key + '.title');
  const titleShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, titleRect.left, titleRect.top, titleRect.width, titleRect.height);
  setStyledText(titleShape, title || '', { size: CONFIG.FONTS.sizes.contentTitle, bold: true, color: colorPalette.text });
  const uRect = layout.getRect(key + '.titleUnderline');
  const u = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, uRect.left, uRect.top, uRect.width, uRect.height);
  u.getFill().setSolidFill(colorPalette.primary);
  u.getBorder().setTransparent();
}

function drawSubheadIfAny(slide, layout, key, subhead, colorPalette) {
  if (!subhead) return 0;
  const rect = layout.getRect(key + '.subhead');
  const box = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, rect.left, rect.top, rect.width, rect.height);
  setStyledText(box, subhead, { size: CONFIG.FONTS.sizes.subhead, color: colorPalette.text });
  return layout.pxToPt(36);
}

function drawBottomBar(slide, layout, primaryColor) { 
  const barRect = layout.getRect('bottomBar'); 
  const bar = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, barRect.left, barRect.top, barRect.width, barRect.height); 
  bar.getFill().setSolidFill(primaryColor); 
  bar.getBorder().setTransparent(); 
}

function drawBottomBarAndFooter(slide, layout, pageNum, colorPalette, customFooterText) {
  drawBottomBar(slide, layout, colorPalette.primary);
  addGoogleFooter(slide, layout, pageNum, colorPalette, customFooterText);
}

function addGoogleFooter(slide, layout, pageNum, colorPalette, customFooterText) {
  // カスタムフッターテキストがある場合のみ左下に表示
  if (customFooterText && customFooterText.trim()) {
    const leftRect = layout.getRect('footer.leftText');
    const leftShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, leftRect.left, leftRect.top, leftRect.width, leftRect.height);
    leftShape.getText().setText(customFooterText.trim());
    applyTextStyle(leftShape.getText(), { size: CONFIG.FONTS.sizes.footer, color: colorPalette.text });
  }
  // ページ番号は常に表示（title と closing 以外）
  if (pageNum > 0) {
    const rightRect = layout.getRect('footer.rightPage');
    const rightShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, rightRect.left, rightRect.top, rightRect.width, rightRect.height);
    rightShape.getText().setText(String(pageNum));
    applyTextStyle(rightShape.getText(), { size: CONFIG.FONTS.sizes.footer, color: colorPalette.primary, align: SlidesApp.ParagraphAlignment.END });
  }
}

function applyTextStyle(textRange, opt) { 
  const style = textRange.getTextStyle(); 
  style.setFontFamily(CONFIG.FONTS.family); 
  style.setForegroundColor(opt.color || CONFIG.COLORS.text_primary); 
  style.setFontSize(opt.size || CONFIG.FONTS.sizes.body); 
  style.setBold(opt.bold || false); 
  if (opt.align) { 
    try { textRange.getParagraphs().forEach(p => p.getRange().getParagraphStyle().setParagraphAlignment(opt.align)); } catch (e) {} 
  } 
}

function setStyledText(shapeOrCell, rawText, baseOpt) { 
  const parsed = parseInlineStyles(rawText || ''); 
  const tr = shapeOrCell.getText(); 
  tr.setText(parsed.output); 
  applyTextStyle(tr, baseOpt || {}); 
  applyStyleRanges(tr, parsed.ranges); 
}

function setBulletsWithInlineStyles(shape, points, colorPalette, isAgenda = false) { 
  const joiner = isAgenda ? '\\n' : '\\n\\n'; // アジェンダの場合は行間を詰める
  let combined = ''; 
  const ranges = [];
  
  // pointsが配列でない場合は配列に変換
  let pointsArray = points;
  if (!Array.isArray(pointsArray)) {
    if (typeof pointsArray === 'string') {
      pointsArray = [pointsArray];
    } else {
      pointsArray = [];
    }
  }
  
  pointsArray.forEach((pt, idx) => { 
    const parsed = parseInlineStyles(String(pt || '')); 
    const bullet = '• ' + parsed.output; 
    if (idx > 0) combined += joiner; 
    const start = combined.length; 
    combined += bullet;
    parsed.ranges.forEach(r => { 
      ranges.push({ start: start + 2 + r.start, end: start + 2 + r.end, bold: r.bold, color: r.color }); 
    }); 
  });
  const tr = shape.getText(); 
  tr.setText(combined || '• —'); 
  applyTextStyle(tr, { size: CONFIG.FONTS.sizes.body, color: colorPalette.text });
  try { 
    tr.getParagraphs().forEach(p => { 
      const ps = p.getRange().getParagraphStyle(); 
      ps.setLineSpacing(isAgenda ? 80 : 100); // アジェンダの場合は行間を詰める
      ps.setSpaceBelow(isAgenda ? 2 : 6); // アジェンダの場合は段落間を詰める
    }); 
  } catch (e) {}
  applyStyleRanges(tr, ranges); 
}

function parseInlineStyles(s) { 
  const ranges = []; 
  let out = ''; 
  for (let i = 0; i < s.length; ) { 
    if (s[i] === '[' && s[i+1] === '[') { 
      const close = s.indexOf(']]', i + 2); 
      if (close !== -1) { 
        const content = s.substring(i + 2, close); 
        const start = out.length; 
        out += content; 
        const end = out.length; 
        ranges.push({ start, end, bold: true, color: CONFIG.COLORS.primary_blue }); 
        i = close + 2; continue; 
      } 
    } 
    if (s[i] === '*' && s[i+1] === '*') { 
      const close = s.indexOf('**', i + 2); 
      if (close !== -1) { 
        const content = s.substring(i + 2, close); 
        const start = out.length; 
        out += content; 
        const end = out.length; 
        ranges.push({ start, end, bold: true }); 
        i = close + 2; continue; 
      } 
    } 
    out += s[i]; i++; 
  } 
  return { output: out, ranges }; 
}

function applyStyleRanges(textRange, ranges) { 
  ranges.forEach(r => { 
    try { 
      const sub = textRange.getRange(r.start, r.end); 
      if (!sub) return; 
      const st = sub.getTextStyle(); 
      if (r.bold) st.setBold(true); 
      if (r.color) st.setForegroundColor(r.color); 
    } catch (e) {} 
  }); 
}

function normalizeImages(arr) { 
  return (arr || []).map(v => { 
    if (typeof v === 'string') return { url: v }; 
    if (v && typeof v.url === 'string') return { url: v.url, caption: v.caption || '' }; 
    return null; 
  }).filter(Boolean).slice(0, 6); 
}

function renderImagesInArea(slide, layout, area, images) { 
  if (!images || images.length === 0) return; 
  const n = Math.min(6, images.length); 
  let cols = 1, rows = 1; 
  if (n === 1) { cols = 1; rows = 1; } 
  else if (n === 2) { cols = 2; rows = 1; } 
  else if (n <= 4) { cols = 2; rows = 2; } 
  else { cols = 3; rows = 2; }
  const gap = layout.pxToPt(10); 
  const cellW = (area.width - gap * (cols - 1)) / cols; 
  const cellH = (area.height - gap * (rows - 1)) / rows;
  for (let i = 0; i < n; i++) { 
    const r = Math.floor(i / cols), c = i % cols; 
    const left = area.left + c * (cellW + gap); 
    const top = area.top + r * (cellH + gap); 
    try { 
      const img = slide.insertImage(images[i].url); 
      const scale = Math.min(cellW / img.getWidth(), cellH / img.getHeight()); 
      const w = img.getWidth() * scale; 
      const h = img.getHeight() * scale; 
      img.setWidth(w).setHeight(h); 
      img.setLeft(left + (cellW - w) / 2).setTop(top + (cellH - h) / 2); 
    } catch(e) {} 
  } 
}

function isAgendaTitle(title) { 
  const t = String(title || '').toLowerCase(); 
  return /(agenda|アジェンダ|目次|本日お伝えすること)/.test(t); 
} 
function buildAgendaFromSlideData() { 
  const pts = []; 
  for (const d of slideData) { 
    if (d && d.type === 'section' && typeof d.title === 'string' && d.title.trim()) pts.push(d.title.trim()); 
  } 
  if (pts.length > 0) return pts.slice(0, 5); 
  const alt = []; 
  for (const d of slideData) { 
    if (d && d.type === 'content' && typeof d.title === 'string' && d.title.trim()) alt.push(d.title.trim()); 
  } 
  return alt.slice(0, 5); 
}

function drawArrowBetweenRects(slide, a, b, arrowH, arrowGap, primaryColor) { 
  const fromX = a.left + a.width; 
  const toX = b.left; 
  const width = Math.max(0, toX - fromX - arrowGap * 2); 
  if (width < 8) return; 
  const yMid = ((a.top + a.height/2) + (b.top + b.height/2)) / 2; 
  const top = yMid - arrowH / 2; 
  const left = fromX + arrowGap; 
  const arr = slide.insertShape(SlidesApp.ShapeType.RIGHT_ARROW, left, top, width, arrowH); 
  arr.getFill().setSolidFill(primaryColor); 
  arr.getBorder().setTransparent(); 
}
`;
