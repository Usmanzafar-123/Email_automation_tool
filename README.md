# Email Automation Tool

This project automates the process of reading emails, categorizing them using AI, and sending responses based on the categorization. It supports integration with **Gmail** and **Outlook** (Microsoft Graph API) using **OAuth 2.0** authentication. It also uses **BullMQ** for task scheduling and **OpenAI** for email content analysis.

## Features

- Authenticate with **Gmail** and **Outlook** using OAuth 2.0.
- Analyze incoming emails using **OpenAI** API.
- Categorize emails into labels like "Interested," "Not Interested," or "More Information."
- Automatically send customized email responses based on the categorization.
- Task management using **BullMQ** and **Redis**.

## Technologies Used

- **Node.js** and **Express.js** for the server-side application.
- **OpenAI** API for natural language processing (NLP) to categorize email content.
- **OAuth 2.0** authentication for Gmail and Outlook.
- **BullMQ** and **Redis** for task scheduling and queue management.
- **Nodemailer** for sending email responses.
- **Microsoft Graph API** for interacting with Outlook email.
- **Google API** for interacting with Gmail email.

## Prerequisites

- **Node.js** (version 16 or higher).
- **Redis** (for BullMQ task queues).
- **Google Cloud Console** and **Microsoft Azure Portal** accounts for setting up OAuth.

## Setup Instructions

Follow these steps to get the project up and running:

### Step 1: Set Up OAuth Access for Gmail and Outlook

#### Gmail OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project and enable the Gmail API.
3. Set up **OAuth 2.0** credentials for the project:
   - Set the **redirect URI** to `http://localhost:3000/oauth2callback`.
   - Download the `credentials.json` file, which contains the **Client ID** and **Client Secret**.

#### Outlook OAuth Setup

1. Go to [Microsoft Azure Portal](https://portal.azure.com/).
2. Register a new application under **App registrations**.
3. Set the **redirect URI** to `http://localhost:3000/oauth2callback`.
4. Add **Mail.Read** and **Mail.Send** permissions to your app.
5. Create a **client secret** and note the **Client ID** and **Client Secret**.

### Step 2: Clone the Repository

```bash
git clone https://github.com/your-username/email-automation-tool.git
cd email-automation-tool
# Email_automation_tool
