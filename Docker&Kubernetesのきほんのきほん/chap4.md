# Docker にコンテナを入れて動かしてみよう

## コンテナの作成・削除と、起動・停止

docker container rm するときにコンテナ ID の一部のみを入力するだけで OK（しらなかった）。

```bash
CONTAINER ID   IMAGE         COMMAND    CREATED             STATUS                         PORTS     NAMES
4fc1ac1b87a0   hello-world   "/hello"   About an hour ago   Exited (0) About an hour ago             stoic_boyd
```

このときに `docker container rm 4` だけで削除できた。

## コンテナと通信

コンテナと外部が通信できるようにするためにホストマシンのポートとコンテナのポートを対応付けておく必要がある。
`{ホストマシンのポート}:{コンテナのポート}` のように記述する。
例えばホストマシンのポート 8080 に入ってきたリクエストをコンテナのポート 80 につなげる場合は `docker container run -p 8080:80` と書く。