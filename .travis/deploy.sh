#!/usr/bin/env bash
ssh root@$HOST_IP <<EOD
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker pull $CMS_IMAGE_NAME
docker stop $CMS_CONTAINER_NAME || true && docker rm $CMS_CONTAINER_NAME || true
docker run --env-file /root/$VIRTUAL_HOST/envs_db -v /root/$VIRTUAL_HOST/data-db:/data/db -d --name $DB_CONTAINER_NAME mongo:latest
docker run --env-file /root/$VIRTUAL_HOST/envs_cms -e VIRTUAL_HOST=www.$VIRTUAL_HOST,$VIRTUAL_HOST -e LETSENCRYPT_HOST=$VIRTUAL_HOST -d --link $DB_CONTAINER_NAME:db --name $CMS_CONTAINER_NAME $CMS_IMAGE_NAME
if [ "$(docker ps -q -f name=nginx)" ]; then
  docker exec nginx nginx -s reload
fi
EOD
