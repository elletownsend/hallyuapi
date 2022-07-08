import { Router } from 'express'
import { checkId, getAllActors, getActor } from '../controllers/actorController'

const actorRouter = Router()

actorRouter.param('id', checkId)

actorRouter.route('/').get(getAllActors)
actorRouter.route('/:id').get(getActor)

export default actorRouter
