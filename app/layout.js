import { Space_Grotesk, Outfit, JetBrains_Mono } from "next/font/google";
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

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Krishana Yadav | Software Engineer & CP Specialist",
  description: "Portfolio of Krishana Yadav - Competitive Programmer, DSA Enthusiast, Full-Stack Web Developer & AI/ML Hobbyist at IIIT Vadodara (IIITV)",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${outfit.variable} ${jetbrainsMono.variable} dark`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body className="font-sans antialiased min-h-screen bg-[#050507] text-[#f4f4f5] relative selection:bg-indigo-500/25 selection:text-indigo-300">
        <ThemeProvider>
          <CustomCursor />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
