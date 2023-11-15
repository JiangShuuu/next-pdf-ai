## BUILD

```sh
# dockerfile: nextjs 官方提供
docker build --file ./docker/dockerfile -t mfv3 .

# dockerfile_no_install: node_modules 存在，不執行 yarn install
docker build --file ./docker/dockerfile_no_install -t mfv3 .

# dockerfile_arg_no_install: 需代入 arg 參數，node_modules 存在，不執行 yarn install
docker build --build-arg ENV=beta --file ./docker/dockerfile_arg_no_install -t mfv3_beta .

# 使用linux/arm64平台編譯
docker buildx build --platform linux/arm64 -t xxxx . --push

# 刪除舊的image/container
docker stop mfv3_beta
docker rm mfv3_beta
docker rmi mfv3_beta

# Image上傳至伺服器
docker save [image_name] | ssh -C [user]@[ip] docker load
```

# RUN

```sh
docker run --name mfv3_beta -p 3000:3000 \
--restart unless-stopped \
-d mfv3_beta:latest
```
