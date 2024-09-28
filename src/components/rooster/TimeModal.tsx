// Modal Component
import {useState} from "react";

const TimeModal: React.FC<{
    employee: string;
    date: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (startTime: string, endTime: string) => void;
}> = ({ employee, date, isOpen, onClose, onSubmit }) => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = () => {
        onSubmit(startTime, endTime);
        onClose(); // Close the modal after submission
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">
                    Werktijden voor {employee} op {date}
                </h2>
                <label className="block mb-2">Begintijd</label>
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="border p-2 mb-4 w-full"
                />
                <label className="block mb-2">Eindtijd</label>
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="border p-2 mb-4 w-full"
                />
                <div className="flex justify-end space-x-4">
                    <button onClick={onClose} className="bg-gray-300 p-2 rounded">
                        Annuleren
                    </button>
                    <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
                        Opslaan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimeModal;