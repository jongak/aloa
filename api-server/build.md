# API Server 빌드 가이드

## 필수 요구사항

- Node.js v21.2.0 이상
- MySQL 서버
- AWS 계정 (S3 버킷 사용)

## 환경 설정

1. 프로젝트 루트에 다음 환경 변수 파일들을 생성하세요:

- `.env` : 기본 환경 설정
- `.env.development` : 개발 환경 설정
- `.env.production` : 운영 환경 설정
- `.env.local` : 로컬 환경 설정

각 환경 변수 파일에 다음 내용을 포함해야 합니다:

## DB 설정

DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name

## AWS 설정

AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_REGION=your_region
AWS_S3_BUCKET=your_s3_bucket_name

## 포트

PORT=3000

## 설치 및 실행

1. 프로젝트 루트에서 다음 명령어를 실행하여 필요한 패키지를 설치하세요:

```bash
npm install
```

2. 개발 서버를 실행하려면 다음 명령어를 실행하세요:

- 기본 모드:

```bash
npm run dev
```

- 로컬 모드:

```bash
npm run local
```

- 운영 모드:

```bash
npm run dev:production
```
