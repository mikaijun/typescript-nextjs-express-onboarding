## 環境構築

### 依存関係のインストール

```
docker-compose run --rm app yarn install
```

### APIドキュメントやバックエンドルーディングの自動生成

```
docker-compose run --rm app yarn build
```

### アプリケーションとデータベースの起動

```
docker compose up -d
```

下記URLにアクセスしてSwaggerが表示されることを確認
http://localhost:8082/docs/

## マイグレーション

Prismaのスキーマファイル（schema.prisma）に基づいてデータベースにマイグレーションを反映

```
docker-compose run --rm app yarn migration
```

### データベースの初期化とスキーマの再適用

```
docker-compose run --rm app yarn migration:reset
```

## コードフォーマット

### コードフォーマットのチェック

チェックだけで修正は行われない

```
docker-compose run --rm app yarn lint
```

### コードフォーマットの修正

```
docker-compose run --rm app yarn lint:fix
```

## テスト

```
docker-compose run --rm app yarn test
```

## フロントエンド用の型定義出力

バックエンドのSwaggerドキュメントを元に、フロントエンドで使用するTypeScript型定義とAPIクライアントを自動生成

```
yarn generate
```

※以下の理由でローカルマシンのyarnで実行しています

> Dockerコンテナが相対パスでホストのbackendディレクトリ外にあるファイルやフォルダを直接アクセスできないため。たとえば、Dockerコンテナ内で/app以下にあるファイルは操作できますが、/app/../frontendのようなbackendディレクトリ外のパスには直接アクセスできないため
