export interface UserDetails{
    email: string,
    firstName: string,
    lastName: string
}

export interface FileDetails{
    key: string,
    downloadLink: string,
    deleteLink: string,
    fileType: string,
    size: number,
    userId: number
}