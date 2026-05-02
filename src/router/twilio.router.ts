import  {Router} from 'express'
import getTurnServer from '../controller/twilio.controller'
import AuthMiddleware from '../middleware/auth.middleware';

const twilioRouter = Router()

twilioRouter.get('/turn-server', AuthMiddleware, getTurnServer)

export default twilioRouter;