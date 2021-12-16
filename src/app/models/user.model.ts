export interface User {
  id: number;
  name: string;
  lastName: string;
  prefix: string;
  title: string;
  imageUrl: string;
}

export type FullUserForRoute = Partial<FullUser>;

export interface FullUser {
  id: number;
  name: string;
  lastName: string;
  prefix: string;
  title: string;
  imageUrl: string;
  jobDescriptor: string;
  jobArea: string;
  jobType: string;
  email: string;
  ip: string;
  company: Company;
  address: Address;
}

export interface Company {
  name: string;
  suffix: string;
}

export interface Address {
  zipCode: string;
  city: string;
  streetAddress: string;
  country: string;
  state: string;
}
