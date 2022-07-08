import { Router } from 'express'
import { checkId, getAllGroups, getGroup } from '../controllers/groupController'

const groupRouter = Router()

groupRouter.param('id', checkId)

groupRouter.route('/').get(getAllGroups)
groupRouter.route('/:id').get(getGroup)

export default groupRouter
