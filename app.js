const state = {
  treasuryYield2Y: 3.5,
  baseTreasuryYield2Y: 3.5,
  loanRegulation: "neutral",
  rentConversion: 1,
  dsrLevel: "neutral",
  priceBasis: "recent_trade",
  investmentAmount: 300000,
  residenceBasis: "better",
  groupBy: "none",
  selectedDistricts: [],
  diffMode: new URLSearchParams(window.location.search).get("diffMode") || "amount",
  selectedApartment: null,
  liveUpdatesEnabled: false,
  refreshIntervalSec: 20,
  liveStatus: "대기",
  lastUpdated: null,
};

const apartments = [
  { name: "래미안 원베일리", district: "서초구", dong: "반포동", price_registered: 310000, price_trade_recent: 345000, price_ask: 362000, jeonse: 175000, rent: 450, base_score: 95, rate_sensitivity: 0.9, leverage_ratio: 0.55, jeonse_dependency: 0.45, policy_exposure: 0.6, price_tier: "고가(30억+)" },
  { name: "아크로리버파크", district: "서초구", dong: "반포동", price_registered: 295000, price_trade_recent: 332000, price_ask: 350000, jeonse: 170000, rent: 430, base_score: 94, rate_sensitivity: 0.85, leverage_ratio: 0.5, jeonse_dependency: 0.4, policy_exposure: 0.62, price_tier: "고가(30억+)" },
  { name: "헬리오시티", district: "송파구", dong: "잠실동", price_registered: 210000, price_trade_recent: 235000, price_ask: 248000, jeonse: 118000, rent: 300, base_score: 88, rate_sensitivity: 1.0, leverage_ratio: 0.7, jeonse_dependency: 0.6, policy_exposure: 0.5, price_tier: "중고가(15~30억)" },
  { name: "잠실 엘스", district: "송파구", dong: "잠실동", price_registered: 185000, price_trade_recent: 205000, price_ask: 216000, jeonse: 108000, rent: 270, base_score: 86, rate_sensitivity: 1.05, leverage_ratio: 0.72, jeonse_dependency: 0.64, policy_exposure: 0.48, price_tier: "중고가(15~30억)" },
  { name: "마포 래미안 푸르지오", district: "마포구", dong: "아현동", price_registered: 150000, price_trade_recent: 167000, price_ask: 176000, jeonse: 88000, rent: 220, base_score: 82, rate_sensitivity: 1.1, leverage_ratio: 0.75, jeonse_dependency: 0.68, policy_exposure: 0.44, price_tier: "중고가(15~30억)" },
  { name: "이촌 한강맨션", district: "용산구", dong: "이촌동", price_registered: 265000, price_trade_recent: 286000, price_ask: 302000, jeonse: 145000, rent: 370, base_score: 90, rate_sensitivity: 0.95, leverage_ratio: 0.58, jeonse_dependency: 0.5, policy_exposure: 0.57, price_tier: "중고가(15~30억)" },
  { name: "래미안 대치 팰리스", district: "강남구", dong: "대치동", price_registered: 275000, price_trade_recent: 305000, price_ask: 322000, jeonse: 155000, rent: 390, base_score: 92, rate_sensitivity: 0.92, leverage_ratio: 0.53, jeonse_dependency: 0.47, policy_exposure: 0.61, price_tier: "고가(30억+)" },
  { name: "은마아파트", district: "강남구", dong: "대치동", price_registered: 198000, price_trade_recent: 220000, price_ask: 232000, jeonse: 112000, rent: 285, base_score: 84, rate_sensitivity: 1.15, leverage_ratio: 0.78, jeonse_dependency: 0.7, policy_exposure: 0.52, price_tier: "중고가(15~30억)" },
  { name: "고덕 그라시움", district: "강동구", dong: "고덕동", price_registered: 120000, price_trade_recent: 136000, price_ask: 142000, jeonse: 76000, rent: 190, base_score: 78, rate_sensitivity: 1.2, leverage_ratio: 0.82, jeonse_dependency: 0.72, policy_exposure: 0.4, price_tier: "중가(10~15억)" },
  { name: "고덕 아르테온", district: "강동구", dong: "고덕동", price_registered: 113000, price_trade_recent: 127000, price_ask: 133000, jeonse: 70000, rent: 175, base_score: 76, rate_sensitivity: 1.22, leverage_ratio: 0.84, jeonse_dependency: 0.73, policy_exposure: 0.39, price_tier: "중가(10~15억)" },
  { name: "목동 하이페리온", district: "양천구", dong: "목동", price_registered: 142000, price_trade_recent: 155000, price_ask: 164000, jeonse: 82000, rent: 205, base_score: 80, rate_sensitivity: 1.12, leverage_ratio: 0.76, jeonse_dependency: 0.67, policy_exposure: 0.43, price_tier: "중고가(15~30억)" },
  { name: "목동 신시가지7", district: "양천구", dong: "목동", price_registered: 129000, price_trade_recent: 142000, price_ask: 150000, jeonse: 76000, rent: 190, base_score: 79, rate_sensitivity: 1.16, leverage_ratio: 0.8, jeonse_dependency: 0.7, policy_exposure: 0.42, price_tier: "중가(10~15억)" },
  { name: "DMC 롯데캐슬", district: "은평구", dong: "녹번동", price_registered: 98000, price_trade_recent: 108000, price_ask: 114000, jeonse: 62000, rent: 155, base_score: 72, rate_sensitivity: 1.28, leverage_ratio: 0.9, jeonse_dependency: 0.76, policy_exposure: 0.36, price_tier: "중가(10~15억)" },
  { name: "녹번역 e편한세상", district: "은평구", dong: "녹번동", price_registered: 91000, price_trade_recent: 100000, price_ask: 106000, jeonse: 56000, rent: 140, base_score: 70, rate_sensitivity: 1.3, leverage_ratio: 0.92, jeonse_dependency: 0.78, policy_exposure: 0.35, price_tier: "외곽" },
  { name: "중계 청구3", district: "노원구", dong: "상계동", price_registered: 76000, price_trade_recent: 84000, price_ask: 90000, jeonse: 50000, rent: 125, base_score: 68, rate_sensitivity: 1.35, leverage_ratio: 0.97, jeonse_dependency: 0.81, policy_exposure: 0.33, price_tier: "외곽" },
  { name: "상계 주공11", district: "노원구", dong: "상계동", price_registered: 69000, price_trade_recent: 76000, price_ask: 82000, jeonse: 46000, rent: 115, base_score: 66, rate_sensitivity: 1.38, leverage_ratio: 1.0, jeonse_dependency: 0.84, policy_exposure: 0.32, price_tier: "외곽" },
  { name: "검단 신도시A", district: "인천 서구", dong: "당하동", price_registered: 62000, price_trade_recent: 70000, price_ask: 76000, jeonse: 42000, rent: 105, base_score: 62, rate_sensitivity: 1.42, leverage_ratio: 1.05, jeonse_dependency: 0.86, policy_exposure: 0.3, price_tier: "외곽" },
  { name: "송도 더샵 센트럴", district: "인천 연수구", dong: "송도동", price_registered: 82000, price_trade_recent: 93000, price_ask: 98000, jeonse: 52000, rent: 130, base_score: 69, rate_sensitivity: 1.33, leverage_ratio: 0.95, jeonse_dependency: 0.79, policy_exposure: 0.34, price_tier: "외곽" },
  { name: "광교 자연앤힐스", district: "수원 영통구", dong: "이의동", price_registered: 98000, price_trade_recent: 112000, price_ask: 120000, jeonse: 65000, rent: 160, base_score: 73, rate_sensitivity: 1.25, leverage_ratio: 0.88, jeonse_dependency: 0.74, policy_exposure: 0.37, price_tier: "중가(10~15억)" },
  { name: "분당 정든마을", district: "성남 분당구", dong: "정자동", price_registered: 125000, price_trade_recent: 140000, price_ask: 149000, jeonse: 76000, rent: 185, base_score: 77, rate_sensitivity: 1.18, leverage_ratio: 0.81, jeonse_dependency: 0.7, policy_exposure: 0.41, price_tier: "중가(10~15억)" },
];

