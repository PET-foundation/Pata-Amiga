export interface ShelterResponse {
  id: number
  uuid: string
  name: string
  description: string
  location: string
  adoptionPolice: string
  profilePicture: string
  banner: string
  contact: Contact
  pixKey: string
  createdAt: string
  updatedAt: string
}

interface Contact {
  phone: string
  whatsapp: string
  instagram: string
  facebook: string
}

export interface ShelterCreateRequest {
  name: string
  description: string
  location: string
  profilePicture: string
  banner: string
  contact: Contact
  pixKey: string
  adoptionPolice: string
  owners: string[]
}


