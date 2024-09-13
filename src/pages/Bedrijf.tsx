import BedrijfContent from "@/pages/content/BedrijfContent.tsx";

function Bedrijf() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Bedrijf</h1>
            <hr className="border-black mb-6"/>
            <BedrijfContent />
        </div>
    )
}

export default Bedrijf;