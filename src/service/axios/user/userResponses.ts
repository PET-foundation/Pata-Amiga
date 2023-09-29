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