const loanRegulationCoeff = { relaxed: 0.9, neutral: 1, tight: 1.2 };
const dsrCoeff = { relaxed: 0.9, neutral: 1.0, tight: 1.2 };
const mobilityCoeff = {
  "고가(30억+)": 0.6,
  "중고가(15~30억)": 1.0,
  "중가(10~15억)": 1.3,
  "외곽": 1.5,
};


const registeredPriceRankMap = new Map(
  [...apartments]
    .sort((a, b) => b.price_registered - a.price_registered)
    .map((apt, idx) => [apt.name, idx + 1])
);

const availableDistricts = [...new Set(apartments.map((apt) => apt.district))].sort((a, b) => a.localeCompare(b, "ko"));

function applyDistrictFilter(ranked) {
  if (!state.selectedDistricts.length) return ranked;
  return ranked.filter((apt) => state.selectedDistricts.includes(apt.district));
}

let liveUpdateTimer = null;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

async function fetchTreasuryYield2Y() {
  try {
    const response = await fetch("https://fred.stlouisfed.org/graph/fredgraph.csv?id=DGS2", { cache: "no-store" });
    if (!response.ok) throw new Error("yield fetch failed");
    const text = await response.text();
    const lines = text.trim().split("\n").slice(1).reverse();
    const latest = lines.find((line) => line.split(",")[1] && line.split(",")[1] !== ".");
    if (!latest) throw new Error("no yield row");
    const rawValue = Number(latest.split(",")[1]);
    if (Number.isNaN(rawValue)) throw new Error("invalid yield");
    return { value: rawValue, source: "FRED DGS2" };
  } catch (error) {
    return null;
  }
}

