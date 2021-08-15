import type { AppProps } from 'next/app'
import '../lib/firebaseClient'
import '../styles/global.scss'
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import Header from '../components/header'
import Footer from '../components/footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ToastContainer />
      <Header />

      <main>
          <Component {...pageProps} />
      </main>

      <Footer />
    </div>
  )
}
export default MyApp
