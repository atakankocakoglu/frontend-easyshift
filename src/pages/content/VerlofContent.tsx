import { useState } from "react";
import PendingRequests from "@/components/verlof/PendingRequests.tsx";
import ProcessedRequests from "@/components/verlof/ProcessedRequests.tsx";

interface Request {
    id: number;
    name: string;
    status: "pending" | "approved" | "rejected";
    reason: string;
    startDate: Date;
    endDate?: Date;
}

function VerlofContent() {
    const [requests, setRequests] = useState<Request[]>([
        { id: 1, name: "Atakan Kocakoglu", status: "pending", reason:"Bruiloft", startDate: new Date("2024-09-15"), endDate: new Date("2024-09-17") },
        { id: 2, name: "Ties Vreeswijk", status: "pending", reason:"Vakantie", startDate: new Date("2024-09-20"), endDate: new Date("2024-09-25") },
        { id: 3, name: "Sjors Klaassen", status: "approved", reason:"Vrij", startDate: new Date("2024-09-25"), endDate: new Date("2024-09-27") },
        { id: 4, name: "Luc Lammers", status: "rejected", reason:"Voetbalwedstrijd", startDate: new Date("2024-09-30") },
    ]);

    const handleApprove = (id: number) => {
        setRequests((prevRequests) =>
            prevRequests.map((req) =>
                req.id === id ? { ...req, status: "approved" } : req
            )
        );
    };

    const handleReject = (id: number) => {
        setRequests((prevRequests) =>
            prevRequests.map((req) =>
                req.id === id ? { ...req, status: "rejected" } : req
            )
        );
    };

    return (
        <div className="p-6 space-y-6">

            <PendingRequests
                requests={requests.filter((req) => req.status === "pending")}
                onApprove={handleApprove}
                onReject={handleReject}
            />

            <ProcessedRequests
                requests={requests.filter((req) => req.status !== "pending")}
            />
        </div>
    );
}

export default VerlofContent;
