import router from '@adonisjs/core/services/router'

const SignUpController = () => import('#identity/controllers/sign_up_controller')
const GetUserController = () => import('#identity/controllers/get_user_controller')
const SignOutController = () => import('#identity/controllers/sign_out_controller')

router.group(() => {
	router.post('sign_up', [SignUpController, 'execute'])
	router.post('sign_out', [SignOutController, 'execute'])
})

router.group(() => {
	router.get('get_user', [GetUserController, 'execute'])
})
