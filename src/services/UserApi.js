// This fakes the server-side data
let users = [
  {
    id: 1,
    name: 'Nico De Witte',
    nickname: 'BioBoost'
  },
  {
    id: 2,
    name: 'Arnold Schwarzenegger',
    nickname: 'The Terminator'
  },
  {
    id: 3,
    name: 'Silvester Stallone',
    nickname: 'Rambo'
  },
  {
    id: 4,
    name: 'Justin Bieber',
    nickname: 'Blijtsmoel :)'
  }
];

export default {
  getUsers() {
    // Using promises just as axios
    return new Promise((resolve) => {
      // Need to create a clone so they are new objects
      resolve(users.map(u => {
        return { ...u }
      }));
    });
  },
  changeNickname(userId, nickname) {
    // Using promises just as axios
    return new Promise((resolve, reject) => {
      let user = users.find(u => u.id === userId);
      if (user) {
        user.nickname = nickname;
        console.log(users);
        resolve({ ...user });   // Clone user
      } else {
        reject('User does not exist')
      }
    });
  },
};
