# Docker を使ってみよう

## Docker のインストール

書籍では Docker エンジンを使っているが、職場では使えないので WSL2 を物理マシンだと思って環境構築する。
ChatGPT に Ubuntu 用の[インストール手順](https://docs.docker.com/engine/install/ubuntu/)をそのまま使っていいか聞いたら以下のように回答を得た。

- 基本的に OK だが、前提条件を理解しておく必要がある。
- 公式の手順は systemd を使えることが前提である。もし手元の WSL2 が systemd を有効化していなかったらインストール自体はできるが Docker デーモンが起動しない。

systemd とは OS の管理プロセスで、PID は 1 である。
全てのプロセスは systemd の配下に置かれ、他のプロセスがゾンビ化しないように（再）起動を管理しているらしい。

手元の WSL2 が systemd を有効化しているかは `ps -p 1 -o comm=` で確認できる。

apt が何をしているか全然知らなかったので

```txt
# Add Docker's official GPG key:
sudo apt update
sudo apt install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Signed-By: /etc/apt/keyrings/docker.asc
EOF

sudo apt update
```

を題材に処理内容をまとめておく。
Advanced Package Tool (apt) は安全性を守るために、登録済みかつ安全だと認められたリポジトリからのみソフトウェアをダウンロードする。
上記手順が GPG キーの追加とリポジトリの追加パートに分かれているのはそのためである。
`sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc` で Docker 公式から公開鍵（GNU Privacy Guard キー、GPG キー）を取得する。
ここでダウンロードした公開鍵と Docker のリポジトリが持つ秘密鍵を照合して初めて安全だと認められる。
次に Docker 公式の apt リポジトリを手元のマシンに登録する。
これが sudo tee 以下の処理である。