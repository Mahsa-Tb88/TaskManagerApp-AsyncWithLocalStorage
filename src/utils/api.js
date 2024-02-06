const successRate = 0.92;
async function getAllUsers() {
  await wait(1000);
  try {
    return JSON.parse(localStorage.users);
  } catch (e) {
    return [];
  }
}

async function getAllBranches() {
  await wait(1000);
  try {
    return JSON.parse(localStorage.branches);
  } catch (e) {
    return [];
  }
}

function serverError() {
  return {
    success: false,
    body: null,
    message: "Error in server",
    code: 500,
  };
}
async function getBranches(search = "") {
  const branches = await getAllBranches();
  if (Math.random > successRate) {
    return serverError();
  }
  if (!search) {
    search = "";
  }

  const filteresUsers = branches.filter((b) => {
    return b.branch.toLowerCase().includes(search.toLocaleLowerCase());
  });
  return {
    success: true,
    body: filteresUsers,
    message: "Done Successfully",
    code: 200,
  };
}

async function getUsers(search = "", branch) {
  const users = await getAllUsers();
  if (Math.random > successRate) {
    return serverError();
  }
  if (!search) {
    search = "";
  }
  let filteresUsers = users.filter((user) => user.branch == branch);

  filteresUsers = users.filter((user) => {
    return (user.firstname + " " + user.lastname)
      .toLowerCase()
      .includes(search.toLocaleLowerCase());
  });
  return {
    success: true,
    body: filteresUsers,
    message: "Done Successfully",
    code: 200,
  };
}

async function getUserById(id) {
  const users = await getAllUsers();
  if (Math.random() > successRate) {
    return serverError();
  }
  const user = users.find((user) => user.id == parseInt(id));
  if (user) {
    return {
      success: true,
      body: user,
      message: "read Successfully",
      code: 200,
    };
  } else {
    return {
      success: false,
      body: null,
      message: "There is not user with this id",
      code: 404,
    };
  }
}

async function createUser(user) {
  const users = await getAllUsers();
  if (Math.random() > successRate) {
    return serverError();
  }
  if (users.length) {
    user.id = users[users.length - 1].id + 1;
  } else {
    user.id = 1;
  }
  users.push(user);
  localStorage.users = JSON.stringify(users);

  return {
    success: true,
    body: user,
    message: "New User Added Successfully",
    code: 201,
  };
}

async function createBranch(branch) {
  if (Math.random() > successRate) {
    return serverError();
  }

  const branches = await getAllBranches();
  if (!branches.find((b) => b.id == branch.id)) {
    branches.push(branch);
    localStorage.branches = JSON.stringify(branches);
    return {
      success: true,
      body: branches,
      message: "New branch Added Successfully",
      code: 201,
    };
  } else {
    return {
      success: false,
      body: null,
      message: "This branch has already had",
      code: 404,
    };
  }
}

async function updateUser(user) {
  const users = await getAllUsers();
  if (Math.random() > successRate) {
    return serverError();
  }
  const newUsers = users.map((u) => {
    if (u.id == parseInt(user.id)) {
      return user;
    } else {
      return u;
    }
  });
  localStorage.users = JSON.stringify(newUsers);
  return {
    success: true,
    body: newUsers,
    message: "Updated Successfully",
    code: 200,
  };
}

async function deleteUser(id) {
  const users = await getAllUsers();
  if (Math.random() > successRate) {
    return serverError();
  }

  const newUsers = users.filter((user) => user.id !== parseInt(id));
  localStorage.users = JSON.stringify(newUsers);
  if (users.length > newUsers.length) {
    return {
      success: true,
      body: newUsers,
      message: "Deleted Successfully",
      code: 200,
    };
  } else {
    return {
      success: false,
      body: null,
      message: "There is not user with this id",
      code: 404,
    };
  }
}

export {
  getAllUsers,
  getAllBranches,
  getBranches,
  getUsers,
  getUserById,
  createUser,
  createBranch,
  updateUser,
  deleteUser,
};
//we can do it with jason server (REST API)
