import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.tsx';
import Home from './components/layout/Home.tsx';
import ProtectedRoute from './components/security/ProtectedRoute.tsx';

const App: React.FC = () => {
    return (
        <Router>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
