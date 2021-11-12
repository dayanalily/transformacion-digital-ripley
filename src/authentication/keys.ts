import { TokenService, UserService } from '@loopback/authentication';
import { BindingKey } from '@loopback/context';
//import {SendSmsService, SlackService} from "../services";
//import {MyBlameLogService} from '../services/blame-logs-service';
import { PasswordHasher } from '../services/hash.password.bcryptjs';
//import { SocketNotificationService } from "../services/socket-notification.service";
import { Credentials } from '../services/user.service';

export namespace TokenServiceConstants {
    export const TOKEN_SECRET_VALUE = 'iUuTGpbg3kKDWfsy34ZLbrtse7nwUPK0q1BqeMJUp6a4e8SFXJH5d5HGXPd0xdQ';
    export const TOKEN_EXPIRES_IN_VALUE = '84600';
}

export namespace TokenServiceBindings {
    export const TOKEN_SECRET = BindingKey.create<string>(
        'authentication.jwt.secret',
    );
    export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
        'authentication.jwt.expires.in.seconds',
    );
    export const TOKEN_SERVICE = BindingKey.create<TokenService>(
        'services.authentication.jwt.tokenservice',
    );
}

export namespace PasswordHasherBindings {
    export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
        'services.hasher',
    );
    export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}

export namespace UserServiceBindings {
    export const USER_SERVICE = BindingKey.create<UserService<any, Credentials>>(
        'services.user.service',
    );
}

// export namespace SocketServiceBindings {
//     export const SOCKET_SERVICE = BindingKey.create<SocketNotificationService>(
//         'services.socket.service',
//     );
// }

/*export namespace SmsServiceBindings {
  export const SMS_SERVICE = BindingKey.create<SendSmsService>(
    'services.sms.service'
  )
}

export namespace BlameLogsServiceBindings {
  export const BLAMELOG_SERVICE = BindingKey.create<MyBlameLogService>(
    'services.blameLog.service'
  )
}

export namespace SlackServiceBindings {
  export const SLACK_SERVICE = BindingKey.create<SlackService>(
    'services.slack.service'
  )
}*/
