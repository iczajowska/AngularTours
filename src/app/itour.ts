export interface ITour {
    id: number,
    name: string,
    destination: string,
    country:string,
    dateStart: Date,
    dateEnd: Date,
    price: number,
    description:string,
    image: string,
    availablePlaces: number,
    totalPlaces: number,
    rating: number,
    totalVotes: number
}
