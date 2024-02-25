export async function getLeaderboard() {
  try {
    const res = await fetch("/api/leaderboard", {
      method: "GET",
    });

    const tmp = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch leaderboard");
    }

    const sortedUsers = tmp.data.sort(
      (a, b) => b.hoursCompleted - a.hoursCompleted
    );
    return sortedUsers;
  } catch (error) {
    console.error("Error rendering leaderboard", error);
  }
}

export async function getJobs() {
  try {
    const res = await fetch("/api/jobs", {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch jobs");
    }
    
    const {data} = await res.json();

    return data;
    
  } catch (error) {
    console.error("Error rendering all jobs", error);
  }
}

export async function applyForJob(applicant, job) {
  try {
    const res = await fetch("/api/jobs/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ applicant, job }),
    });

    if (!res.ok) {
      throw new Error("Failed to apply for job");
    }

    const newJob = await res.json();
    return newJob;
  } catch (error) {
    console.error("Error applying for job", error);
  }
}

export async function getAppliedJobs(id) {
  try {
    const res = await fetch("/api/jobs/applied", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch applied jobs");
    }

    const appliedJobs = await res.json();
    return appliedJobs;
  } catch (error) {
    console.error("Error fetching applied jobs", error);
  }
}

export async function getPostedJobs(id) {
  try {
    const res = await fetch("/api/jobs/posted", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posted jobs");
    }

    const postedJobs = await res.json();

    return postedJobs;
  } catch (error) {
    console.error("Error fetching posted jobs", error);
  }
}

export async function deleteApplication(id) {
  try {
    const res = await fetch("/api/application/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      throw new Error("Failed to create job");
    }

    const deleted = await res.json();
    return deleted;
  } catch (error) {
    console.error("Error creating job", error);
  }
}

export async function acceptApplication(id) {
  try {
    const res = await fetch("/api/application/accept", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      throw new Error("Failed to create job");
    }

    const accepted = await res.json();
    return accepted;
  } catch (error) {
    console.error("Error creating job", error);
  }
}

export async function confirmApplication(id) {
  try {
    const res = await fetch("/api/application/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      throw new Error("Failed to create job");
    }
  }

export async function getUsers() {
    try {
      const res = await fetch('/api/users', {
        method: 'GET'
      })

      if (!res.ok) {
        throw new Error("Failed to fetch users")
      }

      return res.data;
    } catch (error) {
      console.log("Error fetching users")
    }
}

export async function getJob(id) {
  try {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'GET'
    })

    if (!res.ok) {
      throw new Error("Failed to fetch job")
    }

    const {data} = await res.json()

    return data;
  } catch (error) {
    console.log("Error fetching job")
  }
}

