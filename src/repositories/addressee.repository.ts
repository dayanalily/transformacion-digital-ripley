import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Addressee, AddresseeRelations} from '../models';

export class AddresseeRepository extends DefaultCrudRepository<
  Addressee,
  typeof Addressee.prototype.id,
  AddresseeRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Addressee, dataSource);
  }
}
