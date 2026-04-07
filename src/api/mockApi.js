export const DUMMY_MODULES = [
  {
    id: "m1", title: "Introduction to CRISPR",
    lectures: [
      { id: "l1", title: "1. What is CRISPR?", duration: "10:24", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "l2", title: "2. History of Gene Editing", duration: "15:10", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ]
  },
  {
    id: "m2", title: "Advanced Gene Editing",
    lectures: [
      { id: "l3", title: "3. The Cas9 Protein Explained", duration: "12:45", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "l4", title: "4. Off-target Effects", duration: "18:30", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "l5", title: "5. Future of Medical Genetics", duration: "22:15", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ]
  }
];

export const DUMMY_COMMENTS = {
  "l1": [
    { id: 1, author: "ariari", time: "3 months ago", date: "2023-08-01T10:00:00Z", text: "fuk yea I can't wait for this", likes: 57, dislikes: 1, replies: [] },
    { id: 2, author: "onepieceispeak", time: "3 months ago", date: "2023-08-15T12:00:00Z", text: "i read this in a power voice because of your profile", likes: 18, dislikes: 0, replies: [] },
  ],
  "l2": [
    { id: 3, author: "joestarpilled", time: "4 months ago", date: "2023-07-20T10:00:00Z", text: "ohmygof yes", likes: 36, dislikes: 1, replies: [] },
    { id: 4, author: "Chicken de third", time: "3 months ago", date: "2023-09-01T15:00:00Z", text: "SO FLIPPIN EXCITED, SEASON 1 WAS PEAK, SEASON 2 IS GOING TO KILL ME", likes: 19, dislikes: 1, replies: [] },
  ]
};

const COURSE_TITLE = "Genetic Engineering 101";

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchCourseData = async () => {
  await delay(600);
  return {
    title: COURSE_TITLE,
    modules: DUMMY_MODULES
  };
};

export const fetchComments = async (lectureId) => {
  await delay(400);
  return DUMMY_COMMENTS[lectureId] || [];
};

export const postComment = async (lectureId, commentData) => {
  await delay(500);
  const newComment = {
    ...commentData,
    id: Date.now(),
    date: new Date().toISOString(),
    likes: 0,
    dislikes: 0,
    replies: [],
    isOwner: true
  };
  
  if (!DUMMY_COMMENTS[lectureId]) {
    DUMMY_COMMENTS[lectureId] = [];
  }
  
  DUMMY_COMMENTS[lectureId] = [newComment, ...DUMMY_COMMENTS[lectureId]];
  return newComment;
};

export const likeComment = async (lectureId, commentId) => {
  await delay(200);
  // In a real app this would update the backend
  return { success: true };
};

export const dislikeComment = async (lectureId, commentId) => {
  await delay(200);
  // In a real app this would update the backend
  return { success: true };
};

export const deleteComment = async (lectureId, commentId) => {
  await delay(400);
  if (DUMMY_COMMENTS[lectureId]) {
    DUMMY_COMMENTS[lectureId] = DUMMY_COMMENTS[lectureId].filter(c => c.id !== commentId);
  }
  return { success: true };
};