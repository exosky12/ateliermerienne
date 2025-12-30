import type { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import MailService from '#services/mail_service'
import User from '#models/user'

export default class AccountController {
  public async render({ inertia, auth }: HttpContext) {
    const user = auth.user!

    await user.load('orders', (query) => {
      query.orderBy('createdAt', 'desc').preload('items')
    })

    return inertia.render('account/index', {
      user: user,
      orders: user.orders,
    })
  }

  // Update only generic info (Name) directly
  public async updateInfo({ request, auth, response, session }: HttpContext) {
    const user = auth.user!
    const { fullName } = request.only(['fullName'])

    user.fullName = fullName
    await user.save()

    session.flash('success', 'Informations mises à jour')
    return response.redirect().back()
  }

  // Request Password Reset
  public async requestPasswordChange({ auth, response, session }: HttpContext) {
    const user = auth.user!
    const mailService = new MailService()

    // Generate signed URL
    const url = router.makeSignedUrl(
      'account.password.edit',
      {},
      {
        qs: { email: user.email },
        expiresIn: '30m',
        prefixUrl: process.env.APP_URL || 'http://localhost:3333',
      }
    )

    await mailService.sendPasswordResetLink(user.email, url)

    session.flash('success', 'Lien de réinitialisation envoyé par email')
    return response.redirect().back()
  }

  // Show Password Reset Form
  public async editPassword({ inertia, request, response }: HttpContext) {
    if (!request.hasValidSignature()) {
      return response.badRequest('Lien invalide ou expiré')
    }

    // Generate a signed URL for the update action, preserving the email
    const signedUpdateUrl = router.makeSignedUrl(
      'account.password.update',
      {},
      {
        qs: { email: request.qs().email },
        expiresIn: '30m',
        prefixUrl: '', // Relative URL is fine for form action? No, Inertia uses XHR.
        // Actually, Inertia `post` takes the path.
        // I need to generate the full relative path with signature.
      }
    )

    return inertia.render('account/reset_password', {
      email: request.qs().email,
      signedUpdateUrl,
    })
  }

  // Update Password
  public async updatePassword({ request, response, session }: HttpContext) {
    if (!request.hasValidSignature()) {
      return response.badRequest('Lien invalide ou expiré')
    }

    const { password, email } = request.only(['password', 'email'])
    const user = await User.findByOrFail('email', email)

    user.password = password
    await user.save()

    session.flash('success', 'Mot de passe mis à jour')
    return response.redirect().toRoute('account.index')
  }

  // Request Email Change
  public async requestEmailChange({ auth, response, session }: HttpContext) {
    const user = auth.user!
    const mailService = new MailService()

    // Generate signed URL
    // We don't know the new email yet, so we just sign the permission to change it for this user.
    const url = router.makeSignedUrl(
      'account.email.edit',
      {},
      {
        qs: { userId: user.id },
        expiresIn: '30m',
        prefixUrl: process.env.APP_URL || 'http://localhost:3333',
      }
    )

    await mailService.sendEmailChangeLink(user.email, url)

    session.flash('success', 'Lien de modification envoyé par email')
    return response.redirect().back()
  }

  // Show Email Change Form
  public async editEmail({ inertia, request, response }: HttpContext) {
    if (!request.hasValidSignature()) {
      return response.badRequest('Lien invalide ou expiré')
    }

    const signedUpdateUrl = router.makeSignedUrl(
      'account.email.update',
      {},
      {
        qs: { userId: request.qs().userId },
        expiresIn: '30m',
      }
    )

    return inertia.render('account/change_email', {
      userId: request.qs().userId,
      signedUpdateUrl,
    })
  }

  // Update Email
  public async updateEmail({ request, response, session }: HttpContext) {
    if (!request.hasValidSignature()) {
      return response.badRequest('Lien invalide ou expiré')
    }

    const { email, userId } = request.only(['email', 'userId'])
    const user = await User.findOrFail(userId)

    // Check if email already taken
    const existing = await User.findBy('email', email)
    if (existing) {
      session.flash('error', 'Cet email est déjà utilisé')
      return response.redirect().back()
    }

    user.email = email
    await user.save()

    session.flash('success', 'Email mis à jour')
    return response.redirect().toRoute('account.index')
  }
}
