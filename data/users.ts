const users = [
  {
    name: "User One",
    email: "user1.email@yahoo.com",
    password: "user1.password",
  },
  {
    name: "User Two",
    email: "user2.email@yahoo.com",
    password: "user2.password",
  },
  {
    name: "User Three",
    email: "user3.email@yahoo.com",
    password: "user3.password",
  },
];

export const checkUser = (email: string) => {
  const userExists = users.find((user) => user.email === email.trim());
  return userExists;
};
