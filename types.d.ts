export interface Video {
    caption: string;
    comments: {
        _key: string;
        comment: string;
        postedBy: {
            _id: string;
            image: string;
            userName: string;
        };
    }[];
    likes: {
        _key: string;
        _ref: string;
        _type: string;
    }[];
    postedBy: {
        _id: string;
        image: string;
        userName: string
    };
    userId: string,
    video: {
        asset: {
            url: string;
            _id: string;
        }
    };
    _id: string
}


export interface UserProfile {
    userProfile: {
        _id: string;
        _type: string;
        userName: string;
        image: string;
    } | null;
    addUser: ()=>void;
    removeUser:()=>void;
}

export interface User {
    image:string;
    userName:string;
    _createdAt:string;
    _id:string,
    _rev:string
    _type:string;
    _updatedAt:string;
}