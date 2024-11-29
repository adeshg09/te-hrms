import { User } from "@prisma/client";

export interface ThemeOption {
    label: string;
    value: string;
    icon: string;
}

export type JWTPayload ={
    user: User,
    isRemembered:boolean
}
export type resetJWTPayload ={
    emailId: string,
    action: string
}

