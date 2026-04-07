import React, { useState } from "react";
import css from "./WatchPage.module.css";
import CourseVideoNavbar from "../../components/LayoutComponents/CourseVideoNavbar/CourseVideoNavbar";
import CrisprVideoPlayer from "./CrisprVideoPlayer";

import ShareCourseCard from "../../components/Cards/ShareCourseCard/ShareCourseCard";
import CourseRatingsCard from "../../components/Cards/CourseRatingsCard/CourseRatingsCard";

const IconLike = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 8.39C7.21 8.81 7 9.38 7 10v9c0 1.66 1.34 3 3 3h9c1.23 0 2.24-.74 2.67-1.83l1.83-4.28c.04-.15.06-.31.06-.47v-4z"/></svg>;
const IconDislike = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M15 3H6c-1.23 0-2.24.74-2.67 1.83l-1.83 4.28c-.04.15-.06.31-.06.47v4c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L11.83 23l6.59-7.39c.38-.42.58-.99.58-1.61V5c0-1.66-1.34-3-3-3zm4 0v12h4V3h-4z"/></svg>;
const IconReply = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>;
const IconReport = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>;
const IconDelete = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>;

const DUMMY_MODULES = [
  {
    id: "m1",
    title: "Introduction to CRISPR",
    lectures: [
      { id: "l1", title: "1. What is CRISPR?", duration: "10:24", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "l2", title: "2. History of Gene Editing", duration: "15:10", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ]
  },
  {
    id: "m2",
    title: "Advanced Gene Editing",
    lectures: [
      { id: "l3", title: "3. The Cas9 Protein Explained", duration: "12:45", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "l4", title: "4. Off-target Effects", duration: "18:30", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "l5", title: "5. Future of Medical Genetics", duration: "22:15", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ]
  }
];

const DUMMY_COMMENTS = [
  { id: 1, author: "ariari", time: "3 months ago", date: "2023-08-01T10:00:00Z", text: "fuk yea I can't wait for this", likes: 57, dislikes: 1, replies: [] },
  { id: 2, author: "onepieceispeak", time: "3 months ago", date: "2023-08-15T12:00:00Z", text: "i read this in a power voice because of your profile", likes: 18, dislikes: 0, replies: [] },
  { id: 3, author: "joestarpilled", time: "4 months ago", date: "2023-07-20T10:00:00Z", text: "ohmygof yes", likes: 36, dislikes: 1, replies: [] },
  { id: 4, author: "Chicken de third", time: "3 months ago", date: "2023-09-01T15:00:00Z", text: "SO FLIPPIN EXCITED, SEASON 1 WAS PEAK, SEASON 2 IS GOING TO KILL ME", likes: 19, dislikes: 1, replies: [] },
];

const WatchPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentLectureId, setCurrentLectureId] = useState("l1");
  const [comments, setComments] = useState(DUMMY_COMMENTS);
  const [commentFilter, setCommentFilter] = useState('best');

  const filteredComments = [...comments].sort((a, b) => {
    if (commentFilter === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else if (commentFilter === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    }
    // 'best' - by highest likes minus dislikes
    return (b.likes - b.dislikes) - (a.likes - a.dislikes);
  });
  const [newComment, setNewComment] = useState("");
  const [isTheaterMode, setIsTheaterMode] = useState(false);

  const [showShareCourseDialog, setShowShareCourseDialog] = useState(false);

  const shareCourseDialogHandler = () => {
    setShowShareCourseDialog((p) => !p);
  };

  // Flatten lectures for easy navigation
  const flatLectures = DUMMY_MODULES.flatMap(m => m.lectures);
  const currentLectureIndex = flatLectures.findIndex(l => l.id === currentLectureId);
  const currentLecture = flatLectures[currentLectureIndex];
  const courseTitle = "Genetic Engineering 101";

  const handleNext = () => {
    if (currentLectureIndex < flatLectures.length - 1) {
      setCurrentLectureId(flatLectures[currentLectureIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (currentLectureIndex > 0) {
      setCurrentLectureId(flatLectures[currentLectureIndex - 1].id);
    }
  };

  const handlePostComment = () => {
    if (newComment.trim()) {
      const newEntry = {
        id: Date.now(),
        author: "You (Student)",
        time: "Just now",
        date: new Date().toISOString(),
        text: newComment.trim(),
        likes: 0,
        dislikes: 0,
        replies: [],
        isOwner: true
      };
      setComments([newEntry, ...comments]);
      setNewComment("");
    }
  };

  const handleLike = (id) => {
    setComments(comments.map(c => {
      if (c.id === id) {
        return { 
          ...c, 
          likes: c.userLiked ? c.likes - 1 : c.likes + 1, 
          userLiked: !c.userLiked, 
          userDisliked: false, 
          dislikes: c.userDisliked ? c.dislikes - 1 : c.dislikes 
        };
      }
      return c;
    }));
  };

  const handleDislike = (id) => {
    setComments(comments.map(c => {
      if (c.id === id) {
        return { 
          ...c, 
          dislikes: c.userDisliked ? c.dislikes - 1 : c.dislikes + 1, 
          userDisliked: !c.userDisliked, 
          userLiked: false, 
          likes: c.userLiked ? c.likes - 1 : c.likes 
        };
      }
      return c;
    }));
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter(c => c.id !== id));
  };

  return (
    <>
      <CourseVideoNavbar data={{ title: courseTitle }} />
      <div className={`${css.container} ${isTheaterMode ? css.theaterModeActive : ""}`}>
        
        {/* Main Content Area */}
        <div className={css.mainContent}>
          
          {!isTheaterMode && (
            <div className={css.navigationSection} style={{ padding: '20px', display: 'none' }}>
               <h2 className={css.navTitle}>{currentLecture?.title}</h2>
               <div className={css.hamburgerBtnContainer}>
                 <button className={css.hamburgerBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
                   ☰ Lectures
                 </button>
               </div>
            </div>
          )}

          <div className={`${css.playerWrapper} ${isTheaterMode ? css.theaterPlayer : ""}`}>
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

          <div className={css.navigationSection} style={{ display: isTheaterMode ? 'none' : 'flex' }}>
            <button 
              className={css.navButton} 
              onClick={handlePrev}
              disabled={currentLectureIndex === 0}
              style={{ opacity: currentLectureIndex === 0 ? 0.5 : 1, cursor: currentLectureIndex === 0 ? 'not-allowed' : 'pointer'}}
            >
              ← Previous
            </button>
            <button 
              className={css.navButton} 
              onClick={handleNext}
              disabled={currentLectureIndex === flatLectures.length - 1}
              style={{ opacity: currentLectureIndex === flatLectures.length - 1 ? 0.5 : 1, cursor: currentLectureIndex === flatLectures.length - 1 ? 'not-allowed' : 'pointer'}}
            >
              Next →
            </button>
          </div>

          <div className={css.commentsSection}>
            <div className={css.commentsHeader}>
              <h2>{comments.length} Comments</h2>
              <div className={css.commentFilters}>
                 <button 
                   className={commentFilter === 'best' ? css.filterBtnActive : css.filterBtn}
                   onClick={() => setCommentFilter('best')}
                 >Best</button>
                 <button 
                   className={commentFilter === 'newest' ? css.filterBtnActive : css.filterBtn}
                   onClick={() => setCommentFilter('newest')}
                 >Newest</button>
                 <button 
                   className={commentFilter === 'oldest' ? css.filterBtnActive : css.filterBtn}
                   onClick={() => setCommentFilter('oldest')}
                 >Oldest</button>
              </div>
            </div>

            <div className={css.commentInputArea}>
              <div className={css.avatar}>U</div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <input 
                  className={css.commentInput} 
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
                />
                {newComment && (
                  <div style={{ alignSelf: 'flex-end', marginTop: '8px', gap: '8px', display: 'flex' }}>
                     <button className={css.cancelBtn} onClick={() => setNewComment("")}>Cancel</button>
                     <button className={css.postButton} onClick={handlePostComment}>Comment</button>
                  </div>
                )}
              </div>
            </div>

            <div className={css.commentList}>
              {filteredComments.map(c => (
                <div key={c.id} className={css.commentItem}>
                  <div className={css.avatarSmall}>{c.author.charAt(0).toUpperCase()}</div>
                  <div className={css.commentBody}>
                    <div className={css.commentAuthorLine}>
                      <span className={css.commentAuthor}>{c.author}</span>
                      <span className={css.commentTime}>{c.time}</span>
                    </div>
                    <div className={css.commentText}>{c.text}</div>
                    
                    <div className={css.commentActions}>
                       <button className={`${css.actionBtn} ${c.userLiked ? css.activeAction : ''}`} onClick={() => handleLike(c.id)}><IconLike /> {c.likes > 0 ? c.likes : ''}</button>
                       <button className={`${css.actionBtn} ${c.userDisliked ? css.activeAction : ''}`} onClick={() => handleDislike(c.id)}><IconDislike /> {c.dislikes > 0 ? c.dislikes : ''}</button>
                       <button className={css.actionBtn} onClick={() => alert("Reply functionality coming soon!")}><IconReply /> Reply</button>
                       <button className={css.actionBtn} onClick={() => alert("Comment reported!")}><IconReport /> Report</button>
                       {c.isOwner && (
                         <button className={`${css.actionBtn} ${css.deleteBtn}`} onClick={() => handleDeleteComment(c.id)}>
                           <IconDelete /> Delete
                         </button>
                       )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`${css.sidebar} ${sidebarOpen ? css.open : ""}`}>
          <div className={css.sidebarHeader}>
            <h3>Course Content</h3>
            <button className={css.closeSidebarBtn} onClick={() => setSidebarOpen(false)}>×</button>
          </div>
          <div className={css.lectureList}>
            {DUMMY_MODULES.map(module => (
              <div key={module.id} className={css.moduleSection}>
                <div className={css.moduleTitle}>{module.title}</div>
                {module.lectures.map(lecture => {
                  const isActive = lecture.id === currentLectureId;
                  return (
                    <div 
                      key={lecture.id} 
                      className={`${css.lectureItem} ${isActive ? css.active : ""}`}
                      onClick={() => {
                        setCurrentLectureId(lecture.id);
                        if (window.innerWidth <= 900) setSidebarOpen(false);
                      }}
                    >
                      <div className={css.lectureTitle}>{lecture.title}</div>
                      <div className={css.lectureDuration}>{lecture.duration}</div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

      </div>

      {showShareCourseDialog && (
        <ShareCourseCard
          ttl="Share this course"
          txt=""
          btnTxt="Copy"
          btnClick={shareCourseDialogHandler}
          closeModal={shareCourseDialogHandler}
        />
      )}
    </>
  );
};

export default WatchPage;
