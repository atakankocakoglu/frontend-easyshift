import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Werknemer {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
}

function WerknemersContent() {
    const [werknemers, setWerknemers] = useState<Werknemer[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const werknemersPerPage = 5;

    useEffect(() => {
        async function loadEmployeeData() {
            const result = await fetch("http://localhost:5295/api/Employees");
            const data = await result.json();
            setWerknemers(data);
        }

        loadEmployeeData();
    }, []);

    // Filter de werknemers op basis van de zoekterm
    const filteredWerknemers = werknemers.filter((werknemer) =>
        werknemer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Bereken de huidige werknemers om weer te geven
    const indexOfLastWerknemer = currentPage * werknemersPerPage;
    const indexOfFirstWerknemer = indexOfLastWerknemer - werknemersPerPage;
    const currentWerknemers = filteredWerknemers.slice(indexOfFirstWerknemer, indexOfLastWerknemer);

    // Bereken het totaal aantal pagina's
    const totalPages = Math.ceil(filteredWerknemers.length / werknemersPerPage);

    // Functie om van pagina te wisselen
    const handlePageChange = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Functie voor het verwerken van zoekopdrachten
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Zet de pagina altijd terug naar 1 bij een nieuwe zoekopdracht
    };

    return (
        <div className="container mx-auto mt-8">
            {/* Zoekveld */}
            <input
                type="text"
                placeholder="Zoek op naam"
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-4 p-2 border border-gray-300 rounded-lg shadow-sm w-full"
            />

            {/* Werknemers Tabel */}
            <Table className="min-w-full bg-white border border-gray-300 shadow-md">
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="p-4">Naam</TableHead>
                        <TableHead className="p-4">Email</TableHead>
                        <TableHead className="p-4">Telefoon</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentWerknemers.length > 0 ? (
                        currentWerknemers.map((werknemer) => (
                            <TableRow key={werknemer.id} className="border-b">
                                <TableCell className="p-4">{werknemer.name}</TableCell>
                                <TableCell className="p-4">{werknemer.email}</TableCell>
                                <TableCell className="p-4">{werknemer.phoneNumber}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} className="p-4 text-center text-gray-500">
                                Geen werknemers gevonden
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
                >
                    Vorige
                </button>
                <span>Pagina {currentPage} van {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
                >
                    Volgende
                </button>
            </div>
        </div>
    );
}

export default WerknemersContent;
