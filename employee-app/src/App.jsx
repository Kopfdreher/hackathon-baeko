import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './views/HomeView';
import { ScheduleView } from './views/ScheduleView';
import { RewardsView } from './views/RewardsView';
import { ProfileView } from './views/ProfileView';
import { ExchangeView } from './views/ExchangeView';

function App() {
  const [userPoints, setUserPoints] = useState(980);

  return (
    <Router>
      <div className="bg-[#FAF6F0] min-h-screen font-sans text-[#3E2723] selection:bg-amber-200 selection:text-amber-900 pb-20 relative overflow-hidden">
        
        {/* Background decorative elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-amber-200/30 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-orange-200/20 blur-[100px] pointer-events-none" />
        
        <Routes>
          <Route path="/" element={<HomeView userPoints={userPoints} setUserPoints={setUserPoints} />} />
          <Route path="/schedule" element={<ScheduleView />} />
          <Route path="/exchange" element={<ExchangeView setUserPoints={setUserPoints} />} />
          <Route path="/rewards" element={<RewardsView userPoints={userPoints} setUserPoints={setUserPoints} />} />
          <Route path="/profile" element={<ProfileView userPoints={userPoints} />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
