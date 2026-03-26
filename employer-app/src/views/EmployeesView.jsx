import { Search, MoreHorizontal } from 'lucide-react';

const employees = [
  { id: 1, name: "Maria Müller", role: "Filialleitung", branch: "Hauptbahnhof", status: "Aktiv" },
  { id: 2, name: "Thomas Schmidt", role: "Bäcker", branch: "Altstadt", status: "Im Dienst" },
  { id: 3, name: "Lisa Weber", role: "Verkauf", branch: "Südstadt", status: "Pause" },
  { id: 4, name: "Jan Janssen", role: "Logistik", branch: "Nord", status: "Frei" },
  { id: 5, name: "Sophie Klein", role: "Aushilfe", branch: "Westpark", status: "Aktiv" },
  { id: 6, name: "Kevin Bauer", role: "Verkauf", branch: "Hauptbahnhof", status: "Krank" },
  { id: 7, name: "Laura Wolf", role: "Bäcker", branch: "Uni Campus Ost", status: "Im Dienst" },
];

export default function EmployeesView() {
  return (
    <div className="pb-32 px-6 pt-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-[#3E2723] tracking-tighter mb-4">
          Team
        </h1>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5D4037]/40" size={20} />
          <input 
            type="text" 
            placeholder="Mitarbeiter suchen..." 
            className="w-full bg-white rounded-2xl pl-12 pr-4 py-4 text-sm font-medium text-[#5D4037] focus:outline-none focus:ring-2 focus:ring-orange-200 shadow-sm placeholder:text-[#5D4037]/30"
          />
        </div>
      </header>

      <div className="space-y-3">
        {employees.map(emp => (
          <div key={emp.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between shadow-sm border border-white/50 active:scale-98 transition-transform">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg shadow-inner ${
                emp.status === 'Krank' ? 'bg-red-100 text-red-400' : 'bg-[#FFF8E1] text-[#5D4037]/60'
              }`}>
                {emp.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-[#3E2723] text-sm">{emp.name}</h3>
                <p className="text-[10px] text-[#5D4037]/50 uppercase tracking-wider font-bold">{emp.role} • {emp.branch}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
               <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                 emp.status === 'Im Dienst' || emp.status === 'Aktiv' ? 'bg-emerald-100 text-emerald-600' :
                 emp.status === 'Krank' ? 'bg-red-100 text-red-600' :
                 'bg-[#FFF8E1] text-[#5D4037]/50'
               }`}>
                 {emp.status}
               </div>
               <button className="text-[#5D4037]/30 hover:text-[#5D4037]/50 p-2">
                <MoreHorizontal size={20} />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
