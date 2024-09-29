import React, { useState, useEffect } from 'react';
import RoosterHeader from '@/components/rooster/RoosterHeader';
import RoosterNavigation from '@/components/rooster/RoosterNavigation';
import TimeModal from '@/components/rooster/TimeModal';
import RoosterTable from '@/components/rooster/RoosterTable';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

function getCurrentWeek(date: Date): number {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((date.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((numberOfDays + oneJan.getDay() + 1) / 7);
}

function getWeekDateRange(date: Date): string {
    const currentDate = new Date(date);
    const dayOfWeek = currentDate.getDay();
    const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)));
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

    // State for original work times (from the backend)
    const [workTimes, setWorkTimes] = useState<{ [key: string]: { [key: string]: string } }>({});

    // State for modified work times (new or updated ones)
    const [modifiedWorkTimes, setModifiedWorkTimes] = useState<{ [key: string]: { [key: string]: string } }>({});

    // Alert dialog state
    const [isPastDateAlertOpen, setIsPastDateAlertOpen] = useState(false);

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
                setEmployees(data.map((employee: { id: number; name: string }) => ({ id: employee.id, name: employee.name })));
            } catch (error) {
                console.error("Failed to load employee data:", error);
            }
        }

        loadEmployeeData();
    }, []);

    useEffect(() => {
        async function loadWorkTimes() {
            try {
                const result = await fetch("https://localhost:44355/api/WorkTime/worktimes");
                if (!result.ok) {
                    throw new Error(`HTTP error! status: ${result.status}`);
                }
                const data = await result.json();
                const transformedData = data.reduce((acc: { [key: number]: { [key: string]: string } }, item: any) => {
                    const dateKey = new Date(item.date).toLocaleDateString('nl-NL');
                    const formatTime = (time: string) => time.slice(0, 5); // Remove seconds
                    if (!acc[item.employeeId]) {
                        acc[item.employeeId] = {};
                    }
                    acc[item.employeeId][dateKey] = `${formatTime(item.startTime)} - ${formatTime(item.endTime)}`;
                    return acc;
                }, {});
                setWorkTimes(transformedData); // Set the original work times
            } catch (error) {
                console.error("Failed to load work times:", error);
            }
        }

        loadWorkTimes();
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
            setDateRange(getWeekDateRange(date)); // Update de dateRange met de nieuwe date
            console.log(date);
        }
    };

    const weekdays = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
    const weekDates = weekdays.map((_, index) => {
        const date = new Date(currentDate);
        const dayOfWeek = date.getDay();
        const firstDayOfWeek = new Date(date.setDate(date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)));
        firstDayOfWeek.setDate(firstDayOfWeek.getDate() + index);
        return firstDayOfWeek.toLocaleDateString('nl-NL');
    });

    const openModal = (employeeId: number, date: string) => {
        const selectedDateObj = new Date(date.split('-').reverse().join('-')); // Date object
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Voorkom bewerken voor oude data
        if (selectedDateObj < today) {
            setIsPastDateAlertOpen(true);
            return;
        }

        setSelectedEmployee(employeeId.toString());
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (startTime: string, endTime: string) => {
        if (selectedEmployee && selectedDate) {
            setModifiedWorkTimes((prevModifiedWorkTimes) => ({
                ...prevModifiedWorkTimes,
                [selectedEmployee]: {
                    ...prevModifiedWorkTimes[selectedEmployee],
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
                body: JSON.stringify(modifiedWorkTimes), // Send modified work times
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log("Planning successfully sent!");

            // Merge modifiedWorkTimes into workTimes after a successful post request
            setWorkTimes((prevWorkTimes) => {
                const updatedWorkTimes = { ...prevWorkTimes };

                Object.keys(modifiedWorkTimes).forEach((employeeId) => {
                    if (!updatedWorkTimes[employeeId]) {
                        updatedWorkTimes[employeeId] = {};
                    }

                    Object.keys(modifiedWorkTimes[employeeId]).forEach((dateKey) => {
                        updatedWorkTimes[employeeId][dateKey] = modifiedWorkTimes[employeeId][dateKey];
                    });
                });

                return updatedWorkTimes;
            });

            // Clear the modifiedWorkTimes state
            setModifiedWorkTimes({});
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
                modifiedWorkTimes={modifiedWorkTimes}
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

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="mt-4 px-4 py-2 bg-[#0084D4] text-white rounded-lg shadow-md hover:bg-[#00619B]">
                        Verstuur planning
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Ben je zeker dat je de planning wilt versturen?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Deze actie kan niet ongedaan worden gemaakt. Zodra je de planning verstuurt, kunnen ingevoerde tijden niet meer worden gewijzigd.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuleren</AlertDialogCancel>
                        <AlertDialogAction className="bg-[#0084D4] hover:bg-[#00619B]" onClick={handleSendPlanning}>Versturen</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={isPastDateAlertOpen} onOpenChange={setIsPastDateAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Onjuiste actie</AlertDialogTitle>
                        <AlertDialogDescription>
                            Je kunt geen tijden toevoegen of wijzigen voor de huidige datum of een datum in het verleden.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction className="bg-[#0084D4] hover:bg-[#00619B]" onClick={() => setIsPastDateAlertOpen(false)}>
                            Oké
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
};

export default RoosterContent;
