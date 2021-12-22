interface ICreateRentalDTO {
  id?: string;
  userId: string;
  carId: string;
  expectedReturnDate: Date;
  total?: number;
  endDate?: Date;
}

export { ICreateRentalDTO };
