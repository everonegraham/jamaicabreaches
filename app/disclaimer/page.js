
export const metadata = {
  title: 'Disclaimer - Jamaica Breaches',
  description: 'Recording security breaches, data leaks, hacks and scams taking place in Jamaica.',
  canonical: 'https://jamaicabreaches.com/',
  openGraph: {
    website: 'Jamaica Breaches',
    url: 'https://jamaicabreaches.com/',
  },
};

export default function Disclaimer() {
  return (

    <section className="text-gray-600 body-font relative flex-grow">
        <div className="container px-5 pt-24 pb-16 mx-auto">
          <div className="flex flex-col text-center w-full mb-12 items-center">
            <h1 className="text-80 text-center font-3 lh-6 ld-04 font-bold text-white mb-6">
              Disclaimer
            </h1>
            
            <p className="mx-auto text-xl text-center text-gray-300 font-normal leading-relaxed fs521 lg:w-2/3">
              Please be aware that the information provided on this website regarding 
              cybersecurity breaches, data leaks, hacks and scams at other companies are based on publicly available data 
              and may not always be confirmed. We strive to provide accurate and up-to-date 
              information, but it is important to note that some listings may be incomplete or 
              incorrect. We advise all users to always refer to multiple sources and not rely 
              solely on the information provided on Jamaica Breaches. This website is intended for 
              informational purposes only and should not be used as the sole basis for any 
              decision-making.
            </p>
          </div>
        </div>
    </section>
  );
}
