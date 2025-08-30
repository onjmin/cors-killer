# cors-killer
CORS 制限を回避して URL を安全に扱えるユーティリティ

## 特徴
- **プロキシを通さなくてもよい URL は素通し**  
  既に CORS 対応済みの代表的なサービスの URL（例: Imgur、Wikipedia、Unsplash）や
  Base64 埋め込み形式の data URI は、そのまま返して取得。  
  こうすることで、プロキシを経由せずに済み、可用性を維持できる。

- **その他の URL は自動でプロキシ経由**  
  上記以外の URL は、公開・無認証のプロキシをランダムで経由して安全に取得。  
  使用するプロキシ例：
    - https://api.allorigins.win/raw?url=...
    - https://corsproxy.io/?...
    - https://api.codetabs.com/v1/proxy?quest=...

- **余計な機能なし**  
  エクスポートされる関数は `corsKiller` ただ1つ。  
  引数は URL 文字列、返り値も文字列で返されるシンプル設計。

- **軽量 & 依存少なめ**  
  追加ライブラリ不要で簡単に導入

- **Node.js / ブラウザ対応**  
  型安全な TypeScript で両環境で利用可能

- **おんJ民が作っている**  
  質問や相談はフォーラムで: [質問フォーラム](https://unj.netlify.app)

## インストール
```sh
npm i @onjmin/cors-killer
```

## 使用例

### Node.js / ES Modules
```ts
import { corsKiller } from "@onjmin/cors-killer";

const url = "https://example.com/image.png"; // CORS非対応
const safeUrl = corsKiller(url);

console.log(safeUrl); // CORS対応済みURL
// https://api.allorigins.win/raw?url=https://example.com/image.png
```

### ブラウザでの使用
```js
const { corsKiller } = await import("https://cdn.jsdelivr.net/npm/@onjmin/cors-killer/dist/index.min.mjs");

const url = "https://example.com/image.png"; // CORS非対応
const safeUrl = corsKiller(url);
console.log(safeUrl); // CORS対応済みURL
// https://api.allorigins.win/raw?url=https://example.com/image.png
```

## 注意点
- 公開プロキシを経由する場合、アクセスの安定性はプロキシサービスに依存
- 画像以外のリソースも扱えるが、ホワイトリスト外はプロキシ経由になる

## リンク集
- 🌟 [GitHubリポジトリ](https://github.com/onjmin/cors-killer)
- 🛫 [仕様書 / ドキュメント](https://onjmin.github.io/cors-killer)
- 📦 [npm パッケージ](https://www.npmjs.com/package/@onjmin/cors-killer)
- ✅ [カバレッジ](https://onjmin.github.io/cors-killer/coverage)

## ライセンス / License
- **AGPL-3.0**  
  本プロジェクト全体には AGPL-3.0 ライセンスが適用されます。詳細は ``LICENSE`` をご覧ください。

## 開発者 / Author
- [おんJ民](https://github.com/onjmin)
