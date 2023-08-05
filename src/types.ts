export interface Duck{
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
    sender:string
    roomId:string
}