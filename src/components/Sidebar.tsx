import { FaTachometerAlt, FaCalendarAlt, FaBriefcase, FaUsers, FaBuilding, FaUser } from 'react-icons/fa';
import NavItem from './NavItem';
import DropdownMenuComponent from './DropdownMenu'; // Import the dropdown menu component
import '/public/css/Sidebar.css';

const Sidebar: React.FC = () => {
    return (
        <div className="flex flex-col h-screen w-64 p-4 bg-[#0084D4]">
            {/* Logo */}
            <div className="flex items-center justify-center mb-4">
                <img src="public/EasyShift_Transparant.png" alt="logo" className="w-27 h-25" />
            </div>
            <hr className="border-white mb-4" />

            {/* Menu Items */}
            <nav className="flex flex-col">
                <NavItem icon={FaTachometerAlt} label="Dashboard" />
                <NavItem icon={FaCalendarAlt} label="Rooster" />
                <NavItem icon={FaBriefcase} label="Verlof" />
                <NavItem icon={FaUsers} label="Werknemers" />
                <NavItem icon={FaBuilding} label="Bedrijf" />
            </nav>

            {/* Divider and Account Section */}
            <div className="flex flex-col mt-auto">
                {/* Divider directly above account section */}
                <hr className="border-white" />

                {/* Account Section */}
                <div className="flex items-center justify-between px-4 py-2 text-white">
                    <div className="flex items-center space-x-2">
                        <FaUser />
                        <span>John Doe</span>
                    </div>
                    <DropdownMenuComponent />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
