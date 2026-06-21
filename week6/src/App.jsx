import { useEffect, useState } from 'react';
import { initialLions } from './data/lions.js';
import HeaderControls from './components/HeaderControls.jsx';
import ExternalControls from './components/ExternalControls.jsx';
import ViewOptions from './components/ViewOptions.jsx';
import LionForm from './components/LionForm.jsx';
import SummaryGrid from './components/SummaryGrid.jsx';
import DetailList from './components/DetailList.jsx';
import { useExternalLions } from './hooks/useExternalLions.js';
import { createEmptyForm, getVisibleLions, isFormFilled } from './utils/lionUtils.js';

function App() {
  const [lions, setLions] = useState(initialLions);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(createEmptyForm());
  const [viewOptions, setViewOptions] = useState({
    part: '전체',
    sort: 'latest',
    search: '',
  });

  const external = useExternalLions();
  const visibleLions = getVisibleLions(lions, viewOptions);
  const canSubmit = isFormFilled(form);

  useEffect(function () {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setForm(createEmptyForm());
        setIsFormOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return function () {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function handleToggleForm() {
    setIsFormOpen(function (current) {
      return !current;
    });
  }

  function handleDeleteLast() {
    setLions(function (currentLions) {
      if (currentLions.length === 0) {
        return currentLions;
      }
      return currentLions.slice(0, currentLions.length - 1);
    });
  }

  function handleViewChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setViewOptions(function (currentOptions) {
      return {
        ...currentOptions,
        [name]: value,
      };
    });
  }

  function handleFormChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setForm(function (currentForm) {
      return {
        ...currentForm,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    setLions(function (currentLions) {
      const nextLion = {
        id: 'custom-' + Date.now(),
        name: form.name,
        part: form.part,
        age: form.age,
        mbti: form.mbti,
        motto: form.motto,
        skill: form.skill,
        favorite: form.favorite,
        introduction: form.introduction,
        addedAt: currentLions.length + 1,
        isMine: false,
      };

      return currentLions.concat(nextLion);
    });

    setForm(createEmptyForm());
    setIsFormOpen(false);
  }

  function handleCancel() {
    setForm(createEmptyForm());
    setIsFormOpen(false);
  }

  function handleAddOne() {
    external.addRandom(1, lions, setLions);
  }

  function handleAddFive() {
    external.addRandom(5, lions, setLions);
  }

  function handleRefreshAll() {
    external.refreshAll(lions, setLions);
  }

  function handleFillRandom() {
    external.fillRandomForm(setForm);
  }

  function handleRetry() {
    external.retry(lions, setLions, setForm);
  }

  return (
    <main className="app">
      <HeaderControls
        totalCount={lions.length}
        onToggleForm={handleToggleForm}
        onDeleteLast={handleDeleteLast}
      />

      <ExternalControls
        requestStatus={external.requestStatus}
        message={external.message}
        onAddOne={handleAddOne}
        onAddFive={handleAddFive}
        onRefreshAll={handleRefreshAll}
        onRetry={handleRetry}
      />

      <ViewOptions viewOptions={viewOptions} onChange={handleViewChange} />

      <LionForm
        isOpen={isFormOpen}
        form={form}
        canSubmit={canSubmit}
        requestStatus={external.requestStatus}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onFillRandom={handleFillRandom}
      />

      <SummaryGrid lions={visibleLions} />
      <DetailList lions={visibleLions} />
    </main>
  );
}

export default App;
