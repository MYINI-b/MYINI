#!/usr/bin/env bash

RESPONSE_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://k7b203.p.ssafy.io/api/port)

echo "> 응답 코드 $RESPONSE_CODE"
if [ $RESPONSE_CODE -ge 400 ]
then
    CURRENT_PORT=8082
else
    CURRENT_PORT=$(curl -s https://k7b203.p.ssafy.io/api/port)
fi

echo "> 현재 구동중인 포트 $CURRENT_PORT"
if [ ${CURRENT_PORT} -eq 8081 ]
then
    IDLE_PORT=8082
elif [ ${CURRENT_PORT} -eq 8082 ]
then
    IDLE_PORT=8081
else
    echo "> 현재 구동중인 포트가 없습니다."
    echo "> IDLE_PORT: 8081로 할당"
    IDLE_PORT=8081
fi

echo "> $IDLE_PORT 에서 실행중인 도커 컨테이너 종료"
sudo docker stop ${IDLE_PORT}
sudo docker rm ${IDLE_PORT}

echo "> 도커 이미지 최신 버전 pull"
sudo docker pull gksekqls9808/myini-api:latest

echo "> 도커 실행 포트:$IDLE_PORT"
sudo docker run -d --name $IDLE_PORT -p ${IDLE_PORT}:${IDLE_PORT} -e "server.port=${IDLE_PORT}" -e TZ=Asia/Seoul gksekqls9808/myini-api:latest

echo "> 사용하지 않는 도커 이미지 삭제"
docker rmi -f $(docker images -f "dangling=true" -q) || true

echo "> $IDLE_PORT 15 초 후 Health Check 시작"
echo "> curl -s http://localhost:$IDLE_PORT/actuator/health "
sleep 20


for RETRY_COUNT in {1..10}
do
  RESPONSE=$(curl -s http://localhost:${IDLE_PORT}/actuator/health)
  UP_COUNT=$(echo ${RESPONSE} | grep 'UP' | wc -l)

  if [ ${UP_COUNT} -ge 1 ] # $up_count >= 1 ("UP" 문자열이 있는지 검증)
  then
      echo "> Health check 성공"
      echo "> 전환할 Port: $IDLE_PORT"
      echo "> Port 전환"
      echo "set \$service_url http://127.0.0.1:${IDLE_PORT};" | sudo tee /etc/nginx/conf.d/service-url.inc
      echo "> 엔진엑스 Reload"
      sudo service nginx reload
      break
  else
      echo "> Health check의 응답을 알 수 없거나 혹은 실행 상태가 아닙니다."
      echo "> Health check: ${RESPONSE}"
  fi

  if [ ${RETRY_COUNT} -eq 10 ]
  then
      echo "> Health check 실패. "
      echo "> 엔진엑스에 연결하지 않고 배포를 종료합니다."
      exit 1
  fi

  echo "> Health check 연결 실패. 재시도…"
  sleep 10
done
