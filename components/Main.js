import Table from "../components/Table";

export default function Main(...props) {
  return (
    <section className="text-gray-600 body-font flex-grow">
      <div className="max-w-5xl pt-52 pb-24 mx-auto">
        <h1 className="text-80 text-center font-4 lh-6 ld-04 font-bold text-white mb-6">
          The Jamaican Security Logbook
        </h1>
        <h2 className="text-2xl font-4 font-semibold lh-6 ld-04 pb-11 text-gray-700 text-center">
          Recording security breaches, data leaks, hacks and scams taking place in Jamaica.
        </h2>
        {/* Add sometime later one, too lazy right now. */}
        {/* <div className="ml-6 text-center pb-11">
          <a
            className="inline-flex items-center py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-transparent bg-white px-7 text-md md:mt-0 hover:text-black hover:bg-white focus:shadow-outline"
            href="/"
          >
            <div className="flex text-lg">
              <span className="justify-center">Blog</span>
            </div>
          </a>
          <a
            className="inline-flex items-center py-3 font-semibold tracking-tighter text-white transition duration-500 ease-in-out transform bg-transparent ml-11 bg-gradient-to-r from-blue-500 to-blue-800 px-14 text-md md:mt-0 focus:shadow-outline"
            href="/"
          >
            <div className="flex text-lg">
              <span className="justify-center">Docs</span>
            </div>
          </a>
        </div> */}
        <Table {...props}/>
      </div>
    </section>
  );
}
