import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import MapView from './views/MapView';
import EmployeesView from './views/EmployeesView';
import ProfileView from './views/ProfileView';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#FAF6F0] min-h-screen text-[#3E2723] font-sans antialiased overflow-hidden flex flex-col">
        <main className="flex-1 overflow-y-auto pb-32 no-scrollbar relative">
          <Routes>
            <Route path="/" element={<Navigate to="/map" replace />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/employees" element={<EmployeesView />} />
            <Route path="/profile" element={<ProfileView />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
