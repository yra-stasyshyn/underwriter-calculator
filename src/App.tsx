import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Container, styled, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useState } from 'react';

import Header from './core/components/Header';
import InputGroup from './core/components/input/InputGroup';
import Select from './core/components/select/Select';
import StyledToggleButtonGroup from './core/components/select/StyledToggleButtonGroup';
import SectionTitle from './core/components/typography/SectionTitle';
import { InputData } from './core/interfaces/io.type';

import "./App.css";
import { NUM_OF_TOTAL_CASES } from './core/constants/base.const';

function App() {
  const [input, setInput] = useState<InputData>({});

  const [balAfterPaydays, setBalAfterPaydays] = useState<Array<number | undefined>>(Array.from({ length: 6 }, (_v) => undefined));
  const [monthlyLoans, setMonthlyLoans] = useState<Array<number | undefined>>(Array.from({ length: 10 }, (_v) => undefined));

  const [buttonLabel, setButtonLabel] = useState("CALCULATE");
  const [isCalculating, setIsCalculating] = useState(false);

  const [score, setScore] = useState<number | undefined>();
  const [renewalBonusValue, setRenewalBonusValue] = useState<number | undefined>();
  const [renewalStringValue, setRenewalStringValue] = useState("");
  const [probabilityOfPayback, setProbabilityOfPayback] = useState<number | undefined>();

  const avgBalanceStringValue = useMemo(() => {
    return input.avgBalance === -6 ? "below zero (negative)"
      : input.avgBalance === 0 ? "<200"
        : input.avgBalance === 4 ? "200-600"
          : input.avgBalance === 8 ? "600-1000"
            : input.avgBalance === 10 ? "1000-1500"
              : input.avgBalance === 12 ? "1500+"
                : "";
  }, [input.avgBalance]);

  const monthlyLoansStringValue = useMemo(() => {
    return input.monthlyLoansAmount === -1 ? "0"
      : input.monthlyLoansAmount === 4 ? "1-500"
        : input.monthlyLoansAmount === -2 ? "500-1000"
          : input.monthlyLoansAmount === -4 ? "1000-1500"
            : input.monthlyLoansAmount === -8 ? "1500-2000"
              : "";
  }, [input.monthlyLoansAmount]);

  useEffect(() => {
    const avg = (balAfterPaydays.reduce((prev, next) => {
      return ((prev || 0) + (next || 0));
    }, 0) || 0) / 6;
    const newAvgBalance = avg < 0 ? -6
      : avg < 200 ? 0
        : avg < 600 ? 4
          : avg < 1000 ? 8
            : avg < 1500 ? 10
              : 12;
    setInput({
      ...input,
      avgBalance: newAvgBalance
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balAfterPaydays]);

  useEffect(() => {
    const total = (monthlyLoans.reduce((prev, next) => {
      return ((prev || 0) + (next || 0));
    }, 0) || 0) * 2;
    const newMonthlyLoansAmount = total === 0 ? -1
      : total < 500 ? 4
        : total < 1000 ? -2
          : total < 1500 ? -4
            : -8;
    setInput({
      ...input,
      monthlyLoansAmount: newMonthlyLoansAmount
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthlyLoans]);

  const handlePaydayChange = (index: number, newVal: number) => {
    const temp = [...balAfterPaydays];
    temp[index] = newVal;
    setBalAfterPaydays(temp);
  }

  const handleMonthlyLoanChange = (index: number, newVal: number) => {
    const temp = [...monthlyLoans];
    temp[index] = newVal;
    setMonthlyLoans(temp);
  }

  const handleCalculate = () => {
    setIsCalculating(true);
    setButtonLabel("Go Loans AI is calculating loan probability");
    const _score =
      (input.avgBalance || 0) +
      (input.incomeLastedForThreePaydays || 0) +
      (input.employedMonthlyIncome || 0) +
      (input.numOfMicroloans === 1 ? -1 : (input.numOfMicroloans || 0)) +
      (input.monthlyLoansAmount || 0) +
      (input.newLoansWithin30Days || 0) +
      (input.numOfNSFWithin30Days || 0) +
      (input.numOfNSFWithin60Days || 0) +
      (input.numOfNSFWithin90Days || 0) +
      (input.numOfPaymentOppositionWithin30Days || 0) +
      (input.numOfPaymentOppositionWithin60Days || 0) +
      (input.numOfPaymentOppositionWithin90Days || 0) +
      (input.overDraft || 0) +
      (input.gambling || 0) +
      (input.marijuana || 0) +
      (input.bankAccountTimeline || 0) +
      (input.addressMatch || 0) +
      (input.bankruptcy || 0) +
      (input.incomeSource || 0) +
      (input.employed || 0);

    const [renewal, renewalLabel] = _score >= 63 ? [14, "4th loan & Beyond"]
      : _score >= 59.5 ? [10.5, "3rd loan"]
        : _score >= 56 ? [7, "2nd loan"]
          : [0, "no - new"];

    const _probabilityOfPayback = +((_score + renewal) / NUM_OF_TOTAL_CASES * 100).toFixed(2);
    setScore(_score);
    setRenewalBonusValue(renewal);
    setRenewalStringValue(renewalLabel);

    setTimeout(() => {
      setProbabilityOfPayback(_probabilityOfPayback);
      setIsCalculating(false);
      setButtonLabel("CALCULATE");
    }, 2000);
  }

  return (
    <Box sx={{ position: "relative" }}>
      <Header />
      <Container maxWidth="lg" sx={{ zIndex: 2, paddingBottom: "32px" }}>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Card sx={{ padding: 4, borderRadius: 0 }}>
              <CardTitle>Application Financial Information - Balance / Savings</CardTitle>
              <CardContent sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <Box>
                  <SectionTitle>{`Renewal: (${typeof renewalBonusValue === "undefined" ? "" : renewalBonusValue})`}</SectionTitle>
                  <TextField
                    hiddenLabel
                    id="renewal"
                    value={renewalStringValue}
                    variant="outlined"
                    size="medium"
                    disabled
                    sx={{ width: "50%" }}
                  />
                </Box>

                {/* Input 1 */}
                <InputGroup
                  label='Balance after payday - most recent date back 3 months.'
                  subject='Payday'
                  values={balAfterPaydays}
                  onChange={handlePaydayChange}
                />

                <Box>
                  <SectionTitle>{`Average balance (${typeof input.avgBalance === "undefined" ? "" : input.avgBalance})`}</SectionTitle>
                  <TextField
                    hiddenLabel
                    id="avg-balance"
                    value={avgBalanceStringValue}
                    variant="outlined"
                    size="medium"
                    disabled
                    sx={{ width: "50%" }}
                  />
                </Box>

                {/* Input 2 */}
                <StyledToggleButtonGroup
                  label="For the last 3 paydays, has income consistently lasted for at least 3 days"
                  value={input.incomeLastedForThreePaydays}
                  gridAutoFlow='column'
                  gridTemplate='auto auto / auto auto'
                  setValue={val => setInput({ ...input, incomeLastedForThreePaydays: val })}
                  options={[
                    { title: "Yes", value: 4 },
                    { title: "No", value: -2 }
                  ]}
                />
              </CardContent>
            </Card>

            <Card sx={{ marginTop: 5, padding: 4, borderRadius: 0 }}>
              <CardTitle>Additional Information - Income vs. Debt+Repayment</CardTitle>
              <CardContent sx={{ display: "flex", flexDirection: "column", gap: 4 }}>

                {/* Input 3 */}
                <StyledToggleButtonGroup
                  label="Employed Monthly Income: "
                  value={input.employedMonthlyIncome}
                  gridAutoFlow='column'
                  setValue={val => setInput({ ...input, employedMonthlyIncome: val })}
                  options={[
                    { title: "Below 1800", value: -8 },
                    { title: "1800-2500", value: 1 },
                    { title: "2500-4000", value: 5 },
                    { title: "4000+", value: 8 },
                  ]}
                />

                {/* Input 4 */}
                <StyledToggleButtonGroup
                  label="Number of Microloans: "
                  value={input.numOfMicroloans}
                  setValue={val => setInput({ ...input, numOfMicroloans: val })}
                  gridAutoFlow='column'
                  options={[
                    { title: "0", value: -1 },
                    { title: "1-2", value: 4 },
                    { title: "3-4", value: 1 },
                    { title: "5-6", value: -3 },
                    { title: "7+", value: -6 }
                  ]}
                />

                {/* Input 5 */}
                <InputGroup
                  label='Monthly Loan Amount: '
                  subject='Monthly loan'
                  values={monthlyLoans}
                  onChange={handleMonthlyLoanChange}
                />

                <Box>
                  <SectionTitle>{`Monthly Loans Amount: (${typeof input.monthlyLoansAmount === "undefined" ? "" : input.monthlyLoansAmount})`}</SectionTitle>
                  <TextField
                    hiddenLabel
                    id="monthly-loans-amount"
                    value={monthlyLoansStringValue}
                    variant="outlined"
                    size="medium"
                    disabled
                    sx={{ width: "50%" }}
                  />
                </Box>

                {/* Input 6 */}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Select
                      label='New loans within 30 days: '
                      value={input.newLoansWithin30Days}
                      setValue={val => setInput({ ...input, newLoansWithin30Days: val })}
                      options={[
                        { title: "0", value: 2 },
                        { title: "0-1", value: 1 },
                        { title: "2-3", value: -2 },
                        { title: "4+", value: -6 }
                      ]}
                    />
                  </Grid>
                </Grid>


                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    {/* Input 7 */}
                    <Select
                      label="# of NSF within 30 days: "
                      value={input.numOfNSFWithin30Days}
                      setValue={val => setInput({ ...input, numOfNSFWithin30Days: val })}
                      options={[
                        { title: "None or Zero", value: 2 },
                        { title: "1", value: -1 },
                        { title: "2+", value: -6 }
                      ]}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    {/* Input 8 */}
                    <Select
                      label="# of NSF within 60 days: "
                      value={input.numOfNSFWithin60Days}
                      setValue={val => setInput({ ...input, numOfNSFWithin60Days: val })}
                      options={
                        [
                          { title: "None or Zero", value: 2 },
                          { title: "1", value: -1 },
                          { title: "2+", value: -4 }
                        ]}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Select
                      label="# of NSF within 90 days: "
                      value={input.numOfNSFWithin90Days}
                      setValue={val => setInput({ ...input, numOfNSFWithin90Days: val })}
                      options={
                        [
                          { title: "None or Zero", value: 2 },
                          { title: "1", value: -1 },
                          { title: "2+", value: -2 }
                        ]}
                    />
                  </Grid>
                  <Grid item xs={6}></Grid>
                </Grid>
                {/* Input 9 */}

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    {/* Input 10 */}
                    <Select
                      label="# of Payment opposition within 30 days: "
                      value={input.numOfPaymentOppositionWithin30Days}
                      setValue={val => setInput({ ...input, numOfPaymentOppositionWithin30Days: val })}
                      options={
                        [
                          { title: "None or Zero", value: 2 },
                          { title: "1", value: -1 },
                          { title: "2+", value: -6 }
                        ]}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    {/* Input 11 */}
                    <Select
                      label="# of Payment opposition within 60 days: "
                      value={input.numOfPaymentOppositionWithin60Days}
                      setValue={val => setInput({ ...input, numOfPaymentOppositionWithin60Days: val })}
                      options={
                        [
                          { title: "None or Zero", value: 2 },
                          { title: "1", value: -1 },
                          { title: "2+", value: -4 }
                        ]}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    {/* Input 12 */}
                    <Select
                      label="# of Payment opposition within 90 days: "
                      value={input.numOfPaymentOppositionWithin90Days}
                      setValue={val => setInput({ ...input, numOfPaymentOppositionWithin90Days: val })}
                      options={
                        [
                          { title: "None or Zero", value: 2 },
                          { title: "1", value: -1 },
                          { title: "2+", value: -2 }
                        ]}
                    />
                  </Grid>
                  <Grid item xs={6}></Grid>
                </Grid>
              </CardContent >
            </Card >


            <Card sx={{ marginTop: 5, padding: 4, borderRadius: 0 }}>
              <CardTitle>Loan Amount Information - Other Information</CardTitle>
              <CardContent sx={{ display: "flex", flexDirection: "column", gap: 4 }}>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    {/* Input 13 */}
                    <StyledToggleButtonGroup
                      label="Balance during payday overdraft: "
                      value={input.overDraft}
                      setValue={val => setInput({ ...input, overDraft: val })}
                      options={
                        [
                          { title: "Yes", value: -4 },
                          { title: "No", value: 2 }
                        ]}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    {/* Input 14 */}
                    <StyledToggleButtonGroup
                      label="Gambling too much? (25% or more of salary): "
                      value={input.gambling}
                      setValue={val => setInput({ ...input, gambling: val })}
                      options={
                        [
                          { title: "Yes", value: -2 },
                          { title: "No", value: 2 }
                        ]}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    {/* Input 15 */}
                    <StyledToggleButtonGroup
                      label="Marijuana or Cannabis use: "
                      value={input.marijuana}
                      setValue={val => setInput({ ...input, marijuana: val })}
                      options={
                        [
                          { title: "Yes", value: -1 },
                          { title: "No", value: 2 }
                        ]}
                    />
                  </Grid>
                  <Grid item xs={6}></Grid>
                </Grid>

                {/* Input 16 */}
                <StyledToggleButtonGroup
                  label="Bank account time line: "
                  gridAutoFlow='column'
                  value={input.bankAccountTimeline}
                  setValue={val => setInput({ ...input, bankAccountTimeline: val })}
                  options={
                    [
                      { title: "-3 > 1", value: -12 },
                      { title: "2+ mos w/ 3 payday", value: -3 },
                      { title: "3-4 mos w/ 6 payday", value: 4 },
                      { title: "5+ mos above", value: 8 }
                    ]}
                />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    {/* Input 17 */}
                    <StyledToggleButtonGroup
                      label="Address match: "
                      value={input.addressMatch}
                      setValue={val => setInput({ ...input, addressMatch: val })}
                      options={
                        [
                          { title: "Yes", value: 2 },
                          { title: "No", value: 0 }
                        ]}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    {/* Input 18 */}
                    <StyledToggleButtonGroup
                      label="Bankruptcy less than 6 mos: "
                      value={input.bankruptcy}
                      setValue={val => setInput({ ...input, bankruptcy: val })}
                      options={
                        [
                          { title: "Yes", value: -12 },
                          { title: "None or paying beyond 6 mos", value: 2 }
                        ]}
                    />
                  </Grid>
                  <Grid item xs={6}></Grid>
                </Grid>

                {/* Input 19 */}
                <StyledToggleButtonGroup
                  label="Income source: "
                  gridAutoFlow='column'
                  value={input.incomeSource}
                  setValue={val => setInput({ ...input, incomeSource: val })}
                  options={
                    [
                      { title: "Employed", value: 2 },
                      { title: "Pension", value: 1 },
                      { title: "Employment Insurance", value: 0 },
                      { title: "Not employed/Self-employed", value: -12 }
                    ]}
                />

                {/* Input 20 */}
                <StyledToggleButtonGroup
                  label="Employed: "
                  gridAutoFlow='column'
                  value={input.employed}
                  setValue={val => setInput({ ...input, employed: val })}
                  options={
                    [
                      { title: "Less than month", value: -12 },
                      { title: "1-2 mos", value: -2 },
                      { title: "3-5 mos", value: 2 },
                      { title: "6 mos", value: 4 }
                    ]}
                />
              </CardContent >
            </Card >
          </Grid>

          <Grid item xs={4}>
            <StickyCard elevation={5} sx={{ padding: 4, borderRadius: 16, backgroundColor: "#fff", color: "#000" }}>
              <CardContent sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <Typography variant="h4" align="center" sx={{ marginBottom: 4, fontWeight: "bold" }}>Applicant Lending Result</Typography>
                {/* <Typography variant='h5' sx={{ fontWeight: "bold" }}>{`Score: ${score || 0}`}</Typography> */}
                <StyledLoadingButton
                  variant='contained'
                  color='success'
                  size='large'
                  onClick={handleCalculate}
                  loading={isCalculating}
                  loadingPosition="start"
                  startIcon={<></>}
                >
                  <span>{buttonLabel}</span>
                </StyledLoadingButton>
                <Typography variant='h5' align='center' sx={{ fontWeight: "bold", marginTop: 4 }}>{`Probability of Payback:`}</Typography>
                <Typography variant='h4' align='center' sx={{ fontWeight: "bold" }}>
                  {`${probabilityOfPayback || 0}% = (${score || 0} + ${renewalBonusValue || 0}) / 70`}
                </Typography>
              </CardContent>
            </StickyCard>
          </Grid>
        </Grid>
      </Container >
    </Box>
  );
}

const CardTitle = ({ children }: any) => (
  <Typography variant="h5" color="#31af20" align="left" sx={{ marginBottom: 4, fontWeight: "bold" }}>{children}</Typography>
);
const StyledLoadingButton = styled(LoadingButton)`
  /* background-color: #31af20;
  color: white; */
  width: 250px;
  font-weight: bold;
  align-self: center;
  border-radius: 32px;

  /* &:hover {
    background-color: rgb(56, 142, 60);
  } */
  .MuiLoadingButton-loadingIndicator {
    position: initial;
    margin-right: 12px;
  }
  & > span {
    text-transform: none;
  }
`;
const StickyCard = styled(Card)({
  position: "sticky",
  top: 50,
  zIndex: 1
});

export default App;
