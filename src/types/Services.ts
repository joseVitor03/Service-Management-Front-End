export type Car = {
  id: number;
  name: string;
  year: number;
  brand: string;
};

export type Client = {
  id: number;
  name: string;
  phone: string;
  carColor: string;
  plate: string;
  car: Car;
};

export type Service = {
  id: number;
  totalService: string;
  date: string;
  paymentStatus: boolean;
  client: Client;
};

export type Employee = {
  id: number;
  name: string;
};

export type Itens = {
  qtdUnit: number,
  priceUnit: string,
  id: number,
  name: string
};

export type BasicDataService = {
  id: number,
  totalService: string,
  date: string,
  paymentStatus: boolean,
  principalEmployee: Employee,
  client: {
    id: number,
    name: string,
    phone: string,
    carColor: string,
    plate: string,
    car: {
      id: number,
      name: string,
      year: number,
      brand: string
    }
  }
};

export type SimplifyFindServiceType = {
  employees: {
    employee: Employee
    labor: string,
    description: string
  }[],
  itens: Itens[],
  basicServiceData: BasicDataService
};

export type DataClientAndService = {
  services: BasicDataService[],
  dataClient: Client
};

type ItensService = {
  itemId: number,
  qtdUnit: number,
  priceUnit: number
};

type EmployeeService = {
  employeeId: number,
  labor: number,
  description: string | null
};

export type NewServiceType = {
  clientId: number,
  totalService: number,
  date: string,
  paymentStatus: boolean,
  principalEmployeeId: number,
  itens: ItensService[],
  employeeServices: EmployeeService[],
};

export type ListServiceEmployee = {
  labor: string;
  description: string;
  service: Service;
};

export type ListServicesProductivityEmployee = {
  labor: number,
  description: string,
  service: {
    id: number,
    date: string,
    client: {
      id: number,
      name: string,
      carColor: string,
      plate: string,
      car: {
        id: number,
        name: string,
        year: number,
        brand: string
      }
    }
  },
  employee: {
    id: number,
    name: string
  }
};
