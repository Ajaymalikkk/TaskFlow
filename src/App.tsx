import { useEffect, useState } from "react";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  type User,
} from "./services/userService";

function App() {
  // -----------------------------
  // STATES
  // -----------------------------

  const [users, setUsers] = useState<User[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [editId, setEditId] = useState<number | null>(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // -----------------------------
  // GET USERS
  // -----------------------------

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        setError("");

        const data = await getUsers();

        setUsers(data);
      } catch (error) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  // -----------------------------
  // ADD USER
  // -----------------------------

  function handleAddUser() {
    if (name === "" || email === "") {
      alert("Please enter name and email");
      return;
    }

    const newUser: User = {
      id: Date.now(),
      name: name,
      email: email,
    };

    const user = createUser(newUser);

    setUsers([...users, user]);

    setName("");
    setEmail("");

    // Go to last page after adding
    const newTotalPages = Math.ceil(
      (users.length + 1) / itemsPerPage
    );

    setCurrentPage(newTotalPages);
  }

  // -----------------------------
  // START EDIT
  // -----------------------------

  function startEdit(user: User) {
    setEditId(user.id);

    setName(user.name);

    setEmail(user.email);
  }

  // -----------------------------
  // UPDATE USER
  // -----------------------------

  function handleUpdate() {
    if (editId === null) {
      return;
    }

    if (name === "" || email === "") {
      alert("Please enter name and email");
      return;
    }

    const updatedUser: User = {
      id: editId,
      name: name,
      email: email,
    };

    updateUser(updatedUser);

    const updatedUsers = users.map((user) => {
      if (user.id === editId) {
        return updatedUser;
      }

      return user;
    });

    setUsers(updatedUsers);

    setEditId(null);

    setName("");

    setEmail("");
  }

  // -----------------------------
  // DELETE USER
  // -----------------------------

  function handleDelete(id: number) {
    deleteUser(id);

    const updatedUsers = users.filter(
      (user) => user.id !== id
    );

    setUsers(updatedUsers);

    // Calculate pages after deleting
    const newTotalPages = Math.max(
      1,
      Math.ceil(updatedUsers.length / itemsPerPage)
    );

    // If current page is greater than available pages
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
  }

  // -----------------------------
  // SEARCH
  // -----------------------------

  const filteredUsers = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // -----------------------------
  // TOTAL PAGES
  // -----------------------------

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / itemsPerPage)
  );

  // -----------------------------
  // START INDEX
  // -----------------------------

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  // -----------------------------
  // PAGINATED USERS
  // -----------------------------

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // -----------------------------
  // SEARCH PAGE RESET
  // -----------------------------

  function handleSearch(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setSearch(event.target.value);

    // Whenever search changes,
    // go back to first page
    setCurrentPage(1);
  }

  // -----------------------------
  // PREVIOUS PAGE
  // -----------------------------

  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  // -----------------------------
  // NEXT PAGE
  // -----------------------------

  function handleNext() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  // -----------------------------
  // UI
  // -----------------------------

  return (
    <div>
      <h1>User Management</h1>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={handleSearch}
      />

      <hr />

      {/* FORM */}

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
      />

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(event) =>
          setEmail(event.target.value)
        }
      />

      {editId === null ? (
        <button
          type="button"
          onClick={handleAddUser}
        >
          ADD
        </button>
      ) : (
        <button
          type="button"
          onClick={handleUpdate}
        >
          UPDATE
        </button>
      )}

      <hr />

      {/* LOADING */}

      {loading && <p>Loading...</p>}

      {/* ERROR */}

      {error && <p>{error}</p>}

      {/* USERS */}

      {!loading &&
        paginatedUsers.map((user) => (
          <div key={user.id}>
            <h3>{user.name}</h3>

            <p>{user.email}</p>

            <button
              type="button"
              onClick={() => startEdit(user)}
            >
              EDIT
            </button>

            <button
              type="button"
              onClick={() =>
                handleDelete(user.id)
              }
            >
              DELETE
            </button>

            <hr />
          </div>
        ))}

      {/* NO USERS */}

      {!loading &&
        paginatedUsers.length === 0 && (
          <p>No users found.</p>
        )}

      {/* PAGINATION */}

      {!loading && filteredUsers.length > 0 && (
        <div>
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            {" "}
            Page {currentPage} of {totalPages}{" "}
          </span>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default App;