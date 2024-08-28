const honda = 'HONDA CIVIC';
const DATE_EXAMPLE = '2024-05-20';
export const mockListClients = [
  {
    id: 1,
    name: 'FULANO',
    phone: '12345-6789',
    carColor: 'Azul',
    plate: 'ABC-1B23',
    car: {
      id: 1,
      name: honda,
      year: 2020,
      brand: 'HONDA',
    },
  },
  {
    id: 2,
    name: 'CICLANO',
    phone: '98765-4321',
    carColor: 'Vermelho',
    plate: 'XYZ-9A87',
    car: {
      id: 2,
      name: 'CELTA',
      year: 2020,
      brand: 'CHEVROLET',
    },
  }, {
    id: 3,
    name: 'CLAUDIA',
    phone: '61 12345-6710',
    carColor: 'Azul',
    plate: 'ABC-1B24',
    car: {
      id: 3,
      name: 'HONDA CITY',
      year: 2018,
      brand: 'HONDA',
    },
  },
  {
    id: 5,
    name: 'CARLOS',
    phone: '61 13445-6789',
    carColor: 'PRATA',
    plate: 'ABC-1B25',
    car: {
      id: 1,
      name: 'CORSA',
      year: 2005,
      brand: 'CHEVROLET',
    },
  },
];

export const mockFindClient = [
  {
    id: 1,
    name: 'Fulano',
    phone: '12345-6789',
    carColor: 'Azul',
    plate: 'ABC-1B23',
    car: {
      id: 1,
      name: 'VOLKSWAGEN POLO',
      year: 2024,
      brand: 'VOLKSWAGEN',
    },
  },
];

export const mockInsertClient = {
  id: 3,
  name: 'CLEBER',
  phone: '61 91234-5678',
  carColor: 'rosa',
  plate: 'BCD-1F23',
  car: {
    id: 1,
    name: honda,
    year: 2020,
    brand: 'HONDA',
  },
};

export const mockUpdateClient = {
  id: 2,
  name: 'Fbio',
  phone: '77 12345-6789',
  plate: 'MCH-1A24',
  carId: 1,
  carColor: 'PRATA',
};

export const findClientById = {
  id: 3,
  name: 'Fulano',
  phone: '12345-6781',
  carId: 1,
  carColor: 'Azul',
  plate: 'ABC-1B23',
  car: {
    id: 1,
    name: 'HONDA CIVIC',
    year: 2020,
    brand: 'HONDA',
  },
};

export const servicesByClientMock = [{
  id: 1,
  totalService: '750.00',
  date: DATE_EXAMPLE,
  paymentStatus: false,
  client: {
    id: 1,
    name: 'FULANO',
    phone: '12345-6789',
    carColor: 'Azul',
    plate: 'ABC-1B23',
    car: {
      id: 1,
      name: 'HONDA CIVIC',
      year: 2020,
      brand: 'HONDA',
    },
  },
},
{
  id: 2,
  totalService: '2750.00',
  date: '2024-02-10',
  paymentStatus: false,
  client: {
    id: 1,
    name: 'FULANO',
    phone: '12345-6789',
    carColor: 'Azul',
    plate: 'ABC-1B23',
    car: {
      id: 1,
      name: 'HONDA CIVIC',
      year: 2020,
      brand: 'HONDA',
    },
  },
}];
