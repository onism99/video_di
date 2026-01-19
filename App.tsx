import React, { useState, useCallback } from 'react';
import { LayoutGrid, Grid, Download, History, Upload, User, BrainCircuit, ChevronLeft, ChevronRight, MonitorPlay } from 'lucide-react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import VideoPlayer from './components/VideoPlayer';
import Timeline from './components/Timeline';
import UploadModal from './components/UploadModal';
import { MOCK_DEVICES, MOCK_EVENTS, MOCK_STATS } from './constants';
import { Device, ViewMode } from './types';

function App() {
  const [selectedDevice, setSelectedDevice] = useState<Device>(MOCK_DEVICES[0]);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.SINGLE);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [historyMode, setHistoryMode] = useState(false);

  // Carousel logic for preview strip
  const [previewOffset, setPreviewOffset] = useState(0);
  const previewLimit = 5;

  const handleDeviceSelect = useCallback((device: Device) => {
    setSelectedDevice(device);
    setHistoryMode(false); // Reset to live when changing device
  }, []);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('视频导出成功');
    }, 2000);
  };

  const visiblePreviewDevices = MOCK_DEVICES.slice(previewOffset, previewOffset + previewLimit);

  const scrollPreview = (dir: 'left' | 'right') => {
    if (dir === 'left') {
      setPreviewOffset(Math.max(0, previewOffset - 1));
    } else {
      setPreviewOffset(Math.min(MOCK_DEVICES.length - previewLimit, previewOffset + 1));
    }
  };

  // Render content based on View Mode
  const renderMainContent = () => {
    if (viewMode === ViewMode.GRID_2X2) {
      return (
        <div className="h-full grid grid-cols-2 grid-rows-2 gap-1 bg-black p-1">
          {MOCK_DEVICES.slice(0, 4).map(dev => (
            <VideoPlayer key={dev.id} device={dev} onClick={() => handleDeviceSelect(dev)} />
          ))}
        </div>
      );
    }
    if (viewMode === ViewMode.GRID_3X3) {
      return (
        <div className="h-full grid grid-cols-3 grid-rows-3 gap-1 bg-black p-1">
          {MOCK_DEVICES.slice(0, 9).map(dev => (
            <VideoPlayer key={dev.id} device={dev} onClick={() => handleDeviceSelect(dev)} />
          ))}
          {/* Fillers if less than 9 devices */}
          {Array.from({ length: Math.max(0, 9 - MOCK_DEVICES.length) }).map((_, i) => (
             <VideoPlayer key={`empty-${i}`} device={null} />
          ))}
        </div>
      );
    }

    // Single / Main View
    return (
      <div className="flex flex-col h-full relative">
        <div className="flex-1 bg-black relative">
           <VideoPlayer device={selectedDevice} isMain={true} />
           
           {/* Enter Fullscreen Overlay Button example - usually handled by player controls, but explicit in reqs */}
           <div className="absolute top-4 right-4 z-20">
             <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm shadow-lg flex items-center gap-2">
               <MonitorPlay size={14} /> 专注模式
             </button>
           </div>
        </div>
        
        {historyMode && <Timeline />}

        {/* Bottom Preview Strip (Only in Single Mode) */}
        {!historyMode && (
          <div className="h-32 bg-slate-900 border-t border-slate-800 flex flex-col">
            <div className="h-6 bg-blue-600/20 text-blue-200 text-xs px-2 flex items-center justify-center font-bold tracking-wider">
              多设备预览
            </div>
            <div className="flex-1 flex items-center px-2 gap-2">
              <button 
                onClick={() => scrollPreview('left')}
                disabled={previewOffset === 0}
                className="p-1 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 disabled:opacity-30"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex-1 grid grid-cols-5 gap-2 h-full py-2">
                {visiblePreviewDevices.map(dev => (
                  <div key={dev.id} className="relative border border-slate-700 hover:border-blue-500 cursor-pointer group bg-black" onClick={() => handleDeviceSelect(dev)}>
                     <img src={dev.streamUrl} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" alt={dev.name}/>
                     <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[10px] text-white px-1 truncate">
                        {dev.name}
                     </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => scrollPreview('right')}
                disabled={previewOffset >= MOCK_DEVICES.length - previewLimit}
                className="p-1 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 disabled:opacity-30"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-200">
      
      {/* Header */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 shrink-0 z-30">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-blue-500">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg">S</div>
            <span className="text-xl font-bold tracking-tight text-white">哨兵 <span className="text-slate-500 text-sm font-normal">智能监控</span></span>
          </div>

          <nav className="flex items-center gap-1">
            <button 
                onClick={() => setViewMode(ViewMode.SINGLE)}
                className={`px-3 py-1.5 rounded text-sm flex items-center gap-2 transition-colors ${viewMode === ViewMode.SINGLE ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <MonitorPlay size={16} /> 监控
            </button>
             <button 
                onClick={() => setViewMode(ViewMode.GRID_2X2)}
                className={`px-3 py-1.5 rounded text-sm flex items-center gap-2 transition-colors ${viewMode === ViewMode.GRID_2X2 ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <LayoutGrid size={16} /> 四分屏
            </button>
             <button 
                onClick={() => setViewMode(ViewMode.GRID_3X3)}
                className={`px-3 py-1.5 rounded text-sm flex items-center gap-2 transition-colors ${viewMode === ViewMode.GRID_3X3 ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <Grid size={16} /> 九分屏
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setHistoryMode(!historyMode)}
            className={`px-3 py-1.5 rounded text-sm border flex items-center gap-2 transition-colors ${historyMode ? 'bg-yellow-600/20 border-yellow-600 text-yellow-500' : 'border-slate-700 hover:border-slate-500 text-slate-300'}`}
          >
            <History size={16} /> {historyMode ? '退出回放' : '历史回放'}
          </button>

          <button 
            onClick={handleExport}
            className="px-3 py-1.5 rounded text-sm border border-slate-700 hover:border-slate-500 text-slate-300 flex items-center gap-2 relative overflow-hidden"
          >
            {isExporting ? (
                 <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-slate-400 border-t-white rounded-full animate-spin"></span>
                    导出中...
                 </span>
            ) : (
                <>
                    <Download size={16} /> 导出
                </>
            )}
            {isExporting && <div className="absolute bottom-0 left-0 h-0.5 bg-green-500 animate-[width_2s_ease-in-out_forwards]" style={{width: '100%'}}></div>}
          </button>
          
          <button 
            onClick={() => setIsUploadOpen(true)}
            className="px-3 py-1.5 rounded text-sm border border-slate-700 hover:border-slate-500 text-slate-300 flex items-center gap-2"
          >
            <Upload size={16} /> 上传
          </button>

          <div className="h-6 w-px bg-slate-700 mx-2"></div>

          <button className="px-3 py-1.5 rounded text-sm bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 shadow-lg shadow-indigo-500/20">
            <BrainCircuit size={16} /> 智能分析
          </button>

          <button className="p-2 hover:bg-slate-800 rounded-full text-slate-400">
            <User size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar */}
        <aside className="shrink-0 h-full">
          <LeftPanel 
            devices={MOCK_DEVICES} 
            selectedDeviceId={selectedDevice.id}
            onSelectDevice={handleDeviceSelect}
            stats={MOCK_STATS}
          />
        </aside>

        {/* Center Canvas */}
        <section className="flex-1 bg-slate-900 border-x border-slate-800 overflow-hidden flex flex-col">
            {renderMainContent()}
        </section>

        {/* Right Sidebar */}
        <aside className="shrink-0 h-full">
          <RightPanel events={MOCK_EVENTS} />
        </aside>

      </main>

      {/* Modals */}
      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </div>
  );
}

export default App;