# Docker Compose について学ぼう

## DOcker Compose のインストールと使い方

OS が管理する Python 環境にパッケージをインストールすることを system-wide インストールという。
apt やシステムツールが OS 管理の Python に依存しているので、system-wide インストールで意図せず環境を破壊し apt やシステムツールが動かなくなる恐れがある。
書籍では `sudo pip3 install docker-compose` を実行するように案内されているが、環境破壊を防ぐために PEP 668 で止められる。
ChatGPT に聞いたところ既に Docker Compose v2 が入っているらしく、`docker compose` コマンドを使えるらしい。
実際 `docker compose version` を実行できた。

## Docker Compose ファイルの書き方

YAML ファイルの書き方。

`key: value` でマップを表し、`- item` でリストを表す。

```yml
services:
  mysql000ex11:
    image: mysql:5.7
    networks:
      - wordpress000net1
    volumes:
      - mysql000vol11:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: myrootpass
      MYSQL_DATABASE: wordpress000db
      MYSQL_USER: wordpress000kun
      MYSQL_PASSWORD: wkunpass
```

上記例では networks キーに紐づくリストとして `[wordpress000net1]` を指定している。
また、environment キーに紐づく値としてマップ

```
{
    "MYSQL_ROOT_PASSWORD": myrootpass
    ...
}
```

を指定している。