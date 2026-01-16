import axios from "axios";

interface Geo {
  lat: string | null;
  lng: string | null;
}

interface Address {
  street: string | null;
  suite: string | null;
  city: string | null;
  zipcode: string | null;
  geo: Geo | null;
}

interface User {
  id: number;
  name: string | null;
  phone: string | null;
  address: Address | null;
}

interface Todo {
  userId: number;
  id: number;
  title: string | null;
  completed: boolean | null;
}

interface UserWithTodos extends User {
  todos: Todo[];
}

export async function getTodosByUserId(id: number): Promise<UserWithTodos | string> {
  try {
    const [usersResponse, todosResponse] = await Promise.all([
      axios.get("https://jsonplaceholder.typicode.com/users"),
      axios.get("https://jsonplaceholder.typicode.com/todos"),
    ]);

    const users: User[] = usersResponse.data.map((user: any) => ({
      id: user.id,
      name: user.name ?? null,
      phone: user.phone ?? null,
      address: user.address
        ? {
            street: user.address.street ?? null,
            suite: user.address.suite ?? null,
            city: user.address.city ?? null,
            zipcode: user.address.zipcode ?? null,
            geo: user.address.geo
              ? {
                  lat: user.address.geo.lat ?? null,
                  lng: user.address.geo.lng ?? null,
                }
              : null,
          }
        : null,
    }));

    const todos: Todo[] = todosResponse.data.map((todo: any) => ({
      userId: todo.userId,
      id: todo.id,
      title: todo.title ?? null,
      completed: todo.completed ?? null,
    }));

    const foundUser = users.find(user => user.id === id);

    if (!foundUser) {
      return "Invalid id";
    }

    const userTodos = todos.filter(todo => todo.userId === id);

    return {
      ...foundUser,
      todos: userTodos.length > 0 ? userTodos : [],
    };
  } catch (error) {
    return "Invalid id";
  }
}
