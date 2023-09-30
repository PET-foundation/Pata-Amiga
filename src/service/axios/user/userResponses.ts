export type loginResponse = {
    token: string;
}

export type registerResponse = {
  uuid: string;
}

export interface userResponse {
  id: number
  uuid: string
  name: string
  email: string
  profilePicture: string
  banner: string
  contact: Contact
  createdAt: string
  updatedAt: any
}

interface Contact {
  phone: string
  whatsapp: string
  instagram: string
  facebook: string
}

export interface PostResponse {
  id: number
  uuid: string
  name: string
  description: string
  picture: string
  location: string
  info: Info
  createdAt: string
  updatedAt: string
}

export interface Info {
  specie: string
  race: string
  sex: string
  age: string
  weight: string
  castrated: boolean
  vaccinated: boolean
  ungerminated: boolean
  pedigree: boolean
  specialNeeds: boolean
  port: string
}

export interface PostPreviewPros {
  userName: string
  dataPost: string
  description: string
  userPicture: string
  postPicture: string
  location: string
  postUuid: string
  createdAt: string
}
