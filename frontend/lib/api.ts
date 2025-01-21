import { auth } from "@/auth";
import { Session } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';


export const fetchAuth = async (url: string, options: RequestInit = { method: "GET" }) => {
  const session = (await auth()) as Session;
  if (!session || !session.token || !session.user) {
    throw new Error("User is not authenticated");
  }
  
  const rawToken = typeof session.token === 'string' ? JSON.parse(session.token).token : session.token.token;
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${rawToken}`,
  };
  
  return fetch(`${baseUrl}${url}`, { ...options, headers });
 
};