# 启动

1. 根目录pnpm i
2. 去到/apps/server里面更改.env文件的DATABASE_URL变成自己的mysql数据库(确保mysql已开)
3. 打开终端 cd ./apps/server
4. npx prisma generate
5. npx prisma db push
6. 最后回到根目录pnpm dev即可
7. 初始账号密码为admin 12345678
