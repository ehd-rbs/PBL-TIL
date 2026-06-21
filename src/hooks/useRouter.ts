import { useEffect, useState } from 'react';
import type { RoutePath } from '../types';

const routeList: RoutePath[] = ['/', '/login', '/todos', '/feedback'];

function getRoutePath(): RoutePath {
  const currentPath = window.location.pathname as RoutePath;
  return routeList.includes(currentPath) ? currentPath : '/not-found';
}

export function useRouter() {
  const [path, setPath] = useState<RoutePath>(getRoutePath);

  useEffect(() => {
    const handlePopState = () => setPath(getRoutePath());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (nextPath: RoutePath) => {
    window.history.pushState(null, '', nextPath);
    setPath(nextPath);
  };

  return { path, navigate };
}
