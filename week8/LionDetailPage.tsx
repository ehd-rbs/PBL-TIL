import type { Lion } from '../types/lion';

export const initialLions: Lion[] = [
  {
    id: 1,
    name: '김멋사',
    generation: 12,
    imageUrl: 'https://via.placeholder.com/300',
    profile: {
      age: 24,
      major: '컴퓨터공학과',
      mbti: 'ENFP',
    },
    skills: ['React', 'TypeScript', 'CSS'],
    isFavorite: false,
  },
  {
    id: 2,
    name: '이프론트',
    generation: 12,
    imageUrl: 'https://via.placeholder.com/300',
    profile: {
      age: 23,
      major: '소프트웨어학과',
      mbti: 'ISTJ',
    },
    skills: ['JavaScript', 'React', 'Vite'],
    isFavorite: true,
  },
  {
    id: 3,
    name: '박타입',
    generation: 13,
    imageUrl: 'https://via.placeholder.com/300',
    profile: {
      age: 22,
      major: '디자인학과',
      mbti: 'ISFP',
    },
    skills: ['Figma', 'HTML', 'CSS'],
    isFavorite: false,
  },
];