function applyLivePriceTick() {
  apartments.forEach((apt) => {
    const tradeMove = 1 + (Math.random() - 0.5) * 0.006;
    const rentMove = 1 + (Math.random() - 0.5) * 0.004;
    const jeonseMove = 1 + (Math.random() - 0.5) * 0.005;

    apt.price_trade_recent = Math.max(apt.price_registered * 0.75, Math.round(apt.price_trade_recent * tradeMove));
    const askGap = 1.03 + Math.random() * 0.03;
    apt.price_ask = Math.max(apt.price_trade_recent, Math.round(apt.price_trade_recent * askGap));
    apt.jeonse = Math.max(apt.price_registered * 0.35, Math.round(apt.jeonse * jeonseMove));
    apt.rent = Math.max(70, Math.round(apt.rent * rentMove));
  });
}

function updateLiveMeta(statusText) {
  state.liveStatus = statusText;
  state.lastUpdated = new Date();
}

async function runRealtimeUpdate() {
  const slider = document.getElementById("rateSlider");
  const rateValue = document.getElementById("rateValue");

  const fetched = await fetchTreasuryYield2Y();
  if (fetched) {
    state.treasuryYield2Y = clamp(fetched.value, Number(slider.min), Number(slider.max));
    slider.value = state.treasuryYield2Y.toFixed(1);
    rateValue.textContent = `${state.treasuryYield2Y.toFixed(1)}%`;
    updateLiveMeta(`실시간 업데이트: ${fetched.source} 연동`);
  } else {
    const fallbackMove = (Math.random() - 0.5) * 0.12;
    state.treasuryYield2Y = clamp(state.treasuryYield2Y + fallbackMove, Number(slider.min), Number(slider.max));
    slider.value = state.treasuryYield2Y.toFixed(1);
    rateValue.textContent = `${state.treasuryYield2Y.toFixed(1)}%`;
    updateLiveMeta("실시간 업데이트: 폴백(데모) 반영");
  }

  applyLivePriceTick();
  renderAll();
}

