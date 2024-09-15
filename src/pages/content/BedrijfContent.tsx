import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'; // ShadCN table componenten

// Bedrijfsinformatie
const bedrijf = {
    naam: "AtaWebs",
    adres: "Olivier van Noortstraat 33, 5684 EA, Best",
    openingstijden: {
        maandag: "09:00 - 17:00",
        dinsdag: "09:00 - 17:00",
        woensdag: "09:00 - 17:00",
        donderdag: "09:00 - 17:00",
        vrijdag: "09:00 - 17:00",
        zaterdag: "10:00 - 16:00",
        zondag: "Gesloten"
    },
    contact: {
        telefoon: "06 82268196",
        email: "info@atawebs.nl"
    }
};

function BedrijfContent() {
    return (
        <div className="container mx-auto mt-8 p-8 bg-white shadow-sm rounded-lg">
            <h1 className="text-3xl font-bold mb-6">{bedrijf.naam}</h1>

            {/* Adres */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Adres</h2>
                <p className="text-gray-700">{bedrijf.adres}</p>
            </div>

            {/* Openingstijden met een elegantere Table */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Openingstijden</h2>
                <Table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            <TableHead className="p-4">Dag</TableHead>
                            <TableHead className="p-4">Tijden</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.entries(bedrijf.openingstijden).map(([dag, tijden]) => (
                            <TableRow key={dag} className="border-b last:border-none">
                                <TableCell className="p-4 font-medium">{dag.charAt(0).toUpperCase() + dag.slice(1)}</TableCell>
                                <TableCell className="p-4">{tijden}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Contactinformatie */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Contactinformatie</h2>
                <p className="text-gray-700"><strong>Telefoon:</strong> {bedrijf.contact.telefoon}</p>
                <p className="text-gray-700"><strong>Email:</strong> {bedrijf.contact.email}</p>
            </div>
        </div>
    );
}

export default BedrijfContent;
