## 문제 상황

> aws ec2로 http로 접속은 가능했으나, https 적용중 에러 발생

### .greenlock 설정

```
api/bin/www-https

var path = require("path");
var app = require("../app");
require("greenlock-express")
  .init({
    packageRoot: path.join(__dirname, ".."),
    configDir: path.join(__dirname, "..", "greenlock.d"),
    maintainerEmail: "aloateams@gmail.com",
    cluster: false,
  })
  .serve(app); // Serves on 80 and 443
```

```
api/greenlock.d/config.json

{
  "sites": [
    {
      "subject": "aloa.kr",
      "altnames": ["aloa.kr"]
    }
  ]
}
```

```
api/package.json

...
  "scripts": {
    "start": "cross-env NODE_ENV=production node ./bin/www-https",
    "dev": "cross-env NODE_ENV=development nodemon ./bin/www",
    "local": "cross-env NODE_ENV=local nodemon ./bin/www"
  },
...

```

### aws 설정

[AWS 환경에서 node 앱 https 서비스 하기](https://stackhoarder.com/2021/04/13/aws-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-node-%EC%95%B1-https-%EC%84%9C%EB%B9%84%EC%8A%A4-%ED%95%98%EA%B8%B0/)> 참조

## 상황

local에서 진행하였을때 정상적으로 작동, 다만 aws위에서 **npm start** 진행하였을때 해당 에러코드 발생

```
Error: listen EACCES: permission denied 0.0.0.0:80
EACCES: '0.0.0.0:80'
```

#### 해결책

해당 문제는 권한이 없어 발생 **sudo npm start** 로 진행

## 상황

해당 에러코드들 발생

```
SyntaxError: Unexpected token '.'
    at wrapSafe (internal/modules/cjs/loader.js:915:16)
    at Module._compile (internal/modules/cjs/loader.js:963:27)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1027:10)
    at Module.load (internal/modules/cjs/loader.js:863:32)
    at Function.Module._load (internal/modules/cjs/loader.js:708:14)
    at Module.require (internal/modules/cjs/loader.js:887:19)
    at require (internal/modules/cjs/helpers.js:74:18)
    at Object.<anonymous> (/home/ubuntu/aloa/api-server/node_modules/@aws-sdk/client-s3/dist-cjs/index.js:5:22)
    at Module._compile (internal/modules/cjs/loader.js:999:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1027:10)


SyntaxError: Unexpected token '('
    at wrapSafe (internal/modules/cjs/loader.js:915:16)
    at Module._compile (internal/modules/cjs/loader.js:963:27)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1027:10)
    at Module.load (internal/modules/cjs/loader.js:863:32)
    at Function.Module._load (internal/modules/cjs/loader.js:708:14)
    at Module.require (internal/modules/cjs/loader.js:887:19)
    at require (internal/modules/cjs/helpers.js:74:18)
    at Object.<anonymous> (/home/ubuntu/aloa/api-server/node_modules/lru-cache/dist/cjs/index-cjs.js:5:36)
    at Module._compile (internal/modules/cjs/loader.js:999:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1027:10)
```

### 해결책

mysql2, aws-sdk/client-s3, node 버전문제일 가능성 높음

23년 11월 기준

```
$npm uninstall mysql2
$npm install mysql2@3.0.0

$sudo npm install @aws-sdk/client-s3@3.34.0
```

node는 v20.10.0 사용

## 상황

다시 80포트 권한없음 뜸

```
Error: listen EACCES: permission denied 0.0.0.0:80
You don't have prmission to access '0.0.0.0:80'.
You probably need to use "sudo" or "sudo setcap 'cap_net_bind_service=+ep' $(which node)"
```

### 해결책

```
$sudo setcap 'cap_net_bind_service=+ep' $(which node)
```

해당코드 입력하여 sudo 없이도 80포트 입력하게 해봤지만 무한로딩에 걸려 초기화

### 해결책

그러던중 [[Error] permission denied 0.0.0.0:80
](https://systorage.tistory.com/entry/Error-permission-denied-000080)> 글을 보게되어 모든파일의 사용자를 변경해보았다.

```
$ cd /
$ sudo chown -R root:root ./  // 하위폴더의 모든 파일 권한을 root로 변경
$ sudo su                     // root로 로그인
$ npm start
```

## 해결완료

거의 다왔다!

```
Error: listen EADDRINUSE: address already in use 0.0.0.0:80
'0.0.0.0:80' is already being used by some other program.
You probably need to stop that program or restart your computer.
```

80포트가 이미사용중이라 끄고 진행하였음

```
$netstat -tnlp //포트 확인
$sudo fuser -k 80/tcp //80포트 kill
$npm start
```

이렇게 했더니 https://aloa.kr에 성공적으로 접속 가능하였다. 이제 https://api.aloa.kr만 살려서 api서버로 만들면 될것 같다.
