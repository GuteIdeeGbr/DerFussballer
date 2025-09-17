export type Team = {
  id: string
  name: string
  filterName: string
  foundingDate: string // ISO date
  crestDataUrl: string // data:image/png;base64,...
}

export type DatabaseV1 = {
  version: 1
  name: string
  createdAt: string
  updatedAt: string
  teams: Team[]
}

export type AnyDatabase = DatabaseV1