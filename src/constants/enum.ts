export namespace GROUPS {
  export enum MODE {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
    HIDDEN = 'HIDDEN',
  }
  export enum TYPE {
    COMMUNICATE = 'COMMUNICATE',
    USER = 'USER',
  }
}

export namespace REACTION {
  export enum TYPE {
    LIKE = 'LIKE',
    HEART = 'HEART',
    LAUGH = 'LAUGH',
    CRY = 'CRY',
    WOW = 'WOW',
    ANGRY = 'ANGRY',
  }
}

export namespace POSTS {
  export enum TYPE {
    STORY = 'STORY',
    REEL = 'REEL',
    POST = 'POST',
  }
  export enum MODE {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
    FRIEND = 'FRIEND',
  }
  export enum QUERYTYPE {
    USER = 'USER',
    COMMUNITY = 'COMMUNITY',
    GROUP = 'GROUP',
  }
}

export namespace RELATIONSHIPS {
  export enum STATUS {
    REQUESTING = 'REQUESTING',
    ACCEPTED = 'ACCEPTED',
    REJECT = 'REJECT',
  }
}

export namespace MEMBERS {
  export enum TYPE {
    GROUP = 'GROUP',
    USER = 'USER',
  }
  export enum STATUS {
    REQUESTING = 'REQUESTING',
    INVITING = 'INVITING',
    ACTIVE = 'ACTIVE',
    BANNED = 'BANNED',
  }
  export enum ROLE {
    ADMIN = 'ADMIN',
    MEMBER = 'MEMBER',
    MODS = 'MODS',
  }
}

export namespace ALBUMS {
  export enum MODE {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
    FRIEND = 'FRIEND',
    HIDDEN = 'HIDDEN',
  }
}
