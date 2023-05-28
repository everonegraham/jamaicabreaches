import Link from 'next/link';
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: '404 - Jamaica Breaches',
  description: 'Recording security breaches, data leaks, hacks and scams taking place in Jamaica.',
  canonical: 'https://jamaicabreaches.com/',
  openGraph: {
    website: 'Jamaica Breaches',
    url: 'https://jamaicabreaches.com/',
  },
};

export default function NotFound() {
  return (
    
    <div className="text-black bg-black flex flex-col min-h-screen">
      <Header />
      <section className="text-gray-600 body-font relative flex-grow">
        <div className="container px-5 pt-24 pb-16 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="text-80 text-center font-3 lh-6 ld-04 font-bold text-white mb-6">
              404 - Unavailable
            </h1>
            <br />
            <Link
              className="w-64 p-1 mx-auto font-bold text-center text-white border border-gray-500 rounded-lg sm:p-4"
              href="/"
            >
              Return Home
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
