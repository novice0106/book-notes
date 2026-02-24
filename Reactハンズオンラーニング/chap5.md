## 5.2 レシピのコンポーネントを JSX で記述する

作成した html を直接開くと React Developer Tools が認識してくれず, Components タブが表示されない.
理屈は知らないが React Developer Tools は Web ページにフック用のをスクリプトを注入することでコンポーネントツリーを React Developer Tools へ送信するらしい.
ディレクトリ内の html ファイルを直接ブラウザで開くとローカルファイル扱いされるので React Developer Tools が認識できない.

```bash
python3 -m http.server 8000
```

でサーバを立てて `http://localhost:8000/chap5.html` でファイルを要求すれば認識してくれる.

本の注釈に拡張機能の設定から「ファイルの URL へのアクセスを許可する」を有効にすればローカルファイルも認識できると書いてあった.
その通りだった.

## 5.3 webpack を使ってビルド環境を構築する

React 18 以降 `ReactDOM.render` が削除されたので, 書籍の通りに `index.js` を書いてもエラーが起きる.
`import { ReactDOM } from "react-dom"` の代わりに `import { createRoot } from "react-dom/client"` と書こう. 