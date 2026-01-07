# chap6

## 6.1.2 ナレッジベースのセットアップとデータソースの作成

### アカウントの種類
設定通りにナレッジベースを作成しようとしたが `ルートユーザーによるナレッジベースの作成はサポートされていません。IAM ユーザーまたは IAM ロールでサインインして、もう一度お試しください` と言われた。

ルートユーザはすべてのリソースに対する完全なアクセス権を持つ。
乱用を防ぐために、ルートユーザは初期設定は緊急時など限定的な状況で使用する。
普段使いするアカウントは Identity and Access Management (IAM) ユーザを使用する。
IAM ユーザは細かい権限設定が可能。

IAM ユーザ作成直後の権限は `アクセス管理 > ユーザー > 許可 > 許可ポリシー` から確認できる。
希望の権限がない場合、希望の権限を付与したユーザーグループを作成し、IAM ユーザをユーザーグループに紐づける。
今回は `AdministratorAccess` を付与したユーザーグループを作成した。

次にコンソールへのサインインするためにパスワードを発行する必要がある。
IAM ユーザ名をクリックし `セキュリティ認証情報` タブからパスワードを発行する。

## 6.1.4 ベクターストアに登録されているチャンクを確認する

### フリープランの制限
ナレッジベースに登録されているチャンクを確認するために Amazon OpenSerch Service にアクセスしようとしたところ、フリープランのアカウントからのアクセスは許可されていないと表示された。

## 6.1.5 Python で RAG フローを実装する

### 環境構築
2025/12/28 現在、単純に `pip install -r requirements.txt` を実行すると `tiktoken` のインストールに失敗する。
どうやら Rust コンパイラが必要とのこと。
JupyterLab のカーネルが `conda-pytorch-p310` だったので（Gemini くん曰く） Conda 環境に直接 Rust をインストールするのが良いとのこと。

```txt
方法1：Conda環境に直接 Rust を入れる（推奨）
SageMakerのターミナル、またはノートブックのセルで以下を実行してください。これが最も確実で、今後手動でパスを通す必要がなくなります。

# ノートブックのセルで実行する場合
!conda install -c conda-forge -y rust

# ノートブックのセルで実行する場合
!conda install -c conda-forge -y rust
なぜこれがいいのか？ Condaでインストールすると、その環境（conda-pytorch-p310）がアクティブになったときに、自動的に Rust のパスも有効になるよう設計されているからです。インストール後、そのまま pip install tiktoken が通るようになります。
```

これで必要なパッケージ全てインストールできることを確認した。

やり残したこと

- JupyterLab を VSCode と同じ使い心地にする
  - JupyterLab でコード補完できるようにする
  - JupyterLab で定義に飛べるようにする

AWS toolkit を使えば VSCode から AWS の各種サービスへアクセスできることに気づいた。
本当は WSL から接続したかったが、以下の理由から Windows 環境からアクセスするのが素直らしい。

```txt
WSL 経由で SageMaker Studio（SageMaker AI）に接続しようとした際に、Remote-SSH 拡張機能が見つからないというエラーが出るのは、VSCode の「リモート内リモート」の制限が原因です。

結論から言うと、AWS Toolkit の SageMaker 接続機能は、現時点では Windows（ローカル）上の VSCode から直接実行する必要があります。 WSL のウィンドウ内からは実行できません。

なぜエラーが出るのか？
VSCode の設計上、拡張機能には 2 つのタイプがあります。

UI 拡張機能: Windows 側で動く（Remote-SSH, テーマなど）

ワークスペース拡張機能: 接続先（WSL や SSH 先）の中で動く（Python, AWS Toolkit など）

あなたが WSL のウィンドウを開いているとき、AWS Toolkit は「WSL というリモート環境」の中で動いています。しかし、AWS Toolkit が SageMaker に接続するために呼び出そうとする Remote-SSH は Windows 側にしか存在しないため、WSL 側から見つけられず「インストールしてください」というエラーになります。
```

## 6.1.6 Streamlit で UI 付きのチャットボットをホストする
AWS が提供するサービスは多岐にわたるので、AWS の SDK (boto3) はメタプログラミングを採用している。
普通なら AWS のサービスが増えるたびに、開発者が SDK の特定のクラスにメソッドを追加する必要がある。
例えば `client.invoke_model()` を書き込まなければいけない。

しかし boto3 はサービス定義データ (JSON) を読み取り、実行時にメモリ上で `invoke_model` というメソッドを生成できるようになっている。
つまり AWS の開発者は `client` を直接編集する必要がなくなり、サービスがスケールする。
より具体的にプロセスを記述すると以下のようになる。

1. `boto3.client('s3')` と実行した瞬間、Boto3 は `s3.json` という定義ファイルを読み込みます。
2. その JSON に `"PutObject"` という項目があれば、Boto3 は `put_object` という名前のメソッドをその場でメモリ上に生成し、クライアント・オブジェクトにくっつけます。
3. これにより、ソースコード（`boto3/s3/client.py` など）には `def put_object` と書かれていないのに、私たちは `client.put_object()` と呼べるようになります。

AWS はメタプログラミングを採用しているので、`boto3.client("bedrock-runtime")` などと書いても VSCode のメソッド補完を使えない。
そういうときは `boto3-stubs` を使う。
`boto3-stubs` をインストールすると型情報が書かれたスタブファイルを参照できるようになる。


pytest を使ってテストコードを書いた。
`call_rag` のテストは成功し、以下の出力を得た。

```bash
(src) sagemaker-user@default:~/src$ uv run pytest
================================================================================ test session starts ================================================================================
platform linux -- Python 3.12.9, pytest-9.0.2, pluggy-1.6.0
rootdir: /home/sagemaker-user/src
configfile: pyproject.toml
plugins: langsmith-0.3.45, anyio-4.12.0, dotenv-0.5.2
collected 2 items                                                                                                                                                                   

tests/test_tools.py call_rag の返り値: {'answer': 'わかりません', 'thinking': '<context></context>には高橋さんの好きな飲み物についての情報がありません。'}
..

================================================================================= 2 passed in 1.98s =================================================================================
```


ローカルで Streamlit のアプリを動かせた。

FastAPI を導入した。

EC2 に backend.py をデプロイしようとしたが EC2 にうまく接続できなかった。
IAM ロールを設定したあとに VSCode からリモート接続しようとすると以下のエラーが表示される。

```bash
Failed to update connect script: Error: ENOENT: no such file or directory, open 'c:\Users\akihi\.vscode\extensions\amazonwebservices.aws-toolkit-vscode-3.91.0\resources\ec2_connect.ps1'
```

Gemini くんに聞いたら以下のように言われた。

```txt
そのエラーは、AWS Toolkit（VSCode拡張機能）が接続に使用するスクリプトファイル（ec2_connect.ps1）を見つけられないという、拡張機能側のファイル不備、またはインストール不良が原因です。
```

## 6.2.1 評価データの準備
bedrock-runtime の converse API の使い方を間違っていることに気づいた。toolConfig は使わせたいツールを指定するものであって、出力形式を整えるものではない。
Gemini くんに聞いたときは JSON モード的に使えると言われたがそうではない。
該当箇所: `backend.py` の `call_rag`