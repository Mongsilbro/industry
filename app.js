/**
 * 산업통상자원부 소개 웹 앱 (Standalone Pure JS)
 * No build tools, no local server required.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. 맞춤 혜택 & 체크리스트 진단기
  initBenefitFinder();

  // 1. 탭 네비게이션 제어
  initTabs();

  // 2. 상식 퀴즈 시스템
  initQuiz();

  // 3. 뉴스 카테고리 필터링
  initNewsFilter();

  // 4. 스크롤 네비게이션 액티브 상태 반영
  initScrollSpy();
});

/* ==========================================================
   0. 맞춤 혜택 & 체크리스트 진단기 (Benefit Finder)
   ========================================================== */
const personaData = {
  citizen: {
    title: "일반 국민 / 가정",
    tag: "가정 · 소비자 맞춤",
    checklist: [
      {
        id: "c_elec_cashback",
        title: "에너지캐시백 참여",
        desc: "과거 2년 평균 대비 전기 사용량을 3% 이상 절감하면 전기요금을 직접 현금성 환급 또는 차감받고 싶어요.",
        benefit: {
          category: "에너지 복지 · 요금 절감",
          title: "주택용 에너지캐시백 지원 사업",
          agency: "한국전력공사 / 산업통상자원부 전력정책관",
          desc: "가정에서 직전 2개년 동월 평균 대비 전기 사용량을 3% 이상 줄이면, 절감률에 따라 1kWh당 최대 100원까지 다음 달 전기요금에서 차감해 드리는 전 국민 에너지 절약 리워드 제도입니다.",
          points: [
            "신청 자격: 일반 주택용(가정용) 전기를 사용하는 모든 국민",
            "지원 혜택: 절감량에 비례해 전기요금 청구서에서 직접 할인 차감",
            "신청 방법: 한전ON 홈페이지 또는 스마트폰 앱에서 간편 신청"
          ],
          contact: "한전 고객센터 (국번없이 123)",
          link: "https://online.kepco.co.kr"
        }
      },
      {
        id: "c_voucher",
        title: "취약계층 에너지바우처 수급",
        desc: "기초생활수급자 등 저소득 가구로서 냉·난방비(전기, 도시가스, 연탄, 등유 등) 지원 카드를 이용하고 싶어요.",
        benefit: {
          category: "사회적 배려 · 복지",
          title: "취약계층 동·하절기 에너지바우처",
          agency: "한국에너지공단 / 산업통상자원부 자원산업정책국",
          desc: "더위와 추위에 취약한 가구(노인, 영유아, 장애인, 임산부 등 포함 생계/의료/주거/교육급여 수급자)에게 전기, 도시가스, LPG 등을 결제할 수 있는 전자 바우처를 전액 지원합니다.",
          points: [
            "지원 규모: 가구원 수에 따라 하절기·동절기 연간 최대 수십만 원 상당 지급",
            "사용처: 전기, 도시가스, 지역난방 요금 자동차감 또는 국민행복카드 결제",
            "신청 기간 및 장소: 주민등록상 거주지 읍·면·동 행정복지센터"
          ],
          contact: "에너지바우처 콜센터 (1600-3190)",
          link: "https://www.energyv.or.kr"
        }
      },
      {
        id: "c_safety_recall",
        title: "어린이용품 및 가전제품 안전 확인",
        desc: "구입한 전자제품이나 장난감의 유해물질 검출 여부, 안전인증(KC마크) 진위, 리콜 조치 대상인지 확인하고 싶어요.",
        benefit: {
          category: "생활 안전 · 소비자 보호",
          title: "제품안전정보포털 (SafetyKorea) 무료 조회 서비스",
          agency: "국가기술표준원 (산업통상자원부 외청)",
          desc: "시중에 유통 중인 생활용품, 어린이제품, 전기용품의 불법·불량 의심 제품 신고부터 KC 인증 적합 여부 및 정부의 최신 결함 보상(리콜) 정보를 실시간 제공합니다.",
          points: [
            "제공 정보: KC인증 번호 조회로 위조품 판별, 안전기준 위반제품 공표",
            "소비자 보상: 리콜 대상 제품 확인 시 무상 수리 및 교환·환불 권리 보장",
            "불량제품 신고 포상: 위해의심제품 신고센터 운영"
          ],
          contact: "제품안전정보센터 (1600-1384)",
          link: "https://www.safetykorea.kr"
        }
      },
      {
        id: "c_solar_mini",
        title: "신재생에너지 주택지원(태양광)",
        desc: "단독주택 또는 공동주택 베란다에 태양광 발전기를 설치하여 친환경 자가발전 및 누진세 부담을 낮추고 싶어요.",
        benefit: {
          category: "친환경 주거 · 신재생에너지",
          title: "신재생에너지 주택지원 및 건물지원 국비 보조금",
          agency: "한국에너지공단 신재생에너지센터 / 산업부 재생에너지정책관",
          desc: "주택에 태양광, 지열, 연료전지 등 신재생에너지 설비를 설치할 때 정부와 지자체가 설치비의 최대 50~70%까지 무상 보조금을 지원하여 가계 전기요금을 획기적으로 낮춥니다.",
          points: [
            "절감 효과: 월평균 전기요금 누진 구간 진입 방지 (월 수만 원~십만 원 절약)",
            "신청 절차: 그린홈(GreenHome) 온라인 포털을 통해 시공업체 매칭 및 보조금 신청"
          ],
          contact: "신재생에너지 콜센터 (1855-3020)",
          link: "https://knrec.or.kr"
        }
      }
    ]
  },
  youth: {
    title: "청년 / 구직자 / 이공계생",
    tag: "취업 · 역량강화 맞춤",
    checklist: [
      {
        id: "y_semi_academy",
        title: "반도체·배터리 아카데미 국비 전액 무료 수강",
        desc: "실무 장비를 직접 다뤄보는 반도체 클린룸 실습, 공정 설계, 이차전지 소재 교육을 무료로 받고 취업 연계를 희망해요.",
        benefit: {
          category: "첨단인재 양성 · 취업 연계",
          title: "첨단산업 특성화대학원 및 국가첨단전략산업 부트캠프",
          agency: "한국산업기술진흥원(KIAT) / 산업통상자원부 산업인력과",
          desc: "삼성전자, SK하이닉스, LG에너지솔루션 등 유수 앵커기업과 대학이 연계하여 실무 공정 장비 실습 교육과 취업 컨설팅을 전액 국비로 지원합니다.",
          points: [
            "지원 내용: 교육비 전액 국비 지원 + 훈련장려금(수당) 지급 + 협약 기업 채용 우대",
            "교육 분야: 반도체(공정/설계), 이차전지, 차세대 디스플레이, 미래차 센서 등",
            "참여 대상: 이공계 대학(원)생, 졸업예정자 및 청년 미취업자"
          ],
          contact: "KIAT 인재양성지원팀 (02-6009-8000)",
          link: "https://www.kiat.or.kr"
        }
      },
      {
        id: "y_nuclear_intern",
        title: "원전 및 무탄소에너지(CFE) 청년 인재 인턴십",
        desc: "체코 원전 수주 등 활성화되는 K-원전 및 신재생에너지 기업에 인턴 또는 정규직 연구원으로 진출하고 싶어요.",
        benefit: {
          category: "에너지 신산업 일자리",
          title: "원자력 생태계 청년 취업지원 및 인턴십 프로그램",
          agency: "한국원자력산업협회 / 산업통상자원부 원전산업정책국",
          desc: "원전 중소·중견기업 및 공기업 채용 박람회를 주관하고, 현장 밀착형 직무 인턴십 급여(월 최대 200만 원 이상 국비 보조)와 정규직 전환 지원금을 제공합니다.",
          points: [
            "지원 항목: 청년 인턴 매칭 및 채용 장려금, 원자력 전문 자격 취득 지원",
            "해외 연수: 글로벌 원전 수출국 현장 파견 및 국제기구 실무 연수 기회"
          ],
          contact: "원자력인턴십 종합지원센터 (02-6257-2544)",
          link: "https://www.kaif.or.kr"
        }
      },
      {
        id: "y_overseas_trade",
        title: "청년 무역전문가 양성 (GTEP) 및 해외 취업",
        desc: "해외 박람회 통역 및 바이어 상담, 무역 실무를 경험하고 KOTRA 해외무역관 인턴이나 글로벌 수출기업에 취업하고 싶어요.",
        benefit: {
          category: "글로벌 비즈니스 · 무역 청년육성",
          title: "지역특화청년무역전문가양성사업 (GTEP)",
          agency: "한국무역협회(KITA) / 산업통상자원부 무역진흥과",
          desc: "전국 주요 대학생을 선발하여 중소기업과 매칭, 해외 전시회 현장 파견, 전자상거래(아마존 등) 수출 실습을 직접 수행하며 무역 마스터로 육성하는 간판 프로그램입니다.",
          points: [
            "활동 혜택: 해외 전시회 파견 경비 전액 지원, 산업통상자원부 장관 명의 인증서 수여",
            "연계 취업: KOTRA, 무역상사, 글로벌 e-커머스 기업 채용 가산점 부여"
          ],
          contact: "한국무역협회 무역아카데미 (02-6000-5383)",
          link: "https://www.tradecampus.com"
        }
      }
    ]
  },
  smallbiz: {
    title: "소상공인 / 자영업자",
    tag: "고정비 절감 · 경영 안정",
    checklist: [
      {
        id: "s_cool_heat",
        title: "고효율 냉난방기(에어컨·히터) 교체 비용 지원",
        desc: "식당, 카페, 매장의 노후된 냉난방기기를 1등급 에너지 절감 기기로 교체할 때 구매 비용 보조를 받고 싶어요.",
        benefit: {
          category: "소상공인 비용 절감",
          title: "소상공인 고효율 냉난방기·냉장고 지원사업",
          agency: "한국에너지공단 / 산업통상자원부 에너지효율과",
          desc: "소상공인이 에너지효율 1등급 냉방기, 난방기, 쇼케이스 등을 신규 구매할 때 부가세를 제외한 구매가의 최대 40% (사업장당 최대 160만~480만 원 한도)를 현금 지원합니다.",
          points: [
            "지원 대상: 「중소기업기본법」상 소상공인 확인서를 발급받은 개인/법인 사업자",
            "대상 품목: 에너지소비효율 1등급 에어컨, 냉난방기, 개방형 냉장고 문달기 등",
            "신청 방법: 한전 소상공인 고효율 지원 포털에서 온라인 서류 접수"
          ],
          contact: "한전 고효율지원 전담센터 (1551-0300)",
          link: "https://en-ter.co.kr"
        }
      },
      {
        id: "s_elec_relief",
        title: "소상공인 전기요금 특별지원",
        desc: "치솟는 물가와 전기요금 부담으로 힘든 영세 사업자를 위해 전기요금 감면을 받고 싶어요.",
        benefit: {
          category: "영세 자영업자 긴급 지원",
          title: "영세 소상공인 전기요금 특별지원사업",
          agency: "중소벤처기업부 · 산업통상자원부 협업",
          desc: "연 매출 기준 이하의 영세 자영업자를 대상으로 사업장 전기요금을 최대 20만 원까지 고지서에서 직접 차감해 주는 긴급 경영안정 사업입니다.",
          points: [
            "지원 방식: 직접 계약자는 고지서 차감, 관리비 납부자는 계좌 환급",
            "제출 서류 간소화: 사업자등록번호 입력만으로 국세청 연계 자동 자격 심사"
          ],
          contact: "소상공인 전기요금 콜센터 (1533-0200)",
          link: "https://www.소상공인전기요금특별지원.kr"
        }
      },
      {
        id: "s_smart_store",
        title: "스마트 상점 및 절전 솔루션 도입",
        desc: "키오스크, 테이블오더, AI 매장 조명 등 스마트 기술을 도입하여 인건비와 전기요금을 동시에 줄이고 싶어요.",
        benefit: {
          category: "매장 디지털 전환",
          title: "스마트 상점 기술 보급 및 에너지 절감 컨설팅",
          agency: "한국에너지공단 · 소상공인시장진흥공단",
          desc: "매장 내 에너지 낭비 요인을 진단하는 ‘무료 에너지 진단 클리닉’과 더불어 절전형 스마트 디바이스 도입을 패키지로 보조합니다.",
          points: [
            "진단 혜택: 에너지 전문 컨설턴트 매장 직접 방문 무료 에너지 진단",
            "절감 효과: 월 고정비 15~25% 절감 솔루션 제공"
          ],
          contact: "소상공인시장진흥공단 (1357)",
          link: "https://www.semas.or.kr"
        }
      }
    ]
  },
  business: {
    title: "중소·중견·스타트업 기업인",
    tag: "수출 · R&D · 투자 유치",
    checklist: [
      {
        id: "b_export_voucher",
        title: "수출 바우처 및 무역금융·해외마케팅 지원",
        desc: "해외 바이어 발굴, 통번역, 해외 규격 인증, 물류비, 무역보험 특례 보증이 절실해요.",
        benefit: {
          category: "수출 촉진 · 글로벌 진출",
          title: "산업통상자원부 수출바우처 및 무역보험 특별지원",
          agency: "KOTRA · 한국무역보험공사 / 산업부 무역정책관",
          desc: "정부 지원금을 바우처 쿠폰 형태로 지급받아 기업이 원하는 서비스(해외인증, 박람회 참가, 현지 법인설립, 마케팅)를 메뉴판에서 자유롭게 골라 쓸 수 있는 종합 지원책입니다.",
          points: [
            "지원 규모: 기업당 연간 최대 3,000만~1억 원 상당 바우처 지급",
            "원스톱 지원: 「원스톱 수출수주지원단」을 통해 통관, 물류, 대금 회수 애로 즉시 현장 해결",
            "금융 혜택: 무역보험공사 수출 신용보증료 최대 50% 할인 및 한도 우대"
          ],
          contact: "수출바우처 전담 콜센터 (02-6000-7988) / KOTRA (1600-7119)",
          link: "https://www.exportvoucher.com"
        }
      },
      {
        id: "b_ai_factory",
        title: "AI 자율제조(M.AX) 및 스마트공장 고도화 지원",
        desc: "제조 라인에 산업용 AI, 센서, 협동로봇을 구축하여 불량률을 줄이고 자동화를 구현하고 싶어요.",
        benefit: {
          category: "제조 혁신 · AI 전환",
          title: "AI 자율제조 선도 프로젝트 및 스마트제조혁신 지원사업",
          agency: "한국산업기술기획평가원(KEIT) / 산업부 산업기반실",
          desc: "대한민국 제조업의 생산성 20% 향상을 목표로 제조 공정에 AI 파운데이션 모델 및 로봇 솔루션을 도입하는 중소·중견기업에 R&D 및 설비 자금을 대규모 지원합니다.",
          points: [
            "지원 규모: 선도 프로젝트당 수십억 원 매칭 지원, 일반 보급형 기업당 최대 수억 원 보조",
            "기술 협력: 정부출연연구기관 및 AI 전문 솔루션 기업과 컨소시엄 구성 지원"
          ],
          contact: "KEIT 스마트제조기획팀 (053-718-8114)",
          link: "https://www.keit.re.kr"
        }
      },
      {
        id: "b_tax_zone",
        title: "지방 이전 및 신규 설비 투자 세제 혜택 (기회발전특구)",
        desc: "공장이나 연구소를 지방으로 이전하거나 대규모 설비 투자를 진행하여 법인세·취득세 감면과 규제 특례를 받고 싶어요.",
        benefit: {
          category: "지역 투자 유치 · 세제 혜택",
          title: "기회발전특구(ODZ) 투자 기업 패키지 인센티브",
          agency: "지방시대위원회 · 산업통상자원부 지역경제정책관",
          desc: "수도권 기업이 지방 기회발전특구로 본사나 공장을 이전·창업할 경우 법인세 5년간 100% 면제 + 이후 2년간 50% 감면 등 역대 최대 파격 세제 혜택을 부여합니다.",
          points: [
            "세제 혜택: 소득·법인세 대폭 감면, 취득세 최대 100% 감면, 재산세 장기 감면",
            "규제 특례: 지자체 직접 매칭 규제 신속 완화 및 전력·도로 인프라 우선 확충"
          ],
          contact: "산업통상자원부 지역투자과 (044-203-4420)",
          link: "https://www.motie.go.kr"
        }
      },
      {
        id: "b_trade_barrier",
        title: "해외 통상 규제 (탄소국경세, IRA 등) 애로 컨설팅",
        desc: "EU 탄소국경조정제도(CBAM), 미국 인플레이션감축법(IRA) 등 해외 정부의 까다로운 환경·통상 규제에 대응하고 싶어요.",
        benefit: {
          category: "통상애로 해소 · 해외 규제 대응",
          title: "글로벌 통상규제 대응 1:1 심층 컨설팅 데스크",
          agency: "통상교섭본부(MOTIE) · 한국무역협회 통상국내대책포털",
          desc: "EU, 미국 등 주요국의 무역기술장벽(TBT) 및 탄소배출량 산정 의무에 대해 법률·회계·엔지니어링 전문기관의 1:1 컨설팅 비용을 전액 지원합니다.",
          points: [
            "지원 항목: CBAM 배출량 산정 보고서 작성 대행, 해외인증 획득 지원",
            "통상 외교: 정부 간 고위급 양자회담을 통해 우리 수출기업 규제 유예 교섭"
          ],
          contact: "무역협회 통상애로해소센터 (02-6000-5114)",
          link: "https://www.cbam.kr"
        }
      }
    ]
  }
};

