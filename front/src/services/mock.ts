import { LatLngExpression } from 'leaflet';

// interface Report {
//   id: number;
//   processNumber?: string;
//   location: LatLngExpression;
//   type: 'wheelchair' | 'blind';
//   resource: string;
//   status: 'pending' | 'evaluating' | 'ongoing' | 'finished';
//   address: string;
//   complement?: string;
// }

interface MyReport {
  id: number;
  location: LatLngExpression;
  type: 'wheelchair' | 'blind';
  resource: string;
  status: 'pending' | 'evaluating' | 'ongoing' | 'finished';
  date: string;
}

// export const reports: Report[] = [
//   {
//     id: 1,
//     location: [-9.648927, -35.706977],
//     type: 'wheelchair',
//     status: 'pending',
//     resource: 'Rampa de acesso',
//     address: 'Rua do Sol, 123',
//     complement: 'Próximo ao farol',
//   },
//   {
//     id: 2,
//     location: [-9.651206, -35.71166],
//     type: 'blind',
//     status: 'pending',
//     resource: 'Sinalização sonora',
//     address: 'Rua do Comércio, 456',
//     complement: 'Próximo ao mercado',
//   },
//   {
//     id: 3,
//     location: [-9.647589, -35.723387],
//     type: 'wheelchair',
//     status: 'evaluating',
//     resource: 'Elevador',
//     address: 'Rua do Mar, 789',
//     complement: 'Próximo à praia',
//   },
//   {
//     id: 4,
//     location: [-9.652607, -35.722019],
//     type: 'blind',
//     status: 'evaluating',
//     resource: 'Corrimão',
//     address: 'Rua do Campo, 1011',
//     complement: 'Próximo ao campo de futebol',
//   },
//   {
//     id: 5,
//     location: [-9.660037, -35.699129],
//     processNumber: '123456',
//     type: 'wheelchair',
//     status: 'ongoing',
//     resource: 'Rampa de acesso',
//     address: 'Rua do Parque, 1213',
//     complement: 'Próximo ao parque',
//   },
//   {
//     id: 6,
//     location: [-9.651566, -35.709268],
//     processNumber: '789101',
//     type: 'blind',
//     status: 'ongoing',
//     resource: 'Sinalização sonora',
//     address: 'Rua da Praça, 1415',
//     complement: 'Próximo à praça',
//   },
//   {
//     id: 7,
//     location: [-9.668277, -35.727754],
//     processNumber: '111213',
//     type: 'wheelchair',
//     status: 'finished',
//     resource: 'Elevador',
//     address: 'Rua do Lago, 1617',
//     complement: 'Próximo ao lago',
//   },
//   {
//     id: 8,
//     location: [-9.660593, -35.710577],
//     processNumber: '141516',
//     type: 'blind',
//     status: 'finished',
//     resource: 'Corrimão',
//     address: 'Rua da Escola, 1819',
//     complement: 'Próximo à escola',
//   },
// ];

export const myReports: MyReport[] = [
  {
    id: 1,
    location: [-9.648927, -35.706977],
    type: 'wheelchair',
    status: 'pending',
    resource: 'Rampa de acesso',
    date: '2021-09-01',
  },
  {
    id: 2,
    location: [-9.651206, -35.71166],
    type: 'blind',
    status: 'pending',
    resource: 'Sinalização sonora',
    date: '2021-09-02',
  },
  {
    id: 3,
    location: [-9.647589, -35.723387],
    type: 'wheelchair',
    status: 'evaluating',
    resource: 'Elevador',
    date: '2021-09-03',
  },
  {
    id: 4,
    location: [-9.652607, -35.722019],
    type: 'blind',
    status: 'evaluating',
    resource: 'Corrimão',
    date: '2021-09-04',
  },
  {
    id: 5,
    location: [-9.660037, -35.699129],
    type: 'wheelchair',
    status: 'ongoing',
    resource: 'Rampa de acesso',
    date: '2021-09-05',
  },
  {
    id: 6,
    location: [-9.651566, -35.709268],
    type: 'blind',
    status: 'ongoing',
    resource: 'Sinalização sonora',
    date: '2021-09-06',
  },
  {
    id: 7,
    location: [-9.668277, -35.727754],
    type: 'wheelchair',
    status: 'finished',
    resource: 'Elevador',
    date: '2021-09-07',
  },
  {
    id: 8,
    location: [-9.660593, -35.710577],
    type: 'blind',
    status: 'finished',
    resource: 'Corrimão',
    date: '2021-09-08',
  },
];
