import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Lion } from '../types/lion';
import { mapLionRowToLion } from '../utils/mapper';

export type LionInput = {
  name: string;
  generation: number;
  part: string;
};

export function useLions() {
  const [lions, setLions] = useState<Lion[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [partFilter, setPartFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'name'>('newest');

  async function fetchLions() {
    setLoading(true);
    setErrorMessage('');

    const { data, error } = await supabase
      .from('lions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setErrorMessage(error.message);
      setLions([]);
    } else {
      setLions(data.map(mapLionRowToLion));
    }

    setLoading(false);
  }

  async function addLion(input: LionInput) {
    setErrorMessage('');

    const { error } = await supabase.from('lions').insert({
      name: input.name,
      generation: input.generation,
      part: input.part,
    });

    if (error) {
      setErrorMessage(error.message);
      return false;
    }

    await fetchLions();
    return true;
  }

  async function deleteLion(id: string) {
    setErrorMessage('');

    const { error } = await supabase.from('lions').delete().eq('id', id);

    if (error) {
      setErrorMessage(error.message);
      return false;
    }

    await fetchLions();
    return true;
  }

  const filteredLions = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    const filtered = lions.filter((lion) => {
      const matchesKeyword =
        lion.name.toLowerCase().includes(keyword) ||
        lion.part.toLowerCase().includes(keyword) ||
        String(lion.generation).includes(keyword);

      const matchesPart = partFilter === 'all' || lion.part === partFilter;

      return matchesKeyword && matchesPart;
    });

    return [...filtered].sort((a, b) => {
      if (sortOrder === 'name') {
        return a.name.localeCompare(b.name, 'ko');
      }

      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;

      if (sortOrder === 'oldest') {
        return aTime - bTime;
      }

      return bTime - aTime;
    });
  }, [lions, partFilter, searchKeyword, sortOrder]);

  const partOptions = useMemo(() => {
    return Array.from(new Set(lions.map((lion) => lion.part))).filter(Boolean);
  }, [lions]);

  useEffect(() => {
    fetchLions();
  }, []);

  return {
    lions,
    filteredLions,
    loading,
    errorMessage,
    searchKeyword,
    setSearchKeyword,
    partFilter,
    setPartFilter,
    sortOrder,
    setSortOrder,
    partOptions,
    fetchLions,
    addLion,
    deleteLion,
  };
}
