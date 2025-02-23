# 앱 빌드 가이드

## 필수 요구사항

- Node.js 14.0.0 이상
- npm 또는 yarn 패키지 매니저

## 환경 설정

1. 프로젝트 루트에 다음 환경 변수 파일들을 생성하세요:
   - `.env.development` (개발 환경)
   - `.env.production` (배포 환경)
   - `.env.local` (로컬 환경)
2. 각 환경 변수 파일에 필요한 설정을 추가하세요:

   ```
   # 개발 환경 (.env.development)
   VUE_APP_API_URL=http://localhost:8080
   VUE_APP_ENV=development

   # 배포 환경 (.env.production)
   VUE_APP_API_URL=https://api.example.com
   VUE_APP_ENV=production
   ```

## 프로젝트 설치

1. 프로젝트 디렉토리로 이동:

   ```bash
   cd app-server
   ```

2. 의존성 패키지 설치:
   ```bash
   npm install
   # 또는
   yarn install
   ```

## 개발 서버 실행

개발 모드로 앱을 실행하려면:

```bash
  npm start
  # 또는
  yarn start
```

- 개발 서버는 http://localhost:3000 에서 실행됩니다.
- 개발 서버는 환경 변수에 따라 자동으로 선택됩니다.

## 빌드

프로덕션 모드로 빌드하려면:

```bash
npm run build
# 또는
yarn build
```

빌드 결과물은 `build` 폴더에 생성됩니다:

- 최적화된 프로덕션 번들
- 압축된 정적 파일들
- 소스맵 제외됨 (GENERATE_SOURCEMAP=false)

## 주요 의존성 패키지

json:app-server/package.json

## 배포 전 확인 사항

1. 환경 변수 확인

   - .env.production 파일이 올바르게 설정되어 있는지 확인
   - API 서버 주소가 올바른지 확인
   - 프론트엔드 서버 주소가 올바른지 확인

2. 리소스 확인

   - 모든 이미지와 아이콘 파일이 존재하는지 확인
   - 외부 CDN 리소스가 접근 가능한지 확인

3. 성능 최적화
   - 불필요한 console.log() 제거
   - 미사용 코드 제거
   - 이미지 최적화

## 배포

빌드된 파일들은 다음과 같은 정적 호스팅 서비스에 배포할 수 있습니다:

- Netlify
- Vercel
- AWS S3
- GitHub Pages

## 문제해결

빌드 실패시 확인사항:

1. Node.js 버전 호환성 확인
2. 필요한 모든 의존성이 설치되어 있는지 확인
3. 환경 변수 설정 확인
4. build 폴더 삭제 후 재시도

## 참고 문서

- Create React App 문서: https://create-react-app.dev/
- React 공식 문서: https://reactjs.org/
