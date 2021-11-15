import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Addres} from '../models';
import {AddresRepository} from '../repositories';

export class AddresController {
  constructor(
    @repository(AddresRepository)
    public addresRepository : AddresRepository,
  ) {}

  @post('/addres')
  @response(200, {
    description: 'Addres model instance',
    content: {'application/json': {schema: getModelSchemaRef(Addres)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Addres, {
            title: 'NewAddres',
            exclude: ['id'],
          }),
        },
      },
    })
    addres: Omit<Addres, 'id'>,
  ): Promise<Addres> {
    return this.addresRepository.create(addres);
  }

  @get('/addres/count')
  @response(200, {
    description: 'Addres model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Addres) where?: Where<Addres>,
  ): Promise<Count> {
    return this.addresRepository.count(where);
  }

  @get('/addres')
  @response(200, {
    description: 'Array of Addres model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Addres, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Addres) filter?: Filter<Addres>,
  ): Promise<Addres[]> {
    return this.addresRepository.find(filter);
  }

  @patch('/addres')
  @response(200, {
    description: 'Addres PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Addres, {partial: true}),
        },
      },
    })
    addres: Addres,
    @param.where(Addres) where?: Where<Addres>,
  ): Promise<Count> {
    return this.addresRepository.updateAll(addres, where);
  }

  @get('/addres/{id}')
  @response(200, {
    description: 'Addres model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Addres, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Addres, {exclude: 'where'}) filter?: FilterExcludingWhere<Addres>
  ): Promise<Addres> {
    return this.addresRepository.findById(id, filter);
  }

  @patch('/addres/{id}')
  @response(204, {
    description: 'Addres PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Addres, {partial: true}),
        },
      },
    })
    addres: Addres,
  ): Promise<void> {
    await this.addresRepository.updateById(id, addres);
  }

  @put('/addres/{id}')
  @response(204, {
    description: 'Addres PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() addres: Addres,
  ): Promise<void> {
    await this.addresRepository.replaceById(id, addres);
  }

  @del('/addres/{id}')
  @response(204, {
    description: 'Addres DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.addresRepository.deleteById(id);
  }
}
