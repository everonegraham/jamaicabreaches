import data from '../data/breaches.json';

export default function Table() {

    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-m text-center text-gray-500">
                <thead className="text-lg text-white uppercase bg-blue-500">
                <tr>
                    {Object.keys(data[0]).map((key) => (
                        <th key={key} scope="col" className="px-6 py-3">{key}</th>  
                    ))}
                </tr>
                </thead>
                <tbody> 
                    {data.map((item) => (
                        <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4">{item.target}</td>
                            <td className="px-6 py-4">{item.year}</td>
                            <td className="px-6 py-4">{item.type}</td>
                            <td className="px-6 py-4">{item.records}</td>
                            <td className="px-6 py-4 hover:underline">
                                <a href={item.source} target="_blank" rel="noreferrer">Link</a>
                            </td>
                        </tr>
                    ))} 
                </tbody>
            </table>
        </div> 
    );
}