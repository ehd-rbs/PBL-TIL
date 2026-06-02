export interface LionProfile {
  age: number;
  major: string;
  mbti: string;
}

export interface Lion {
  id: number;
  name: string;
  generation: number;
  imageUrl: string;
  profile: LionProfile;
  skills: string[];
  isFavorite: boolean;
}

export type LionFormData = Omit<Lion, 'id' | 'isFavorite'>;
