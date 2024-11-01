# ChannelTalk App Setup Guide

## Prerequisites
- Node.js
- npm
- ngrok
- Git

## Installation

1. Clone the repository
```bash
git clone https://github.com/MinjaeKimmm/channeltalk-app.git
```

2. Server Setup
```bash
cd server
npm install
```

3. Environment Configuration
Create a `.env` file in the server directory and configure the following:

### ChannelTalk Configuration
1. Go to ChannelTalk channel settings > App Store > Create App
2. Create a new app and set the app name
3. Copy the following credentials:
   - Application ID: `APP_ID="your app id"`
   - Signing Key: `SIGNING_KEY="your signing key"`
   - App Secret: `APP_SECRET="your app secret"`
4. Add necessary permissions and save

### Database Configuration
Add the following database settings to your `.env`:
```
DB_USER="your_db_user"
DB_PASSWORD="your_db_password"
DB_NAME="your_db_name"
```

4. WAM Setup
```bash
cd wam
npm install
npm run dev
```
You can access WAM at `localhost:3000/wam/:wam_name`

5. Start the Server
```bash
cd ../server
npm start
```

## Setting up ngrok

### Installation Options

#### For MacOS (Homebrew)
```bash
brew install ngrok
```

#### For Linux/Ubuntu
```bash
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && \
echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list && \
sudo apt update && sudo apt install ngrok
```

#### For Windows (Chocolatey)
```bash
choco install ngrok
```

### Running ngrok
```bash
ngrok http 8000 --region ap
```

## Final Configuration

1. Save the ngrok URL for:
   - Function endpoint: `ngrok_url/functions`
   - WAM endpoint: `ngrok_url/wam`

2. Configure WAM Environment
Add to `.env` in the wam directory:
```
VITE_SERVER_URL=ngrok_url
```

## Usage
Once everything is set up, your application will be accessible through the ngrok URL, and WAM will be available at the configured endpoints.
