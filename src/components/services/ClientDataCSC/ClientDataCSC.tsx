'use client';

import { ServiceContext } from '@/app/context/ServiceContext';
import { use } from 'react';
import ClientDataRender from '../ClientDataRender/ClientDataRender';

export default function ClientDataCSC() {
  const { dataNewService } = use(ServiceContext);

  return (
    <ClientDataRender>
      {dataNewService.client}
    </ClientDataRender>
  );
}
