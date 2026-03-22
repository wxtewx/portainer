import { createContext, useContext } from 'react';

export const InputContext = createContext<{
  allowAuto: boolean;
  allowBindMounts: boolean;
} | null>(null);

export function useInputContext() {
  const value = useContext(InputContext);

  if (value === null) {
    throw new Error('useContext 必须在 Context.Provider 内部使用');
  }

  return value;
}
