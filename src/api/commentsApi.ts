import { CommentInfo } from "../types/commentInfo";
import { client } from "./client";


export const getComments = async (): Promise<CommentInfo[]> => {
  const response = await client.get<CommentInfo[]>('/');

  return response;
};

// export const getProductById = async (id: string): Promise<ProductInfo> => {
//   const response = await client.get<ProductInfo>(`/products/${id}`);

//   return response;
// };
