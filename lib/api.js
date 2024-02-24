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