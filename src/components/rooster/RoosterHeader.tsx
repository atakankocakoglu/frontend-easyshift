// RoosterHeader.tsx
import React from 'react';

interface RoosterHeaderProps {
    currentWeek: number;
    dateRange: string;
}

const RoosterHeader: React.FC<RoosterHeaderProps> = ({ currentWeek, dateRange }) => {
    return (
        <div>
            <h1 className="text-2xl font-bold">Week {currentWeek}</h1>
            <div className="text-sm text-gray-600">{dateRange}</div>
        </div>
    );
};

export default RoosterHeader;
