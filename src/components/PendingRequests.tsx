import RequestItem from "@/components/RequestItem";

interface Request {
    id: number;
    name: string;
    status: "pending" | "approved" | "rejected";
    reason: string;
    startDate: Date;
    endDate?: Date;
}

interface PendingRequestsProps {
    requests: Request[];
    onApprove: (id: number) => void;
    onReject: (id: number) => void;
}

function PendingRequests({ requests, onApprove, onReject }: PendingRequestsProps) {
    return (
        <section className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Aangevraagde Verlofaanvragen</h2>
            {requests.length === 0 ? (
                <p className="text-gray-600">Geen openstaande aanvragen.</p>
            ) : (
                <ul className="space-y-4">
                    {requests.map((req) => (
                        <RequestItem
                            key={req.id}
                            request={req}
                            onApprove={onApprove}
                            onReject={onReject}
                            isPending={true}
                        />
                    ))}
                </ul>
            )}
        </section>
    );
}

export default PendingRequests;
