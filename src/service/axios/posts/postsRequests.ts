import { api } from '../config/axios.config';
import { PostResponse } from '../user/userResponses';

const getAllPostsFromUser = async (
  userUuid: string,
): Promise<PostResponse[]> => {
  try {
    const { data, status } = await api().get<PostResponse[]>(
      `/posts/user?userUuid=${userUuid}`,
    );
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
    return [];
  }
};

const PostServieceMethods = {
  getAllPostsFromUser,
};

export default PostServieceMethods;
