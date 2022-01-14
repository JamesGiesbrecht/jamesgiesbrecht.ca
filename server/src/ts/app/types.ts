export type PlexResponse = {
  MediaContainer?: {
    Metadata?: [
      {
        Player: {
          remotePublicAddress: string
        }
        Session: {
          location: string
        }
      },
    ]
  }
}

type Hospital = {
  url: string
  friendlyName: string
}

export type WinnipegHospitals = {
  grace: Hospital
  hsc: Hospital
  childrens: Hospital
  'st-boniface': Hospital
  concordia: Hospital
  'seven-oaks': Hospital
  victoria: Hospital
}

export type WaitTime = {
  waiting: string
  treating: string
  // eslint-disable-next-line camelcase
  wait_time: string
}
