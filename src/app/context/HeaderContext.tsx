'use client';

import { HeaderContextType } from '@/types/HeaderContextType';
import { useRouter } from 'next/navigation';
import { createContext, use } from 'react';
import { INITIAL_STATE_NEW_SERVICE, ServiceContext } from './ServiceContext';

export const HeaderContext = createContext({} as HeaderContextType);

export default function HeaderProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { setDataNewService } = use(ServiceContext);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, path: string) => {
    const { id } = e.currentTarget;
    if (`/${e.currentTarget.id}` !== path) {
      setDataNewService(INITIAL_STATE_NEW_SERVICE);
      router.push(`/${id}`);
    }
  };

  const valuesContext = {
    handleClick,
  };
  return (
    <HeaderContext.Provider value={valuesContext}>
      {children}
    </HeaderContext.Provider>
  );
}
