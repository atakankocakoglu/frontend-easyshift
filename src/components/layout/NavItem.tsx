import React, {useEffect} from 'react';
import { IconType } from 'react-icons';

interface NavItemProps {
    icon: IconType;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, isActive, onClick }) => {
    useEffect(() => {
        if (isActive) {
            document.title = `EasyShift | ${label}`;
        }
    }, [isActive, label]);
    return (
        <a
            href="#"
            onClick={onClick}
            className={`flex items-center p-2 rounded-md transition-colors duration-200 
                ${isActive ? 'bg-white text-[#0084D4]' : 'text-white hover:bg-white hover:text-[#0084D4]'} 
            `}
        >
            <Icon className="mr-2" /> {label}
        </a>
    );
};


export default NavItem;
