import React from 'react';
import { FaPlus } from 'react-icons/fa';

interface RoosterTableProps {
    employees: string[];
    weekDates: number[];
    weekdays: string[];
    workTimes: { [key: string]: { [key: string]: string } };
    openModal: (employee: string, date: string) => void;
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
            {employees.map((employee, index) => (
                <tr key={index}>
                    <td className="border border-gray-300 p-4">{employee}</td>
                    {weekdays.map((day, dayIndex) => {
                        const dateKey = `${day} ${weekDates[dayIndex]}`;
                        return (
                            <td
                                key={dayIndex}
                                className="border border-gray-300 p-4 text-center relative hover:bg-[#DBDBDB] cursor-pointer transition duration-300"
                                onClick={() => openModal(employee, dateKey)}
                            >
                                {workTimes[employee]?.[dateKey] || (
                                    <span className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                      <FaPlus className="text-gray-600" />
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
