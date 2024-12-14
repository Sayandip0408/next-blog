import { AuthProvider } from "./context/authContext";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Inkling",
  description: "Welcome to Inkling, where we share insights, stories, and resources to inspire and inform. Our mission is to create a space for learning, growth, and exploration, covering topics such as web development, technology trends, personal growth, and more.",
  keywords: "inkling, inkling blog, blogging website, blog website, inkling by sayandip, sayandip, sayandip adhikary",
  openGraph: {
    title: "Inkling",
    description: "Welcome to Inkling, where we share insights, stories, and resources to inspire and inform. Our mission is to create a space for learning, growth, and exploration, covering topics such as web development, technology trends, personal growth, and more.",
    url: "https://inkling-by-sayandip.vercel.app"
  },
  twitter: {
    title: "Inkling",
    description: "Welcome to Inkling, where we share insights, stories, and resources to inspire and inform. Our mission is to create a space for learning, growth, and exploration, covering topics such as web development, technology trends, personal growth, and more.",
    images: ["https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
    card: "summary_large_image",
    creator: "SayanDip Adhikary",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className='montserrat'
      >
        <AuthProvider>
          {children}
          <Footer />
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
