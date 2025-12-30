import { Resend } from 'resend'
import env from '#start/env'
import { render } from '@react-email/render'
import { ResetPassword } from '../emails/ResetPassword.js'
import { ChangeEmail } from '../emails/ChangeEmail.js'

export default class MailService {
  private resend: Resend

  constructor() {
    this.resend = new Resend(env.get('RESEND_API_KEY'))
  }

  async sendPasswordResetLink(email: string, url: string) {
    const html = await render(ResetPassword({ url }))

    await this.resend.emails.send({
      from: 'onboarding@resend.dev', // Or whatever domain they verified
      to: [email],
      subject: 'Réinitialisation de votre mot de passe',
      html: html,
    })
  }

  async sendEmailChangeLink(email: string, url: string) {
    const html = await render(ChangeEmail({ url }))

    await this.resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [email],
      subject: 'Modification de votre adresse email',
      html: html,
    })
  }
}
