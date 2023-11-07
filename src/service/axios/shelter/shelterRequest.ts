import { Post } from "@/utils/types/CreatePost"
import { api } from "../config/axios.config"
import { PostResponse, ShelterResponse } from "../user/userResponses"
import { ShelterCreateRequest } from "./shelterResponse"
import _ from "lodash"

const getAllSheltersByUser = async (userUuid: string, token: string): Promise<ShelterResponse[]> => {
  try {
    console.log("Before call")
    const { data, status } = await api().get<ShelterResponse[]>(`/shelter/user/${userUuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(`SHELTERSSSSS in endpoint ${data} with status ${status}`)
    return data
  } catch (error: any) {
    throw new Error('Erro ao buscar abrigos')
  }
}

const getAllShelters = async (token: string): Promise<ShelterResponse[]> => {
  try {
    const { data } = await api().get<ShelterResponse[]>('/shelter', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (error: any) {
    throw new Error('Erro ao buscar abrigos')
  }
}

const getShelterByUuid = async (shelterUuid: string, token: string): Promise<ShelterResponse> => {
  try {
    const { data } = await api().get<ShelterResponse>(`/shelter/${shelterUuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (error: any) {
    throw new Error('Erro ao buscar abrigo')
  }

}

const createShelter = async (shelter: ShelterCreateRequest, token: string): Promise<boolean> => {
  try {
    const { status } = await api().post('/shelter', shelter, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (status === 201) {
      return true
    }
  } catch (error: any) {
    throw new Error('Erro ao criar abrigo')
  }
}

const createPostForShelter = async (shelterUuid: string, token: string, post: Post): Promise<boolean> => {
  try {
    const { status } = await api().post(`/shelter/createPost/${shelterUuid}`, post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (status === 201) {
      return true
    }
  } catch (error: any) {
    throw new Error('Erro ao criar post')
  }
}

const getAllPostsFromShelter = async (shelterUuid: string, token: string): Promise<PostResponse[]> => {
  try {
    const { data } = await api().get<PostResponse[]>(`/shelter/allPosts/${shelterUuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch (error: any) {
    throw new Error('Erro ao buscar posts')
  }

}

const updateShelter = async (
  shelterUuid: string, 
  token: string, shelter: 
  ShelterCreateRequest
): Promise<boolean> => {
  const shelterWithoutOwner = _.omit(shelter, ['owners'])
  try {
    const { status } = await api().put(`/shelter/${shelterUuid}`, shelterWithoutOwner, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (status === 200) {
      return true
    }
  } catch (error: any) {
    throw new Error('Erro ao atualizar abrigo')
  }
}

const shelterServiceMethods = {
  getAllSheltersByUser,
  getAllShelters,
  createShelter,
  getShelterByUuid,
  createPostForShelter,
  getAllPostsFromShelter,
  updateShelter
}

export default shelterServiceMethods