export interface ITour {
    id: string;
    name: string;
    destination: string;
    country: string;
    dateStart: any;
    dateEnd: any;
    price: number;
    description: string;
    image: string;
    availablePlaces: number;
    totalPlaces: number;
    rating: number;
    totalVotes: number;
    inBasket: number;
}
