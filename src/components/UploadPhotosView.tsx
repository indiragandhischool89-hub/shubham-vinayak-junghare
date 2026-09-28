/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Language, ScreenId } from '../types';
import { 
  ArrowLeft, 
  UploadCloud, 
  X, 
  FileImage, 
  CheckCircle, 
  Trash2, 
  Plus, 
  ImageIcon,
  Home,
  Calendar,
  Megaphone
} from 'lucide-react';

interface UploadPhotosViewProps {
  language: Language;
  setScreen: (screen: ScreenId) => void;
  role: string | null;
}

interface UploadQueueFile {
  id: string;
  name: string;
  size: string;
  progress: number;
  previewUrl: string;
  caption: string;
}

export default function UploadPhotosView({
  language,
  setScreen,
  role,
}: UploadPhotosViewProps) {
  const [selectedAlbum, setSelectedAlbum] = useState('Annual Day 2023');
  const [selectedCategory, setSelectedCategory] = useState('cultural');
  const [uploadQueue, setUploadQueue] = useState<UploadQueueFile[]>([]);
  const [publishing, setPublishing] = useState(false);

  // Helper to add fake files to show progress animation
  const handleAddMockFiles = () => {
    const mockFiles: UploadQueueFile[] = [
      {
        id: 'f1',
        name: 'dance_performance_01.jpg',
        size: '1.4 MB',
        progress: 100,
        previewUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAztV22-3uHtjXDXW6swewt0X3l27nxlsdXVph1FSkuFDN5PF3EJSRgoVM2YPlG4c7zCnojUCzdI-LxqsrZNT3X4-nZWfPP6zMGd-1bkhQ33QUWELasQ4Egrvq6_Y_1REYLshNfNuUOTRBsjI1X6mk33PEwzg3ZFfWoTHKBXvx4ELmTcCDCke0nyZ54Sbyqq_K7rsKNKF6Gi61M6XtxQ8Uglv4VzG0SomjR3Su5fYcLQ6A23RfyGegwwlA3TPPfbIm7BR8gT3bt9df',
        caption: 'Grade 3 student traditional dance'
      },
      {
        id: 'f2',
        name: 'prize_distribution.jpg',
        size: '2.1 MB',
        progress: 65,
        previewUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlsCNBccJAmGwbUaOyf6Fmrb3HZ7-zixdcw1boHz9u48dVb2-jHBHKLYEOhiR84tdwhuzt7D8Pth70Gj2cBg92vsWGyE58lbh3XTtH-kFxB7HkHKMJoffzSTvoXiw3F8Mlmz5wWvT95oE6A8rGvpHQ093KnHcZ56Vh7oAi8g0vDXE60chPHKuCugg61UGr43hb8iAXRsuf7WlkZeTeQ3FzVC-1HOsFWHjuszg7TbXxRYaFmxSvC6wnXT1ut1Do5LIoE9rxgN_PuP46',
        caption: 'Annual prize awards distribution ceremony'
      }
    ];

    setUploadQueue([...uploadQueue, ...mockFiles]);

    // Animate the second file's progress to show functional fidelity
    const interval = setInterval(() => {
      setUploadQueue((currentQueue) => 
        currentQueue.map((file) => {
          if (file.id === 'f2' && file.progress < 100) {
            return { ...file, progress: Math.min(100, file.progress + 15) };
          }
          return file;
        })
      );
    }, 600);

    // Stop after full completion simulation
    setTimeout(() => clearInterval(interval), 3000);
  };

  const handleRemoveFile = (id: string) => {
    setUploadQueue(uploadQueue.filter((f) => f.id !== id));
  };

  const handleCaptionChange = (id: string, text: string) => {
    setUploadQueue(
      uploadQueue.map((f) => (f.id === id ? { ...f, caption: text } : f))
    );
  };

  const handlePublish = () => {
    if (uploadQueue.length === 0) {
      alert(
        language === 'mr'
          ? 'कृपया गॅलरीमध्ये अपलोड करण्यासाठी आधी फोटो निवडा.'
          : 'Please select or add photo assets first before publishing.'
      );
      return;
    }

    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      alert(
        language === 'mr'
          ? 'फोटो यशस्वीरित्या गॅलरी अल्बममध्ये प्रसिद्ध केले आहेत!'
          : 'Success! New photos have been compiled and published into the school gallery.'
      );
      setScreen('gallery');
    }, 1500);
  };

  return (
    <main className="max-w-[1140px] mx-auto px-4 py-6 pb-24 space-y-6">
      
      {/* Top Navigation */}
      <nav className="flex justify-between items-center border-b border-gray-100 pb-3">
        <button 
          onClick={() => setScreen('gallery')}
          className="text-xs font-bold text-blue-900 flex items-center gap-1 hover:underline cursor-pointer"
        >
          ← {language === 'mr' ? 'शाळा गॅलरी' : 'Back to Gallery'}
        </button>
        <span className="text-xs font-bold text-gray-500 uppercase">
          {language === 'mr' ? 'फोटो अपलोड' : 'Media Center'}
        </span>
      </nav>

      {/* Title */}
      <div>
        <h2 className="font-extrabold text-2xl text-blue-950 flex items-center gap-2">
          <UploadCloud size={24} className="text-blue-900" />
          <span>{language === 'mr' ? 'फोटो अपलोड करा' : 'Upload Photos'}</span>
        </h2>
        <p className="text-xs text-gray-500 font-semibold">
          {language === 'mr' ? 'गॅलरीमध्ये नवीन आठवणींचे संकलन' : 'Publish new event images to the official portal'}
        </p>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Drag & Drop Zone and Previews (7 grid slots) */}
        <section className="md:col-span-7 space-y-4">
          
          {/* Drag zone box */}
          <div 
            onClick={handleAddMockFiles}
            className="border-3 border-dashed border-gray-250 hover:border-blue-900 bg-white p-8 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-colors relative group"
          >
            <UploadCloud size={44} className="text-blue-900 mb-2 group-hover:scale-105 duration-200" />
            <h3 className="font-bold text-sm text-blue-950">
              Drag & Drop files here, or click to choose
            </h3>
            <p className="text-xs text-gray-400 mt-1 font-semibold">
              Supports PNG, JPG, JPEG up to 5MB each.
            </p>
            <span className="mt-4 text-xs font-extrabold text-blue-900 bg-blue-50 px-3 py-1.5 rounded-lg">
              Simulator: Click to Mock Upload
            </span>
          </div>

          {/* Upload Queue Previews list */}
          {uploadQueue.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-wider pl-1">
                Selected Assets ({uploadQueue.length})
              </h4>
              <div className="space-y-3">
                {uploadQueue.map((file) => (
                  <div 
                    key={file.id}
                    className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex gap-4 items-start"
                  >
                    {/* Tiny Thumbnail */}
                    <div className="w-16 h-12 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-150">
                      <img className="w-full h-full object-cover" src={file.previewUrl} alt="preview" />
                    </div>

                    {/* Progress Detail */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <p className="text-gray-800 truncate">{file.name}</p>
                        <span className="text-[10px] text-gray-400 shrink-0">{file.size}</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-900 rounded-full transition-all duration-300" 
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>

                      {/* Status indicator / Input caption field */}
                      {file.progress === 100 ? (
                        <div className="pt-1.5">
                          <input 
                            type="text" 
                            placeholder="Add brief image caption..."
                            value={file.caption}
                            onChange={(e) => handleCaptionChange(file.id, e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-250 rounded-lg text-xs outline-none focus:border-blue-900"
                          />
                        </div>
                      ) : (
                        <p className="text-[10px] font-bold text-gray-400">Uploading... {file.progress}%</p>
                      )}
                    </div>

                    {/* Remove file button */}
                    <button 
                      onClick={() => handleRemoveFile(file.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-50"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Right Metadata form panel (5 grid slots) */}
        <section className="md:col-span-5 bg-white p-6 rounded-2xl border border-gray-205 shadow-sm space-y-5">
          <h3 className="font-extrabold text-sm text-blue-955 border-b border-gray-100 pb-2">
            Album Details
          </h3>

          {/* Select Album */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-400">Select Album</label>
            <select
              value={selectedAlbum}
              onChange={(e) => setSelectedAlbum(e.target.value)}
              className="w-full h-11 border-2 border-gray-200 rounded-xl px-3 text-xs font-bold text-gray-700 outline-none focus:border-blue-900"
            >
              <option>Annual Day 2023</option>
              <option>Sports Meet</option>
              <option>Science Fair</option>
              <option>Create New Album...</option>
            </select>
          </div>

          {/* Select Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-400">Category Tag</label>
            <div className="grid grid-cols-2 gap-2">
              {['academic', 'sports', 'cultural', 'campus'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedCategory(tag)}
                  className={`py-2 px-3 rounded-lg border-2 font-bold text-[10px] uppercase tracking-wide transition-all ${
                    selectedCategory === tag
                      ? 'bg-blue-900 text-white border-blue-950 shadow-sm'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Big Action CTA Button */}
          <button 
            onClick={handlePublish}
            disabled={publishing}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-black py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] border border-yellow-300 cursor-pointer"
          >
            {publishing ? (
              <div className="w-4 h-4 border-2 border-blue-950/30 border-t-blue-950 rounded-full animate-spin"></div>
            ) : (
              <CheckCircle size={14} />
            )}
            <div className="flex flex-col items-center leading-none">
              <span className="font-extrabold text-xs">Publish to Gallery</span>
              <span className="text-[9px] font-semibold opacity-85 mt-0.5">फोटो गॅलरीमध्ये सबमिट करा</span>
            </div>
          </button>
        </section>
      </div>

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
