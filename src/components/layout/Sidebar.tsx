import { FaTachometerAlt, FaCalendarAlt, FaBriefcase, FaUsers, FaBuilding, FaUser } from 'react-icons/fa';
import NavItem from './NavItem.tsx'; // Import the NavItem component
import DropdownMenuComponent from './DropdownMenu.tsx';

// src/components/layout/Sidebar.tsx
interface SidebarProps {
    onNavItemClick: (page: string) => void;
    activePage: string;
    userName: string; // Add userName prop
}

const Sidebar: React.FC<SidebarProps> = ({ onNavItemClick, activePage, userName }) => {
    return (
        <div className="flex flex-col h-screen w-64 p-4 bg-[#0084D4]">
            {/* Logo */}
            <div className="flex items-center justify-center mb-4">
                <img src="/EasyShift_Transparant.png" alt="logo" className="w-27 h-25" />
            </div>
            <hr className="border-white mb-4" />

            {/* Menu Items */}
            <nav className="flex flex-col">
                <NavItem
                    icon={FaTachometerAlt}
                    label="Dashboard"
                    isActive={activePage === 'Dashboard'}
                    onClick={() => onNavItemClick('Dashboard')}
                />
                <NavItem
                    icon={FaCalendarAlt}
                    label="Rooster"
                    isActive={activePage === 'Rooster'}
                    onClick={() => onNavItemClick('Rooster')}
                />
                <NavItem
                    icon={FaBriefcase}
                    label="Verlof"
                    isActive={activePage === 'Verlof'}
                    onClick={() => onNavItemClick('Verlof')}
                />
                <NavItem
                    icon={FaUsers}
                    label="Werknemers"
                    isActive={activePage === 'Werknemers'}
                    onClick={() => onNavItemClick('Werknemers')}
                />
                <NavItem
                    icon={FaBuilding}
                    label="Bedrijf"
                    isActive={activePage === 'Bedrijf'}
                    onClick={() => onNavItemClick('Bedrijf')}
                />
            </nav>

            {/* Bottom section */}
            <div className="mt-auto">
                <hr className="border-white mb-4" />
                <div className="flex items-center justify-between text-white">
                    <FaUser className="mr-2" />
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[130px]">{userName}</span>
                    <DropdownMenuComponent />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;