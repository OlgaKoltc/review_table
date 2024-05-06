export interface IReview {
  id: number;
  reviewText: string;
  reviewType: number;
  userId?: number;
  firstName?: string;
  lastName?: string;
}
export interface IData1Item {
  id: number;
  reviewText: string;
  reviewType: number;
  userId?: number;
  firstName?: string;
  lastName?: string;
}
export interface IData2Item {
  userId: number;
  firstName: string;
  lastName: string;
}
