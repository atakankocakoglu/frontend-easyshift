import React from 'react';
import { IconType } from 'react-icons';

interface NavItemProps {
    icon: IconType;
    label: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label }) => {
    return (
        <a
            href="#"
            className="flex items-center text-white hover:bg-white hover:text-[#0084D4] rounded-[5px] px-4 py-2 transition duration-300 border border-transparent hover:border-[#0084D4]"
        >
            <Icon className="mr-2" /> {label}
        </a>
    );
}

export default NavItem;
