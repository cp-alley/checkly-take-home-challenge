# Monitoring-as-Code Project with Checkly CLI

This project shows how you can use the Checkly CLI in your Monitoring-as-Code workflow.

## Getting Started

Follow these steps to set up and use this repository:

### 1. Clone the repository

```bash
git clone https://github.com/cp-alley/checkly-take-home-challenge.git
```

### 2. Install dependencies

```
cd checkly-take-home-challenge
npm install
```

## Configuring Email Alert Channel

This example includes an `EmailAlertChannel` that sends alerts for failed checks. You can configure it in two ways:

### Option 1: New email channel
#### 1. Environment variable

Set the `CHECKLY_ALERT_EMAIL` environment to your preferred email address. This can be done either in your shell or added to a `.env`file.

#### 2. Fallback

If the environment variable is not set, the default email value will be used. You can modify it in `email-alert-channel.ts`:

```ts
const CHECKLY_ALERT_EMAIL = 'youremail@domain.com'
```

### Option 2: Reference an existing channel

If you have an existing email alert channel in Checkly, you can use its ID. To find the ID, visit the Checkly web UI and navigate to the channel's edit page (`app.checklyhq.com/alerts/settings/channels/edit/email/<id>`). Then replace the placeholder in the example.

```ts
export const emailChannel = EmailAlertChannel.fromId(<your-channel-id>)
```

## Adding or Exporting Checks

### 1. Add a new check

Create new Playwright `.spec.ts` test files in the `__checks__` folder. These will be detected by Checkly during deployment. Use `.check.ts` files to override global configuration for specific checks (e.g., `home.check.ts` for `homepage.spec.ts`).

### 2. Export existing checks from Checkly

For existing checks in your account, you can export them as code:

1. Navigate to your check and click the `⋮` menu.
2. Select **Export to code**.
3. Download or copy the generated `.spec.ts` and `.check.ts` files.
4. Add `alertChannels` to the `.check.ts` files as shown below:
```ts
import { emailChannel } from '../email-alert-channel'

const alertChannels = [
  emailChannel,
]

new BrowserCheck('homepage-browser-check', {
  name: 'Home page',
  alertChannels,
  code: {
    entrypoint: path.join(__dirname, 'homepage.spec.ts')
  },
  runParallel: true,
})
```
Note that alert channels need to be explicitly set for each check.

## Deploying Checks

The repository includes a GitHub Actions workflow to trigger all of the checks in the project and deploy them if they pass.

To use the workflow, add the following secrets to your GitHub repository:
- `CHECKLY_API_KEY`: Your [Checkly API key](https://www.checklyhq.com/docs/accounts-and-users/creating-api-key/#creating-an-api-key-in-checkly---checkly-docs)
- `CHECKLY_ACCOUNT_ID`: Your Checkly account ID (found in your [user settings](https://app.checklyhq.com/settings/account/general))
- `CHECKLY_ALERT_EMAIL`: Your preferred email address for alerts

These steps can also be triggered manually with these CLI commands:

Dry run all the checks in your project:
```
npx checkly test
```
Deploy your checks to the Checkly cloud:
```
npx checkly deploy
```