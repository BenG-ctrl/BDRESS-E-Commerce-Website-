import * as Brevo from "@getbrevo/brevo";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, verificationLink } = await request.json();

  // Initialize Brevo API client
  const apiClient = new Brevo.ApiClient();
  apiClient.setApiKey(process.env.BREVO_API_KEY);

  // Create API instance
  const apiInstance = new Brevo.TransactionalEmailsApi(apiClient);

  // Create email data
  const sendSmtpEmail = new Brevo.SendSmtpEmail();
  sendSmtpEmail.to = [{ email }];
  sendSmtpEmail.templateId = 1; // Replace with your actual template ID
  sendSmtpEmail.params = {
    verificationLink,
  };

  try {
    // Send email
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return NextResponse.json({ message: "Verification email sent!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
