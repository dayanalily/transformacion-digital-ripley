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
import {Addres} from '../models/addres.model';
import {AddresRepository} from '../repositories/Addres.repository';

export class AddresController {
  constructor(
    @repository(AddresRepository)
    public AddresRepository: AddresRepository,
  ) { }

  @authenticate.skip()
  @post('/Address')
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

          }),
        },
      },
    })
    Addres: Addres,
  ): Promise<Addres> {
    return this.AddresRepository.create(Addres);
  }

  @authenticate.skip()
  @get('/Address/count')
  @response(200, {
    description: 'Addres model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Addres) where?: Where<Addres>,
  ): Promise<Count> {
    return this.AddresRepository.count(where);
  }

  @authenticate.skip()
  @get('/Address')
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
    return this.AddresRepository.find(filter);
  }

  @authenticate.skip()
  @patch('/Address')
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
    Addres: Addres,
    @param.where(Addres) where?: Where<Addres>,
  ): Promise<Count> {
    return this.AddresRepository.updateAll(Addres, where);
  }

  @authenticate.skip()
  @get('/Address/{id}')
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
    return this.AddresRepository.findById(id, filter);
  }

  @authenticate.skip()
  @patch('/Address/{id}')
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
    Addres: Addres,
  ): Promise<void> {
    await this.AddresRepository.updateById(id, Addres);
  }

  @authenticate.skip()
  @put('/Address/{id}')
  @response(204, {
    description: 'Addres PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() Addres: Addres,
  ): Promise<void> {
    await this.AddresRepository.replaceById(id, Addres);
  }


  @authenticate.skip()
  @del('/Address/{id}')
  @response(204, {
    description: 'Addres DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.AddresRepository.deleteById(id);
  }
}
