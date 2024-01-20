const successRate = 0.52;
async function getAllUsers() {
  await wait(1000);
  try {
    return JSON.parse(localStorage.users);
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
async function getUsers(search = "") {
  const users = await getAllUsers();
  if (Math.random > successRate) {
    return serverError();
  }
  if (!search) {
    search = "";
  }

  const filteresUsers = users.filter((user) => {
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

async function createUser(
  firstname,
  lastname,
  phone,
  province,
  avatarURL,
  description
) {
  const users = await getAllUsers();
  if (Math.random() > successRate) {
    return serverError();
  }
  let id = null;
  if (users.length) {
    id = users[users.length - 1].id + 1;
  } else {
    id = 1;
  }
  const newUser = {
    id,
    firstname,
    lastname,
    phone,
    province,
    avatarURL,
    description,
  };
  users.push(newUser);
  localStorage.users = JSON.stringify(users);

  return {
    success: true,
    body: users,
    message: "New User Added Successfully",
    code: 201,
  };
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
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