function startRealtimeLoop() {
  if (liveUpdateTimer) clearInterval(liveUpdateTimer);
  if (!state.liveUpdatesEnabled) return;

  runRealtimeUpdate();
  liveUpdateTimer = setInterval(() => {
    runRealtimeUpdate();
  }, state.refreshIntervalSec * 1000);
}

function getPriceByBasis(apartment) {
  if (state.priceBasis === "registered") return apartment.price_registered;
  if (state.priceBasis === "ask") return apartment.price_ask;
  return apartment.price_trade_recent;
}

function toEokMan(priceInManwon) {
  const eok = Math.floor(priceInManwon / 10000);
  const man = priceInManwon % 10000;
  return `${eok}억 ${man.toLocaleString()}만`;
}

function diffText(label, current, base) {
  const amount = current - base;
  const sign = amount >= 0 ? "+" : "-";
  const absAmount = Math.abs(amount);
  const pct = base === 0 ? 0 : (amount / base) * 100;

  if (state.diffMode === "percent") {
    return `${label} ${toEokMan(current)} (${sign}${Math.abs(pct).toFixed(1)}%)`;
  }
  return `${label} ${toEokMan(current)} (${sign}${toEokMan(absAmount)})`;
}

function computeScores() {
  const jeonseSpread = 0.012;
  const insuranceCost = 0.002;
  const holdingTaxShock = 0.4;
  const inheritanceShock = 0.3;

  const computed = apartments.map((apt) => {
    const P = getPriceByBasis(apt);
    const rateDelta = state.treasuryYield2Y - state.baseTreasuryYield2Y;
    const effectiveRate = state.treasuryYield2Y / 100 + jeonseSpread + insuranceCost;
    const rsi = (apt.jeonse * effectiveRate) / (apt.rent * 12 * state.rentConversion);
    const treasuryIncome = state.investmentAmount * (state.treasuryYield2Y / 100);
    const jeonseOpportunityCost = apt.jeonse * (state.treasuryYield2Y / 100);
    const annualRentCost = apt.rent * 12;
    const residenceCostBasis =
      state.residenceBasis === "jeonse"
        ? jeonseOpportunityCost
        : state.residenceBasis === "rent"
          ? annualRentCost
          : Math.min(jeonseOpportunityCost, annualRentCost);
    const residenceYieldRatio = treasuryIncome / Math.max(residenceCostBasis, 1);
    const jeonseGapInvestment = Math.max(P - apt.jeonse, 0);
    const gapInterestCost = jeonseGapInvestment * (state.treasuryYield2Y / 100);
    const breakEvenRequiredGain = residenceCostBasis + gapInterestCost;
    const breakEvenRequiredRisePct = (breakEvenRequiredGain / Math.max(P, 1)) * 100;
    const jeonseRatio = apt.jeonse / P;
    const rateShock = rateDelta * apt.rate_sensitivity * apt.leverage_ratio * 12;
    const jsi = jeonseRatio * loanRegulationCoeff[state.loanRegulation] * rsi;
    const btp = (1 / Math.max(rsi, 0.01)) * jeonseRatio * mobilityCoeff[apt.price_tier];

    const highPriceShare = apt.price_tier === "고가(30억+)" ? 1 : 0.45;
    const policyImpact =
      holdingTaxShock * highPriceShare +
      inheritanceShock * apt.policy_exposure +
      dsrCoeff[state.dsrLevel] * apt.leverage_ratio;

    const rawScore = apt.base_score + rateShock - jsi * 15 + btp * 18 - policyImpact * 9;

    return {
      ...apt,
      selected_price: P,
      rsi,
      jsi,
      btp,
      policyImpact,
      rawScore,
      treasuryIncome,
      jeonseOpportunityCost,
      annualRentCost,
      residenceCostBasis,
      residenceYieldRatio,
      jeonseGapInvestment,
      gapInterestCost,
      breakEvenRequiredGain,
      breakEvenRequiredRisePct,
    };
  });

  const min = Math.min(...computed.map((x) => x.rawScore));
  const max = Math.max(...computed.map((x) => x.rawScore));

  return computed
    .map((x) => ({
      ...x,
      finalScore: max === min ? 50 : ((x.rawScore - min) / (max - min)) * 100,
    }))
    .sort((a, b) => b.finalScore - a.finalScore);
}


