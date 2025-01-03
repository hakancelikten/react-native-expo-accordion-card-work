class CardRowObj {
  id: number;
  label: string;
  value: string;
  cardLabelStyle?: any;
  cardValueStyle?: any;
  constructor(
    id: number,
    label: string,
    value: string,
    cardLabelStyle?: any,
    cardValueStyle?: any
  ) {
    this.id = id;
    this.label = label;
    this.value = value;
    this.cardLabelStyle = cardLabelStyle;
    this.cardValueStyle = cardValueStyle;
  }
}
export default CardRowObj;
