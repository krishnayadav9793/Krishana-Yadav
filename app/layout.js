// app/layout.js
import { Anton } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Krishana Yadav",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={anton.className}>
      <body >
        <div className="bg-neutral-100  dark:bg-neutral-950 font-sans">
          <Navbar/>
          {children}
        </div>
      </body>
    </html>
  );
}
