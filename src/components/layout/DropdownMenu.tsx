import React from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu.tsx";
import { FaChevronDown, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const DropdownMenuComponent: React.FC = () => {
    const navigate = useNavigate(); // Initialize navigate hook

    const handleLogout = () => {
        sessionStorage.removeItem("userId");
        navigate("/"); // Redirect to login page
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <FaChevronDown className="cursor-pointer text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-black border border-gray-300 rounded-md shadow-lg">
                <DropdownMenuItem className="flex items-center p-2 hover:bg-gray-100">
                    <FaCog className="mr-2" /> Instellingen
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="flex items-center p-2 hover:bg-gray-100"
                    onClick={handleLogout} // Call handleLogout on click
                >
                    <FaSignOutAlt className="mr-2" /> Uitloggen
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropdownMenuComponent;
