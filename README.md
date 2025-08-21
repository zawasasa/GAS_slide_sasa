# ささっとスライド作成をするGASつくるアプリ

[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000000.svg)](https://gas-slide-generator.vercel.app)
[![React](https://img.shields.io/badge/React-19.x-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg)](https://vitejs.dev/)

AIを使ってGoogleスライドを自動生成するGoogle Apps Script（GAS）コードを簡単に作成できるWebアプリケーションです。

## 🌐 ライブデモ

**https://gas-slide-generator.vercel.app**

## ✨ 主な機能

- 🤖 **AI自動生成**: Gemini AIを使用してテキストからスライドを自動生成
- 📸 **画像付きスライド対応**: [Obsidian Web Clipper](https://chromewebstore.google.com/detail/obsidian-web-clipper/cnjifjpddelmedmihgijeibhnjfabmlf?hl=ja)で保存したMarkdownファイルから画像付きスライドを自動生成
- 🎨 **10種類のカラーパレット**: シンプルからビビッドまで多彩なデザイン
- 📝 **4つのプロンプトテーマ**: シンプル、ビジネス、クリエイティブ、子供向け
- 🖼️ **ロゴアップロード**: PNGやJPEG形式のロゴを追加可能
- 🎯 **カスタムフッター**: 独自のコピーライトテキストを設定
- 💡 **インタラクティブなTips**: おすすめの使い方をトグル表示で分かりやすく説明
- 📚 **ステップバイステップガイド**: 初心者でも簡単に使える詳細な手順

## 🎥 デモ動画

使い方の詳細は以下のデモ動画をご覧ください：

**[📺 操作方法デモ動画を見る](https://www.canva.com/design/DAGwYpxyIVI/KaFbAUM9FeosRxTmXnjElw/watch?utm_content=DAGwYpxyIVI&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hae8cf46e59)**

実際の操作手順がステップバイステップで確認できます。

## 🆕 NEW! Obsidian Web Clipper対応

### 📸 画像付きスライドを簡単作成

[Obsidian Web Clipper](https://chromewebstore.google.com/detail/obsidian-web-clipper/cnjifjpddelmedmihgijeibhnjfabmlf?hl=ja)で保存したWebページを使って、画像付きのスライドショーを自動生成できるようになりました！

#### ✨ 特徴
- **🎯 ワンクリック変換**: Web記事 → Obsidian Web Clipper → このアプリ → 完成！
- **📷 画像自動検出**: 画像リンクを含むMarkdownファイルを自動識別
- **🎨 美しいUI**: 画像付きファイル検出時の視覚的フィードバック
- **💡 使い方ガイド**: トグル式のおすすめ使用方法を搭載

#### ⚠️ 重要な注意事項
- 画像レイアウトは生成後にGoogleスライドで手動調整が必要です
- 不要な画像は出力後にGoogleスライド上で削除してください
- Obsidian Web Clipperは画像リンクを保存しますが、元ページが削除されると画像が表示されなくなります

#### 🚀 使用手順
1. [Obsidian Web Clipper](https://chromewebstore.google.com/detail/obsidian-web-clipper/cnjifjpddelmedmihgijeibhnjfabmlf?hl=ja)をChromeにインストール
2. 気になるWeb記事でObsidian Web Clipperを使用してMarkdownファイルを保存
3. このアプリに保存したMarkdownファイルをアップロード
4. 「🎉 画像付きMarkdownファイルを検出しました！」の通知を確認
5. GASコードを生成して、画像付きスライドショーを作成

## 🚀 クイックスタート

### 1. アプリにアクセス
[https://gas-slide-generator.vercel.app](https://gas-slide-generator.vercel.app) を開きます。

### 2. コンテンツを入力
- テキストを直接入力
- またはMarkdown/テキストファイルをアップロード
- 🆕 **画像付きコンテンツ**: [Obsidian Web Clipper](https://chromewebstore.google.com/detail/obsidian-web-clipper/cnjifjpddelmedmihgijeibhnjfabmlf?hl=ja)で保存したMarkdownファイルをアップロードすると、画像も含むスライドを自動生成

### 3. テーマを選択
- **プロンプトテーマ**: 言葉遣いとトーンを選択
- **カラーパレット**: スライドの配色を選択

### 4. GASコードを生成
「GASコードを生成」ボタンをクリックして、Google Apps Scriptコードを取得します。

### 5. スライドを作成
1. Googleスライドで新しいプレゼンテーションを作成
2. 「拡張機能」→「Apps Script」を開く
3. 生成されたコードを貼り付け
4. `generatePresentation` 関数を実行

## 💻 ローカル開発

### 前提条件
- Node.js 18.x 以上
- npm または yarn

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/zawasasa/GAS_slide_sasa.git
cd GAS_slide_sasa

# 依存関係をインストール
npm install

# 環境変数を設定
cp .env.example .env
# .envファイルにGemini API キーを設定
echo "VITE_API_KEY=your_gemini_api_key_here" > .env

# 開発サーバーを起動
npm run dev
```

### 利用可能なスクリプト

```bash
npm run dev      # 開発サーバーを起動
npm run build    # プロダクションビルド
npm run preview  # ビルド結果をプレビュー
npm run lint     # ESLintチェック（設定されている場合）
```

## 🛠️ 技術スタック

- **フロントエンド**: React 19, TypeScript, Tailwind CSS
- **ビルドツール**: Vite
- **AI**: Google Gemini API
- **デプロイ**: Vercel

## 📖 詳細ドキュメント

詳細な使い方については、以下のドキュメントをご覧ください：

- [📘 使い方マニュアル](docs/USER_MANUAL.md) - 詳細な操作手順
- [⚙️ 設定ガイド](docs/SETUP_GUIDE.md) - 開発環境の構築方法
- [🎨 カスタマイズ](docs/CUSTOMIZATION.md) - テーマとパレットの詳細

## 🤝 貢献

プルリクエストやイシューの報告を歓迎します。

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルをご覧ください。

## 🙏 クレジット

### Special Thanks
このアプリで使用されているプロンプトは **[まじん｜AI × Google](https://x.com/Majin_AppSheet)** さんによって作成されています。

### 開発
- 開発・実装: Claude Code with Anthropic
- プロンプト設計: まじん｜AI × Google

## 🐛 バグ報告・要望

バグの報告や新機能の要望は、[GitHub Issues](https://github.com/zawasasa/GAS_slide_sasa/issues) でお気軽にお知らせください。

## 📝 更新履歴

### v2.0.0 (2025-08-21) - Obsidian Web Clipper対応
- 🆕 **画像付きMarkdownファイル対応**: Obsidian Web Clipperで保存したファイルから画像付きスライドを自動生成
- 🎨 **UI/UX大幅改善**: 
  - トグル式の「おすすめの使い方」ガイドを追加
  - 画像検出時の視覚的フィードバック強化
  - ファイルアップロード部分にMDファイル推奨メッセージを追加
- 🔗 **Obsidian Web Clipperリンク**: Chrome Web Storeへの直接リンクを複数箇所に設置
- ⚠️ **注意事項表示**: 画像レイアウト調整と不要画像削除の案内を追加
- 🙏 **クレジット更新**: 「プロンプト Thanks: まじん｜AI × Google」に表記変更
- 🧪 **テスト環境**: 画像付きMarkdownファイルのサンプル追加

### v1.0.0 (2024-12) - 初回リリース
- 🤖 基本的なAI スライド生成機能
- 🎨 カラーパレット・プロンプトテーマ選択機能
- 🖼️ ロゴアップロード機能
- 📝 Markdown/テキストファイル対応

---

**🎯 AIでスライド作成を効率化しましょう！**