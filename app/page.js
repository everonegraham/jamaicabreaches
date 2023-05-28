import React from "react";
import Table from "../components/Table";

export const metadata = {
    title: 'Jamaica Breaches',
    description: 'Recording security breaches, data leaks, hacks and scams taking place in Jamaica.',
    canonical: 'https://jamaicabreaches.com/',
    openGraph: {
      website: 'Jamaica Breaches',
      url: 'https://jamaicabreaches.com/',
    },
};

export default function Home() {

  return (

    <section className="text-gray-600 body-font flex-grow">
        <div className="max-w-5xl pt-52 pb-24 mx-auto">
            <h1 className="text-80 text-center font-4 lh-6 ld-04 font-bold text-white mb-6">
            The Jamaican Security Logbook
            </h1>
            <h2 className="text-2xl font-4 font-semibold lh-6 ld-04 pb-11 text-gray-700 text-center">
            Recording security breaches, data leaks, hacks and scams taking place in Jamaica.
            </h2>
            <Table/>
        </div>
    </section>

  );
}


