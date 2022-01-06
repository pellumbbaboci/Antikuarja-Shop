import express from 'express'
import { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser } from '../controllers/userControllers.js'
import { adminProtect } from '../middleware/authMiddleware.js'
import { protect } from '../middleware/authMiddleware.js '

const router = express.Router()

router.route('/').post(registerUser).get(protect, adminProtect, getUsers)

router.route('/:id').delete(protect, adminProtect, deleteUser)

/**
 * @swagger
 * /:
 *   post:
 *     summary: login
 *     description: login.
 */
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router
