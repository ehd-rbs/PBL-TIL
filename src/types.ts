export type Todo = {
  id: string;
  title: string;
  createdAt: string;
};

export type User = {
  email: string;
};

export type RoutePath = '/' | '/login' | '/todos' | '/feedback' | '/not-found';