let selectedPersonaKey = null;

function initBenefitFinder() {
  const step1 = document.getElementById('finderStep1');
  const step2 = document.getElementById('finderStep2');
  const step3 = document.getElementById('finderStep3');
  const badge1 = document.getElementById('stepBadge1');
  const badge2 = document.getElementById('stepBadge2');
  const badge3 = document.getElementById('stepBadge3');

  const personaCards = document.querySelectorAll('.persona-card');
  const btnBackToStep1 = document.getElementById('btnBackToStep1');
  const currentPersonaTag = document.getElementById('currentPersonaTag');
  const checklistWrapper = document.getElementById('checklistWrapper');
  const btnGetResults = document.getElementById('btnGetResults');
  const resultsCardsGrid = document.getElementById('resultsCardsGrid');
  const resultSummaryText = document.getElementById('resultSummaryText');
  const btnRestartFinder = document.getElementById('btnRestartFinder');

  if (!step1 || !personaCards.length) return;

  // 1단계: 페르소나 카드 클릭
  personaCards.forEach(card => {
    card.addEventListener('click', () => {
      selectedPersonaKey = card.getAttribute('data-persona');
      goToStep2();
    });
  });

  // 2단계 진입
  function goToStep2() {
    const data = personaData[selectedPersonaKey];
    if (!data) return;

    badge1.className = 'step-badge completed';
    badge2.className = 'step-badge active';
    badge3.className = 'step-badge';

    step1.classList.add('hidden');
    step2.classList.remove('hidden');
    step3.classList.add('hidden');

    currentPersonaTag.textContent = `${data.title} (${data.tag})`;

    // 체크리스트 렌더링
    checklistWrapper.innerHTML = '';
    data.checklist.forEach(item => {
      const label = document.createElement('label');
      label.className = 'check-item-label';
      label.innerHTML = `
        <input type="checkbox" name="benefit_check" value="${item.id}">
        <div class="check-item-content">
          <strong>${item.title}</strong>
          <span>${item.desc}</span>
        </div>
      `;

      const input = label.querySelector('input');
      input.addEventListener('change', () => {
        if (input.checked) {
          label.classList.add('selected');
        } else {
          label.classList.remove('selected');
        }
        updateSelectedCount();
      });

      checklistWrapper.appendChild(label);
    });

    updateSelectedCount();
  }

  function updateSelectedCount() {
    const checked = checklistWrapper.querySelectorAll('input[type="checkbox"]:checked');
    const count = checked.length;
    btnGetResults.disabled = count === 0;
    btnGetResults.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> 나에게 꼭 맞는 맞춤 혜택 확인하기 (${count}개 선택됨)`;
  }

  // 1단계로 되돌아가기
  btnBackToStep1.addEventListener('click', () => {
    badge1.className = 'step-badge active';
    badge2.className = 'step-badge';
    badge3.className = 'step-badge';

    step1.classList.remove('hidden');
    step2.classList.add('hidden');
    step3.classList.add('hidden');
  });

  // 3단계 결과 보기
  btnGetResults.addEventListener('click', () => {
    const data = personaData[selectedPersonaKey];
    const checkedInputs = checklistWrapper.querySelectorAll('input[type="checkbox"]:checked');
    const selectedIds = Array.from(checkedInputs).map(i => i.value);

    badge1.className = 'step-badge completed';
    badge2.className = 'step-badge completed';
    badge3.className = 'step-badge active';

    step1.classList.add('hidden');
    step2.classList.add('hidden');
    step3.classList.remove('hidden');

    resultsCardsGrid.innerHTML = '';
    resultSummaryText.textContent = `[${data.title}] 유형에서 선택하신 ${selectedIds.length}가지 관심사에 대해 산업통상자원부와 산하기관의 핵심 지원 프로그램을 안내합니다.`;

    // 매칭된 아이템 렌더링
    selectedIds.forEach(id => {
      const item = data.checklist.find(c => c.id === id);
      if (!item) return;
      const b = item.benefit;

      const card = document.createElement('div');
      card.className = 'result-card';
      card.innerHTML = `
        <div class="result-card-top">
          <span class="result-category-tag">${b.category}</span>
          <span class="result-dept"><i class="fa-solid fa-building-columns"></i> ${b.agency}</span>
        </div>
        <h4 class="result-title">${b.title}</h4>
        <p class="result-benefit-desc">${b.desc}</p>
        <div class="result-points">
          <ul>
            ${b.points.map(pt => `<li>${pt}</li>`).join('')}
          </ul>
        </div>
        <div class="result-actions">
          <span class="result-contact"><i class="fa-solid fa-phone-volume"></i> 문의처: <strong>${b.contact}</strong></span>
          <a href="${b.link}" target="_blank" rel="noopener noreferrer" class="btn-result-link">
            신청·상세 누리집 <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      `;
      resultsCardsGrid.appendChild(card);
    });

    // 결과 위치로 부드럽게 스크롤
    step3.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // 다시 진단하기
  btnRestartFinder.addEventListener('click', () => {
    selectedPersonaKey = null;
    badge1.className = 'step-badge active';
    badge2.className = 'step-badge';
    badge3.className = 'step-badge';

    step1.classList.remove('hidden');
    step2.classList.add('hidden');
    step3.classList.add('hidden');

    const benefitsSection = document.getElementById('benefits');
    if (benefitsSection) {
      benefitsSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}


function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));

      button.classList.add('active');
      const activePanel = document.getElementById(`tab-${targetTab}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================
   2. 국민 참여형 상식 퀴즈 데이터 및 로직
   ========================================================== */
const quizData = [
  {
    question: "Q1. 다음 중 산업통상자원부(MOTIE)의 3대 핵심 업무 축에 속하지 않는 것은?",
    options: [
      "국가 미래 먹거리인 반도체·배터리 등 첨단산업 육성",
      "글로벌 시장 개척과 통상 협정(FTA) 체결 및 수출 진흥",
      "초·중·고등 교육과정 개편 및 대학 입시 제도 관리",
      "합리적인 탄소중립과 안정적인 국가 전력·에너지 공급"
    ],
    answer: 2, // 0-based
    explanation: "정답은 3번입니다! 초·중·고 교육 및 대입 관리는 '교육부'의 업무이며, 산업부는 첨단산업, 글로벌 통상, 에너지 안보를 총괄합니다."
  },
  {
    question: "Q2. 공산품, 유아용품, 전자기기 등에 부착되어 안전성을 입증하는 국가통합인증마크는?",
    options: [
      "KC 마크 (Korea Certification)",
      "HACCP 마크",
      "KS 로고",
      "ISO 9001 마크"
    ],
    answer: 0,
    explanation: "정답은 1번 'KC 마크'입니다! 산업통상자원부 국가기술표준원에서 국민의 안전을 위해 관리·인증하는 대표적인 통합인증마크입니다."
  },
  {
    question: "Q3. 최근 산업부가 제조업 위기를 극복하고 생산성을 대폭 끌어올리기 위해 추진하는 핵심 전략은?",
    options: [
      "단순 수작업 중심 회귀 정책",
      "AI 자율제조 2030 (M.AX) 전략",
      "해외 생산시설 전면 외주화",
      "화석연료 의존도 전면 확대"
    ],
    answer: 1,
    explanation: "정답은 2번 'AI 자율제조 2030 (M.AX) 전략'입니다! 제조 현장에 AI와 로봇을 융합하여 공정 혁신과 자율화를 선도하고 있습니다."
  }
];

let currentQuizIndex = 0;
let userScore = 0;

function initQuiz() {
  const questionEl = document.getElementById('quizQuestion');
  const stepEl = document.getElementById('quizStep');
  const optionsEl = document.getElementById('quizOptions');
  const feedbackEl = document.getElementById('quizFeedback');
  const nextBtn = document.getElementById('nextQuizBtn');
  const resetBtn = document.getElementById('resetQuizBtn');

  if (!questionEl) return;

  function loadQuestion() {
    feedbackEl.className = 'quiz-feedback hidden';
    nextBtn.classList.add('hidden');
    resetBtn.classList.add('hidden');

    const currentQuiz = quizData[currentQuizIndex];
    stepEl.textContent = `질문 ${currentQuizIndex + 1} / ${quizData.length}`;
    questionEl.textContent = currentQuiz.question;
    optionsEl.innerHTML = '';

    currentQuiz.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.innerHTML = `<span>${optText}</span> <i class="fa-regular fa-circle"></i>`;
      btn.addEventListener('click', () => handleAnswer(idx, btn));
      optionsEl.appendChild(btn);
    });
  }

  function handleAnswer(selectedIndex, selectedBtn) {
    const currentQuiz = quizData[currentQuizIndex];
    const allButtons = optionsEl.querySelectorAll('.quiz-opt-btn');

    // 비활성화
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === currentQuiz.answer) {
      userScore++;
      selectedBtn.classList.add('correct');
      selectedBtn.querySelector('i').className = 'fa-solid fa-circle-check';
      feedbackEl.className = 'quiz-feedback correct-box';
      feedbackEl.innerHTML = `<strong>정답입니다! 👏</strong><br>${currentQuiz.explanation}`;
    } else {
      selectedBtn.classList.add('wrong');
      selectedBtn.querySelector('i').className = 'fa-solid fa-circle-xmark';
      
      // 정답 표시
      allButtons[currentQuiz.answer].classList.add('correct');
      allButtons[currentQuiz.answer].querySelector('i').className = 'fa-solid fa-circle-check';

      feedbackEl.className = 'quiz-feedback wrong-box';
      feedbackEl.innerHTML = `<strong>아쉽네요! 오답입니다. 🤔</strong><br>${currentQuiz.explanation}`;
    }

    if (currentQuizIndex < quizData.length - 1) {
      nextBtn.classList.remove('hidden');
    } else {
      // 퀴즈 완료 시
      setTimeout(() => {
        showFinalResult();
      }, 1500);
    }
  }

  function showFinalResult() {
    questionEl.textContent = `퀴즈 완료! 결과: ${quizData.length}문제 중 ${userScore}문제 정답 🎉`;
    stepEl.textContent = "최종 결과";
    optionsEl.innerHTML = `
      <div style="padding: 1.5rem; text-align: center; background: #f8fafc; border-radius: 12px; margin-bottom: 1rem;">
        <p style="font-size: 1.15rem; font-weight: 700; color: #0b3b60; margin-bottom: 0.5rem;">
          ${userScore === 3 ? "🏆 완벽합니다! 산업통상자원부 마스터이시네요!" : "👍 훌륭합니다! 우리 삶을 지탱하는 산업부에 대해 한 걸음 더 가까워졌습니다."}
        </p>
        <p style="color: #64748b; font-size: 0.95rem;">
          앞으로도 대한민국 산업 혁신과 에너지 안보 정책에 많은 관심 부탁드립니다.
        </p>
      </div>
    `;
    feedbackEl.classList.add('hidden');
    nextBtn.classList.add('hidden');
    resetBtn.classList.remove('hidden');
  }

  nextBtn.addEventListener('click', () => {
    currentQuizIndex++;
    loadQuestion();
  });

  resetBtn.addEventListener('click', () => {
    currentQuizIndex = 0;
    userScore = 0;
    loadQuestion();
  });

  loadQuestion();
}

/* ==========================================================
   3. 뉴스 카테고리 필터링
   ========================================================== */
function initNewsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const newsCards = document.querySelectorAll('.news-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      newsCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================
   4. 스크롤 네비게이션 액티브 감지
   ========================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}
