import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { ConnectWalletTopRight } from "@/components/ConnectWalletTopRight";
import { Shield, TrendingUp, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Cipher Wealth",
  description: "Private wealth management on FHEVM",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased min-h-screen">
        <Providers>
          {/* Animated Background Elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-[100px] animate-pulse-glow" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[150px]" />
          </div>

          <main className="relative z-10 min-h-screen flex flex-col">
            {/* Premium Header */}
            <header className="glass-strong sticky top-0 z-50 border-b border-border/50">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  {/* Logo Section */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
                        <Shield className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background animate-pulse" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold gradient-text flex items-center gap-2">
                        Cipher Wealth
                        <span className="text-lg">💎</span>
                      </h1>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        FHE-Encrypted Wealth Management
                      </p>
                    </div>
                  </div>

                  {/* Stats Bar */}
                  <div className="hidden md:flex items-center gap-6">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/20">
                      <TrendingUp className="w-4 h-4 text-success" />
                      <span className="text-sm font-medium text-success">Secure</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                      <span className="text-sm">🔐</span>
                      <span className="text-sm font-medium text-primary">FHE Active</span>
                    </div>
                  </div>

                  {/* Wallet Connect */}
                  <ConnectWalletTopRight />
                </div>
              </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 container mx-auto px-4 py-8">
              {children}
            </div>

            {/* Footer */}
            <footer className="glass border-t border-border/50 mt-auto">
              <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>Powered by Zama FHEVM</span>
                    <span className="mx-2">•</span>
                    <span>🔒 End-to-End Encrypted</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                      Network Active
                    </span>
                    <span>© 2024 Cipher Wealth</span>
                  </div>
                </div>
              </div>
            </footer>
          </main>
        </Providers>
      </body>
    </html>
  );
}
