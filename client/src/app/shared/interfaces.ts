export interface User {
  email:string
  password:string
}


export interface Socialusers {
  provider: string;
  id: string;
  email: string;
  name: string;
  image: string;
  token?: string;
  idToken?: string;
}

