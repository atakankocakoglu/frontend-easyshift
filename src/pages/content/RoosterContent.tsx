import React, { useState, useEffect } from 'react';
import RoosterHeader from '@/components/rooster/RoosterHeader';
import RoosterNavigation from '@/components/rooster/RoosterNavigation';
import TimeModal from '@/components/rooster/TimeModal';
import RoosterTable from '@/components/rooster/RoosterTable';

function getCurrentWeek(date: Date): number {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((date.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((numberOfDays + oneJan.getDay() + 1) / 7);
}

function getWeekDateRange(date: Date): string {
    const currentDate = new Date(date);
    const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
    const lastDayOfWeek = new Date(currentDate.setDate(firstDayOfWeek.getDate() + 6));
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };

    const startDate = firstDayOfWeek.toLocaleDateString('nl-NL', options);
    const endDate = lastDayOfWeek.toLocaleDateString('nl-NL', options);

    return `${startDate} - ${endDate}`;
}

const RoosterContent: React.FC = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [dateRange, setDateRange] = useState<string>(getWeekDateRange(new Date()));
    const [employees, setEmployees] = useState<{ id: number; name: string }[]>([]);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    // State voor werktijden
    const [workTimes, setWorkTimes] = useState<{ [key: string]: { [key: string]: string } }>({});

    useEffect(() => {
        setDateRange(getWeekDateRange(currentDate));
    }, [currentDate]);

    useEffect(() => {
        async function loadEmployeeData() {
            try {
                const result = await fetch("https://localhost:44355/api/Employees");
                if (!result.ok) {
                    throw new Error(`HTTP error! status: ${result.status}`);
                }
                const data = await result.json();
                // Zorg ervoor dat je zowel de id als de naam opslaat
                setEmployees(data.map((employee: { id: number; name: string }) => ({ id: employee.id, name: employee.name })));
            } catch (error) {
                console.error("Failed to load employee data:", error);
            }
        }

        loadEmployeeData();
    }, []);


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
// Update the weekDates array to store full date strings in the format dd-MM-yyyy
    const weekDates = weekdays.map((_, index) => {
        const date = new Date(currentDate);
        date.setDate(date.getDate() - date.getDay() + index + 1); // Adjust to get the correct date
        return date.toLocaleDateString('nl-NL'); // Get the full date string in dd-MM-yyyy format
    });

    const openModal = (employeeId: number, date: string) => {
        setSelectedEmployee(employeeId.toString()); // Sla het id op als string
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (startTime: string, endTime: string) => {
        if (selectedEmployee && selectedDate) {
            setWorkTimes((prevWorkTimes) => ({
                ...prevWorkTimes,
                [selectedEmployee]: {
                    ...prevWorkTimes[selectedEmployee],
                    [selectedDate]: `${startTime} - ${endTime}`,
                },
            }));
        }
        closeModal();
    };

    const handleSendPlanning = async () => {
        try {
            const response = await fetch("https://localhost:44355/api/WorkTime", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(workTimes),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log("Planning successfully sent!");
        } catch (error) {
            console.error("Failed to send planning:", error);
        }
    };

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

            <RoosterTable
                employees={employees}
                weekDates={weekDates}
                weekdays={weekdays}
                workTimes={workTimes}
                openModal={openModal}
            />

            {/* Modal for time input */}
            <TimeModal
                employee={selectedEmployee || ''}
                date={selectedDate || ''}
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleSubmit}
            />

            {/* Button to send the entire week's planning */}
            <button
                onClick={handleSendPlanning}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
                Verstuur planning
            </button>
        </div>
    );
};

export default RoosterContent;