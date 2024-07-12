import { Client } from '@/types/Services';

export default function ClientDataRender({ children }: { children: Client }) {
  const client = children;
  return (
    <div>
      <h3>
        Cliente:
        {' '}
        {client.name}
      </h3>
      <h4>
        Carro:
        {' '}
        {client.car.name}
        {' '}
        {client.carColor}
      </h4>
      <h4>
        Placa:
        {' '}
        {client.plate}
      </h4>
    </div>
  );
}
