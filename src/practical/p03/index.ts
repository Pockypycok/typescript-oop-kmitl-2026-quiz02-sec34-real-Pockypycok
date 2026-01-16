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

export async function filterUserById(id: number): Promise<User | string | []> {
    try {
    const url = "https://jsonplaceholder.typicode.com/users"; 
    const response = await axios.get("url")
    const users: User[] = response.data.map((user: any) => ({
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

    if (!users || users.length === 0) {
      return [];
    }

    const foundUser = users.find(user => user.id === id);

    if (!foundUser) {
      return "Invalid id";
    }

    return foundUser;
  } catch (error) { 
    return [];
  }
}
