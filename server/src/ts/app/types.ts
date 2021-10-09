export type PlexResponse = {
  MediaContainer?: {
    Metadata?: [{
        Player: {
          remotePublicAddress: string
        },
        Session: {
          location: string
        }
    }]
  }
}
