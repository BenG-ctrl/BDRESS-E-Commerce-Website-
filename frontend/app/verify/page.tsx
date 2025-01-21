import { verifyToken } from "@/lib/auth"; // Import the token verification function
import { redirect } from "next/navigation";

export default function Verify({ searchParams }: { searchParams: { token: string } }) {
  const { token } = searchParams;

  // Verify the token
  const email = verifyToken(token);

  if (!email) {
    return (
      <div>
        <h1>Invalid or Expired Token</h1>
        <p>The verification link is invalid or has expired. Please request a new one.</p>
      </div>
    );
  }

  // Mark the user as verified in your database (implement this logic)
  // For example:
  // await markUserAsVerified(email);

  // Redirect to a success page
  redirect("/verification-success");
}