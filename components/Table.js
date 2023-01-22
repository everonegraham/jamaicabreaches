import matter from 'gray-matter';

export default function Table(props) {
    return (
        
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-m text-center text-gray-500">
                    <thead className="text-lg text-white uppercase bg-blue-500">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Target
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Year
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Records
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Source
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props?.[0].frontmatterData?.map((row, index) => {
                            return (
                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        { row.name }
                                    </td>
                                    <td className="px-6 py-4">
                                        {row.year}
                                    </td>
                                    <td className="px-6 py-4">
                                        {row.type}
                                    </td>
                                    <td className="px-6 py-4">
                                        {row.records}
                                    </td>
                                    <td className="px-6 py-4 hover:underline">
                                        <a href={row.source} target="_blank">Link</a>
                                    </td>
                                </tr>
                            )
                        })}   
                    </tbody>
                </table>
            </div>

        
    );
}