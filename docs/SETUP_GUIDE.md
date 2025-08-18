# ⚙️ 開発環境構築ガイド

## 目次
1. [事前準備](#事前準備)
2. [プロジェクトのセットアップ](#プロジェクトのセットアップ)
3. [環境変数の設定](#環境変数の設定)
4. [開発サーバーの起動](#開発サーバーの起動)
5. [デプロイ方法](#デプロイ方法)
6. [トラブルシューティング](#トラブルシューティング)

---

## 事前準備

### 必要なソフトウェア

#### 1. Node.js
- **バージョン**: 18.x 以上
- **推奨**: 20.x（LTS）
- **ダウンロード**: [nodejs.org](https://nodejs.org/)

確認方法:
```bash
node --version  # v20.x.x
npm --version   # 10.x.x
```

#### 2. Git
- **バージョン**: 2.x 以上
- **ダウンロード**: [git-scm.com](https://git-scm.com/)

確認方法:
```bash
git --version  # git version 2.x.x
```

#### 3. テキストエディタ
推奨エディタ:
- **Visual Studio Code** (推奨)
- WebStorm
- Sublime Text

### 必要なアカウント

#### 1. Google Cloud Console
- [console.cloud.google.com](https://console.cloud.google.com/)
- Gemini API キーの取得に必要

#### 2. GitHub（任意）
- [github.com](https://github.com/)
- ソースコード管理用

#### 3. Vercel（デプロイ用）
- [vercel.com](https://vercel.com/)
- 本番環境デプロイ用

---

## プロジェクトのセットアップ

### 1. リポジトリのクローン

```bash
# HTTPSでクローン
git clone https://github.com/zawasasa/GAS_slide_sasa.git

# またはSSHでクローン（SSH鍵設定済みの場合）
git clone git@github.com:zawasasa/GAS_slide_sasa.git

# プロジェクトディレクトリに移動
cd GAS_slide_sasa
```

### 2. 依存関係のインストール

```bash
# npmを使用
npm install

# またはyarnを使用
yarn install

# またはpnpmを使用
pnpm install
```

### 3. プロジェクト構造の確認

```
GAS_slide_sasa/
├── components/          # Reactコンポーネント
│   ├── Header.tsx
│   ├── InputArea.tsx
│   ├── StatusArea.tsx
│   └── ...
├── constants/           # 定数・設定
│   ├── colorPalettes.ts
│   └── promptThemes.ts
├── services/            # APIサービス
│   └── geminiService.ts
├── utils/               # ユーティリティ
│   └── fileProcessor.ts
├── docs/                # ドキュメント
├── public/              # 静的ファイル
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 環境変数の設定

### 1. Gemini API キーの取得

#### Google Cloud Consoleでの手順:

1. **プロジェクトの作成**
   - [console.cloud.google.com](https://console.cloud.google.com/) にアクセス
   - 新しいプロジェクトを作成

2. **Gemini APIの有効化**
   - 「APIとサービス」→「ライブラリ」
   - 「Generative AI API」を検索
   - 「有効にする」をクリック

3. **API キーの作成**
   - 「APIとサービス」→「認証情報」
   - 「認証情報を作成」→「APIキー」
   - 生成されたキーをコピー

4. **API キーの制限（推奨）**
   - 作成したAPIキーを選択
   - 「アプリケーションの制限」で適切な制限を設定
   - 「APIの制限」で「Generative AI API」のみを許可

### 2. 環境変数ファイルの作成

```bash
# .envファイルを作成
cp .env.example .env

# または手動で作成
touch .env
```

### 3. .envファイルの編集

```bash
# .envファイルの内容
VITE_API_KEY=your_gemini_api_key_here
```

**重要**: 
- .envファイルは.gitignoreに含まれており、Gitにコミットされません
- API キーは絶対に公開リポジトリにコミットしないでください

---

## 開発サーバーの起動

### 1. 開発サーバーの起動

```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev
```

### 2. アクセス確認

- **URL**: http://localhost:5173/
- **ポート変更**: vite.config.tsで設定可能

### 3. 開発時の便利な機能

#### ホットリロード
- ファイル保存時に自動でブラウザが更新
- TypeScriptエラーをリアルタイム表示

#### 開発ツール
- React Developer Tools（ブラウザ拡張）
- TypeScript型チェック

---

## デプロイ方法

### 1. ローカルビルドテスト

```bash
# プロダクションビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

### 2. Vercelでのデプロイ

#### 方法1: Vercel CLI（推奨）

```bash
# Vercel CLIのインストール
npm install -g vercel

# ログイン
vercel login

# デプロイ
vercel --prod
```

#### 方法2: GitHub連携

1. **GitHubにプッシュ**
   ```bash
   git add .
   git commit -m "feat: ready for deployment"
   git push origin main
   ```

2. **Vercelでプロジェクトインポート**
   - [vercel.com](https://vercel.com/) にログイン
   - 「New Project」をクリック
   - GitHubリポジトリを選択
   - 自動デプロイが開始

### 3. 環境変数の設定（Vercel）

```bash
# Vercel CLIでの環境変数設定
vercel env add VITE_API_KEY production
vercel env add VITE_API_KEY preview
vercel env add VITE_API_KEY development
```

または、Vercelダッシュボードから設定:
1. プロジェクト設定を開く
2. 「Environment Variables」タブ
3. `VITE_API_KEY` を追加

---

## トラブルシューティング

### よくある問題と解決方法

#### 1. `npm install` が失敗する

**エラー例**:
```
npm ERR! peer dep missing
```

**解決方法**:
```bash
# npmキャッシュをクリア
npm cache clean --force

# node_modulesを削除して再インストール
rm -rf node_modules
npm install
```

#### 2. TypeScriptエラー

**エラー例**:
```
Property 'xxx' does not exist on type 'yyy'
```

**解決方法**:
- 型定義ファイルを確認
- `npm run type-check` でエラー詳細を確認
- 必要に応じて型定義を追加

#### 3. Viteビルドエラー

**エラー例**:
```
Failed to resolve import
```

**解決方法**:
```bash
# 依存関係の再インストール
npm ci

# Viteキャッシュのクリア
npx vite --force
```

#### 4. APIキーエラー

**エラー例**:
```
VITE_API_KEY environment variable not set
```

**解決方法**:
- .envファイルの確認
- 環境変数名の確認（VITE_プレフィックス必須）
- 開発サーバーの再起動

#### 5. ポート衝突

**エラー例**:
```
Port 5173 is already in use
```

**解決方法**:
```bash
# 別のポートで起動
npm run dev -- --port 3000

# または使用中プロセスを停止
lsof -ti:5173 | xargs kill -9
```

### デバッグ方法

#### 1. ブラウザの開発者ツール
- F12またはCmd+Option+I
- Consoleタブでエラーログを確認
- Networkタブでリクエスト状況を確認

#### 2. VSCodeでのデバッグ
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug React App",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceRoot}",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"]
    }
  ]
}
```

#### 3. ログレベルの調整
```bash
# より詳細なログを出力
DEBUG=vite:* npm run dev
```

### パフォーマンス最適化

#### 1. ビルドサイズの最適化
```bash
# バンドルアナライザーでサイズ確認
npm install -g webpack-bundle-analyzer
npx vite-bundle-analyzer dist
```

#### 2. 依存関係の最適化
```bash
# 不要な依存関係をチェック
npm audit
npm audit fix

# outdatedパッケージの確認
npm outdated
```

---

## 開発ガイドライン

### コードスタイル

#### 1. TypeScript
- 型定義を明確に記述
- `any`の使用を避ける
- インターフェースを活用

#### 2. React
- 関数コンポーネントを使用
- Hooksを適切に活用
- プロパティの型定義を明確に

#### 3. ファイル命名規則
- コンポーネント: PascalCase（例: `InputArea.tsx`）
- ユーティリティ: camelCase（例: `fileProcessor.ts`）
- 定数: camelCase（例: `colorPalettes.ts`）

### Git管理

#### 1. ブランチ戦略
```bash
# 機能開発
git checkout -b feature/new-feature
git checkout -b fix/bug-fix

# 緊急修正
git checkout -b hotfix/urgent-fix
```

#### 2. コミットメッセージ
```bash
# 例
feat: add color palette selector
fix: resolve API key validation error
docs: update setup guide
refactor: improve error handling
```

---

**🔧 開発環境の構築について質問がある場合は、[GitHub Issues](https://github.com/zawasasa/GAS_slide_sasa/issues) でお気軽にお聞かせください。**