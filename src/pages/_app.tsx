import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';

import '../styles/global.scss'
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import Header from '../components/header'
import Footer from '../components/footer';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <CartProvider>
        <div>
          <ToastContainer />
          <Header />

          <main>
              <Component {...pageProps} />
          </main>

          <Footer />
        </div>
      </CartProvider>
    </AuthContextProvider>
  )
}
export default MyApp
