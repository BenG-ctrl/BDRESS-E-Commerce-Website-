// types.ts
export interface Session {
    user?: {
      id: string;
      name?: string;
      email?: string;
      role?: string;
    };
    token: string | { token: string }; // Token can be a string or an object with a token property
  }