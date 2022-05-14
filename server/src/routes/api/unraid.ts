import express from 'express'
import { getUnraidStats } from '../../controllers/unraid'

const router = express.Router()

router.get('/stats', getUnraidStats)

export default router
