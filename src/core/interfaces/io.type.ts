export type InputData = {
  renewalBonusValue?: number;
  avgBalance?: number;
  incomeLastedForThreePaydays?: number;
  employedMonthlyIncome?: number;
  numOfMicroloans?: number;
  monthlyLoansAmount?: number;
  newLoansWithin30Days?: number;
  numOfNSFWithin30Days?: number;
  numOfNSFWithin60Days?: number;
  numOfNSFWithin90Days?: number;
  numOfPaymentOppositionWithin30Days?: number;
  numOfPaymentOppositionWithin60Days?: number;
  numOfPaymentOppositionWithin90Days?: number;
  overDraft?: number;
  gambling?: number;
  marijuana?: number;
  bankAccountTimeline?: number;
  addressMatch?: number;
  bankruptcy?: number;
  incomeSource?: number;
  employed?: number;
};

export type OutoutData = {
  score?: number;
  probabilityOfPayback?: number;
};