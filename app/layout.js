import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import CustomCursor from "@/components/custom-cursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Krishana Yadav | Portfolio",
  description: "Portfolio of Krishana Yadav - Competitive Programmer, DSA Enthusiast, Web Developer & AI/ML Hobbyist",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${outfit.variable}`} style={{ scrollBehavior: 'smooth' }}>
      <body className="font-sans antialiased min-h-screen relative selection:bg-primary/20 selection:text-primary">
        <ThemeProvider>
          <CustomCursor />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
