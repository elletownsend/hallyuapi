import { Router } from 'express'
import {
  checkId,
  getAllArtists,
  getArtist
} from '../controllers/artistController'

const artistRouter = Router()

artistRouter.param('id', checkId)

artistRouter.route('/').get(getAllArtists)
artistRouter.route('/:id').get(getArtist)

export default artistRouter
