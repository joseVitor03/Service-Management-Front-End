'use client';

import { ServiceContextType } from '@/types/ServiceContext';
import { NewServiceType, Service } from '@/types/Services';
import { createContext, useState } from 'react';

export const ServiceContext = createContext({} as ServiceContextType);
export const INITIAL_STATE_NEW_SERVICE = {
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
  date: '',
  paymentStatus: false,
  pieces: [],
  employeeServices: [],
};
export default function ServiceProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);
  const [initialServices, setInitialServices] = useState<Service[]>([]);
  const [paidServices, setPaidServices] = useState(false);
  const [dataNewService, setDataNewService] = useState<NewServiceType>(INITIAL_STATE_NEW_SERVICE);
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
  };
  return (
    <ServiceContext.Provider value={values}>
      {children}
    </ServiceContext.Provider>
  );
}
