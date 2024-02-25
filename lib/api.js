//EXAMPLE
export async function createUser(user) {
  try {
    const res = await fetch('/api/users/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user })
    });

    if (!res.ok) {
      throw new Error("Failed to create user");
    }

    const newUser = await res.json();
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export async function getLeaderboard() {
  try {
    const res = await fetch('/api/leaderboard', {
      method: 'GET'
    });

    if (!res.ok) {
      throw new Error("Failed to fetch leaderboard");
    }

    const sortedUsers = res.data.sort((a, b) => b.hoursCompleted - a.hoursCompleted);
    return sortedUsers;

  } catch (error) {
    console.error("Error rendering leaderboard", error);
  }
}

export async function getJobs() {
  try {
    const res = await fetch('/api/jobs', {
      method: 'GET'
    });

    if (!res.ok) {
      throw new Error("Failed to fetch jobs");
    }

    return res.data;

  } catch (error) {
    console.error("Error rendering all jobs", error);
  }
}