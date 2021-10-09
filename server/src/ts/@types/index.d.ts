declare namespace Express {
  export interface Request {
    endUserIp?: string
    user: {
      uid: string
      username?: string
    }
  }
}