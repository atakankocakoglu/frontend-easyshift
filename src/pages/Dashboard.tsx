import DashboardContent from '@/pages/content/DashboardContent.tsx';

function Dashboard() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <hr className="border-black mb-6" />
            <DashboardContent />
        </div>
    );
}

export default Dashboard;
