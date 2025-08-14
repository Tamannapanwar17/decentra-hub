const createPost = async (content) => {
  try {
    const token = localStorage.getItem('authToken'); // Get saved token

    const res = await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Send token
      },
      body: JSON.stringify({ content })
    });

    const data = await res.json();
    console.log("Post response:", data);

  } catch (err) {
    console.error("Error creating post:", err);
  }
};

export default createPost;
