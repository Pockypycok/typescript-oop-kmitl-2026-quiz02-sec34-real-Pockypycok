import axios from "axios";

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface User {
  id: number;
  name: string;
  phone: string;
  address: Address | null;
}

export async function getPostalAddress(): Promise<User[]> {
  try {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await axios.get("url");
    const users = response.data;

    if (!users || users.length === 0) {
      return [];
    }

    return users.map((user: any) => ({
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address
        ? {
            street: user.address.street,
            suite: user.address.suite,
            city: user.address.city,
            zipcode: user.address.zipcode,
            geo: user.address.geo
              ? {
                  lat: user.address.geo.lat,
                  lng: user.address.geo.lng,
                }
              : { lat: "", lng: "" },
           }
        : null,
    }));
  } catch (error) {
    return [];
  }
}