import { Dispatch, SetStateAction } from 'react';
import { Client } from './Services';

export type ClientContextType = {
  populateListClient: (data: Client[]) => void,
  clients: Client[],
  refreshClients: () => void,
  setClients: Dispatch<SetStateAction<Client[]>>
};
