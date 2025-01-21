import { ThemeProvider } from "./components/theme-provider";
import Footer from "./components/footer";
import React from  "react";
import  Navbar  from "./components/Navbar";
import { guardRoute } from "@/lib/guard";





export default async function websiteLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {;
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar /> 
          {children}
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
