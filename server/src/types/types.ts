
export default interface IMember extends Document {
    _id?: string;
    email?: string;
    password?: string;
    username?: string;
    // avatar?: {
    //     public_id?: string,
    //     url?: string
    // },
    imagePath: string;
    role?: string;
    registrationDate?: Date,
    lastLoginDate: Date,
    tweets?: ITweet[],
    getJwtToken(): string;
    comparePassword(enteredPassword: string): Promise<boolean>;
}

export interface ITweet extends Document {
    memberId?: string;
    postDate?: Date;
    text?: string;
    stars?: Array<string>;
    tweets?: ITweet[];
    // save(validateBeforeSave: any): ITweet;
}

export default interface Token {
    member: {
        id: string;
    }
}