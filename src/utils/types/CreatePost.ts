export interface Post {
  name: string
  description: string
  picture: string
  location: string
  info: Info
  userUuid?: string
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
