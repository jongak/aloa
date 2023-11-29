## 프로젝트 빌드

#### git pull

현재 사용자가 root일 경우

```
root $cd /aloa
root $sudo chown -R ubuntu:ubuntu ./
root $su ubuntu
ubuntu $git pull
```

현재 사용자가 ubuntu일 경우

```
ubuntu $cd /aloa
ubuntu $git pull
```

#### root로 권한 변경

root사용자로 변경해야한다.

```
ubuntu $sudo chown -R root:root ./
ubuntu $sudo su
root $...
```

#### app-server 빌드

```
root $cd aloa/app-server
root $npm run build /
```

#### api-server 실행

```
root $cd ../api-server
root $npm start
```

#### 통합 서버 구동

pm2이용하여 background에서 서버실행

```
root $sudo pm2 start --name aloa npm -- start
```

#### 로그 메세지 확인

```
root $sudo pm2 logs aloa
```

#### 서버 재시작

```
root $sudo pm2 restart aloa
```

#### PM2 클러스터

```
root $sudo pm2 start --name aloa npm -- start --watch
```

#### 서버 접속자수 파악

```
netstat -anp | grep -E ":80 |:443 " | grep ESTABLISHED | wc -l
```
