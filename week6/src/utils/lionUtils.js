const parts = ['Frontend', 'Backend', 'Design'];
const mbtis = ['ENFP', 'ISTJ', 'INFJ', 'INTP', 'ESFJ', 'ENTJ'];
const skills = ['React UI 구현', 'API 설계', '서비스 UX 정리', '데이터 정리', '반응형 화면 구성', '사용자 흐름 분석'];
const favorites = ['깔끔한 코드', '팀 프로젝트', '새로운 기술 배우기', '문서화', '문제 해결', '디자인 시스템'];
const mottos = [
  '오늘 배운 것을 내일의 결과로 만들자.',
  '천천히 해도 끝까지 완성하자.',
  '좋은 질문이 좋은 결과를 만든다.',
  '함께 성장하는 개발자가 되자.',
];

export function createLionFromUser(user, order) {
  const fullName = user.name.first + ' ' + user.name.last;
  const part = parts[order % parts.length];

  return {
    id: user.login.uuid + '-' + order,
    name: fullName,
    part: part,
    age: user.dob.age,
    mbti: mbtis[order % mbtis.length],
    motto: mottos[order % mottos.length],
    skill: skills[order % skills.length],
    favorite: favorites[order % favorites.length],
    introduction: fullName + '은 ' + part + ' 파트에서 즐겁게 성장하고 있는 아기 사자입니다.',
    addedAt: order,
    isMine: false,
  };
}

export function createLionsFromUsers(users, startOrder) {
  return users.map(function (user, index) {
    return createLionFromUser(user, startOrder + index);
  });
}

export function getVisibleLions(lions, viewOptions) {
  const keyword = viewOptions.search.trim().toLowerCase();

  const filteredLions = lions.filter(function (lion) {
    const isPartMatched = viewOptions.part === '전체' || lion.part === viewOptions.part;
    const isNameMatched = lion.name.toLowerCase().includes(keyword);
    return isPartMatched && isNameMatched;
  });

  const sortedLions = filteredLions.slice();

  if (viewOptions.sort === 'name') {
    sortedLions.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  }

  if (viewOptions.sort === 'latest') {
    sortedLions.sort(function (a, b) {
      return b.addedAt - a.addedAt;
    });
  }

  return sortedLions;
}

export function createEmptyForm() {
  return {
    name: '',
    part: 'Frontend',
    age: '',
    mbti: '',
    motto: '',
    skill: '',
    favorite: '',
    introduction: '',
  };
}

export function isFormFilled(form) {
  return (
    form.name.trim() !== '' &&
    form.part.trim() !== '' &&
    String(form.age).trim() !== '' &&
    form.mbti.trim() !== '' &&
    form.motto.trim() !== '' &&
    form.skill.trim() !== '' &&
    form.favorite.trim() !== '' &&
    form.introduction.trim() !== ''
  );
}
