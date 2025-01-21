declare module "@getbrevo/brevo" {
  export class ApiClient {
    setApiKey(apiKey: string): void;
  }
  export class TransactionalEmailsApi {
    constructor(apiClient: ApiClient);
    sendTransacEmail(email: SendSmtpEmail): Promise<any>;
  }
  export class SendSmtpEmail {
    to: { email: string }[];
    templateId: number;
    params: { [key: string]: any };
  }
}
