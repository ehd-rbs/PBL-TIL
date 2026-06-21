import { useSearchParams } from 'react-router-dom';

const DEFAULT_FILTERS = {
  part: 'all',
  sort: 'default',
  search: '',
};

export function useLionFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    part: searchParams.get('part') || DEFAULT_FILTERS.part,
    sort: searchParams.get('sort') || DEFAULT_FILTERS.sort,
    search: searchParams.get('search') || DEFAULT_FILTERS.search,
  };

  const updateFilter = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);
    const isDefaultValue = value === DEFAULT_FILTERS[key];
    const isEmptySearch = key === 'search' && value.trim() === '';

    if (isDefaultValue || isEmptySearch) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }

    setSearchParams(nextParams);
  };

  return { filters, updateFilter };
}
