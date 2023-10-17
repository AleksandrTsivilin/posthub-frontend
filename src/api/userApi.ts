import client from ".";
import { UserAuthAttrs } from "../types/userAuthAttrs";

const authEndPoint = '/auth';


export const register = async (credentials: UserAuthAttrs) => await client.post(`${authEndPoint}/register`, credentials);
// export async function register (credentials: UserAuthAttrs)  {
//     return await client.post(`${authEndPoint}/register`, credentials)
// };
export const login = async (credentials: UserAuthAttrs) => await client.post(`${authEndPoint}/login`, credentials);

// export class AuthService {
//     static 
// }

// export class AuthService {
//     static async register (credentials: UserAuthAttrs)  {
//         return await client.post(`${authEndPoint}/register`, credentials)
//     };
// }

