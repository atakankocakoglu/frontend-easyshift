import WerknemersContent from "@/pages/content/WerknemersContent.tsx";

function Werknemers() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Werknemers</h1>
            <hr className="border-black mb-6"/>
            <WerknemersContent />
        </div>
    )
}

export default Werknemers;