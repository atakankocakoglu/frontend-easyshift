import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa'; // Import the Plus icon
import RoosterHeader from '@/components/rooster/RoosterHeader';
import RoosterNavigation from '@/components/rooster/RoosterNavigation';

// Functie om de huidige week te berekenen
function getCurrentWeek(date: Date): number {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((date.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((numberOfDays + oneJan.getDay() + 1) / 7);
}

// Functie om het bereik van de week te berekenen
function getWeekDateRange(date: Date): string {
    const currentDate = new Date(date);
    const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)); // Maandag
    const lastDayOfWeek = new Date(currentDate.setDate(firstDayOfWeek.getDate() + 6)); // Zondag
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };

    const startDate = firstDayOfWeek.toLocaleDateString('nl-NL', options);
    const endDate = lastDayOfWeek.toLocaleDateString('nl-NL', options);

    return `${startDate} - ${endDate}`;
}

const RoosterContent: React.FC = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [dateRange, setDateRange] = useState<string>(getWeekDateRange(new Date()));
    const [employees] = useState<string[]>(["Atakan", "Ties", "Sjors", "Luc", "Zavid", "Keke"]);

    useEffect(() => {
        setDateRange(getWeekDateRange(currentDate));
    }, [currentDate]);

    const goToPreviousWeek = () => {
        setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
    };

    const goToNextWeek = () => {
        setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
    };

    const resetToCurrentWeek = () => {
        setCurrentDate(new Date());
    };

    const handleDateChange = (date: Date | undefined) => {
        if (date) {
            setCurrentDate(date);
        }
    };

    // Array of weekdays and their corresponding dates
    const weekdays = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
    const weekDates = weekdays.map((_, index) => {
        const date = new Date(currentDate);
        date.setDate(date.getDate() - date.getDay() + index + 1); // Adjust to get the correct date
        return date.getDate(); // Get the day of the month
    });

    return (
        <div className="flex flex-col p-4">
            <div className="flex justify-between items-center mb-4">
                <RoosterHeader currentWeek={getCurrentWeek(currentDate)} dateRange={dateRange} />
                <RoosterNavigation
                    goToPreviousWeek={goToPreviousWeek}
                    resetToCurrentWeek={resetToCurrentWeek}
                    goToNextWeek={goToNextWeek}
                    dateRange={dateRange}
                    currentDate={currentDate}
                    handleDateChange={handleDateChange}
                />
            </div>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-[#DBDBDB]">
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
                        {weekdays.map((_, dayIndex) => (
                            <td
                                key={dayIndex}
                                className="border border-gray-300 p-4 text-center relative hover:bg-[#DBDBDB] cursor-pointer transition duration-300"
                            >
                                <span
                                    className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                                    <FaPlus className="text-gray-600"/>
                                </span>
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoosterContent;
