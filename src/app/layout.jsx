// app/layout.jsx
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import { Merriweather, Open_Sans } from "next/font/google";
import "./globals.css";

// Fonts
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-merriweather",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
});

export const metadata = {
  title: "Robotica Institute",
  description: "Robotica Institute",
  icons: {
    icon: "/brandlogo.png",
    apple: "/brandlogo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${merriweather.variable} antialiased bg-white min-h-screen flex flex-col`}
      >
        <Navbar />
        <ScrollToTop />
        {/* Page content */}
        <main className="pt-20 grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
