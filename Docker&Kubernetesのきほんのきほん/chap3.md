# Docker を使ってみよう

## Docker のインストール

書籍では Docker エンジンを使っているが、職場では使えないので WSL2 を物理マシンだと思って環境構築する。
ChatGPT に Ubuntu 用の[インストール手順](https://docs.docker.jp/engine/installation/linux/ubuntulinux.html)をそのまま使っていいか聞いたら以下のように回答を得た。

- 基本的に OK だが、前提条件を理解しておく必要がある。
- 公式の手順は systemd を使えることが前提である。もし手元の WSL2 が systemd を有効化していなかったらインストール自体はできるが Docker デーモンが起動しない。

systemd とは OS の管理プロセスで、PID は 1 である。
全てのプロセスは systemd の配下に置かれ、他のプロセスがゾンビ化しないように（再）起動を管理しているらしい。

手元の WSL2 が systemd を有効化しているかは `ps -p 1 -o comm=` で確認できる。