import { SetStateAction, Dispatch } from 'react';
import {
  Client, Employee, NewServiceType, Itens, Service,
} from './Services';

export type FilterDataType = {
  clientName: string,
  carName: string,
  year: string,
  plate: string,
  dateInitial: string,
  dateFinal: string
};

export type EmployeeInPageType = {
  id: number,
  name: string,
  description: string,
  labor: number
};

export type NewServiceInPage = {
  client: Client,
  totalService: number,
  date: string,
  paymentStatus: boolean,
  principalEmployee: Employee,
  itens: Itens[],
  employeeServices: EmployeeInPageType[],
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
  setDataNewServiceInPage: Dispatch<SetStateAction<NewServiceInPage>>,
  dataNewServiceInPage: NewServiceInPage,
  setListEmployees: Dispatch<SetStateAction<Employee[]>>,
  listEmployees: Employee[]
};
