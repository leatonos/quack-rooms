export interface Duck{
    duckName:string
    color:string
}

export interface DuckRoom {
    _id:string
    roomId:string
    roomName:string
    ducks?:Duck[]
    limit:number
}

export interface DuckMessage {
    text: string
    sender:string
    roomId:string
}