import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Addressee} from '../models';
import {AddresseeRepository} from '../repositories/addressee.repository';

export class AddresseeController {
  constructor(
    @repository(AddresseeRepository)
    public addresseeRepository: AddresseeRepository,
  ) { }

  @authenticate.skip()
  @post('/addressees')
  @response(200, {
    description: 'Addressee model instance',
    content: {'application/json': {schema: getModelSchemaRef(Addressee)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Addressee, {
            title: 'NewAddressee',

          }),
        },
      },
    })
    addressee: Addressee,
  ): Promise<Addressee> {
    return this.addresseeRepository.create(addressee);
  }

  @authenticate.skip()
  @get('/addressees/count')
  @response(200, {
    description: 'Addressee model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Addressee) where?: Where<Addressee>,
  ): Promise<Count> {
    return this.addresseeRepository.count(where);
  }

  @authenticate.skip()
  @get('/addressees')
  @response(200, {
    description: 'Array of Addressee model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Addressee, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Addressee) filter?: Filter<Addressee>,
  ): Promise<Addressee[]> {
    return this.addresseeRepository.find(filter);
  }

  @authenticate.skip()
  @patch('/addressees')
  @response(200, {
    description: 'Addressee PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Addressee, {partial: true}),
        },
      },
    })
    addressee: Addressee,
    @param.where(Addressee) where?: Where<Addressee>,
  ): Promise<Count> {
    return this.addresseeRepository.updateAll(addressee, where);
  }

  @authenticate.skip()
  @get('/addressees/{id}')
  @response(200, {
    description: 'Addressee model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Addressee, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Addressee, {exclude: 'where'}) filter?: FilterExcludingWhere<Addressee>
  ): Promise<Addressee> {
    return this.addresseeRepository.findById(id, filter);
  }

  @authenticate.skip()
  @patch('/addressees/{id}')
  @response(204, {
    description: 'Addressee PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Addressee, {partial: true}),
        },
      },
    })
    addressee: Addressee,
  ): Promise<void> {
    await this.addresseeRepository.updateById(id, addressee);
  }

  @authenticate.skip()
  @put('/addressees/{id}')
  @response(204, {
    description: 'Addressee PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() addressee: Addressee,
  ): Promise<void> {
    await this.addresseeRepository.replaceById(id, addressee);
  }


  @authenticate.skip()
  @del('/addressees/{id}')
  @response(204, {
    description: 'Addressee DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.addresseeRepository.deleteById(id);
  }
}
