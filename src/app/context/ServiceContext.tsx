'use client';

import { NewServiceInPage, ServiceContextType } from '@/types/ServiceContext';
import { Employee, NewServiceType, Service } from '@/types/Services';
import { createContext, useState } from 'react';

export const ServiceContext = createContext({} as ServiceContextType);
const CURRENT_DATE = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
export const INITIAL_STATE_NEW_SERVICE_IN_PAGE = {
  client: {
    id: 0,
    name: '',
    phone: '',
    carColor: '',
    plate: '',
    car: {
      id: 0,
      name: '',
      year: 0,
      brand: '',
    },
  },
  totalService: 0,
  date: CURRENT_DATE,
  paymentStatus: false,
  principalEmployee: {
    id: 0,
    name: '',
  },
  pieces: [],
  employeeServices: [],
};

export const INITIAL_STATE_NEW_SERVICE = {
  clientId: 0,
  totalService: 0,
  date: CURRENT_DATE,
  paymentStatus: false,
  principalEmployeeId: 0,
  pieces: [],
  employeeServices: [],
};

export default function ServiceProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);
  const [initialServices, setInitialServices] = useState<Service[]>([]);
  const [paidServices, setPaidServices] = useState(false);
  const [dataNewService, setDataNewService] = useState<NewServiceType>(INITIAL_STATE_NEW_SERVICE);
  const [dataNewServiceInPage,
    setDataNewServiceInPage] = useState<NewServiceInPage>(INITIAL_STATE_NEW_SERVICE_IN_PAGE);
  const [listEmployees, setListEmployees] = useState<Employee[]>([]);
  const refreshServices = () => {
    setServices(initialServices);
  };
  const populateService = (data: Service[]) => {
    setServices(data);
    setInitialServices(data);
  };

  const values = {
    populateService,
    services,
    refreshServices,
    setServices,
    paidServices,
    setPaidServices,
    setDataNewService,
    dataNewService,
    dataNewServiceInPage,
    setDataNewServiceInPage,
    setListEmployees,
    listEmployees,
  };
  return (
    <ServiceContext.Provider value={values}>
      {children}
    </ServiceContext.Provider>
  );
}
