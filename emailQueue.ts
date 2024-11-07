import { Queue, Worker } from 'bullmq';
import { analyzeEmailContent } from '../src/emailProcessor';

// Define the interface for email data
interface EmailData {
  content: string;  // The email content to be analyzed
  sender: string;   // The sender's email address
}

// Create a new queue named 'emails'
const emailQueue = new Queue('emails', { connection: { host: 'localhost', port: 6379 } });

// Function to add emails to the queue
export async function addEmailToQueue(emailData: EmailData) {
  await emailQueue.add('processEmail', emailData);
}

// Define a worker to process emails from the 'emails' queue
const worker = new Worker('emails', async job => {
  if (job.name === 'processEmail') {
    // Analyze the email content using OpenAI API
    const label = await analyzeEmailContent(job.data.content);
    console.log(`Email categorized as: ${label}`);
    
    // Logic to send a response based on the label can be added here
    // For example, you can call sendResponseEmail based on the label:
    // await sendResponseEmail(job.data.sender, label);
  }
}, { connection: { host: 'localhost', port: 6379 } });
