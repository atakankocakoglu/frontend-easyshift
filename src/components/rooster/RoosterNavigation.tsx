import React from 'react';
import { FaChevronLeft, FaSyncAlt, FaChevronRight } from 'react-icons/fa';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface RoosterNavigationProps {
    goToPreviousWeek: () => void;
    resetToCurrentWeek: () => void;
    goToNextWeek: () => void;
    dateRange: string;
    currentDate: Date;
    handleDateChange: (date: Date | undefined) => void;
}

const RoosterNavigation: React.FC<RoosterNavigationProps> = ({
     goToPreviousWeek,
     resetToCurrentWeek,
     goToNextWeek,
     dateRange,
     currentDate,
     handleDateChange,
 }) => {
    return (
        <div className="flex items-center space-x-4">
            <div
                className="w-10 h-10 flex justify-center items-center bg-white border border-gray-400 rounded-lg cursor-pointer"
                onClick={goToPreviousWeek}
            >
                <FaChevronLeft className="text-gray-600" />
            </div>

            <Popover>
                <PopoverTrigger asChild>
                    <div className="w-36 h-10 flex justify-center items-center bg-white border border-gray-400 rounded-lg cursor-pointer">
                        <span className="text-gray-600">{dateRange}</span>
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar
                        selected={currentDate}
                        onSelect={handleDateChange}
                        mode="single"
                        initialFocus
                    />
                </PopoverContent>
            </Popover>

            <div
                className="w-10 h-10 flex justify-center items-center bg-white border border-gray-400 rounded-lg cursor-pointer"
                onClick={resetToCurrentWeek}
            >
                <FaSyncAlt className="text-gray-600" />
            </div>

            <div
                className="w-10 h-10 flex justify-center items-center bg-white border border-gray-400 rounded-lg cursor-pointer"
                onClick={goToNextWeek}
            >
                <FaChevronRight className="text-gray-600" />
            </div>
        </div>
    );
};

export default RoosterNavigation;
