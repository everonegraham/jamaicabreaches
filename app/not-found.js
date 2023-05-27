import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from 'next/link';

export const metadata = {
  title: '404 - Jamaica Breaches',
  description: 'Recording security breaches, data leaks, hacks and scams taking place in Jamaica.',
  canonical: 'https://jamaicabreaches.com/',
  openGraph: {
    url: 'https://jamaicabreaches.com/',
  },
};

export default function NotFound() {
  return (
    <div className="text-black bg-black">
      <Header />
      <div className="flex flex-col justify-center mx-auto mt-52 text-center max-w-2x1">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
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
      <div className="mt-64"></div>
      <Footer />
    </div>
  );
}
