import os
import requests
from bs4 import BeautifulSoup

# HTML 데이터 파싱 예시 (HTML 문자열로부터 시작)
html_data = """
<ul class="engrave-list lostark-engrave-list-1tyvt10">
  <li class="engrave-wrap" data-engrave-code="1255">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1255"
      ><h3 class="lostark-engrave-list-q565ow">각성</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1255.png?v=240902a"
          alt="각성"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1243">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1243"
      ><h3 class="lostark-engrave-list-q565ow">강령술</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1243.png?v=240902a"
          alt="강령술"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1242">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1242"
      ><h3 class="lostark-engrave-list-q565ow">강화 방패</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1242.png?v=240902a"
          alt="강화 방패"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1288">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1288"
      ><h3 class="lostark-engrave-list-q565ow">결투의 대가</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1255.png?v=240902a"
          alt="결투의 대가"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1134">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1134"
      ><h3 class="lostark-engrave-list-q565ow">구슬동자</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1134.png?v=240902a"
          alt="구슬동자"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1123">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1123"
      ><h3 class="lostark-engrave-list-q565ow">굳은 의지</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1123.png?v=240902a"
          alt="굳은 의지"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1142">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1142"
      ><h3 class="lostark-engrave-list-q565ow">급소 타격</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1142.png?v=240902a"
          alt="급소 타격"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1249">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1249"
      ><h3 class="lostark-engrave-list-q565ow">기습의 대가</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1249.png?v=240902a"
          alt="기습의 대가"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1302">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1302"
      ><h3 class="lostark-engrave-list-q565ow">긴급구조</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1302.png?v=240902a"
          alt="긴급구조"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1238">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1238"
      ><h3 class="lostark-engrave-list-q565ow">달인의 저력</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1238.png?v=240902a"
          alt="달인의 저력"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1254">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1254"
      ><h3 class="lostark-engrave-list-q565ow">돌격대장</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1254.png?v=240902a"
          alt="돌격대장"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1168">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1168"
      ><h3 class="lostark-engrave-list-q565ow">마나 효율 증가</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1168.png?v=240902a"
          alt="마나 효율 증가"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1251">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1251"
      ><h3 class="lostark-engrave-list-q565ow">마나의 흐름</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1251.png?v=240902a"
          alt="마나의 흐름"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1253">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1253"
      ><h3 class="lostark-engrave-list-q565ow">바리케이드</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1253.png?v=240902a"
          alt="바리케이드"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1246">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1246"
      ><h3 class="lostark-engrave-list-q565ow">번개의 분노</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1246.png?v=240902a"
          alt="번개의 분노"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1245">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1245"
      ><h3 class="lostark-engrave-list-q565ow">부러진 뼈</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1245.png?v=240902a"
          alt="부러진 뼈"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1236">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1236"
      ><h3 class="lostark-engrave-list-q565ow">분쇄의 주먹</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1236.png?v=240902a"
          alt="분쇄의 주먹"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1235">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1235"
      ><h3 class="lostark-engrave-list-q565ow">불굴</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1235.png?v=240902a"
          alt="불굴"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1244">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1244"
      ><h3 class="lostark-engrave-list-q565ow">선수필승</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1244.png?v=240902a"
          alt="선수필승"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1300">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1300"
      ><h3 class="lostark-engrave-list-q565ow">속전속결</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1300.png?v=240902a"
          alt="속전속결"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1121">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1121"
      ><h3 class="lostark-engrave-list-q565ow">슈퍼 차지</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1121.png?v=240902a"
          alt="슈퍼 차지"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1248">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1248"
      ><h3 class="lostark-engrave-list-q565ow">승부사</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1248.png?v=240902a"
          alt="승부사"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1298">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1298"
      ><h3 class="lostark-engrave-list-q565ow">시선 집중</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1298.png?v=240902a"
          alt="시선 집중"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1237">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1237"
      ><h3 class="lostark-engrave-list-q565ow">실드 관통</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1237.png?v=240902a"
          alt="실드 관통"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1299">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1299"
      ><h3 class="lostark-engrave-list-q565ow">아드레날린</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1299.png?v=240902a"
          alt="아드레날린"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1111">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1111"
      ><h3 class="lostark-engrave-list-q565ow">안정된 상태</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1111.png?v=240902a"
          alt="안정된 상태"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1107">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1107"
      ><h3 class="lostark-engrave-list-q565ow">약자 무시</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1107.png?v=240902a"
          alt="약자 무시"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1110">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1110"
      ><h3 class="lostark-engrave-list-q565ow">에테르 포식자</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1110.png?v=240902a"
          alt="에테르 포식자"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1239">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1239"
      ><h3 class="lostark-engrave-list-q565ow">여신의 가호</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1239.png?v=240902a"
          alt="여신의 가호"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1141">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1141"
      ><h3 class="lostark-engrave-list-q565ow">예리한 둔기</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1141.png?v=240902a"
          alt="예리한 둔기"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1118">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1118"
      ><h3 class="lostark-engrave-list-q565ow">원한</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1118.png?v=240902a"
          alt="원한"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1140">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1140"
      ><h3 class="lostark-engrave-list-q565ow">위기 모면</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1140.png?v=240902a"
          alt="위기 모면"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1247">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1247"
      ><h3 class="lostark-engrave-list-q565ow">저주받은 인형</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1247.png?v=240902a"
          alt="저주받은 인형"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1301">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1301"
      ><h3 class="lostark-engrave-list-q565ow">전문의</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1301.png?v=240902a"
          alt="전문의"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1109">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1109"
      ><h3 class="lostark-engrave-list-q565ow">정기 흡수</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1109.png?v=240902a"
          alt="정기 흡수"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1303">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1303"
      ><h3 class="lostark-engrave-list-q565ow">정밀 단도</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1303.png?v=240902a"
          alt="정밀 단도"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1240">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1240"
      ><h3 class="lostark-engrave-list-q565ow">중갑 착용</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1240.png?v=240902a"
          alt="중갑 착용"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1295">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1295"
      ><h3 class="lostark-engrave-list-q565ow">질량 증가</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1295.png?v=240902a"
          alt="질량 증가"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1167">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1167"
      ><h3 class="lostark-engrave-list-q565ow">최대 마나 증가</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1167.png?v=240902a"
          alt="최대 마나 증가"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1296">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1296"
      ><h3 class="lostark-engrave-list-q565ow">추진력</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1296.png?v=240902a"
          alt="추진력"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1297">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1297"
      ><h3 class="lostark-engrave-list-q565ow">타격의 대가</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1297.png?v=240902a"
          alt="타격의 대가"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1202">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1202"
      ><h3 class="lostark-engrave-list-q565ow">탈출의 명수</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1202.png?v=240902a"
          alt="탈출의 명수"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
  <li class="engrave-wrap" data-engrave-code="1241">
    <a
      class="lostark-engrave lostark-engrave-list-q565ow"
      href="https://lostark.inven.co.kr/dataninfo/engrave?code=1241"
      ><h3 class="lostark-engrave-list-q565ow">폭발물 전문가</h3>
      <div class="skill lostark-engrave-list-q565ow">
        <img
          src="https://static.inven.co.kr/image_2011/site_image/lostark/engraveicon/engrave_1241.png?v=240902a"
          alt="폭발물 전문가"
          loading="lazy"
          class="lostark-engrave-list-q565ow"
        /></div
    ></a>
  </li>
</ul>

"""

# BeautifulSoup을 사용하여 HTML 파싱
soup = BeautifulSoup(html_data, 'html.parser')

# img 태그들을 찾고 다운로드
for img_tag in soup.find_all('img'):
    img_url = img_tag['src']
    img_name = img_tag['alt']  # 이미지의 이름은 alt 속성에서 가져옴

    # 이미지 다운로드
    response = requests.get(img_url)
    if response.status_code == 200:  # 요청이 성공적일 때
        # 파일명에 확장자 추가 (예: 긴급구조.png)
        file_name = f"{img_name}.png"

        # 이미지 파일 저장
        with open(file_name, 'wb') as f:
            f.write(response.content)
        print(f"이미지 '{file_name}' 다운로드 완료!")
    else:
        print(f"이미지 다운로드 실패: {img_name}")
