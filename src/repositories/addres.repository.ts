import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Addres, AddresRelations} from '../models/addres.model';

export class AddresRepository extends DefaultCrudRepository<
  Addres,
  typeof Addres.prototype.id,
  AddresRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Addres, dataSource);
  }
}
