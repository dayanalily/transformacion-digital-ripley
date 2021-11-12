import { UserService } from '@loopback/authentication';
import { inject } from '@loopback/context';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { securityId, UserProfile } from '@loopback/security';
import { PasswordHasherBindings } from '../authentication/keys';
import { Users } from '../models';
import { UsersRepository } from '../repositories/users.repository';
import { PasswordHasher } from './hash.password.bcryptjs';

export type Credentials = {
    email: string;
    password: string;
};

export class MyUserService implements UserService<Users, Credentials> {
    constructor(
        @repository(UsersRepository) public usersRepository: UsersRepository,
        @inject(PasswordHasherBindings.PASSWORD_HASHER)
        public passwordHasher: PasswordHasher,
    ) { }
    convertToUserProfile(user: Users): UserProfile {
        throw new Error('Method not implemented.');
    }

    async verifyCredentials(credentials: Credentials): Promise<any> {
        const invalidCredentialsError = '¡Email o contraseña inválidos!';
        const disabledError = 'Cuenta desactivada por incumplimiento de pagos';

        const credentialsFound = await this.usersRepository.findOne({
            where: { and: [{ email: credentials.email }] },
        });

        if (!credentialsFound) {
            throw new HttpErrors.Unauthorized(invalidCredentialsError);
        }

        const passwordMatched = await this.passwordHasher.comparePassword(
            credentials.password,
            credentialsFound.password,
        );

        if (!passwordMatched) {
            throw new HttpErrors.Unauthorized(invalidCredentialsError);
        }

        if (
            credentialsFound.disabled === true 
           // ||
            //credentialsFound.active === false
        ) {
            throw new HttpErrors.Unauthorized(disabledError);
        }

        return credentialsFound;
    }


}