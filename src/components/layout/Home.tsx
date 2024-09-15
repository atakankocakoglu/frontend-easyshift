import  { useState } from 'react';
import Sidebar from './Sidebar.tsx';
import Dashboard from '../../pages/Dashboard.tsx';
import Rooster from '../../pages/Rooster.tsx';
import Verlof from '../../pages/Verlof.tsx';
import Werknemers from '../../pages/Werknemers.tsx';
import Bedrijf from '../../pages/Bedrijf.tsx';

function Home() {
    const [activePage, setActivePage] = useState('Dashboard');

    const renderContent = () => {
        switch (activePage) {
            case 'Dashboard':
                return <Dashboard />;
            case 'Rooster':
                return <Rooster />;
            case 'Verlof':
                return <Verlof />;
            case 'Werknemers':
                return <Werknemers />;
            case 'Bedrijf':
                return <Bedrijf />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar activePage={activePage} onNavItemClick={setActivePage}/>
            <div className="flex-1 overflow-y-auto p-6">
                {renderContent()}
            </div>
        </div>
    );
}

export default Home;
