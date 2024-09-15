import BarChartComponent from '@/components/chart/BarChartComponent.tsx';
import RadarChartComponent from '@/components/chart/RadarChartComponent.tsx';

function DashboardContent() {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 p-4">
            <BarChartComponent />
            <RadarChartComponent />
        </div>
    );
}

export default DashboardContent;
