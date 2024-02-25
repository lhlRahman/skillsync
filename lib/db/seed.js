const { insert } = require('./insert-user-query.jsx')

const users = [
    {
      id: 1,
      username: 'employer1',
      type: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      hoursCompleted: Math.floor(Math.random() * 11),
      postedJobs: [],
      appliedJobs: []
    },
    {
      id: 2,
      username: 'volunteer1',
      type: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      hoursCompleted: Math.floor(Math.random() * 11),
      postedJobs: [],
      appliedJobs: []
    },
    {
      id: 3,
      username: 'employer2',
      type: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      hoursCompleted: Math.floor(Math.random() * 11),
      postedJobs: [],
      appliedJobs: []
    },
    {
      id: 4,
      username: 'volunteer2',
      type: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      hoursCompleted: Math.floor(Math.random() * 11),
      postedJobs: [],
      appliedJobs: []
    },
    // Add more users as needed
  ];


for (user of users) {
    insert(user)
}