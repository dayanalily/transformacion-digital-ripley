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
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import stream from 'stream';
import {Users} from '../models';
import {UsersRepository} from '../repositories';
import {AuthService} from '../services/auth.service';
class Credentials {
  email: string
  password: string
}

const AWS = require('aws-sdk');
const {Duplex} = stream;
function bufferToStream(buffer: any) {
  const duplexStream = new Duplex();
  duplexStream.push(buffer);
  duplexStream.push(null);
  return duplexStream;
}

@authenticate('jwt')
export class UsersController {
  authServices: AuthService

  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
    // @inject(PasswordHasherBindings.PASSWORD_HASHER)
    // public passwordHasher: PasswordHasher,
    // @inject(UserServiceBindings.USER_SERVICE)
    // public userService: MyUserService,
  ) {
    this.authServices = new AuthService(usersRepository)
  }

  @authenticate.skip()
  @post('/users')
  @response(200, {
    description: 'Users model instance',
    content: {'application/json': {schema: getModelSchemaRef(Users)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            title: 'NewUsers',
            exclude: ['id'],
          }),
        },
      },
    })
    users: Omit<Users, 'id'>,
  ): Promise<Users> {

    return this.usersRepository.create(users);
  }

  @get('/users/count')
  @response(200, {
    description: 'Users model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Users) where?: Where<Users>,
  ): Promise<Count> {

    return this.usersRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of Users model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Users, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Users) filter?: Filter<Users>,
  ): Promise<Users[]> {
    return this.usersRepository.find(filter);
  }

  @patch('/users')
  @response(200, {
    description: 'Users PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    })
    users: Users,
    @param.where(Users) where?: Where<Users>,
  ): Promise<Count> {
    return this.usersRepository.updateAll(users, where);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'Users model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Users, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Users, {exclude: 'where'}) filter?: FilterExcludingWhere<Users>
  ): Promise<Users> {
    return this.usersRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'Users PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    })
    users: Users,
  ): Promise<void> {
    await this.usersRepository.updateById(id, users);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'Users PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() users: Users,
  ): Promise<void> {
    if (users.password == undefined) {
      const usr = await this.usersRepository.findById(id)
      if (usr) {
        users.password = usr.password;
      }
    }

    return this.usersRepository.updateById(id, users);

  }

  @put('/users/recoverPassword/{id}')
  @response(204, {
    description: 'Users PUT success',
  })
  async replaceByIdPassword(
    @param.path.string('id') id: string,
    @requestBody() users: Users,
  ): Promise<any> {

    const userCredenscial = await this.authServices.IndentifyTwo(users.password)

    const usr = await this.usersRepository.findById(id)

    if (userCredenscial === usr.password) {
      const newPasword = await this.authServices.IndentifyTwo(users.newPassword)
      usr.password = newPasword;
      delete usr.confirmNewPassword
      delete usr.newPassword
      return this.usersRepository.updateById(id, usr);


    } else {
      return new HttpErrors[400]('La clave actual es invalida')

    }


  }

  @del('/users/{id}')
  @response(204, {
    description: 'Users DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usersRepository.deleteById(id);
  }

  @get('/users/resetpassword/{id}')
  @response(204, {
    description: 'Users Reset Password success',
  })
  async resetPassword(@param.path.string('id') id: string): Promise<void> {
    const usr = await this.usersRepository.findById(id)
    if (usr) {
      const password = this.authServices.Md5(usr.run)
      await this.usersRepository.updateById(id, {password});
    } else {
      throw new HttpErrors[400]('Request not valid')
    }
  }

  @authenticate.skip()
  @post('/login')
  @response(200, {
    description: 'Login for users',
    content: {'application/json': {schema: getModelSchemaRef(Users)}},
  })
  async login(
    @requestBody() credentials: Credentials
  ): Promise<Object> {
    console.log()

    try {
      const user = await this.authServices.Indentify(credentials.email, credentials.password)

      if (user) {
        const tk = await this.authServices.GenerateToken(user)

        return {
          data: user,
          token: tk
        }
      } else {
        throw new HttpErrors[401]('User or Password invalid.')

      }
    } catch (error) {
      throw new HttpErrors[401]('User or Password invalid.')
    }
  }

  @authenticate.skip()
  @post('/renewtoken/{id}')
  @response(200, {
    description: 'Renew token for users',
    content: {'application/json': {schema: getModelSchemaRef(Users)}},
  })
  async renovarToken(
    @param.path.string('id') id: string,
  ): Promise<Object> {
    const user = await this.authServices.RenewToken(id)
    if (user) {
      const tk = await this.authServices.GenerateToken(user)
      return {
        data: user,
        token: tk
      }
    } else {
      throw new HttpErrors[403]('Request not valid')
    }
  }

  @authenticate.skip()
  @get('/encriptar/{id}')
  @response(200, {
    description: 'Renew token for users',
  })
  async encriptar(
    @param.path.string('id') id: string,
  ): Promise<any> {
    return this.authServices.Md5(id)
  }





}
