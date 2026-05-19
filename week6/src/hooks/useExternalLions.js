import { useState } from 'react';
import { createLionsFromUsers } from '../utils/lionUtils.js';

function getApiUrl(count) {
  return 'https://randomuser.me/api/?results=' + count + '&nat=us,gb,ca,au,nz';
}

export function useExternalLions() {
  const [requestStatus, setRequestStatus] = useState('ready');
  const [message, setMessage] = useState('준비 완료');
  const [lastRequest, setLastRequest] = useState(null);

  function fetchUsers(count, onSuccess, requestInfo) {
    setRequestStatus('loading');
    setMessage('불러오는 중...');
    setLastRequest(requestInfo);

    fetch(getApiUrl(count))
      .then(function (response) {
        if (!response.ok) {
          throw new Error('네트워크 응답 오류');
        }
        return response.json();
      })
      .then(function (data) {
        onSuccess(data.results);
        setRequestStatus('success');
        setMessage('완료!');
        setTimeout(function () {
          setRequestStatus('ready');
          setMessage('준비 완료');
        }, 1200);
      })
      .catch(function (error) {
        setRequestStatus('error');
        setMessage('불러오기 실패: ' + error.message);
      });
  }

  function addRandom(count, lions, setLions) {
    const requestInfo = {
      type: 'add',
      count: count,
    };

    fetchUsers(
      count,
      function (users) {
        setLions(function (currentLions) {
          const nextOrder = currentLions.length + 1;
          return currentLions.concat(createLionsFromUsers(users, nextOrder));
        });
      },
      requestInfo
    );
  }

  function refreshAll(lions, setLions) {
    const myLions = lions.filter(function (lion) {
      return lion.isMine;
    });
    const count = lions.length - myLions.length;
    const safeCount = count > 0 ? count : 1;

    const requestInfo = {
      type: 'refresh',
      count: safeCount,
    };

    fetchUsers(
      safeCount,
      function (users) {
        const newLions = createLionsFromUsers(users, myLions.length + 1);
        setLions(myLions.concat(newLions).slice(0, lions.length));
      },
      requestInfo
    );
  }

  function fillRandomForm(setForm) {
    const requestInfo = {
      type: 'fill',
      count: 1,
    };

    fetchUsers(
      1,
      function (users) {
        const lion = createLionsFromUsers(users, 100)[0];
        setForm({
          name: lion.name,
          part: lion.part,
          age: lion.age,
          mbti: lion.mbti,
          motto: lion.motto,
          skill: lion.skill,
          favorite: lion.favorite,
          introduction: lion.introduction,
        });
      },
      requestInfo
    );
  }

  function retry(lions, setLions, setForm) {
    if (lastRequest === null) {
      return;
    }

    if (lastRequest.type === 'add') {
      addRandom(lastRequest.count, lions, setLions);
    }

    if (lastRequest.type === 'refresh') {
      refreshAll(lions, setLions);
    }

    if (lastRequest.type === 'fill') {
      fillRandomForm(setForm);
    }
  }

  return {
    requestStatus: requestStatus,
    message: message,
    addRandom: addRandom,
    refreshAll: refreshAll,
    fillRandomForm: fillRandomForm,
    retry: retry,
  };
}
