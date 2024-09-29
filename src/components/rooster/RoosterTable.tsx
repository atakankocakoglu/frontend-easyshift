// Update the RoosterTable component to use full date strings
import React from 'react';
import { FaPlus } from 'react-icons/fa';

interface RoosterTableProps {
    employees: { id: number; name: string }[];
    weekDates: string[];
    weekdays: string[];
    workTimes: { [key: number]: { [key: string]: string } };
    openModal: (employeeId: number, date: string) => void;
}

const RoosterTable: React.FC<RoosterTableProps> = ({ employees, weekDates, weekdays, workTimes, openModal }) => {
    return (
        <table className="min-w-full border-collapse border border-gray-300">
            <thead>
            <tr className="bg-[#0084D4] text-white">
                <th className="border border-gray-300 p-4 w-40 text-left">Werknemers</th>
                {weekdays.map((day, index) => (
                    <th key={index} className="border border-gray-300 p-4 w-32 text-center">
                        {day} {weekDates[index]}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {employees.map((employee) => (
                <tr key={employee.id}>
                    <td className="border border-gray-300 p-4">{employee.name}</td>
                    {weekdays.map((_, dayIndex) => {
                        const dateKey = weekDates[dayIndex];
                        const workTime = workTimes[employee.id]?.[dateKey];
                        const isEditable = !workTime; // Only allow edits if no work time exists

                        return (
                            <td
                                key={dayIndex}
                                className={`border border-gray-300 p-4 text-center relative transition duration-300 
                                        ${isEditable ? 'hover:bg-[#DBDBDB] cursor-pointer' : 'bg-gray-100 cursor-not-allowed'}`}
                                onClick={() => isEditable && openModal(employee.id, dateKey)} // Only trigger modal if editable
                            >
                                {workTime || (
                                    <span className={`absolute inset-0 flex items-center justify-center 
                                            ${isEditable ? 'opacity-0 hover:opacity-100 transition duration-300' : ''}`}>
                                            {isEditable ? <FaPlus className="text-gray-600" /> : 'N/A'}
                                        </span>
                                )}
                            </td>
                        );
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
};


export default RoosterTable;