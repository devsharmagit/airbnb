export const sortArr = ["nearest", "far", "cheapest", "expensive", "popular"];

export enum PriceRangeEnum {
  BUDGET = "budget",
  MID = "mid",
  LUXURY = "luxury"
}

interface PriceRangeDataType{
  text: string,
  range: string,
  key: PriceRangeEnum
}

export const priceRangeData : PriceRangeDataType[] = [{
  text: "Budget friendly",
  range: "$0 - $500",
  key: PriceRangeEnum.BUDGET
},{
  text: "Mid-range",
  range: "$500 - $1000",
  key: PriceRangeEnum.MID
},{
  text: "Luxury",
  range: "$1000+",
  key: PriceRangeEnum.LUXURY
}]
