import Head from "next/head";
import AboutBlock from "../components/AboutBlock";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { NextSeo } from "next-seo";

export default function About() {
  return (
    <div className="text-black bg-black flex flex-col min-h-screen pt-24">
      <NextSeo
        title="About - Jamaica Breaches"
        description="Recording security breaches, data leaks, hacks and scams taking place in Jamaica."
        canonical="https://jamaicabreaches.com/about"
        openGraph={{
          url: "https://jamaicabreaches.com/about",
        }}
      />
      <Head>
        <title>About - Jamaica Breaches</title>
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <Header />
      
        <section className="text-gray-600 body-font relative flex-grow">
            <div className="container px-5 pt-24 pb-16 mx-auto">
              <div className="flex flex-col text-center w-full mb-12">
                <h1 className="text-80 text-center font-3 lh-6 ld-04 font-bold text-white mb-6">
                  About
                </h1>
                <AboutBlock />
            </div>
            </div>
        </section>

      <Footer />
    </div>
  );
}