function groupLabel(key, value) {
  if (key === "district") return `구: ${value}`;
  if (key === "dong") return `동: ${value}`;
  if (key === "price_tier") return `가격대: ${value}`;
  return "전체";
}

function renderGroupedRanking(ranked, groupBy) {
  const apartmentRanking = document.getElementById("apartmentRanking");
  apartmentRanking.innerHTML = "";
  const groups = {};

  ranked.forEach((apt) => {
    const key = apt[groupBy] || "기타";
    groups[key] = groups[key] || [];
    groups[key].push(apt);
  });

  Object.entries(groups)
    .sort((a, b) => b[1][0].finalScore - a[1][0].finalScore)
    .forEach(([groupName, list]) => {
      const section = document.createElement("section");
      section.className = "group-section";
      section.innerHTML = `<h3 class="group-title">${groupLabel(groupBy, groupName)}</h3>`;

      list.forEach((apt, idx) => {
        const row = document.createElement("article");
        row.className = `row ${state.selectedApartment === apt.name ? "active" : ""}`;
        const askTradeDiffClass = apt.price_ask - apt.price_trade_recent >= 0 ? "diff-positive" : "diff-negative";
        const tradeRegDiffClass = apt.price_trade_recent - apt.price_registered >= 0 ? "diff-positive" : "diff-negative";

        row.innerHTML = `
          <div class="row-top">
            <div class="rank-title">${groupLabel(groupBy, groupName)} #${idx + 1} · ${apt.name}</div>
            <div><div class="score">${apt.finalScore.toFixed(1)}</div><div class="sub-rank">등기순위 #${registeredPriceRankMap.get(apt.name)}</div></div>
          </div>
          <div class="price-line">${apt.district} ${apt.dong} · 등기 ${toEokMan(apt.price_registered)} / 실거래 ${toEokMan(apt.price_trade_recent)} / 호가 ${toEokMan(apt.price_ask)}</div>
          <div class="diff-line ${askTradeDiffClass}">${diffText("호가", apt.price_ask, apt.price_trade_recent)} (실거래 대비)</div>
          <div class="diff-line ${tradeRegDiffClass}">${diffText("실거래", apt.price_trade_recent, apt.price_registered)} (등기 대비)</div>
          <div class="diff-line">손실회피 필요상승: ${toEokMan(Math.round(apt.breakEvenRequiredGain))} (${apt.breakEvenRequiredRisePct.toFixed(2)}%)</div>
        `;
        row.onclick = () => {
          state.selectedApartment = apt.name;
          renderAll();
        };
        section.appendChild(row);
      });

      apartmentRanking.appendChild(section);
    });
}

