const FONE_EXAMPLE = '61 98765-4321';
const DATE_EXAMPLE = '2024-05-20';

export const listServiceFalseMock = [{
  id: 1,
  totalService: '750.00',
  date: DATE_EXAMPLE,
  paymentStatus: false,
  client: {
    id: 1,
    name: 'FULANO',
    phone: '12345-6789',
  },
  carColor: 'Azul',
  plate: 'ABC-1B23',
  car: {
    id: 1,
    name: 'HONDA CIVIC',
    year: 2020,
    brand: 'HONDA',
  },
},
{
  id: 2,
  totalService: '1750.00',
  date: '2024-04-22',
  paymentStatus: false,
  client: {
    id: 2,
    name: 'CICLANO',
    phone: FONE_EXAMPLE,
  },
  carColor: 'Vermelho',
  plate: 'XYZ-9A87',
  car: {
    id: 2,
    name: 'PALIO',
    year: 2015,
    brand: 'FIAT',
  },
},
{
  id: 3,
  totalService: '1000.00',
  date: '2024-04-25',
  paymentStatus: false,
  client: {
    id: 3,
    name: 'CLAUDIA',
    phone: '61 12345-6710',
  },
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
  id: 4,
  totalService: '1550.00',
  date: '2024-05-30',
  paymentStatus: false,
  client: {
    id: 5,
    name: 'CARLOS',
    phone: '61 13445-6789',
  },
  carColor: 'PRATA',
  plate: 'ABC-1B25',
  car: {
    id: 1,
    name: 'CORSA',
    year: 2005,
    brand: 'CHEVROLET',
  },
},
{
  id: 6,
  totalService: '2050.00',
  date: '2024-05-19',
  paymentStatus: false,
  client: {
    id: 1,
    name: 'MARIA',
    phone: '61 12645-6789',
  },
  carColor: 'VERMELHA',
  plate: 'ABC-1B29',
  car: {
    id: 8,
    name: 'HILUX',
    year: 2020,
    brand: 'TOYOTA',
  },
},
];

export const listServiceTrueMock = [{
  id: 5,
  totalService: '2250.00',
  date: '2024-05-19',
  paymentStatus: true,
  client: {
    id: 10,
    name: 'VITOR',
    phone: '61 12645-8789',
  },
  carColor: 'AMARELO',
  plate: 'ABC-1B30',
  car: {
    id: 8,
    name: 'CAMARO',
    year: 2020,
    brand: 'CHEVROLET',
  },
},
];

export const finalFindServiceResult = {
  employees: [{
    labor: '250.00',
    description: 'MÃO DE OBRA',
    employee: {
      id: 1,
      name: 'FABIO',
    },
  },
  ],
  itens: [{
    id: 1,
    name: 'PASTILHA DE FREIO',
    qtdUnit: 2,
    priceUnit: '125.00',
  },
  {
    id: 2,
    name: 'DISCO DE FREIO',
    qtdUnit: 2,
    priceUnit: '250.00',
  },
  ],
  basicServiceData: {
    id: 1,
    totalService: '750.00',
    date: DATE_EXAMPLE,
    paymentStatus: false,
    client: {
      id: 1,
      name: 'FULANO',
      phone: '12345-6789',
    },
    carColor: 'Azul',
    plate: 'ABC-1B23',
    car: {
      id: 1,
      name: 'HONDA CIVIC',
      year: 2020,
      brand: 'HONDA',
    },
    principalEmployee: {
      id: 1,
      name: 'FABIO',
    },
  },
};

export const insertServiceCompleteMock = {
  clientId: 2,
  totalService: 800,
  carColor: 'azul',
  plate: 'ABC-2S34',
  carId: 2,
  date: '2024-05-09',
  paymentStatus: false,
  principalEmployeeId: 1,
  itens: [{
    itemId: 2,
    qtdUnit: 1,
    priceUnit: 150,
  }],
  employeeServices: [{
    labor: 200,
    employeeId: 1,
    description: 'null',
  }, {
    labor: 500,
    employeeId: 1,
    description: 'ALINHAMENTO',
  }],
};
