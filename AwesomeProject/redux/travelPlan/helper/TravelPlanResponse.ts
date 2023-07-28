import { UserResponse } from "../../user/helper/userResponse";

export interface TravelPlan {
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

// export interface GetTravelPlan {
//     id: number,
//     authorId: number,
//     name: string,
//     referencePlanId?: number,
//     startDay: string,
//     endDay: string,
//     thumbnail: string,
//     status: string,
//     createdAt: string,
//     updatedAt: string,
//     travelPlanDay: Array<TravelPlanDay>,
//     likes: Array<PlanLikes>,
//     travelPlanChildren: Array<TravelPlanDay>,
//     userNickname: string,
//     userIcon: null,
//     TotalDays: number,
//     planLikes: number
// }

export interface TravelPlanDay {
    id: number
    travelPlan?: TravelPlan
    travelPlanId?: number
    whichDay: number
    createdAt: string,
    updatedAt: string,
    travelPlanDetail: any
}

export interface PlanLikes {
    id: number
    likeUser: UserResponse
    likeUserId: number
    travelPlan: TravelPlan
    travelPlanId: number
    createdAt: string,
    updatedAt: string
}

export interface TravelPlanShare {
    id: number
    travelPlan: TravelPlan
    travelPlanId: number
    shareUser: UserResponse
    shareUserId: number
}