function renderRankings() {
  const ranked = applyDistrictFilter(computeScores());
  const apartmentRanking = document.getElementById("apartmentRanking");
  apartmentRanking.innerHTML = "";

  if (!ranked.length) {
    apartmentRanking.innerHTML = '<p class="empty">선택한 구에 해당하는 단지가 없습니다. 필터를 조정해 주세요.</p>';
    renderDistrictRanking([]);
    renderTierRanking([]);
    document.getElementById("detailPanel").innerHTML = '<h2>단지 상세</h2><p>좌측 랭킹에서 단지를 선택하세요.</p>';
    return;
  }

  if (!state.selectedApartment || !ranked.find((x) => x.name === state.selectedApartment)) {
    state.selectedApartment = ranked[0].name;
  }

  if (state.groupBy !== "none") {
    renderGroupedRanking(ranked, state.groupBy);
    renderDistrictRanking(ranked);
    renderTierRanking(ranked);
    renderDetail(ranked.find((x) => x.name === state.selectedApartment), ranked);
    return;
  }

  ranked.forEach((apt, idx) => {
    const row = document.createElement("article");
    row.className = `row ${state.selectedApartment === apt.name ? "active" : ""}`;

    const askTradeDiffClass = apt.price_ask - apt.price_trade_recent >= 0 ? "diff-positive" : "diff-negative";
    const tradeRegDiffClass = apt.price_trade_recent - apt.price_registered >= 0 ? "diff-positive" : "diff-negative";

    row.innerHTML = `
      <div class="row-top">
        <div class="rank-title">#${registeredPriceRankMap.get(apt.name)} ${apt.name} · ${apt.district}</div>
        <div><div class="score">${apt.finalScore.toFixed(1)}</div><div class="sub-rank">시뮬레이션 순위 #${idx + 1}</div></div>
      </div>
      <div class="price-line">등기 ${toEokMan(apt.price_registered)} / 실거래 ${toEokMan(apt.price_trade_recent)} / 호가 ${toEokMan(apt.price_ask)}</div>
      <div class="diff-line ${askTradeDiffClass}">${diffText("호가", apt.price_ask, apt.price_trade_recent)} (실거래 대비)</div>
      <div class="diff-line ${tradeRegDiffClass}">${diffText("실거래", apt.price_trade_recent, apt.price_registered)} (등기 대비)</div>
      <div class="diff-line">투자수익 비교: ${apt.residenceYieldRatio.toFixed(2)}x (투자이자 ${toEokMan(Math.round(apt.treasuryIncome))} / 실거주기준 ${toEokMan(Math.round(apt.residenceCostBasis))})</div>
      <div class="diff-line">손실회피 필요상승: ${toEokMan(Math.round(apt.breakEvenRequiredGain))} (${apt.breakEvenRequiredRisePct.toFixed(2)}%)</div>
    `;
    row.onclick = () => {
      state.selectedApartment = apt.name;
      renderAll();
    };

    apartmentRanking.appendChild(row);
  });

  renderDistrictRanking(ranked);
  renderTierRanking(ranked);
  renderDetail(ranked.find((x) => x.name === state.selectedApartment), ranked);
}

function renderDistrictRanking(ranked) {
  const districtRanking = document.getElementById("districtRanking");
  const grouped = {};

  ranked.forEach((apt) => {
    grouped[apt.district] = grouped[apt.district] || [];
    grouped[apt.district].push(apt.finalScore);
  });

  const rows = Object.entries(grouped)
    .map(([district, scores]) => ({ district, score: scores.reduce((a, b) => a + b, 0) / scores.length }))
    .sort((a, b) => b.score - a.score);

  districtRanking.innerHTML = rows.length
    ? rows.map((x, i) => `<div class="compact-item"><span>#${i + 1} ${x.district}</span><strong>${x.score.toFixed(1)}</strong></div>`).join("")
    : `<div class="compact-item"><span>데이터 없음</span><strong>-</strong></div>`;
}

