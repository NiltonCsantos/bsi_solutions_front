export interface PageResponse<T> {
  response: {
    currentPage: number
    size: number
    totalElements: number
    totalPages: number
    content: T[]
  }
}

export interface ResponseDto<T> {
  response: T,
  status: number
}
