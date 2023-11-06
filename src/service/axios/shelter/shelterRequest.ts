import { api } from "../config/axios.config"
import { ShelterResponse } from "../user/userResponses"
import { ShelterCreateRequest } from "./shelterResponse"

const getAllSheltersByUser = async (userUuid: string, token: string): Promise<ShelterResponse[]> => {
  try {
    console.log("Before call")
    const { data, status } = await api().get(`/shelter/user/${userUuid}`, {
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

const shelterServiceMethods = {
  getAllSheltersByUser,
  getAllShelters,
  createShelter
}

export default shelterServiceMethods