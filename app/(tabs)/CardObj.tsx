import CardRowObj from "./CardRowObj";

class CardObj {
  id: number;
  cardHeaderValue: string;
  row: CardRowObj[];
  constructor(
    id: number,
    cardHeaderValue: string,
    row: CardRowObj[]
  ) {
    this.id = id;
    this.cardHeaderValue = cardHeaderValue;
    this.row = row;
  }
}
export default CardObj;
