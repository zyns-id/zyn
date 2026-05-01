'use client';
import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Bell, Settings, Menu } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Device {
  name: string;
  ip: string;
  status: 'UP' | 'OFFLINE';
  ping: number | null;
}

export default function Dashboard() {
  const [temp, setTemp] = useState(26.4);
  const [humidity, setHumidity] = useState(61);

  const [devices, setDevices] = useState<Device[]>([
    { name: 'GATEWAY_ALPHA', ip: '192.168.1.104', status: 'UP', ping: 33 },
    { name: 'STORAGE_NODE_02', ip: '192.168.1.112', status: 'UP', ping: 45 },
    { name: 'UPS_BACKUP_MAIN', ip: '192.168.1.101', status: 'UP', ping: 49 },
    { name: 'HVAC_SENSOR_3', ip: '192.168.1.192', status: 'OFFLINE', ping: null },
  ]);

  // Simulasi update sensor
  useEffect(() => {
    const interval = setInterval(() => {
      setTemp((Math.random() * 5 + 25).toFixed(1) as unknown as number);
      setHumidity((Math.random() * 10 + 55).toFixed(0) as unknown as number);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-[#0e1116] text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#15181e] p-6 border-r border-gray-800 hidden lg:block h-full">
        <h1 className="text-xl font-bold mb-8">IoT Monitor</h1>
        <nav className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-blue-900/30 text-blue-400 rounded-lg cursor-pointer">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col h-full">
        {/* Header */}
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-[#0e1116]">
          <button className="lg:hidden text-gray-400">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-6 ml-auto">
            <span className="text-sm text-emerald-400 bg-emerald-900/30 px-3 py-1 rounded-full">
              {devices.filter((d) => d.status === 'UP').length} Online
            </span>
            <Bell className="w-5 h-5 text-gray-400" />
            <Settings className="w-5 h-5 text-gray-400" />
          </div>
        </header>

        {/* Grid cards */}
        <div className="p-6 grid grid-cols-1 gap-6">
          {/* DHT22 semicircle card */}
          <div className="bg-[#171c25] border border-gray-800 p-6 rounded-xl min-h-[200px] flex flex-col items-center">
            <h3 className="text-lg font-bold text-gray-300 mb-4">DHT22</h3>
            <div className="w-32 h-32">
              <CircularProgressbar
                value={humidity}
                maxValue={100}
                text={`${temp}°C`}
                styles={buildStyles({
                  textColor: '#E5E7EB',
                  pathColor: '#22D3EE',
                  trailColor: '#1F2937',
                  textSize: '24px',
                })}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">Humidity {humidity}%</p>
          </div>

          {/* Device cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {devices.map((device) => (
              <div
                key={device.name}
                className={`border p-4 rounded-xl min-h-[100px] ${
                  device.status === 'UP'
                    ? 'border-emerald-500'
                    : 'border-red-500'
                }`}
              >
                <div className="text-xs text-gray-400">
                  {device.status === 'UP' ? 'UP' : 'OFFLINE'}
                  {device.ping !== null ? `: ${device.ping}ms` : ': TIMEOUT'}
                </div>
                <h4 className="font-bold mt-1">{device.name}</h4>
                <p className="text-sm text-gray-400">{device.ip}</p>
              </div>
            ))}
          </div>

          {/* Footer summary */}
          <div className="bg-[#171c25] border border-gray-800 p-4 rounded-xl flex justify-between text-sm text-gray-400">
            <span>TOTAL_DEVICES: {devices.length}</span>
            <span>ONLINE: {devices.filter((d) => d.status === 'UP').length}</span>
            <span>CRITICAL_ALERTS: {devices.filter((d) => d.status === 'OFFLINE').length}</span>
            <span>PKT_LOSS: 0.001%</span>
            <span>SYSTEM_UPTIME: 432:12:08</span>
          </div>
        </div>
      </main>
    </div>
  );
}