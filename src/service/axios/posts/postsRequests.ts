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

const getAllPosts = async (): Promise<PostResponse[]> => {
  try {
    const {data} = await api().get<PostResponse[]>('/posts')

    return data;
  } catch (error: any) {
    throw new Error('Erro ao buscar posts');
  }
}

const getPostByUuid = async (postUuid: string, token): Promise<PostResponse> => {
  try {
    const {data} = await api().get<PostResponse>(`/posts/${postUuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error: any) {
    throw new Error('Erro ao buscar post');
  }
}

const PostServieceMethods = {
  getAllPostsFromUser,
  createPost,
  getAllPosts,
  getPostByUuid
};

export default PostServieceMethods;
