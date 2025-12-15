// app/layout.js
import { Anton } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
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
      <div className="bg-slate-900/80 min-h-screen max-w-screen">
        <Header/>
        <div className="absolute right-[-200px] top-0 h-[400px] w-[400px] bg-purple-600/40 blur-[180px] rounded-full"></div>
        <div className="absolute left-[-200px] bottom-0 h-[300px] w-[300px] bg-blue-500/30 blur-[160px] rounded-full"></div>
        <div className="pt-18 flex justify-center items-center h-screen">
          {children}
        </div>
        
      </div>
        
      </body>
    </html>
  );
}
