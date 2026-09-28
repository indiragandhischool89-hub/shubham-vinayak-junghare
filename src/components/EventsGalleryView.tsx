/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Language, ScreenId } from '../types';
import { 
  ArrowLeft, 
  Search, 
  Upload, 
  Plus, 
  Image as ImageIcon, 
  X, 
  ChevronRight, 
  ChevronLeft,
  Calendar,
  Home,
  Megaphone,
  Menu
} from 'lucide-react';
import { INITIAL_ALBUMS } from '../data';

interface EventsGalleryViewProps {
  language: Language;
  setScreen: (screen: ScreenId) => void;
  role: string | null;
}

export default function EventsGalleryView({
  language,
  setScreen,
  role,
}: EventsGalleryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState<string>('all');
  const [activeAlbum, setActiveAlbum] = useState<any | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // Filter albums
  const filteredAlbums = INITIAL_ALBUMS.filter((album) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = album.title.toLowerCase().includes(q) || album.titleMr.includes(q);
    const matchesTag = filterTag === 'all' || album.tag === filterTag;
    return matchesSearch && matchesTag;
  });

  const handleOpenAlbum = (album: any) => {
    setActiveAlbum(album);
    setLightboxIndex(0);
  };

  const handleNextPhoto = () => {
    setLightboxIndex((prev) => (prev + 1) % 4); // simulate 4 slide loop
  };

  const handlePrevPhoto = () => {
    setLightboxIndex((prev) => (prev === 0 ? 3 : prev - 1));
  };

  // Mock slideshow urls related to school activities
  const mockAlbumPhotos = [
    activeAlbum?.coverImage,
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCeePMs-IWjBC_nYirkChXD7mveV5xWNlxjWm3j7g_dLfnVlzkrOx_dPmr-ajGkT1GYbUqzElUDyzhGQcOqEGXDy9ipWri2agv_MaoLdbmEhQLrkvdtxt0LIQzUtx6-pTs-O4PdxLksLo-Bs6T5PqJpyypn0HTpw4C6A-4T0-u0TQ8zuVPGzrv4CbX5z_7LFJbzULEp6iZdJ8hBQEJ0A49awaChDha4fC6fVVGJcNd5L_ZW1QHfHF0wrhXphlDhWr-OOqPYS-IMjMsf',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBAztV22-3uHtjXDXW6swewt0X3l27nxlsdXVph1FSkuFDN5PF3EJSRgoVM2YPlG4c7zCnojUCzdI-LxqsrZNT3X4-nZWfPP6zMGd-1bkhQ33QUWELasQ4Egrvq6_Y_1REYLshNfNuUOTRBsjI1X6mk33PEwzg3ZFfWoTHKBXvx4ELmTcCDCke0nyZ54Sbyqq_K7rsKNKF6Gi61M6XtxQ8Uglv4VzG0SomjR3Su5fYcLQ6A23RfyGegwwlA3TPPfbIm7BR8gT3bt9df',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBx1VFOOkpfvwyk44hbJN2ZXJ-RdBsiIB7m3DB4N2QoQ1gexGmkGU8hWPIxkry8UprIUmfO2K354ZVbeSxR4ulQIIxgq3e6EWdWphUPDUsXdqMwZ8yjbVTmM9npeJvPJCZTqMh-gEgDVP1OxCyzGnUEzBjbLH1iUHSMkcAk4tfRrY8cDnI5c-YUc6WiSnzWNRwIjMjSoiu_dXwZt5xnVWV-I2VQo4zVR0B0zZFGTyc1XSwtohDRSnH9atet_WPi8XXrzi_dNQzAKplI',
  ];

  return (
    <main className="max-w-[1140px] mx-auto px-4 py-6 pb-24 space-y-6">
      
      {/* Top Header */}
      <nav className="flex justify-between items-center border-b border-gray-100 pb-3">
        <button 
          onClick={() => {
            if (role === 'admin') setScreen('admin_dashboard');
            else if (role === 'teacher') setScreen('teacher_attendance');
            else if (role === 'parent') setScreen('parent_dashboard');
            else setScreen('login');
          }}
          className="text-xs font-bold text-blue-900 flex items-center gap-1 hover:underline cursor-pointer"
        >
          ← {language === 'mr' ? 'मागे जा' : 'Back'}
        </button>
        <span className="text-xs font-bold text-gray-500 uppercase">
          {language === 'mr' ? 'शाळा गॅलरी' : 'Campus Life'}
        </span>
      </nav>

      {/* Title Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-extrabold text-2xl text-blue-950 flex items-center gap-2">
            <ImageIcon size={24} className="text-blue-900" />
            <span>{language === 'mr' ? 'शाळा गॅलरी' : 'School Gallery'}</span>
          </h2>
          <p className="text-xs text-gray-500 font-semibold">
            {language === 'mr' ? 'शाळेचे विविध उपक्रम आणि आठवणी' : 'Capturing moments, achievements, and events'}
          </p>
        </div>

        {/* Upload photos access (Teacher or Admin) */}
        {(role === 'admin' || role === 'teacher') && (
          <button 
            onClick={() => setScreen('gallery_upload')}
            className="flex items-center gap-1.5 bg-blue-900 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs hover:bg-blue-950 transition-all active:scale-95 shadow-md border border-blue-950 cursor-pointer"
          >
            <Upload size={14} />
            <span>Upload New Photos</span>
          </button>
        )}
      </div>

      {/* Search Bar & Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder={language === 'mr' ? 'अल्बम शोधा...' : 'Search album by name...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-blue-900"
          />
        </div>

        {/* Filters Row */}
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
          {['all', 'academic', 'sports', 'cultural'].map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-3.5 py-2 rounded-lg font-bold text-[10px] md:text-xs uppercase tracking-wide shrink-0 transition-all ${
                filterTag === tag
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredAlbums.map((album) => (
          <div 
            key={album.id}
            onClick={() => handleOpenAlbum(album)}
            className="bg-white rounded-2xl border border-gray-205 shadow-sm overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 relative"
          >
            {/* Album Cover */}
            <div className="h-48 overflow-hidden bg-gray-100 relative">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 duration-500" 
                alt={album.title} 
                src={album.coverImage} 
              />
              <span className="absolute bottom-3 left-3 bg-blue-950/80 backdrop-blur-sm text-yellow-400 font-extrabold px-2.5 py-1 rounded text-[10px] uppercase shadow-sm">
                {album.tag}
              </span>
            </div>

            {/* Title Details */}
            <div className="p-4 flex justify-between items-start">
              <div>
                <h4 className="font-extrabold text-sm text-blue-950 group-hover:text-blue-900">
                  {language === 'mr' ? album.titleMr : album.title}
                </h4>
                <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase flex items-center gap-1">
                  <Calendar size={10} />
                  {album.date}
                </p>
              </div>
              <span className="shrink-0 text-[10px] bg-blue-50 text-blue-900 font-extrabold px-2 py-0.5 rounded-full border border-blue-150">
                {album.photosCount} Photos
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Album Carousel Lightbox Modal */}
      {activeAlbum && (
        <div className="fixed inset-0 bg-blue-950/98 z-50 flex items-center justify-center p-4">
          
          {/* Close button */}
          <button 
            onClick={() => setActiveAlbum(null)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="max-w-4xl w-full flex flex-col gap-4 relative">
            
            {/* Title display */}
            <div className="text-white text-center">
              <h3 className="font-extrabold text-lg">
                {language === 'mr' ? activeAlbum.titleMr : activeAlbum.title}
              </h3>
              <p className="text-xs text-gray-300">Photo {lightboxIndex + 1} of 4</p>
            </div>

            {/* Slider container */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center">
              <img 
                className="max-h-full max-w-full object-contain" 
                src={mockAlbumPhotos[lightboxIndex]} 
                alt="Active gallery slider" 
              />

              {/* Slider Controls */}
              <button 
                onClick={handlePrevPhoto}
                className="absolute left-3 p-3 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-sm transition-colors cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNextPhoto}
                className="absolute right-3 p-3 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-sm transition-colors cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Thumbnail selector strips */}
            <div className="flex gap-2 justify-center">
              {mockAlbumPhotos.map((url, idx) => (
                <div 
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`w-14 h-10 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    lightboxIndex === idx ? 'border-yellow-400 scale-105' : 'border-transparent opacity-60'
                  }`}
                >
                  <img className="w-full h-full object-cover" src={url} alt="thumbnail" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile nav bar spacing */}
      <div className="h-16 md:hidden"></div>

      {/* Bottom Nav Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-45 bg-white border-t border-gray-150 h-16 flex justify-around items-center px-4 shadow-[0px_-2px_10px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => {
            if (role === 'admin') setScreen('admin_dashboard');
            else if (role === 'teacher') setScreen('teacher_attendance');
            else if (role === 'parent') setScreen('parent_dashboard');
            else setScreen('login');
          }}
          className="flex flex-col items-center justify-center text-gray-400 hover:text-blue-900"
        >
          <Home size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Home</span>
        </button>
        <button 
          onClick={() => setScreen('parent_timetable')}
          className="flex flex-col items-center justify-center text-gray-400 hover:text-blue-900"
        >
          <Calendar size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Schedule</span>
        </button>
        <button 
          onClick={() => setScreen('gallery')}
          className="flex flex-col items-center justify-center text-blue-900 bg-amber-400 px-4 py-1.5 rounded-full shadow-sm"
        >
          <ImageIcon size={18} />
          <span className="text-[10px] mt-0.5 font-bold">Gallery</span>
        </button>
        <button 
          onClick={() => setScreen('notice_board')}
          className="flex flex-col items-center justify-center text-gray-400 hover:text-blue-900"
        >
          <Megaphone size={18} />
          <span className="text-[10px] mt-0.5 font-bold">News</span>
        </button>
      </nav>
    </main>
  );
}
