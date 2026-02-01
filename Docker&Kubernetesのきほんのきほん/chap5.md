# Docker に複数のコンテナを入れて動かしてみよう

## WordPress のコンテナと MySQL コンテナを作成し、動かしてみよう

MySQL の最新版イメージは `--default-authentication-plugin` オプションが廃止されているようなので代わりに mysql:8.0 を使っている。

```bash
sudo docker container run -dit --name mysql000ex11 --net=wordpress000net1 -e MYSQL_ROOT_PASSWORD=myrootpass -e MYSQL_DATABASE=wordpress000db -e MYSQL_USER=wordpress000kun -e MYSQL_PASSWORD=wkunpass mysql:8.0 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --default-authentication-plugin=mysql_native_password
```

WordPress のコマンドは変更無し。

```bash
sudo docker container run --name wordpress000ex12 -dit --net=wordpress000net1 -p 8085:80 -e WORDPRESS_DB_HOST=mysql000ex11 -e WORDPRESS_DB_NAME=wordpress000db -e WORDPRESS_DB_USER=wordpress000kun -e WORDPRESS_DB_PASSWORD=wkunpass wordpress
```