import '../styles/globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';

export default function RootLayout({ children }) {

  return (
    <html lang="hu">
      <body>
        <Header />
        <main className="container">{children}</main>
        <Footer />
         <CookieConsent />
      </body>
    </html>
  );
}
