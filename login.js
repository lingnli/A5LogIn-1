const users = [
  {
    firstName: "Tony",
    email: "tony@stark.com",
    password: "iamironman"
  },
  {
    firstName: "Steve",
    email: "captain@hotmail.com",
    password: "icandothisallday"
  },
  {
    firstName: "Peter",
    email: "peter@parker.com",
    password: "enajyram"
  },
  {
    firstName: "Natasha",
    email: "natasha@gamil.com",
    password: "*parol#@$!"
  },
  {
    firstName: "Nick",
    email: "nick@shield.com",
    password: "password"
  }
];
function login(email, password) {
  console.log(email, password);

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      console.log("1st");
      if (users[i].password === password) {
        return users[i].firstName;
      }
    }
  }
  return "error";
}

module.exports = login;