function renderTierRanking(ranked) {
  const tierRanking = document.getElementById("tierRanking");
  const grouped = {};

  ranked.forEach((apt) => {
    grouped[apt.price_tier] = grouped[apt.price_tier] || [];
    grouped[apt.price_tier].push(apt.finalScore);
  });

  const rows = Object.entries(grouped)
    .map(([tier, scores]) => ({ tier, score: scores.reduce((a, b) => a + b, 0) / scores.length }))
    .sort((a, b) => b.score - a.score);

  tierRanking.innerHTML = rows.length
    ? rows.map((x, i) => `<div class="compact-item"><span>#${i + 1} ${x.tier}</span><strong>${x.score.toFixed(1)}</strong></div>`).join("")
    : `<div class="compact-item"><span>데이터 없음</span><strong>-</strong></div>`;
}

function renderDetail(apt, ranked) {
  const detail = document.getElementById("detailPanel");
  if (!apt) return;

  const maxPrice = Math.max(apt.price_registered, apt.price_trade_recent, apt.price_ask);

  const rows = [
    {
      name: "호가 - 실거래",
      amount: apt.price_ask - apt.price_trade_recent,
      pct: ((apt.price_ask - apt.price_trade_recent) / apt.price_trade_recent) * 100,
    },
    {
      name: "실거래 - 등기",
      amount: apt.price_trade_recent - apt.price_registered,
      pct: ((apt.price_trade_recent - apt.price_registered) / apt.price_registered) * 100,
    },
    {
      name: "호가 - 등기",
      amount: apt.price_ask - apt.price_registered,
      pct: ((apt.price_ask - apt.price_registered) / apt.price_registered) * 100,
    },
  ];

  detail.innerHTML = `
    <h2>${apt.name}</h2>
    <p>${apt.district} ${apt.dong} · ${apt.price_tier}</p>
    <p><strong>Final Score ${apt.finalScore.toFixed(1)}</strong> · Price Basis: ${state.priceBasis}</p>
    <p class="detail-meta">등기 매매가 순위 #${registeredPriceRankMap.get(apt.name)} / 시뮬레이션 순위 #${ranked.findIndex((x) => x.name === apt.name) + 1}</p>
    <p class="detail-meta">투자금액×국채금리 ${toEokMan(Math.round(apt.treasuryIncome))} vs 실거주(전세기회비용 ${toEokMan(Math.round(apt.jeonseOpportunityCost))} / 월세연환산 ${toEokMan(Math.round(apt.annualRentCost))}) → 비교수익률 ${apt.residenceYieldRatio.toFixed(2)}x</p>
    <p class="detail-meta">손실회피 필요상승액 = 실거주비용 ${toEokMan(Math.round(apt.residenceCostBasis))} + 전세금갭(${toEokMan(Math.round(apt.jeonseGapInvestment))})×금리(${toEokMan(Math.round(apt.gapInterestCost))}) = ${toEokMan(Math.round(apt.breakEvenRequiredGain))} (${apt.breakEvenRequiredRisePct.toFixed(2)}%)</p>

    <div class="price-bars">
      <div class="bar-item"><span>등기</span><div class="bar" style="width:${(apt.price_registered / maxPrice) * 100}%"></div><strong>${toEokMan(apt.price_registered)}</strong></div>
      <div class="bar-item"><span>실거래</span><div class="bar" style="width:${(apt.price_trade_recent / maxPrice) * 100}%"></div><strong>${toEokMan(apt.price_trade_recent)}</strong></div>
      <div class="bar-item"><span>호가</span><div class="bar" style="width:${(apt.price_ask / maxPrice) * 100}%"></div><strong>${toEokMan(apt.price_ask)}</strong></div>
    </div>

    <table>
      <thead><tr><th>괴리 항목</th><th>금액</th><th>퍼센트</th></tr></thead>
      <tbody>
        ${rows
          .map(
            (row) => `<tr><td>${row.name}</td><td>${row.amount >= 0 ? "+" : "-"}${toEokMan(Math.abs(row.amount))}</td><td>${row.pct >= 0 ? "+" : "-"}${Math.abs(row.pct).toFixed(2)}%</td></tr>`
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function bindControls() {
  const rateSlider = document.getElementById("rateSlider");
  const rateValue = document.getElementById("rateValue");
  const loanRegulation = document.getElementById("loanRegulation");
  const rentConversion = document.getElementById("rentConversion");
  const dsrLevel = document.getElementById("dsrLevel");
  const priceBasis = document.getElementById("priceBasis");
  const investmentAmount = document.getElementById("investmentAmount");
  const residenceBasis = document.getElementById("residenceBasis");
  const diffMode = document.getElementById("diffMode");
  const groupBy = document.getElementById("groupBy");
  const districtFilter = document.getElementById("districtFilter");
  const realtimeToggle = document.getElementById("realtimeToggle");
  const refreshInterval = document.getElementById("refreshInterval");
  const refreshNow = document.getElementById("refreshNow");

  diffMode.value = state.diffMode;
  groupBy.value = state.groupBy;
  districtFilter.innerHTML = availableDistricts.map((district) => `<option value="${district}">${district}</option>`).join("");
  investmentAmount.value = String(state.investmentAmount);
  residenceBasis.value = state.residenceBasis;
  realtimeToggle.value = state.liveUpdatesEnabled ? "on" : "off";
  refreshInterval.value = String(state.refreshIntervalSec);
  rateValue.textContent = `${state.treasuryYield2Y.toFixed(1)}%`;

  rateSlider.oninput = (e) => {
    state.treasuryYield2Y = Number(e.target.value);
    rateValue.textContent = `${state.treasuryYield2Y.toFixed(1)}%`;
    renderAll();
  };
  loanRegulation.onchange = (e) => {
    state.loanRegulation = e.target.value;
    renderAll();
  };
  rentConversion.onchange = (e) => {
    state.rentConversion = Number(e.target.value);
    renderAll();
  };
  dsrLevel.onchange = (e) => {
    state.dsrLevel = e.target.value;
    renderAll();
  };
  priceBasis.onchange = (e) => {
    state.priceBasis = e.target.value;
    renderAll();
  };
  investmentAmount.oninput = (e) => {
    state.investmentAmount = Math.max(10000, Number(e.target.value) || 10000);
    renderAll();
  };
  residenceBasis.onchange = (e) => {
    state.residenceBasis = e.target.value;
    renderAll();
  };
  groupBy.onchange = (e) => {
    state.groupBy = e.target.value;
    renderAll();
  };
  districtFilter.onchange = (e) => {
    state.selectedDistricts = Array.from(e.target.selectedOptions).map((option) => option.value);
    renderAll();
  };

  diffMode.onchange = (e) => {
    state.diffMode = e.target.value;
    const url = new URL(window.location.href);
    url.searchParams.set("diffMode", state.diffMode);
    history.replaceState({}, "", url);
    renderAll();
  };

  realtimeToggle.onchange = (e) => {
    state.liveUpdatesEnabled = e.target.value === "on";
    state.liveStatus = state.liveUpdatesEnabled ? "실시간 업데이트: 시작" : "실시간 업데이트: 중지";
    startRealtimeLoop();
    renderAll();
  };

  refreshInterval.onchange = (e) => {
    state.refreshIntervalSec = Number(e.target.value);
    if (state.liveUpdatesEnabled) {
      startRealtimeLoop();
    }
  };

  refreshNow.onclick = async () => {
    await runRealtimeUpdate();
  };
}

function renderAll() {
  renderRankings();

  const liveStatus = document.getElementById("liveStatus");
  const lastUpdated = document.getElementById("lastUpdated");
  if (liveStatus) liveStatus.textContent = state.liveStatus ? state.liveStatus : "실시간 업데이트: 대기";
  if (lastUpdated) {
    const stamp = state.lastUpdated ? state.lastUpdated.toLocaleTimeString("ko-KR", { hour12: false }) : "-";
    lastUpdated.textContent = `마지막 업데이트: ${stamp}`;
  }
}

bindControls();
renderAll();
