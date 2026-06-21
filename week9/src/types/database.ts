export type Database = {
  public: {
    Tables: {
      lions: {
        Row: {
          id: string;
          name: string;
          generation: number;
          part: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          generation: number;
          part: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          generation?: number;
          part?: string;
          created_at?: string | null;
        };
      };
    };
  };
};
