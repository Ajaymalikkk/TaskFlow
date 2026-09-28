export type User = {
  id: number;
  name: string;
  email: string;
};

const API_URL = import.meta.env.VITE_API_URL;
const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY;

console.log("API_URL =", API_URL);
console.log("STORAGE_KEY =", STORAGE_KEY);
// GET
export async function getUsers(): Promise<User[]> {
  const savedUsers = localStorage.getItem(STORAGE_KEY);

  // If users already exist in localStorage,
  // return them instead of calling the API.
  if (savedUsers) {
    return JSON.parse(savedUsers);
  }

  // First time: fetch users from API
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }

  const users: User[] = await response.json();

  // Save API data in localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

  return users;
}

// POST
export function createUser(user: User): User {
  const savedUsers = localStorage.getItem(STORAGE_KEY);

  const users: User[] = savedUsers
    ? JSON.parse(savedUsers)
    : [];

  users.push(user);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(users)
  );

  return user;
}

// PUT
export function updateUser(updatedUser: User): User {
  const savedUsers = localStorage.getItem(STORAGE_KEY);

  const users: User[] = savedUsers
    ? JSON.parse(savedUsers)
    : [];

  const updatedUsers = users.map((user) => {
    if (user.id === updatedUser.id) {
      return updatedUser;
    }

    return user;
  });

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedUsers)
  );

  return updatedUser;
}

// DELETE
export function deleteUser(id: number): void {
  const savedUsers = localStorage.getItem(STORAGE_KEY);

  const users: User[] = savedUsers
    ? JSON.parse(savedUsers)
    : [];

  const updatedUsers = users.filter(
    (user) => user.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedUsers)
  );
}