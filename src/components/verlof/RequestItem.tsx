import { useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog.tsx"
import { Button } from "@/components/ui/button.tsx";

interface Request {
    id: number;
    name: string;
    status: "pending" | "approved" | "rejected";
    reason: string;
    startDate: Date;
    endDate?: Date;
}

interface RequestItemProps {
    request: Request;
    onApprove?: (id: number) => void;
    onReject?: (id: number) => void;
    isPending: boolean;
}

function RequestItem({ request, onApprove, onReject, isPending }: RequestItemProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);

    const handleOpenDialog = (type: "approve" | "reject") => {
        setActionType(type);
        setIsDialogOpen(true);
    };

    const handleConfirm = () => {
        if (actionType === "approve" && onApprove) {
            onApprove(request.id);
        } else if (actionType === "reject" && onReject) {
            onReject(request.id);
        }
        setIsDialogOpen(false);
    };

    return (
        <li className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-4">
            <div className="flex-1">
                <p className="text-lg font-semibold text-gray-900">{request.name}</p>
                <div className="mt-2">
                    <p className="text-gray-800 font-medium">Reden:</p>
                    <p className="text-gray-600">{request.reason}</p>
                </div>
                <div className="mt-2">
                    <p className="text-gray-800 font-medium">
                        {request.endDate ? "Startdatum:" : "Datum:"}
                    </p>
                    <p className="text-gray-600">{request.startDate.toLocaleDateString()}</p>
                </div>
                {request.endDate && (
                    <div className="mt-2">
                        <p className="text-gray-800 font-medium">Einddatum:</p>
                        <p className="text-gray-600">{request.endDate.toLocaleDateString()}</p>
                    </div>
                )}
            </div>
            {isPending ? (
                <div className="flex flex-col justify-center items-center w-40 space-y-2">
                    <Button onClick={() => handleOpenDialog("approve")} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 w-full">
                        Goedkeuren
                    </Button>
                    <Button onClick={() => handleOpenDialog("reject")} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 w-full">
                        Afwijzen
                    </Button>
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <span className={`text-sm font-semibold ${request.status === "approved" ? "text-green-500" : "text-red-500"}`}>
                        {request.status === "approved" ? "Goedgekeurd" : "Afgewezen"}
                    </span>
                </div>
            )}

            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent className="p-6 rounded-lg bg-white shadow-lg">
                    <AlertDialogTitle className="text-lg font-semibold">Bevestig Actie</AlertDialogTitle>
                    <AlertDialogDescription className="mt-2 text-gray-600">
                        Weet je zeker dat je deze aanvraag wilt {actionType === "approve" ? "goedkeuren" : "afwijzen"}?
                    </AlertDialogDescription>
                    <div className="mt-4 flex gap-2">
                        <AlertDialogCancel
                            onClick={() => setIsDialogOpen(false)}
                            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
                        >
                            Annuleren
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirm}
                            className={`py-2 px-4 rounded-lg font-semibold ${
                                actionType === "approve"
                                    ? "bg-green-500 text-white hover:bg-green-600"
                                    : "bg-red-500 text-white hover:bg-red-600"
                            }`}
                        >
                            {actionType === "approve" ? "Goedkeuren" : "Afwijzen"}
                        </AlertDialogAction>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </li>
    );
}

export default RequestItem;
