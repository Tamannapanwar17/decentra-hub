const loginUser = async () => {
  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "Tamanna", password: "1234" })
    });

    if (!res.ok) {
      throw new Error(`Login failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Login token:", data.token);

    if (data.token) {
      localStorage.setItem("authToken", data.token);
    } else {
      console.error("No token returned from server");
    }

  } catch (err) {
    console.error("Error logging in:", err);
  }
};

export default loginUser;
