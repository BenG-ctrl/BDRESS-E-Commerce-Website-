import jwt from 'jsonwebtoken';

// Generate a verification token
export const generateVerificationToken = (email: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Verify the token
export const verifyToken = (token: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { email: string };
    return decoded.email; // Return the email from the token payload
  } catch (error) {
    console.error("Token verification failed:", error);
    return null; // Return null if the token is invalid or expired
  }
};