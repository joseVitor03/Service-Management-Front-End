import { Request, Response, Router } from 'express';
import {
  listServiceTrueMock, listServiceFalseMock, finalFindServiceResult, insertServiceCompleteMock,
} from './mocks/servicesMock';
import {
  findClientById, mockInsertClient, mockListClients, servicesByClientMock,
} from './mocks/clientsMock';
import { employeeProductivityByDateFinalMock, employeeServices, mockFindEmployeesAll } from './mocks/employeesMock';
import { findCarByBrandMock } from './mocks/carMock';
import { findAll } from './mocks/itemMock';

const router = Router();

router.post('/login', (req: Request, res:Response) => {
  const { email, password } = req.body;
  if (email !== 'example@gmail.com' || password !== 'Ab12345678@') {
    return res.status(404).json({ message: 'email ou senha incorretos.' });
  }

  return res.status(200).json({ token: 'ok' });
});

router.get('/itens/findItens/', (_req: Request, res: Response) => res.status(200).json(findAll));

router.post('/cars/brand', (_req: Request, res: Response) => res.status(200).json(findCarByBrandMock));

router.post('/services', (_req: Request, res: Response) => res.status(201).json(insertServiceCompleteMock));

router.delete('/services/:id', (_req: Request, res: Response) => res.status(200).json({ message: 'serviço deletado' }));

router.patch('/services/:id', (_req: Request, res: Response) => res.status(200).json({ message: 'serviço atualizado' }));

router.get('/services/paymentStatusFalse', (_req, res:Response) => res.status(200).json(listServiceFalseMock));

router.get('/services/paymentStatusTrue', (_req, res:Response) => res.status(200).json(listServiceTrueMock));

router.get('/services/client/:id', (_req, res:Response) => res.status(200).json(servicesByClientMock));

router.get('/services/findService/:id', (_req: Request, res: Response) => res.status(200).json(finalFindServiceResult));

router.get('/clients', (_req: Request, res: Response) => res.status(200).json(mockListClients));

router.post('/clients', (_req: Request, res: Response) => res.status(201).json(mockInsertClient));

router.post('/clients/findClient', (_req: Request, res: Response) => res.status(200).json(mockListClients));

router.get('/clients/:id', (_req: Request, res: Response) => res.status(200).json(findClientById));

router.put('/clients/:id', (_req: Request, res: Response) => res.status(200).json({ message: 'dados atualizados.' }));

router.delete('/clients/:id', (_req: Request, res: Response) => res.status(200).json({ message: 'cliente deletado.' }));

router.get('/employee', (_req: Request, res: Response) => res.status(200).json(mockFindEmployeesAll));

router.post('/employee', (_req: Request, res: Response) => res.status(201).json({ id: 3, name: 'CLEBER' }));

router.delete('/employee/:id', (_req: Request, res: Response) => res.status(200).json({ message: 'funcionário removido' }));

router.post('/employee/:id/services', (_req: Request, res: Response) => res.status(200).json(employeeProductivityByDateFinalMock));

router.get('/employee/:id/services', (_req: Request, res: Response) => res.status(200).json(employeeServices));

router.post('/cars', (_req: Request, res: Response) => res.status(201).json({ message: 'carro cadastrado' }));

router.post('/itens', (_req: Request, res: Response) => res.status(201).json({ message: 'item cadastrado' }));
export default router;
