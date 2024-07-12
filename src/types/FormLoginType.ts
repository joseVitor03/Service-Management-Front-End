export type FormLoginType = {
  email: string,
  password: string
};

export type FormRegistrationClientType = {
  name: string;
  phone: string;
  plate: string,
  car: {
    id: number;
    name: string;
    brand: string;
    year: number
  }
  carColor: string
};
