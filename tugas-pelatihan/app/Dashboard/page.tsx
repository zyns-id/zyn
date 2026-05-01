'use client';
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Settings, Menu, Bell } from 'lucide-react';

export default function Dashboard() {
  const [temp, setTemp] = useState(26.4);
  const [humidity, setHumidity] = useState(61);
  const [devices, setDevices] = useState([
    { name: "GATEWAY_ALPHA", status: "UP", ping: 12, ip: "192.168.1.104" },
    { name: "STORAGE_NODE_02", status: "UP", ping: 45, ip: "192.168.1.112" },
    { name: "UPS_BACKUP_MAIN", status: "UP", ping: 8, ip: "192.168.1.101" },
    { name: "RACK_CAM_04", status: "OFFLINE", ping: "TIMEOUT", ip: "192.168.1.155" },
    { name: "COOLING_CONT_01", status: "OFFLINE", ping: "TIMEOUT", ip: "192.168.1.200" },
    { name: "HVAC_SENSOR_3", status: "OFFLINE", ping: "TIMEOUT", ip: "192.168.1.192" },
  ]);

  // Simulasi update sensor & device status
  useEffect(() => {
    const interval = setInterval(() => {
      setTemp((Math.random() * 5 + 25).toFixed(1));
      setHumidity((Math.random() * 10 + 55).toFixed(0));
      setDevices(devices.map(d => ({
        ...d,
        ping: d.status === "UP" ? Math.floor(Math.random()*50) : "TIMEOUT"
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-[#0e1116] text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#15181e] p-6 border-r border-gray-800 hidden lg:block h-full">
        <h1 className="text-xl font-bold mb-8">SERVER ROOM · LIVE</h1>
        <nav className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-blue-900/30 text-blue-400 rounded-lg cursor-pointer">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </div>
        </nav>
      </aside>

      {/* Main */}
      <main className="w-full flex flex-col h-full">
        {/* Header */}
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-[#0e1116]">
          <button className="lg:hidden text-gray-400">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-6 ml-auto">
            <span className="text-sm text-emerald-400 bg-emerald-900/30 px-3 py-1 rounded-full">1 Online</span>
            <Bell className="w-5 h-5 text-gray-400" />
            <Settings className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">2024-05-24 14:32:08 UTC</span>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card DHT22 */}
            <div className="bg-[#171c25] border border-gray-800 p-6 rounded-xl flex flex-col items-center min-h-[200px]">
              <h3 className="text-lg font-bold text-gray-300 mb-6">DHT22_SENSOR_NODE_01</h3>
              <div className="relative w-40 h-20">
                <div className="absolute inset-0 rounded-t-full border-4 border-cyan-400"></div>
                <span className="absolute inset-0 flex flex-col items-center justify-center text-4xl font-bold text-cyan-400">
                  {temp}°C
                </span>
              </div>
              <div className="w-full h-2 bg-gray-700 mt-4 rounded-full">
                <div className="h-2 bg-cyan-400 rounded-full" style={{ width: `${humidity}%` }} />
              </div>
              <p className="text-sm text-gray-400 mt-2">Humidity {humidity}%</p>
            </div>

            {/* Card device status */}
            {devices.slice(1).map((d, idx) => (
              <div key={idx} className={`bg-[#171c25] border p-4 rounded-xl flex flex-col justify-between min-h-[120px]
                ${d.status === 'UP' ? 'border-green-400' : 'border-red-500'}`}>
                <span className={`text-sm font-medium ${d.status === 'UP' ? 'text-green-400' : 'text-red-400'}`}>
                  {d.status}: {d.ping}
                </span>
                <span className="mt-1">{d.name}</span>
                <span className="text-xs text-gray-400">{d.ip}</span>
              </div>
            ))}
          </div>

          {/* Card bawah */}
          <div className="bg-[#171c25] border border-gray-800 p-6 rounded-xl flex items-center justify-center min-h-[120px]">
            <span className="text-gray-500 font-bold">Desain Sendiri Bebas mau di isi apa (optional)</span>
          </div>
        </div>

        {/* Footer */}
        <footer className="h-12 flex items-center justify-between px-6 border-t border-gray-800 text-sm text-gray-400 mt-auto">
          <span>TOTAL_DEVICES: {devices.length}</span>
          <span>ONLINE: {devices.filter(d => d.status === 'UP').length}</span>
          <span>CRITICAL_ALERTS: 02</span>
          <span>PKT_LOSS: 0.001%</span>
          <span>NODE_ID: 0XFF12</span>
          <span>SYSTEM_UPTIME: 432:12:08</span>
        </footer>
      </main>
    </div>
  );
}