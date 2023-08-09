export interface Duck{
    duckId:string
    duckName:string
    color:string
}

export interface DuckRoom {
    roomId:string
    roomName:string
    ducks?:Duck[]
    limit:number
}

export interface DuckMessage {
    text: string
    roomId:string
    duckName:string
    color:string
}