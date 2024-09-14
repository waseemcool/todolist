export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setUserToLocalStorage = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const setUsersToLocalStorage = (usersData) => {
  localStorage.setItem("users", JSON.stringify(usersData));
};
