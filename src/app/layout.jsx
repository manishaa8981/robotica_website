// app/layout.jsx
import { Merriweather, Montserrat, Open_Sans } from "next/font/google";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import "./globals.css";
import { Toaster } from "react-hot-toast";

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

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Robotica Institute",
  description: "Robotica Institute",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} font-sans antialiased min-h-screen flex flex-col`}
        style={{
          background:
            "radial-gradient(ellipse at center, #6b2d7a 0%, #4a1f5c 30%, #2d1537 60%, #1a0a1f 80%, #000000 100%)",
          backgroundAttachment: "fixed",
        }}
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
