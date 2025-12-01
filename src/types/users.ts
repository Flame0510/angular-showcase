// Interface that defines the structure of a user
export interface User {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  age: number;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

// Interface for user address
export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

// Interface for geographic coordinates
export interface Geo {
  lat: string;
  lng: string;
}

// Interface for company information
export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
