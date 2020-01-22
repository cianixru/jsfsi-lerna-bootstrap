import { POST, Path } from 'typescript-rest'
import { Tags } from 'typescript-rest-swagger'
import { Inject } from 'typescript-ioc'
import { UnauthorizedError } from '@jsfsi-core/typescript-cross-platform'
import { LoginService } from '@jsfsi-core/typescript-nodejs'
import { User } from '@jsfsi-core-bootstrap/contracts'

interface GoogleToken {
    accessToken: string
}

@Path('/rest/login')
export class LoginController {
    @Inject
    private loginService: LoginService<User>

    @POST
    @Path('/google')
    @Tags('Login')
    public async loginWithGoogle(googleToken: GoogleToken) {
        try {
            return await this.loginService.loginWithGoogle(googleToken?.accessToken)
        } catch (error) {
            throw new UnauthorizedError(error.message)
        }
    }
}
