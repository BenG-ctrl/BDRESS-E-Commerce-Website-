// import { Session } from "@/auth";
import { Session } from "next-auth";

export async function fetchProfile(session: Session) {
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  // Fetch profile data from the backend
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  const user = await response.json();
  return user;
}