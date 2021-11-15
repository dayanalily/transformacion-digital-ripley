import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Addressee extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  rut: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
  })
  bank: string;

  @property({
    type: 'string',
    required: true,
  })
  typeAccount: string;

  @property({
    type: 'string',
    required: true,
  })
  accountNumber: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Addressee>) {
    super(data);
  }
}

export interface AddresseeRelations {
  // describe navigational properties here
}

export type AddresseeWithRelations = Addressee & AddresseeRelations;
