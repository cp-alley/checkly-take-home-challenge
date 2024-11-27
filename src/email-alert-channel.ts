import { EmailAlertChannel } from 'checkly/constructs'

// Option 1: Configure a new email channel. Change the default fallback value
// and set the CHECKLY_ALERT_EMAIL variable in your shell or .env file

const DEFAULT_EMAIL = 'example@example.com'

const sendDefaults = {
  sendFailure: true,
  sendRecovery: true,
  sendDegraded: false,
  sslExpiry: false,
}

const alertEmail = process.env.CHECKLY_ALERT_EMAIL || DEFAULT_EMAIL

export const emailChannel = new EmailAlertChannel('email-channel-1', {
  address: alertEmail,
  ...sendDefaults
})

// Option 2: Reference an existing email channel
// Replace the id with the id from your existing channel found in the Checkly UI

// export const emailChannel = EmailAlertChannel.fromId(20)
