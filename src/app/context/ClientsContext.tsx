'use client';

import { ClientContextType } from '@/types/ClientContext';
import { Client } from '@/types/Services';
import { createContext, useState } from 'react';

export const ClientContext = createContext({} as ClientContextType);
export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [initialClients, setInitialClients] = useState<Client[]>([]);

  const populateListClient = (data: Client[]) => {
    setClients(data);
    setInitialClients(data);
  };

  const refreshClients = () => {
    setClients(initialClients);
  };
  const values = {
    clients,
    populateListClient,
    refreshClients,
    setClients,
  };
  return (
    <ClientContext.Provider value={values}>
      {children}
    </ClientContext.Provider>
  );
}
