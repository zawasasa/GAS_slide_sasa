import React from 'react';

const TutorialCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
      <div className="text-center border-b border-gray-200 pb-4">
        <h3 className="text-lg font-semibold text-gray-900">📝 スライド作成の手順</h3>
        <p className="text-sm text-gray-600 mt-1">初心者の方でも簡単にスライドを作成できます</p>
      </div>

      <div className="space-y-4">
        {/* ステップ1 */}
        <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
          <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            1
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">Googleスライドを開く</h4>
            <p className="text-sm text-gray-600 mt-1">
              <a href="https://slides.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                slides.google.com
              </a> で新しいプレゼンテーションを作成
            </p>
          </div>
        </div>

        {/* ステップ2 */}
        <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
          <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            2
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">Apps Scriptを開く</h4>
            <p className="text-sm text-gray-600 mt-1">
              Googleスライドのメニューから「拡張機能」→「Apps Script」をクリック
            </p>
          </div>
        </div>

        {/* ステップ3 */}
        <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
          <div className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            3
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">コードを貼り付け</h4>
            <p className="text-sm text-gray-600 mt-1">
              生成されたGASコードを全選択してコピー → エディタに貼り付け
            </p>
          </div>
        </div>

        {/* ステップ4 */}
        <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
          <div className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            4
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">関数を実行</h4>
            <p className="text-sm text-gray-600 mt-1">
              「generatePresentation」を選択して実行ボタン（▶️）をクリック
            </p>
          </div>
        </div>

        {/* ステップ5 */}
        <div className="flex items-start space-x-3 p-3 bg-pink-50 rounded-lg">
          <div className="flex-shrink-0 w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
            5
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">完成！</h4>
            <p className="text-sm text-gray-600 mt-1">
              Googleスライドが自動生成されます。必要に応じて編集してください
            </p>
          </div>
        </div>
      </div>

      {/* 注意事項 */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">⚠️ 注意点</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• 必ずGoogleスライドから「拡張機能」→「Apps Script」でエディタを開いてください</li>
          <li>• 初回実行時はGoogleアカウントの認証が必要です</li>
          <li>• 「スライドへのアクセス許可」を求められたら「許可」をクリック</li>
          <li>• 生成には1〜2分程度かかる場合があります</li>
        </ul>
      </div>

    </div>
  );
};

export default TutorialCard;