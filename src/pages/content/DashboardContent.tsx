import BarChartComponent from '@/components/BarChartComponent.tsx';
import RadarChartComponent from '@/components/RadarChartComponent.tsx';

function DashboardContent() {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 p-4">
            <BarChartComponent />
            <RadarChartComponent />
        </div>
    );
}

export default DashboardContent;
