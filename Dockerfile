# 어떤 환경에서 도커 이미지를 만들지 결정하기.
FROM node:18.10.0-slim

# 도커 컨테이너 내부의 작업 디렉토리 결정하기. 원하는 대로 정하면 됩니다.
WORKDIR /usr/src/app

# 외부 패키지 설치를 위해 package.json과 yarn.lock 파일 복사
COPY package.json .
COPY yarn.lock .

RUN yarn install
# 나머지 모두 복사
COPY . .

# 도커 컨테이너에 접근할 수 있게 포트 열어주기
EXPOSE 3000

# 앱 실행시키기
CMD [ "yarn", "start" ]