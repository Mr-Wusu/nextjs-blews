const users = [
  {
    email: " user1.email@yahoo.com",
    password: "user1.password"
  },
  {
    email: "user2.email@yahoo.com",
    password: "user2.password"
  },
  {
    email: "user3.email@yahoo.com",
    password: "user3.password"
  }  
]

export const checkUser = (email: string) => {
  return users.find(user => user.email === email);
} 

console.log(checkUser("user3.email@yaoo.com"));
