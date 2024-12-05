import { useState, useEffect } from "react";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const authUser = localStorage.getItem("auth-user");

      if (!authUser) {
        setError("No user found in local storage");
        setLoading(false);
        return;
      }

      try {
        const userId = JSON.parse(authUser)?._id; // Assuming auth-user contains {"id":"userId"}
        if (!userId) throw new Error("Invalid user data in local storage");

        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user details");

        const userData = await response.json();
        setCurrentUser(userData);
        // console.log(userData)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return { currentUser, loading, error };
};

export default useCurrentUser;
