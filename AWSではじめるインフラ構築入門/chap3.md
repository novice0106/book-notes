## 3.2 IAM のダッシュボードによる安全性の確認

### 3.2.1 ルートユーザのアクセスキーの削除

AWS は CLI でリソースを管理する機能も提供している。
アクセスキーはプログラムがリソースを操作する際に要求される。
ルートユーザは強力な権限を持っているので、ルートユーザとしてプログラムを実行すると大事故につながる危険がある。
そのためルートユーザのアクセスキーは存在しない状態にするのがベスト・プラクティス。

### その他

AWS生成AIアプリ構築実践ガイドを読んでいる時に Knowledge Base を作成した。
この時に自動作成された Amazon OpenSerch Service のコレクションを削除するのに手間取ったのでここにメモしておく。

IAM コンソールから OpenSearch Service に紐づいたロールを削除しようとしてもコレクションが残っているとのことで拒否される。
OpenSerch Service のコンソールへアクセスしようとすると free プランだから駄目と言われる。
Gemini くんに聞いたら CloudShell から以下のコマンドを打ち込むと良いと教えてもらって実行したら削除できた。

```shell
~ $ aws opensearchserverless list-collections
{
    "collectionSummaries": [
        {
            "id": "yp4uqde6ghukxb1nv6u8",
            "name": "bedrock-knowledge-base-xjvyjy",
            "status": "ACTIVE",
            "arn": "arn:aws:aoss:us-west-2:308665178685:collection/yp4uqde6ghukxb1nv6u8"
        }
    ]
}
~ $ aws opensearchserverless delete-collection --id yp4uqde6ghukxb1nv6u8 --region us-west-2
{
    "deleteCollectionDetail": {
        "id": "yp4uqde6ghukxb1nv6u8",
        "name": "bedrock-knowledge-base-xjvyjy",
        "status": "DELETING"
    }
}
~ $ aws opensearchserverless list-collections
{
    "collectionSummaries": []
}
```