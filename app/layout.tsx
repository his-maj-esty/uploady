import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css"
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import  RecoilProvider  from "@/components/RecoilProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <RecoilProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header></Header>
              {children}
            </ThemeProvider>
          </RecoilProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
