import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';
import initFirebase from '../lib/firebase'

import '../styles/global.scss'
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import Header from '../components/header'
import Footer from '../components/footer';

initFirebase()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}
export default MyApp
