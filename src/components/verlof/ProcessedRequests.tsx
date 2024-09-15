import RequestItem from "@/components/verlof/RequestItem.tsx";

interface Request {
    id: number;
    name: string;
    status: "pending" | "approved" | "rejected";
    reason: string;
    startDate: Date;
    endDate?: Date;
}

interface ProcessedRequestsProps {
    requests: Request[];
}

function ProcessedRequests({ requests }: ProcessedRequestsProps) {
    return (
        <section className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Beantwoorde Verlofaanvragen</h2>
            {requests.length === 0 ? (
                <p className="text-gray-600">Geen beantwoorde aanvragen.</p>
            ) : (
                <ul className="space-y-4">
                    {requests.map((req) => (
                        <RequestItem key={req.id} request={req} isPending={false} />
                    ))}
                </ul>
            )}
        </section>
    );
}

export default ProcessedRequests;
