import React, { useState, useEffect } from "react";
import CrisprVideoPlayer from "./CrisprVideoPlayer";
import { fetchCourseData, fetchComments, postComment, likeComment, dislikeComment, deleteComment, postReply } from "../../api/mockApi";

const IconLike = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 8.39C7.21 8.81 7 9.38 7 10v9c0 1.66 1.34 3 3 3h9c1.23 0 2.24-.74 2.67-1.83l1.83-4.28c.04-.15.06-.31.06-.47v-4z"/></svg>;
const IconDislike = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M15 3H6c-1.23 0-2.24.74-2.67 1.83l-1.83 4.28c-.04.15-.06.31-.06.47v4c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L11.83 23l6.59-7.39c.38-.42.58-.99.58-1.61V5c0-1.66-1.34-3-3-3zm4 0v12h4V3h-4z"/></svg>;
const IconReply = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>;
const IconReport = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>;
const IconDelete = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>;
const LogoIcon = () => <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0ZM20 36C11.163 36 4 28.837 4 20C4 11.163 11.163 4 20 4C28.837 4 36 11.163 36 20C36 28.837 28.837 36 20 36ZM16 11H24V24C24 26.209 22.209 28 20 28C17.791 28 16 26.209 16 24V11Z" fill="currentColor"/></svg>;

const WatchPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [courseData, setCourseData] = useState({ modules: [], title: "" });
  const [currentLectureId, setCurrentLectureId] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentFilter, setCommentFilter] = useState('best');
  const [newComment, setNewComment] = useState("");
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [isLoadingCourse, setIsLoadingCourse] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isPostingReply, setIsPostingReply] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      setIsLoadingCourse(true);
      const data = await fetchCourseData();
      setCourseData(data);
      if (data.modules.length > 0 && data.modules[0].lectures.length > 0) {
        setCurrentLectureId(data.modules[0].lectures[0].id);
      }
      setIsLoadingCourse(false);
    };
    loadCourse();
  }, []);

  useEffect(() => {
    const loadComments = async () => {
      if (!currentLectureId) return;
      setIsLoadingComments(true);
      const fetchedComments = await fetchComments(currentLectureId);
      setComments(fetchedComments);
      setIsLoadingComments(false);
    };
    loadComments();
  }, [currentLectureId]);

  const filteredComments = [...comments].sort((a, b) => {
    if (commentFilter === 'newest') return new Date(b.date) - new Date(a.date);
    if (commentFilter === 'oldest') return new Date(a.date) - new Date(b.date);
    return (b.likes - b.dislikes) - (a.likes - a.dislikes);
  });

  const shareCourseDialogHandler = () => {
    alert("Share functionality triggered!");
  };

  const flatLectures = courseData.modules.flatMap(m => m.lectures);
  const currentLectureIndex = flatLectures.findIndex(l => l.id === currentLectureId);
  const currentLecture = flatLectures[currentLectureIndex];
  const courseTitle = courseData.title;

  const handleNext = () => {
    if (currentLectureIndex < flatLectures.length - 1) setCurrentLectureId(flatLectures[currentLectureIndex + 1].id);
  };

  const handlePrev = () => {
    if (currentLectureIndex > 0) setCurrentLectureId(flatLectures[currentLectureIndex - 1].id);
  };

  const handlePostComment = async () => {
    if (newComment.trim() && !isPostingComment) {
      setIsPostingComment(true);
      const newEntryData = {
        author: "You (Student)",
        time: "Just now",
        text: newComment.trim(),
      };
      
      const createdComment = await postComment(currentLectureId, newEntryData);
      setComments([createdComment, ...comments]);
      setNewComment("");
      setIsPostingComment(false);
    }
  };

  const handleLike = async (id) => {
    setComments(comments.map(c => c.id === id ? { ...c, likes: c.userLiked ? c.likes - 1 : c.likes + 1, userLiked: !c.userLiked, userDisliked: false, dislikes: c.userDisliked ? c.dislikes - 1 : c.dislikes } : c));
    await likeComment(currentLectureId, id);
  };

  const handleDislike = async (id) => {
    setComments(comments.map(c => c.id === id ? { ...c, dislikes: c.userDisliked ? c.dislikes - 1 : c.dislikes + 1, userDisliked: !c.userDisliked, userLiked: false, likes: c.userLiked ? c.likes - 1 : c.likes } : c));
    await dislikeComment(currentLectureId, id);
  };

  const handleDeleteComment = async (id) => {
    setComments(comments.filter(c => c.id !== id));
    await deleteComment(currentLectureId, id);
  };

  const handlePostReply = async (commentId) => {
    if (!replyText.trim() || isPostingReply) return;
    setIsPostingReply(true);
    const replyData = { author: 'You (Student)', time: 'Just now', text: replyText.trim() };
    await postReply(currentLectureId, commentId, replyData);
    const updatedComments = await fetchComments(currentLectureId);
    setComments(updatedComments);
    setReplyText('');
    setReplyingTo(null);
    setIsPostingReply(false);
  };

  if (isLoadingCourse) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center font-sans">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
      {/* Top Navbar */}
      <div className="w-full h-16 px-6 bg-[#1c1d1f] flex justify-between items-center shadow-sm relative z-50">
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-indigo-600 to-purple-500 bg-[length:200%_100%] animate-pulse"></div>
        <div className="flex items-center h-full gap-4">
          <div className="cursor-pointer hover:opacity-80 transition-opacity">
            <LogoIcon />
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className={`flex flex-1 ${isTheaterMode ? 'flex-col' : 'flex-row'}`}>
        
        {/* Content Area */}
        <div className={`flex flex-col relative ${isTheaterMode ? 'w-full' : 'flex-1 p-8 pb-16 gap-6'}`}>
          
          {!isTheaterMode && (
            <div className="flex justify-between items-center bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl hidden">
               <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent m-0">{currentLecture?.title}</h2>
               <div className="hidden lg:hidden block">
                 <button className="flex items-center gap-2 border border-green-400/50 text-green-400 font-semibold px-4 py-2 rounded-md hover:bg-green-400/10 transition-colors" onClick={() => setSidebarOpen(!sidebarOpen)}>
                   ☰ Lectures
                 </button>
               </div>
            </div>
          )}

          <div className={`w-full ${isTheaterMode ? 'bg-black flex justify-center items-center h-[calc(100vh-64px)]' : ''}`}>
            <div className={`${isTheaterMode ? 'w-full h-full' : 'w-full max-w-[1280px] mx-auto'}`}>
              <CrisprVideoPlayer 
                src={currentLecture?.videoUrl} 
                videoKey={currentLecture?.id} 
                title={currentLecture?.title}
                courseTitle={courseTitle}
                lectureIndex={currentLectureIndex + 1}
                totalLectures={flatLectures.length}
                onAutoNext={handleNext}
                onTheaterToggle={() => setIsTheaterMode(!isTheaterMode)}
                isTheaterMode={isTheaterMode}
                onShare={shareCourseDialogHandler}
              />
            </div>
          </div>

          <div className={`flex justify-between items-center bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl ${isTheaterMode ? 'hidden' : 'flex'}`}>
            <button 
              className="border border-green-400/50 text-green-400 font-semibold px-6 py-2.5 rounded-lg hover:bg-green-400 hover:text-black hover:shadow-[0_0_15px_rgba(0,255,132,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/30 disabled:hover:bg-transparent"
              onClick={handlePrev} disabled={currentLectureIndex === 0}
            >
              ← Previous
            </button>
            <button 
              className="border border-green-400/50 text-green-400 font-semibold px-6 py-2.5 rounded-lg hover:bg-green-400 hover:text-black hover:shadow-[0_0_15px_rgba(0,255,132,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/30 disabled:hover:bg-transparent"
              onClick={handleNext} disabled={currentLectureIndex === flatLectures.length - 1}
            >
              Next →
            </button>
          </div>

          <div className={`mt-5 ${isTheaterMode ? 'max-w-[1280px] w-full mx-auto p-8' : ''}`}>
            <div className="flex flex-col gap-6 mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 m-0 text-white">{comments.length} Comments</h2>
              <div className="flex gap-3">
                 <button className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${commentFilter === 'best' ? 'bg-gray-200 text-black font-semibold' : 'bg-white/10 border border-transparent text-gray-200 hover:bg-white/20'}`} onClick={() => setCommentFilter('best')}>Best</button>
                 <button className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${commentFilter === 'newest' ? 'bg-gray-200 text-black font-semibold' : 'bg-white/10 border border-transparent text-gray-200 hover:bg-white/20'}`} onClick={() => setCommentFilter('newest')}>Newest</button>
                 <button className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${commentFilter === 'oldest' ? 'bg-gray-200 text-black font-semibold' : 'bg-white/10 border border-transparent text-gray-200 hover:bg-white/20'}`} onClick={() => setCommentFilter('oldest')}>Oldest</button>
              </div>
            </div>

            <div className="flex gap-4 mb-10">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center font-semibold shrink-0">U</div>
              <div className="flex-1 flex flex-col">
                <input 
                  className="bg-transparent border-b border-gray-600 rounded-none text-white py-2 text-sm focus:outline-none focus:border-white transition-colors placeholder-gray-500 w-full"
                  placeholder="Add a comment..."
                  value={newComment} onChange={(e) => setNewComment(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
                />
                {newComment && (
                  <div className="self-end mt-3 flex gap-2">
                     <button className="text-white hover:bg-white/10 px-4 py-2 rounded-full font-semibold text-sm transition-colors" onClick={() => setNewComment("")}>Cancel</button>
                     <button className="bg-blue-500 hover:bg-blue-400 text-black px-4 py-2 rounded-full font-semibold text-sm transition-colors" onClick={handlePostComment}>Comment</button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {filteredComments.map(c => (
                <div key={c.id} className="flex gap-4 animate-[fadeIn_0.4s_ease-out]">
                  <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-black font-bold text-lg shrink-0">{c.author.charAt(0).toUpperCase()}</div>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-[13px] bg-black px-2 py-0.5 rounded-lg">{c.author}</span>
                      <span className="text-gray-400 text-xs">{c.time}</span>
                    </div>
                    <div className="text-gray-200 text-sm leading-relaxed mt-0.5">{c.text}</div>
                    <div className="flex items-center gap-4 mt-2">
                       <button className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full transition-colors ${c.userLiked ? 'text-green-400' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`} onClick={() => handleLike(c.id)}><IconLike /> {c.likes > 0 ? c.likes : ''}</button>
                       <button className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full transition-colors ${c.userDisliked ? 'text-green-400' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`} onClick={() => handleDislike(c.id)}><IconDislike /> {c.dislikes > 0 ? c.dislikes : ''}</button>
                       <button
                         className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:bg-white/10 hover:text-white px-2 py-1 rounded-full transition-colors"
                         onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)}
                       >
                         <IconReply /> Reply
                       </button>   
                       {c.isOwner && (
                         <button className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:bg-red-500/10 px-2 py-1 rounded-full transition-colors" onClick={() => handleDeleteComment(c.id)}>
                           <IconDelete /> Delete
                         </button>
                       )}
                    </div>
                    {replyingTo === c.id && (<div className='flex gap-3 mt-3'><div className='w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-semibold shrink-0'>U</div><div className='flex-1 flex flex-col'><input className='bg-transparent border-b border-gray-600 text-white py-2 text-sm focus:outline-none focus:border-white transition-colors placeholder-gray-500 w-full' placeholder={'Reply to ' + c.author + '...'} value={replyText} onChange={(e) => setReplyText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handlePostReply(c.id)} autoFocus />{replyText && (<div className='self-end mt-2 flex gap-2'><button className='text-white hover:bg-white/10 px-4 py-1.5 rounded-full font-semibold text-xs transition-colors' onClick={() => { setReplyingTo(null); setReplyText(''); }}>Cancel</button><button className='bg-blue-500 hover:bg-blue-400 text-black px-4 py-1.5 rounded-full font-semibold text-xs transition-colors' onClick={() => handlePostReply(c.id)} disabled={isPostingReply}>Reply</button></div>)}</div></div>)}{c.replies && c.replies.length > 0 && (<div className='mt-3 flex flex-col gap-4 pl-4 border-l border-white/10'>{c.replies.map(reply => (<div key={reply.id} className='flex gap-3'><div className='w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-black font-bold text-sm shrink-0'>{reply.author.charAt(0).toUpperCase()}</div><div className='flex flex-col gap-1'><div className='flex items-center gap-2'><span className='font-semibold text-white text-xs bg-black px-2 py-0.5 rounded-lg'>{reply.author}</span><span className='text-gray-400 text-xs'>{reply.time}</span></div><div className='text-gray-200 text-sm leading-relaxed'>{reply.text}</div></div></div>))}</div>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`${isTheaterMode ? `fixed top-16 -right-[350px] w-[350px] h-[calc(100vh-64px)] z-50 bg-black/80 backdrop-blur-xl border-l border-white/5 shadow-2xl transition-all duration-300 ${sidebarOpen ? '!right-0' : ''}` : 'w-[350px] shrink-0 border-l border-white/5 bg-white/[0.02] flex flex-col'}`}>
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-lg font-bold tracking-wide">Course Content</h3>
            {isTheaterMode && (
              <button className="text-2xl text-white hover:text-green-400 transition-colors" onClick={() => setSidebarOpen(false)}>×</button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
            {courseData.modules.map(module => (
              <div key={module.id} className="mb-5">
                <div className="px-6 py-3 text-xs font-bold text-white/40 uppercase tracking-[1.5px]">{module.title}</div>
                {module.lectures.map(lecture => {
                  const isActive = lecture.id === currentLectureId;
                  return (
                    <div 
                      key={lecture.id} 
                      className={`px-6 py-4 cursor-pointer border-b border-white/5 transition-all duration-200 flex flex-col gap-2 ${isActive ? 'bg-gradient-to-r from-green-400/10 to-transparent border-l-[3px] border-l-green-400 pl-5' : 'border-l-[3px] border-l-transparent hover:bg-white/5 hover:pl-7'}`}
                      onClick={() => {
                        setCurrentLectureId(lecture.id);
                        if (isTheaterMode) setSidebarOpen(false);
                      }}
                    >
                      <div className={`text-[15px] leading-snug transition-colors ${isActive ? 'text-green-400 font-semibold' : 'text-gray-200'}`}>{lecture.title}</div>
                      <div className="text-xs text-gray-500 font-mono">{lecture.duration}</div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 5px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
};

export default WatchPage;
