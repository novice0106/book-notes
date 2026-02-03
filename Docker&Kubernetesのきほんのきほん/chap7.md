# Docker Compose について学ぼう

## DOcker Compose のインストールと使い方

OS が管理する Python 環境にパッケージをインストールすることを system-wide インストールという。
apt やシステムツールが OS 管理の Python に依存しているので、system-wide インストールで意図せず環境を破壊し apt やシステムツールが動かなくなる恐れがある。
書籍では `sudo pip3 install docker-compose` を実行するように案内されているが、環境破壊を防ぐために PEP 668 で止められる。
ChatGPT に聞いたところ既に Docker Compose v2 が入っているらしく、`docker compose` コマンドを使えるらしい。
実際 `docker compose version` を実行できた。