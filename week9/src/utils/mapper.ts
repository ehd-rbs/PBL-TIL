import type { Database } from '../types/database';
import type { Lion } from '../types/lion';

type LionRow = Database['public']['Tables']['lions']['Row'];

export function mapLionRowToLion(row: LionRow): Lion {
  return {
    id: row.id,
    name: row.name,
    generation: row.generation,
    part: row.part,
    createdAt: row.created_at,
  };
}
