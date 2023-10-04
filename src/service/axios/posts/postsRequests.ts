import { Post } from '@/utils/types/CreatePost';
import { api } from '../config/axios.config';
import { PostResponse } from '../user/userResponses';

const getAllPostsFromUser = async (
  userUuid: string,
  token: string,
) => {
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
    console.log(`erro getAllFromuser: ${error}`);
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

const getPostByUuid = async (postUuid: string, token: string): Promise<PostResponse> => {
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

const deletePostByUuid = async(postUuid: string, token: string) => {
  try {
    const {status} = await api().delete(`/posts?uuid=${postUuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error: any) {
    throw new Error('Erro ao deletar post');
  }
}

const updatePostByUuid = async(postUuid: string, token: string, post: Omit<Post, 'Post'>) => {
  try {
    const {status} = await api().put(`/posts/${postUuid}`, post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return status;
  } catch (error: any) {
    throw new Error('Erro ao atualizar post');
  }
}

const PostServieceMethods = {
  getAllPostsFromUser,
  createPost,
  getAllPosts,
  getPostByUuid,
  deletePostByUuid,
  updatePostByUuid,
};

export default PostServieceMethods;
