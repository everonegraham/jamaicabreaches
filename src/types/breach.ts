export interface Breach {
  target: string
  year: number
  type: string
  source: { [key: string]: string | undefined }
} 