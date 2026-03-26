import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { branches } from '../data/branches';
import L from 'leaflet';

// Fix for default marker icons missing in Leaflet + Webpack/Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const createCustomIcon = (status) => {
  let colorClass = 'bg-emerald-500 shadow-emerald-500/40';
  if (status === 'critical') colorClass = 'bg-red-500 shadow-red-500/40';
  if (status === 'warning') colorClass = 'bg-orange-500 shadow-orange-500/40';

  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="${colorClass} w-6 h-6 rounded-full border-4 border-white shadow-lg box-border"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const personnelBranches = branches.filter(branch => branch.type === 'Personal');

export default function MapView() {
  return (
    <div className="h-full w-full relative bg-[#FAF6F0]">
       <MapContainer 
         center={[50.9375, 6.9603]} 
         zoom={13} 
         scrollWheelZoom={true} 
         className="h-full w-full z-0" 
         style={{ height: '100%', width: '100%', minHeight: '100vh' }}
         zoomControl={false}
       >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {personnelBranches.map(branch => (
          <Marker 
            key={branch.id} 
            position={[branch.lat, branch.lng]} 
            icon={createCustomIcon(branch.status)}
          >
            <Popup className="custom-popup">
              <div className="p-1 min-w-[140px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${
                    branch.status === 'critical' ? 'bg-red-500' :
                    branch.status === 'warning' ? 'bg-orange-500' :
                    'bg-emerald-500'
                  }`} />
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    branch.status === 'critical' ? 'text-red-600' :
                    branch.status === 'warning' ? 'text-orange-600' :
                    'text-emerald-600'
                  }`}>
                    {branch.status === 'critical' ? 'Krise' : branch.status === 'warning' ? 'Warnung' : 'Bereit'}
                  </span>
                </div>
                
                <h3 className="font-bold text-sm leading-tight text-[#3E2723] mb-3">{branch.name}</h3>
                
                <div className="bg-[#FFF8E1] rounded-lg p-2 border border-amber-100">
                  <p className="text-[10px] text-[#5D4037]/60 font-medium uppercase tracking-wide mb-0.5">{branch.type}</p>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-xl font-black tracking-tight ${
                      branch.status === 'critical' ? 'text-red-900' : 'text-[#3E2723]'
                    }`}>
                      {branch.value}
                    </span>
                    <span className="text-[10px] font-bold text-[#5D4037]/60">{branch.unit}</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <div className="absolute top-6 left-6 right-6 z-[400] pointer-events-none">
        <div className="glass-header rounded-2xl p-4 shadow-lg pointer-events-auto flex justify-between items-center backdrop-blur-xl bg-white/80">
           <div>
             <h1 className="text-lg font-bold text-[#3E2723]">Filialübersicht</h1>
             <p className="text-xs text-[#5D4037]/60 uppercase tracking-wide">Köln & Umgebung</p>
           </div>
           <div className="flex gap-1">
             <div className="w-2 h-2 rounded-full bg-red-500"></div>
             <div className="w-2 h-2 rounded-full bg-orange-500"></div>
             <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
           </div>
        </div>
      </div>
    </div>
  );
}
