import { SetStateAction, Dispatch } from 'react';
import { NewServiceType, Service } from './Services';

export type FilterDataType = {
  clientName: string,
  carName: string,
  year: string,
  plate: string,
  dateInitial: string,
  dateFinal: string
};

export type ServiceContextType = {
  services: Service[],
  populateService: (data: Service[]) => void,
  refreshServices: () => void,
  setServices: Dispatch<SetStateAction<Service[]>>,
  paidServices: boolean,
  setPaidServices: Dispatch<SetStateAction<boolean>>,
  setDataNewService: Dispatch<SetStateAction<NewServiceType>>,
  dataNewService: NewServiceType,
};
