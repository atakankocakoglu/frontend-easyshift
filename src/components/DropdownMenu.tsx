import React from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { FaChevronDown, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import icons

const DropdownMenuComponent: React.FC = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <FaChevronDown className="cursor-pointer text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-black border border-gray-300 rounded-md shadow-lg">
                <DropdownMenuItem className="flex items-center p-2 hover:bg-gray-100">
                    <FaCog className="mr-2" /> Instellingen
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center p-2 hover:bg-gray-100">
                    <FaSignOutAlt className="mr-2" /> Uitloggen
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropdownMenuComponent;
