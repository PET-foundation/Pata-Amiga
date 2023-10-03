import { Post } from '@/utils/types/CreatePost';
import { api } from '../config/axios.config';
import { PostResponse } from '../user/userResponses';

const getAllPostsFromUser = async (
  userUuid: string,
  token: string,
): Promise<PostResponse[]> => {
  try {
    const { data, status } = await api().get(
      `/posts/user?userUuid=${userUuid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    console.log(`erro: ${error}`);
    return [];
  }
};

const createPost = async (post: Post, token: string): Promise<boolean> => {
  try {
    const {status} = await api().post('/posts', post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(status === 201) {
      return true
    }
  } catch (error: any) {
    throw new Error('Erro ao criar post');
  }
}

const PostServieceMethods = {
  getAllPostsFromUser,
  createPost
};

export default PostServieceMethods;
