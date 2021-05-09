import { authService } from '../../modules/user/services'
import { AuthMiddleware } from './authMiddleware'

const authMiddleware = new AuthMiddleware(authService)

export { authMiddleware }