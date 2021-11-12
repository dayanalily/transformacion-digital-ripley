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
import {Transfer} from '../models';
import {TransferRepository} from '../repositories/transfer.repository';

export class TransferController {
  constructor(
    @repository(TransferRepository)
    public transferRepository: TransferRepository,
  ) { }

  @post('/transfers')
  @response(200, {
    description: 'Transfer model instance',
    content: {'application/json': {schema: getModelSchemaRef(Transfer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transfer, {
            title: 'NewTransfer',

          }),
        },
      },
    })
    transfer: Transfer,
  ): Promise<Transfer> {
    return this.transferRepository.create(transfer);
  }

  @get('/transfers/count')
  @response(200, {
    description: 'Transfer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Transfer) where?: Where<Transfer>,
  ): Promise<Count> {
    return this.transferRepository.count(where);
  }

  @get('/transfers')
  @response(200, {
    description: 'Array of Transfer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Transfer, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Transfer) filter?: Filter<Transfer>,
  ): Promise<Transfer[]> {
    return this.transferRepository.find(filter);
  }

  @patch('/transfers')
  @response(200, {
    description: 'Transfer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transfer, {partial: true}),
        },
      },
    })
    transfer: Transfer,
    @param.where(Transfer) where?: Where<Transfer>,
  ): Promise<Count> {
    return this.transferRepository.updateAll(transfer, where);
  }

  @get('/transfers/{id}')
  @response(200, {
    description: 'Transfer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Transfer, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Transfer, {exclude: 'where'}) filter?: FilterExcludingWhere<Transfer>
  ): Promise<Transfer> {
    return this.transferRepository.findById(id, filter);
  }

  @patch('/transfers/{id}')
  @response(204, {
    description: 'Transfer PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transfer, {partial: true}),
        },
      },
    })
    transfer: Transfer,
  ): Promise<void> {
    await this.transferRepository.updateById(id, transfer);
  }

  @put('/transfers/{id}')
  @response(204, {
    description: 'Transfer PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() transfer: Transfer,
  ): Promise<void> {
    await this.transferRepository.replaceById(id, transfer);
  }

  @del('/transfers/{id}')
  @response(204, {
    description: 'Transfer DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.transferRepository.deleteById(id);
  }
}
