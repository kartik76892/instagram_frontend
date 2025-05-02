import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [followers, setFollowers] = useState(null);
  const [error, setError] = useState(null);

  const fetchFollowers = async () => {
    try {
      const response = await fetch('https://instagram-backend-9d0t.onrender.com/api/followers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      setFollowers(data.followers);
      setError(null);
    } catch (err) {
      setError('Server not reachable');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Instagram Follower Checker</h2>
      <input
        type="text"
        placeholder="Instagram username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchFollowers}>Check</button>
      {followers !== null && <p>Followers: {followers}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
