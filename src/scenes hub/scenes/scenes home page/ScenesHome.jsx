import React, { useState, useMemo } from 'react';
import { 
  youtubeShorts, 
  youtubeVideos 
} from './youtubeData';
import { PlayHeader } from './PlayHeader';
import { PlayShortsSection } from './PlayShortsSection';
import { YouTubeFilterChips } from './YouTubeFilterChips';
import { YouTubeVideoCard } from './YouTubeVideoCard';
import { YouTubePlayerModal } from './YouTubePlayerModal';
import { YouTubeShortsViewer } from './YouTubeShortsViewer';
import { LikedVideosModal } from './LikedVideosModal';
import { Video, Film } from 'lucide-react';

const getCategoryFromHub = (hub) => {
  if (!hub) return 'All';
  const h = hub.toLowerCase();
  if (h === 'food' || h === 'dineout') return 'Food';
  if (h === 'shop') return 'Shop';
  if (h === 'grocery' || h === 'instamart') return 'Grocery';
  if (h === 'service') return 'Service';
  if (h === 'ride') return 'Ride';
  if (h === 'travel') return 'Travel';
  if (h === 'rent') return 'Rent';
  return 'All';
};

export const ScenesHome = ({ activeHub = 'shop', onBack, _onTabChange, showToast }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [prevHub, setPrevHub] = useState(activeHub);
  const [activeCategory, setActiveCategory] = useState(() => getCategoryFromHub(activeHub));
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedShort, setSelectedShort] = useState(null);
  const [isLikedModalOpen, setIsLikedModalOpen] = useState(false);

  // Synchronize category state when activeHub changes
  if (activeHub !== prevHub) {
    setPrevHub(activeHub);
    setActiveCategory(getCategoryFromHub(activeHub));
  }

  // Liked / Saved videos library
  const [likedVideos, setLikedVideos] = useState([
    {
      id: 's-1',
      title: 'Wait for the end! Impossible domino collapse 🤯🔥',
      views: '4.8M',
      channelName: 'DominoMaster',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      isShort: true
    },
    {
      id: 'v-1',
      title: 'I Tested The Wildest Next-Gen Tech Gadgets in Tokyo! 🤖',
      duration: '18:42',
      views: '3.4M views',
      channelName: 'Marques Brownlee',
      thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80',
      isShort: false
    }
  ]);

  const likedVideoIds = useMemo(() => new Set(likedVideos.map(v => v.id)), [likedVideos]);

  // Toggle like handler for both short and long videos
  const handleToggleLike = (item, isShort = false) => {
    const itemId = item.id;
    const isCurrentlyLiked = likedVideoIds.has(itemId);

    if (isCurrentlyLiked) {
      setLikedVideos(prev => prev.filter(v => v.id !== itemId));
      if (showToast) showToast('Removed from Liked Videos');
    } else {
      const newItem = {
        id: item.id,
        title: item.title,
        views: item.views,
        duration: item.duration || 'Short',
        channelName: item.channelName,
        thumbnail: item.thumbnail,
        isShort: isShort || Boolean(item.song),
        ...item
      };
      setLikedVideos(prev => [newItem, ...prev]);
      if (showToast) showToast('Saved to Liked Videos ❤️');
    }
  };

  // Filter long videos based on active category and search query
  const filteredVideos = useMemo(() => {
    return youtubeVideos.filter((v) => {
      if (activeCategory !== 'All') {
        if (v.category.toLowerCase() !== activeCategory.toLowerCase()) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = v.title.toLowerCase().includes(q);
        const matchChannel = v.channelName.toLowerCase().includes(q);
        const matchCat = v.category && v.category.toLowerCase().includes(q);
        if (!matchTitle && !matchChannel && !matchCat) return false;
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  // Filter shorts based on active category and search query
  const filteredShorts = useMemo(() => {
    return youtubeShorts.filter((s) => {
      if (activeCategory !== 'All') {
        if (s.category.toLowerCase() !== activeCategory.toLowerCase()) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = s.title.toLowerCase().includes(q);
        const matchChannel = s.channelName.toLowerCase().includes(q);
        const matchCat = s.category && s.category.toLowerCase().includes(q);
        if (!matchTitle && !matchChannel && !matchCat) return false;
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 pb-28 select-none font-sans">
      {/* 1. Explore Page Header */}
      <PlayHeader 
        onBack={onBack}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        likedCount={likedVideos.length}
        onOpenLiked={() => setIsLikedModalOpen(true)}
        showToast={showToast}
      />

      {/* 2. Category Filter Chips (Format buttons removed) */}
      <YouTubeFilterChips 
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          if (showToast) showToast(`Browsing ${cat} videos`);
        }}
      />

      {/* 3. Shorts Section */}
      <section aria-label="Shorts Feed">
        {filteredShorts.length > 0 ? (
          <PlayShortsSection 
            shorts={filteredShorts}
            onSelectShort={(s) => setSelectedShort(s)}
            onToggleLikeShort={(s) => handleToggleLike(s, true)}
            likedVideoIds={likedVideoIds}
            showToast={showToast}
          />
        ) : (
          <div className="py-8 text-center px-4 bg-slate-50/50">
            <Film size={26} className="mx-auto text-slate-400 mb-2" />
            <p className="text-xs font-bold text-slate-600">No shorts found for {activeCategory}</p>
          </div>
        )}
      </section>

      {/* 4. Long Videos Section */}
      <section className="pt-3" aria-label="Long Videos Feed">
        <div className="px-3.5 py-2 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <Video size={17} className="text-[#800020]" />
            <h3 className="text-[15px] font-black tracking-tight text-slate-900">
              Long Videos
            </h3>
          </div>
          <span className="text-[11px] font-bold text-slate-400">
            {filteredVideos.length} {filteredVideos.length === 1 ? 'Video' : 'Videos'}
          </span>
        </div>

        <div className="divide-y-4 divide-slate-100">
          {filteredVideos.map((video) => (
            <YouTubeVideoCard 
              key={video.id}
              video={video}
              onSelect={(v) => setSelectedVideo(v)}
              showToast={showToast}
              isLiked={likedVideoIds.has(video.id)}
              onToggleLike={(v) => handleToggleLike(v, false)}
            />
          ))}

          {filteredVideos.length === 0 && (
            <div className="py-12 text-center px-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2 text-slate-400">
                <Video size={22} />
              </div>
              <h4 className="text-xs font-bold text-slate-800">No long videos found for {activeCategory}</h4>
              <p className="text-[11px] text-slate-500 mt-1 max-w-[220px] mx-auto">
                Try switching category or searching for another keyword.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 5. Liked Videos Modal */}
      {isLikedModalOpen && (
        <LikedVideosModal 
          likedVideos={likedVideos}
          onClose={() => setIsLikedModalOpen(false)}
          onSelectVideo={(video) => {
            setIsLikedModalOpen(false);
            if (video.isShort) setSelectedShort(video);
            else setSelectedVideo(video);
          }}
          onRemoveLiked={(id) => {
            setLikedVideos(prev => prev.filter(v => v.id !== id));
            if (showToast) showToast('Removed from Liked Videos');
          }}
        />
      )}

      {/* 6. Short Video Fullscreen Viewer Modal */}
      {selectedShort && (
        <YouTubeShortsViewer 
          short={selectedShort}
          allShorts={filteredShorts}
          onClose={() => setSelectedShort(null)}
          isLiked={likedVideoIds.has(selectedShort.id)}
          onToggleLike={(s) => handleToggleLike(s, true)}
          showToast={showToast}
        />
      )}

      {/* 7. Long Video Fullscreen Player Modal */}
      {selectedVideo && (
        <YouTubePlayerModal 
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          isLiked={likedVideoIds.has(selectedVideo.id)}
          onToggleLike={(v) => handleToggleLike(v, false)}
          showToast={showToast}
        />
      )}
    </div>
  );
};
