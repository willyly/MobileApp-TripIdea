import { PlanLikes, TravelPlan, TravelPlanDay, TravelPlanShare } from "../../travelPlan/helper/TravelPlanResponse"

//set interface 主要可以比我拆 column 用
export interface UserResponse {
    id: number
    email: string
    password?: string
    nickname: string
    gender?: string
    phone?: string
    icon?: string
    selfIntroduction?: string
    role: string
    createdAt: string
    updatedAt: string
    followers: UserResponse[]
    followings: UserResponse[]
    createPlans: UserPlanResponse[]
    likePlans: any[]
}

export interface UserPlanResponse {
    id: number,
    authorId: number,
    name: string,
    referencePlanId?: number,
    startDay: string,
    endDay: string,
    thumbnail: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    travelPlanDay: Array<TravelPlanDay>,
    likes: Array<PlanLikes>,
    travelPlanChildren: Array<TravelPlan>,
    TravelPlanShare: Array<TravelPlanShare>,
    author: UserResponse
}

export interface UserFollowResponse {
    id: number
    followerId: number
    follower: UserResponse
    followingId: number
    following: UserResponse
    createdAt: string
    updatedAt: string
}

