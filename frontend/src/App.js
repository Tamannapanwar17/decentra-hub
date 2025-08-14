import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// NOTE: In a real-world application, you would import decentralized libraries like ethers.js,
// gun, and ipfs-http-client here. For this simulation, we will use mock data and state.
// import { ethers } from 'ethers';
// import Gun from 'gun';
// import { create } from 'ipfs-http-client';

const App = () => {
  // Mock data to simulate posts and a user wallet
  const initialPosts = [
    { id: 'post1', author: 'Alice', content: 'Hello from the decentralized world 🌐', upvotes: 3, comments: ['Great post!', 'Awesome!'], isFlagged: false },
    { id: 'post2', author: 'Bob', content: 'IPFS is amazing for storing data! 🚀', upvotes: 5, comments: ['Totally agree!', 'So fast!'], isFlagged: false },
    { id: 'post3', author: 'Charlie', content: 'Just tipped a creator with crypto! 💸', upvotes: 2, comments: ['Nice!', 'How did you do that?'], isFlagged: false },
  ];

  // State to manage the application's data and UI
  const [walletAddress, setWalletAddress] = useState(null);
  const [posts, setPosts] = useState(initialPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const [newCommentContent, setNewCommentContent] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  const [showFiltered, setShowFiltered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Simulates connecting to a wallet like MetaMask
  const connectWallet = async () => {
    // In a real app, you would use:
    // try {
    //   const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    //   setWalletAddress(accounts[0]);
    // } catch (error) {
    //   console.error("User denied account access or no wallet found", error);
    // }

    // For this simulation, we use a mock address
    setWalletAddress('0x4A6b9...3fE8d');
    showMessageModal('Wallet connected! This is a simulated connection.');
  };

  // Simulates posting to IPFS
  const postToIPFS = () => {
    if (!newPostContent) {
      showMessageModal('Post content cannot be empty!');
      return;
    }

    // For this simulation, we just add the post to our state
    const newPost = {
      id: `post${posts.length + 1}`,
      author: 'You',
      content: newPostContent,
      upvotes: 0,
      comments: [],
      isFlagged: false,
    };
    setPosts([newPost, ...posts]);
    setNewPostContent('');
    showMessageModal('Post published to the decentralized web!');
  };

  // Handles upvoting a post
  const handleUpvote = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
    ));
  };

  // Handles adding a new comment
  const handleComment = (postId) => {
    if (!newCommentContent[postId]) {
      showMessageModal('Comment cannot be empty!');
      return;
    }
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, comments: [...post.comments, newCommentContent[postId]] } : post
    ));
    setNewCommentContent({ ...newCommentContent, [postId]: '' });
  };

  // Implements the community flagging protocol (a key enhancement for the WHCL round)
  const handleFlagPost = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, isFlagged: !post.isFlagged } : post
    ));
    showMessageModal('Post has been flagged for review by the community.');
  };

  // Function to display the custom modal
  const showMessageModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 3000);
  };

  const filteredPosts = showFiltered ? posts.filter(post => !post.isFlagged) : posts;

  // Render the application UI
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen font-sans antialiased p-4 sm:p-8 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        {/* Header and Connect Wallet Section */}
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-400 mb-2">
            DecentraNet <span className="text-xl sm:text-2xl">🚀</span>
          </h1>
          <p className="text-lg text-gray-400 mb-6">
            Your censorship-resistant, community-powered social network.
          </p>
          {!walletAddress ? (
            <button
              onClick={connectWallet}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
            >
              🔗 Connect Wallet
            </button>
          ) : (
            <div className="bg-gray-800 p-4 rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between">
              <span className="text-sm sm:text-base font-semibold text-green-400 mb-2 sm:mb-0">
                Wallet Connected: {walletAddress}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="px-4 py-2 bg-purple-600 text-white text-xs font-semibold rounded-full hover:bg-purple-700 transition-colors"
                >
                  {showProfile ? 'Hide Profile' : 'View Profile'}
                </button>
                <button
                  onClick={() => setWalletAddress(null)}
                  className="px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-full hover:bg-red-700 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            </div>
          )}
        </header>

        {/* User Profile (simulated) */}
        {showProfile && walletAddress && (
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">Your Decentralized Profile</h2>
            <div className="flex items-center space-x-4">
              <img
                src={`https://placehold.co/64x64/2a2a2a/ffffff?text=${walletAddress.slice(2, 4)}`}
                alt="User avatar"
                className="rounded-full border-2 border-purple-400"
              />
              <div>
                <p className="font-semibold text-lg">{walletAddress}</p>
                <p className="text-gray-400 text-sm">
                  This profile data (avatar, bio, etc.) could be stored on IPFS.
                </p>
              </div>
            </div>
            <p className="mt-4 text-gray-300">
              This is a simulated bio. In a real application, you could edit and save your profile to IPFS, making it truly yours.
            </p>
          </div>
        )}

        {/* Post Creation Section */}
        {walletAddress && (
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">What's on your mind?</h2>
            <textarea
              className="w-full h-24 p-4 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              placeholder="Post to IPFS..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
            <button
              onClick={postToIPFS}
              className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              📤 Post to IPFS
            </button>
          </div>
        )}

        {/* Posts Feed and Filtering */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-200">Latest Posts</h2>
          <button
            onClick={() => setShowFiltered(!showFiltered)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
              showFiltered ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {showFiltered ? 'Show All Posts' : 'Hide Flagged Posts'}
          </button>
        </div>
        <div className="space-y-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className={`bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 transition-all duration-300 ${post.isFlagged ? 'opacity-50' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={`https://placehold.co/40x40/2a2a2a/ffffff?text=${post.author.slice(0, 1)}`}
                      alt="Avatar"
                      className="rounded-full border-2 border-gray-600"
                    />
                    <div>
                      <p className="font-semibold text-lg">{post.author}</p>
                      <p className="text-xs text-gray-400">Permanent & Uncensorable</p>
                    </div>
                  </div>
                  {walletAddress && (
                    <button
                      onClick={() => handleFlagPost(post.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      title="Flag Post"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6l-2.7 3.5a2 2 0 000 3.8l2.7 3.5a1 1 0 01-.8 1.6H6a3 3 0 01-3-3V6zm0 0v8a1 1 0 001 1h9.12l-2.43-3.15a3 3 0 010-4.66L13.12 4H4a1 1 0 00-1 1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                <p className="text-gray-200 mb-4">{post.content}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span className="flex items-center">
                    <button onClick={() => handleUpvote(post.id)} className="text-green-400 hover:text-green-300 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm7-4a1 1 0 00-1 1v2a1 1 0 002 0V7a1 1 0 00-1-1zm0 6a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1z" />
                      </svg>
                    </button>
                    {post.upvotes}
                  </span>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.529 12.147 2 11.115 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {post.comments.length}
                  </span>
                </div>
                {/* Comments Section */}
                <div className="mt-4 border-t border-gray-700 pt-4">
                  <h4 className="font-semibold text-gray-300 mb-2">Comments</h4>
                  <ul className="space-y-2">
                    {post.comments.map((comment, index) => (
                      <li key={index} className="bg-gray-700 p-3 rounded-lg text-sm text-gray-200">
                        {comment}
                      </li>
                    ))}
                  </ul>
                  {walletAddress && (
                    <div className="mt-4 flex space-x-2">
                      <input
                        type="text"
                        className="flex-grow p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add a comment..."
                        value={newCommentContent[post.id] || ''}
                        onChange={(e) =>
                          setNewCommentContent({ ...newCommentContent, [post.id]: e.target.value })
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleComment(post.id);
                        }}
                      />
                      <button
                        onClick={() => handleComment(post.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Send
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400">No posts to display. Be the first to post!</div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 mt-10 text-sm">
          <p>
            🌎 Powered by Ethereum • IPFS • GUN.js
          </p>
          <p>
            This is a proof of concept for the DecentraNet application.
          </p>
        </footer>
      </div>

      {/* Custom Modal for messages */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full text-center border-2 border-blue-400">
            <p className="text-lg text-white font-semibold">{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Export the App component as default export
export default App;

// Create root element and render the App
const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
