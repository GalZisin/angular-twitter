export interface IUser {
    member?: {
        memberId?: string;
        username?: string;
        email?: string;
        password?: string;
        registrationDate?: string;
        lastLoginDate?: string;
        // avatar?: {
        //     url: string
        // }
        imagePath?: string;
    }
}

export interface ITweet {
    tweets?: ITweet[];
    _id?: string;
    text?: string;
    postDate?: Date;
    memberId?: {
        _id: string;
        username: string;
    }
    stars?: Array<string>;
}

export interface IAuth {
    name?: string;
    email?: string;
    password?: string;
    image?: any;
}

export interface IResponseTweets {
    tweets?: ITweet[];
    tweet?: ITweet | undefined;
    message?: string | undefined;
}

export interface ICreateNewTweet {
    newTweet: {
        tweetText: string;
    }
}