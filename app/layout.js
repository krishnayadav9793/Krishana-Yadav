// app/layout.js
import { Anton } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={anton.className}>
      <body >
        <div >
          <Navbar/>
          {children}
        </div>
      </body>
    </html>
  );
}
