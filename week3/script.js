// 아기 사자 명단 배열
let lionList = [];

const totalCount = document.querySelector('#totalCount');
const toggleFormBtn = document.querySelector('#toggleFormBtn');
const deleteLastBtn = document.querySelector('#deleteLastBtn');
const formArea = document.querySelector('#formArea');
const lionForm = document.querySelector('#lionForm');
const summaryGrid = document.querySelector('#summaryGrid');
const detailList = document.querySelector('#detailList');

const nameInput = document.querySelector('#nameInput');
const partInput = document.querySelector('#partInput');
const emailInput = document.querySelector('#emailInput');
const websiteInput = document.querySelector('#websiteInput');
const introInput = document.querySelector('#introInput');
const skillsInput = document.querySelector('#skillsInput');

// HTML에 처음부터 존재하는 카드 정보를 읽어서 배열로 초기화
function initListFromHTML() {
  const initialCards = document.querySelectorAll('.summary-card');

  lionList = [];

  initialCards.forEach(function (card) {
    const lion = {
      name: card.dataset.name,
      part: card.dataset.part,
      email: card.dataset.email,
      website: card.dataset.website,
      intro: card.dataset.intro,
      skills: card.dataset.skills.split(',').map(function (skill) {
        return skill.trim();
      })
    };

    lionList.push(lion);
  });

  renderAll();
}

function updateTotalCount() {
  totalCount.textContent = '총 ' + lionList.length + '명';
}

function getPartClass(part) {
  if (part === 'Frontend') return 'frontend';
  if (part === 'Backend') return 'backend';
  return 'design';
}

function createSummaryCard(lion) {
  const card = document.createElement('article');
  card.className = 'summary-card';

  card.innerHTML = `
    <span class="part ${getPartClass(lion.part)}">${lion.part}</span>
    <h3>${lion.name}</h3>
    <p>${lion.intro}</p>
    <span class="skill-badge">${lion.skills[0]}</span>
  `;

  return card;
}

function createDetailCard(lion) {
  const card = document.createElement('article');
  card.className = 'detail-card';

  const skillItems = lion.skills.map(function (skill) {
    return '<li>' + skill + '</li>';
  }).join('');

  card.innerHTML = `
    <h3>${lion.name}</h3>
    <p><strong>파트:</strong> ${lion.part}</p>
    <p><strong>이메일:</strong> ${lion.email}</p>
    <p><strong>웹사이트:</strong> ${lion.website}</p>
    <p><strong>소개:</strong> ${lion.intro}</p>
    <ul>${skillItems}</ul>
  `;

  return card;
}

function renderAll() {
  summaryGrid.innerHTML = '';
  detailList.innerHTML = '';

  lionList.forEach(function (lion) {
    summaryGrid.appendChild(createSummaryCard(lion));
    detailList.appendChild(createDetailCard(lion));
  });

  updateTotalCount();
}

function showError(input, message) {
  const field = input.closest('.form-field');
  const errorMessage = field.querySelector('.error-message');
  errorMessage.textContent = message;
}

function clearErrors() {
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(function (message) {
    message.textContent = '';
  });
}

function isValidEmail(email) {
  return email.includes('@') && email.includes('.');
}

function isValidURL(url) {
  return url.startsWith('http://') || url.startsWith('https://');
}

function validateForm() {
  let isValid = true;
  clearErrors();

  if (nameInput.value.trim() === '') {
    showError(nameInput, '이름을 입력해주세요.');
    isValid = false;
  }

  if (partInput.value === '') {
    showError(partInput, '파트를 선택해주세요.');
    isValid = false;
  }

  if (emailInput.value.trim() === '') {
    showError(emailInput, '이메일을 입력해주세요.');
    isValid = false;
  } else if (!isValidEmail(emailInput.value.trim())) {
    showError(emailInput, '이메일 형식으로 입력해주세요.');
    isValid = false;
  }

  if (websiteInput.value.trim() === '') {
    showError(websiteInput, '웹사이트를 입력해주세요.');
    isValid = false;
  } else if (!isValidURL(websiteInput.value.trim())) {
    showError(websiteInput, 'http:// 또는 https://로 시작해야 합니다.');
    isValid = false;
  }

  if (introInput.value.trim() === '') {
    showError(introInput, '한 줄 소개를 입력해주세요.');
    isValid = false;
  }

  if (skillsInput.value.trim() === '') {
    showError(skillsInput, '관심 기술을 입력해주세요.');
    isValid = false;
  }

  return isValid;
}

function resetForm() {
  lionForm.reset();
  clearErrors();
}

toggleFormBtn.addEventListener('click', function () {
  formArea.classList.toggle('hidden');
});

deleteLastBtn.addEventListener('click', function () {
  if (lionList.length === 0) {
    return;
  }

  lionList.pop();
  renderAll();
});

lionForm.addEventListener('submit', function (event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const skillArray = skillsInput.value.split(',').map(function (skill) {
    return skill.trim();
  }).filter(function (skill) {
    return skill !== '';
  });

  const newLion = {
    name: nameInput.value.trim(),
    part: partInput.value,
    email: emailInput.value.trim(),
    website: websiteInput.value.trim(),
    intro: introInput.value.trim(),
    skills: skillArray
  };

  lionList.push(newLion);
  renderAll();
  resetForm();
  formArea.classList.add('hidden');
});

initListFromHTML();
