import { useEffect, useState } from 'react';
import Sidebar from './Sidebar.tsx';
import Dashboard from '../../pages/Dashboard.tsx';
import Rooster from '../../pages/Rooster.tsx';
import Verlof from '../../pages/Verlof.tsx';
import Werknemers from '../../pages/Werknemers.tsx';
import Bedrijf from '../../pages/Bedrijf.tsx';

function Home() {
    const [activePage, setActivePage] = useState('Dashboard');
    const [userName, setUserName] = useState<string>('');

    useEffect(() => {
        const fetchUserName = async () => {
            const userId = sessionStorage.getItem('userId');
            if (userId) {
                try {
                    const response = await fetch(`https://localhost:44355/api/Admin/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const result = await response.json();
                        setUserName(result.name);
                    } else {
                        console.error('Failed to fetch user information');
                    }
                } catch (error) {
                    console.error('Error fetching user information:', error);
                }
            }
        };

        fetchUserName();
    }, []);

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
            <Sidebar activePage={activePage} onNavItemClick={setActivePage} userName={userName}/>
            <div className="flex-1 overflow-y-auto p-6">
                {renderContent()}
            </div>
        </div>
    );
}

export default Home;
