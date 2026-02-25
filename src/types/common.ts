export type RoleUser = 'superadmin' | 'customer'
export type ProductStock = 'ready' | 'preoder'
export type StatusOrder = 'pending' | 'success' | 'failed'


export interface BrandProps {
    id : number,
    name : string
}

export interface CategoryProps {
    id : number,
    name : string
}

export interface LocationProps {
    id : number,
    name : string
}
