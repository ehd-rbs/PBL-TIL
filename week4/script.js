const parts = ["Frontend", "Backend", "Design"];

let lions = [
  {
    id: 1,
    name: "초코",
    part: "Frontend",
    summary: "사용자 화면을 좋아하는 아기 사자입니다.",
    detail: "초코는 HTML, CSS, JavaScript를 배우며 예쁜 화면을 만드는 것을 좋아합니다.",
    createdAt: Date.now() - 3000,
  },
  {
    id: 2,
    name: "두리",
    part: "Backend",
    summary: "데이터 흐름을 이해하는 아기 사자입니다.",
    detail: "두리는 서버, API, 데이터베이스에 관심이 많고 안정적인 기능 구현을 좋아합니다.",
    createdAt: Date.now() - 2000,
  },
  {
    id: 3,
    name: "라라",
    part: "Design",
    summary: "보기 좋은 서비스를 고민하는 아기 사자입니다.",
    detail: "라라는 색상, 배치, 사용자 경험을 중요하게 생각합니다.",
    createdAt: Date.now() - 1000,
  },
];

let isLoading = false;
let lastRequest = null;

const $ = (id) => document.getElementById(id);

const toggleFormBtn = $("toggleFormBtn");
const deleteLastBtn = $("deleteLastBtn");
const formPanel = $("formPanel");
const countText = $("countText");

const addRandomOneBtn = $("addRandomOneBtn");
const addRandomFiveBtn = $("addRandomFiveBtn");
const refreshAllBtn = $("refreshAllBtn");
const retryBtn = $("retryBtn");
const statusText = $("statusText");

const nameInput = $("nameInput");
const partInput = $("partInput");
const summaryInput = $("summaryInput");
const detailInput = $("detailInput");
const fillRandomBtn = $("fillRandomBtn");
const submitBtn = $("submitBtn");

const partFilter = $("partFilter");
const sortSelect = $("sortSelect");
const searchInput = $("searchInput");

const summaryGrid = $("summaryGrid");
const detailList = $("detailList");
const summaryEmpty = $("summaryEmpty");
const detailEmpty = $("detailEmpty");

function getRandomPart() {
  return parts[Math.floor(Math.random() * parts.length)];
}

async function requestRandomUsers(count) {
  const response = await fetch(`https://randomuser.me/api/?results=${count}`);

  if (!response.ok) {
    throw new Error("네트워크 요청에 실패했습니다.");
  }

  const data = await response.json();

  return data.results.map((user) => {
    const name = `${user.name.first} ${user.name.last}`;
    const part = getRandomPart();

    return {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now() + Math.random(),
      name,
      part,
      summary: `${part} 파트를 꿈꾸는 아기 사자입니다.`,
      detail: `${name}은 새로운 기술을 배우고 팀원들과 함께 성장하는 것을 좋아합니다.`,
      createdAt: Date.now() + Math.random(),
    };
  });
}

function setStatus(type, message) {
  statusText.className = `status-box ${type}`;
  statusText.textContent = message;
}

function setLoading(loading) {
  isLoading = loading;

  addRandomOneBtn.disabled = loading;
  addRandomFiveBtn.disabled = loading;
  refreshAllBtn.disabled = loading;
  fillRandomBtn.disabled = loading;
  retryBtn.disabled = loading;
}

async function runRequest(requestFn) {
  if (isLoading) return;

  lastRequest = requestFn;
  setLoading(true);
  retryBtn.style.display = "none";
  setStatus("loading", "불러오는 중...");

  try {
    await requestFn();
    setStatus("ready", "준비 완료");
  } catch (error) {
    setStatus("error", `요청 실패: ${error.message}`);
    retryBtn.style.display = "inline-block";
  } finally {
    setLoading(false);
    render();
  }
}

function getVisibleLions() {
  const selectedPart = partFilter.value;
  const keyword = searchInput.value.trim().toLowerCase();
  const sortType = sortSelect.value;

  let result = lions.filter((lion) => {
    const matchesPart = selectedPart === "All" || lion.part === selectedPart;
    const matchesName = lion.name.toLowerCase().includes(keyword);

    return matchesPart && matchesName;
  });

  if (sortType === "latest") {
    result.sort((a, b) => b.createdAt - a.createdAt);
  }

  if (sortType === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
}

function render() {
  countText.textContent = `총 ${lions.length}명`;

  const visibleLions = getVisibleLions();

  summaryGrid.innerHTML = "";
  detailList.innerHTML = "";

  visibleLions.forEach((lion) => {
    const summaryCard = document.createElement("article");
    summaryCard.className = "summary-card";
    summaryCard.innerHTML = `
      <span class="badge ${lion.part}">${lion.part}</span>
      <h3>${lion.name}</h3>
      <p class="muted">${lion.summary}</p>
    `;
    summaryGrid.appendChild(summaryCard);

    const detailCard = document.createElement("article");
    detailCard.className = "detail-card";
    detailCard.innerHTML = `
      <span class="badge ${lion.part}">${lion.part}</span>
      <h3>${lion.name}</h3>
      <p><strong>한 줄 소개:</strong> ${lion.summary}</p>
      <p class="muted"><strong>상세 소개:</strong> ${lion.detail}</p>
    `;
    detailList.appendChild(detailCard);
  });

  const isEmpty = visibleLions.length === 0;
  summaryEmpty.style.display = isEmpty ? "block" : "none";
  detailEmpty.style.display = isEmpty ? "block" : "none";
}

function clearForm() {
  nameInput.value = "";
  summaryInput.value = "";
  detailInput.value = "";
  partInput.value = "Frontend";
}

toggleFormBtn.addEventListener("click", () => {
  formPanel.classList.toggle("open");
});

deleteLastBtn.addEventListener("click", () => {
  lions.pop();
  render();
});

addRandomOneBtn.addEventListener("click", () => {
  runRequest(async () => {
    const newLions = await requestRandomUsers(1);
    lions = [...lions, ...newLions];
  });
});

addRandomFiveBtn.addEventListener("click", () => {
  runRequest(async () => {
    const newLions = await requestRandomUsers(5);
    lions = [...lions, ...newLions];
  });
});

refreshAllBtn.addEventListener("click", () => {
  runRequest(async () => {
    lions = await requestRandomUsers(6);
  });
});

retryBtn.addEventListener("click", () => {
  if (lastRequest) {
    runRequest(lastRequest);
  }
});

fillRandomBtn.addEventListener("click", () => {
  runRequest(async () => {
    const [randomLion] = await requestRandomUsers(1);

    nameInput.value = randomLion.name;
    partInput.value = randomLion.part;
    summaryInput.value = randomLion.summary;
    detailInput.value = randomLion.detail;
  });
});

submitBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const part = partInput.value;
  const summary = summaryInput.value.trim();
  const detail = detailInput.value.trim();

  if (!name || !summary || !detail) {
    alert("이름, 한 줄 소개, 상세 자기소개를 모두 입력해주세요.");
    return;
  }

  lions.push({
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now() + Math.random(),
    name,
    part,
    summary,
    detail,
    createdAt: Date.now(),
  });

  clearForm();
  render();
});

partFilter.addEventListener("change", render);
sortSelect.addEventListener("change", render);
searchInput.addEventListener("input", render);

render();