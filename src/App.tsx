import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Container, styled, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useState } from 'react';

import Select from './core/components/select/Select';
import StyledToggleButtonGroup from './core/components/select/StyledToggleButtonGroup';
import { InputData } from './core/interfaces/io.type';

import Input from './core/components/input/Input';
import InputPayday from './core/components/input/InputPayday';

import "./App.css";
import logoSrc from "./assets/images/logo.png";
import { NUM_OF_TOTAL_CASES } from './core/constants/base.const';
import SectionTitle from './core/components/typography/SectionTitle';

function App() {
  const [input, setInput] = useState<InputData>({});

  const [balAfterPaydays, setBalAfterPaydays] = useState<Array<number | undefined>>(Array.from({ length: 6 }, (_v) => undefined));
  const [monthlyLoans, setMonthlyLoans] = useState<Array<number | undefined>>(Array.from({ length: 10 }, (_v) => undefined));

  const [buttonLabel, setButtonLabel] = useState("Calculate");
  const [isCalculating, setIsCalculating] = useState(false);

  // const [score, setScore] = useState<number | undefined>();
  const [probabilityOfPayback, setProbabilityOfPayback] = useState<number | undefined>();

  const avgBalanceStringValue = useMemo(() => {
    return input.avgBalance === -6 ? "<200"
      : input.avgBalance === 1 ? "200-600"
        : input.avgBalance === 2 ? "600-1000"
          : input.avgBalance === 3 ? "1000-1500"
            : input.avgBalance === 6 ? "1500+"
              : "";
  }, [input.avgBalance]);

  useEffect(() => {
    const avg = (balAfterPaydays.reduce((prev, next) => {
      return ((prev || 0) + (next || 0));
    }, 0) || 0) / 6;
    const newAvgBalance = avg < 200 ? -6
      : avg < 600 ? 1
        : avg < 1000 ? 2
          : avg < 1500 ? 3
            : 6;
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
      : total < 500 ? 2
        : total < 1000 ? 0
          : total < 1500 ? -2
            : -6;
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
      (input.employmentMatches || 0) +
      (input.referencesMatch || 0) +
      (input.addressMatch || 0) +
      (input.bankruptcy || 0) +
      (input.incomeSource || 0) +
      (input.employed || 0) +
      (input.employmentVerification || 0) +
      (input.renewal || 0);

    const _probabilityOfPayback = +(_score / NUM_OF_TOTAL_CASES * 100).toFixed(2);

    setTimeout(() => {
      // setScore(_score);
      setProbabilityOfPayback(_probabilityOfPayback);
      setIsCalculating(false);
      setButtonLabel("Calculate");
    }, 2000);
  }

  return (
    <Container maxWidth="lg">
      <img src={logoSrc} style={{ paddingTop: 1, paddingBottom: 2 }} alt="logo" />
      <Typography variant='h4' align='left' sx={{ fontWeight: "bold", m: "auto", marginBottom: 6, marginTop: 4 }}>Underwriter Calculator</Typography>

      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Card sx={{ padding: 4, borderRadius: 0 }}>
            <CardTitle>APPLICATION FINANCIAL INFORMATION</CardTitle>
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <SectionTitle>Balance after payday</SectionTitle>
              {/* Input 1 */}
              <Grid container spacing={2}>
                {balAfterPaydays.map((val, idx) => (
                  <Grid item xs={6}>
                    <InputPayday
                      label={`Payday ${idx + 1}`}
                      index={idx}
                      value={val}
                      onChange={handlePaydayChange}
                    />
                  </Grid>
                ))}
              </Grid>

              <SectionTitle>Avg. Balance</SectionTitle>
              <TextField
                label="Avg. Balance"
                hiddenLabel
                id="avg-balance"
                value={avgBalanceStringValue}
                variant="outlined"
                size="medium"
                disabled
                sx={{ width: "50%" }}
              />

              {/* Input 2 */}
              <StyledToggleButtonGroup
                label="For the last 3 paydays, has income consistently lasted for at least 3 days"
                value={input.incomeLastedForThreePaydays}
                gridAutoFlow='column'
                gridTemplate='auto auto / auto auto'
                setValue={val => setInput({ ...input, incomeLastedForThreePaydays: val })}
                options={[
                  { title: "Yes", value: 3 },
                  { title: "No", value: -3 }
                ]}
              />
            </CardContent>
          </Card>

          <Card sx={{ marginTop: 5, padding: 4, borderRadius: 0 }}>
            <CardTitle>LOAN AMOUNT INFORMATION</CardTitle>
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

              {/* Input 3 */}
              <StyledToggleButtonGroup
                label="Employed Monthly Income : "
                value={input.employedMonthlyIncome}
                gridAutoFlow='column'
                setValue={val => setInput({ ...input, employedMonthlyIncome: val })}
                options={[
                  { title: "1500-2000", value: -4 },
                  { title: "2000-2500", value: -1 },
                  { title: "2500-4000", value: 2 },
                  { title: "4000+", value: 4 },
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
                  { title: "1-2", value: 2 },
                  { title: "3-4", value: 1 }, // designed value is -1, but let's use 1 since -1 conflicts.
                  { title: "5-6", value: -2 },
                  { title: "7+", value: -3 }
                ]}
              />

              {/* Input 5 */}
              <SectionTitle>Monthly Loan Amount:</SectionTitle>
              <Grid container spacing={2}>
                {monthlyLoans.map((val, idx) => (
                  <Grid item xs={6}>
                    <InputPayday
                      label={`Monthly loan ${idx + 1}:`}
                      index={idx}
                      value={val}
                      onChange={handleMonthlyLoanChange}
                    />
                  </Grid>
                ))}
              </Grid>

              <Select
                label="Monthly Loans Amount: "
                value={input.monthlyLoansAmount}
                options={[
                  { title: "0", value: -1 },
                  { title: "1-500", value: 2 },
                  { title: "500-1000", value: 0 },
                  { title: "1000-1500", value: -2 },
                  { title: "1500-2000", value: -6 }
                ]}
                disabled={true}
              />
              {/* Input 6 */}
              <Select
                label='New loans within 30 days:'
                value={input.newLoansWithin30Days}
                setValue={val => setInput({ ...input, newLoansWithin30Days: val })}
                options={[
                  { title: "0", value: 1 },
                  { title: "1-2", value: -2 },
                  { title: "2-3", value: -3 }
                ]}
              />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {/* Input 7 */}
                  <Select
                    label="# of NSF within 30 days: "
                    value={input.numOfNSFWithin30Days}
                    setValue={val => setInput({ ...input, numOfNSFWithin30Days: val })}
                    options={[
                      { title: "Less than 1", value: 1 },
                      { title: "2+", value: -3 }
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
                        { title: "Less than 1", value: 1 },
                        { title: "2+", value: -2 }
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
                        { title: "Less than 1", value: 1 },
                        { title: "2+", value: -1 }
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
                        { title: "Less than 1", value: 1 },
                        { title: "2+", value: -3 }
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
                        { title: "Less than 1", value: 1 },
                        { title: "2+", value: -2 }
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
                        { title: "Less than 1", value: 1 },
                        { title: "2+", value: -1 }
                      ]}
                  />
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {/* Input 13 */}
                  <StyledToggleButtonGroup
                    label="Overdraft: "
                    value={input.overDraft}
                    setValue={val => setInput({ ...input, overDraft: val })}
                    options={
                      [
                        { title: "Yes", value: -1 },
                        { title: "No", value: 1 }
                      ]}
                  />
                </Grid>

                <Grid item xs={6}>
                  {/* Input 14 */}
                  <StyledToggleButtonGroup
                    label="Gambling: "
                    value={input.gambling}
                    setValue={val => setInput({ ...input, gambling: val })}
                    options={
                      [
                        { title: "Yes", value: -1 },
                        { title: "No", value: 1 }
                      ]}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {/* Input 15 */}
                  <StyledToggleButtonGroup
                    label="Marijuana: "
                    value={input.marijuana}
                    setValue={val => setInput({ ...input, marijuana: val })}
                    options={
                      [
                        { title: "Yes", value: -1 },
                        { title: "No", value: 1 }
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
                    { title: ">1 month", value: -3 },
                    { title: "2+ months", value: -2 },
                    { title: "3+ months", value: 1 }
                  ]}
              />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {/* Input 17 */}
                  <StyledToggleButtonGroup
                    label="Employment matches: "
                    value={input.employmentMatches}
                    setValue={val => setInput({ ...input, employmentMatches: val })}
                    options={
                      [
                        { title: "Yes", value: 1 },
                        { title: "No", value: -1 }
                      ]}
                  />
                </Grid>

                <Grid item xs={6}>
                  {/* Input 18 */}
                  <StyledToggleButtonGroup
                    label="Reference match: "
                    value={input.referencesMatch}
                    setValue={val => setInput({ ...input, referencesMatch: val })}
                    options={
                      [
                        { title: "Yes", value: 1 },
                        { title: "No", value: -1 }
                      ]}
                  />
                </Grid>
              </Grid>


              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {/* Input 19 */}
                  <StyledToggleButtonGroup
                    label="Address match: "
                    value={input.addressMatch}
                    setValue={val => setInput({ ...input, addressMatch: val })}
                    options={
                      [
                        { title: "Yes", value: 1 },
                        { title: "No", value: -1 }
                      ]}
                  />
                </Grid>

                <Grid item xs={6}>
                  {/* Input 20 */}
                  <StyledToggleButtonGroup
                    label="Bankruptcy/conprop? -6 mos: "
                    value={input.bankruptcy}
                    setValue={val => setInput({ ...input, bankruptcy: val })}
                    options={
                      [
                        { title: "Yes", value: -1 },
                        { title: "No", value: 1 }
                      ]}
                  />
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>

              {/* Input 21 */}
              <StyledToggleButtonGroup
                label="Income source: "
                gridAutoFlow='column'
                value={input.incomeSource}
                setValue={val => setInput({ ...input, incomeSource: val })}
                options={
                  [
                    { title: "Employed", value: 2 },
                    { title: "PEnsion", value: 1 },
                    { title: "Employment insurance", value: 0 },
                    { title: "Not Employed", value: -1 }
                  ]}
              />

              {/* Input 22 */}
              <StyledToggleButtonGroup
                label="Employed: "
                gridAutoFlow='column'
                value={input.employed}
                setValue={val => setInput({ ...input, employed: val })}
                options={
                  [
                    { title: "Less than month", value: -3 },
                    { title: "1-2 months", value: -2 },
                    { title: "3-5 months", value: 1 },
                    { title: "6 months +", value: 2 }
                  ]}
              />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {/* Input 23 */}
                  <StyledToggleButtonGroup
                    label="Employment Verification: "
                    value={input.employmentVerification}
                    setValue={val => setInput({ ...input, employmentVerification: val })}
                    options={
                      [
                        { title: "Good Standings", value: 1 },
                        { title: "Poor standings", value: -1 }
                      ]}
                  />
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>

              {/* Input 24 */}
              <StyledToggleButtonGroup
                label="Renewal? "
                gridAutoFlow='column'
                value={input.renewal}
                setValue={val => setInput({ ...input, renewal: val })}
                options={
                  [
                    { title: "2nd loan", value: 1 },
                    { title: "3rd loan", value: 3 },
                    { title: "4th+", value: 6 },
                    { title: "No", value: 0 }
                  ]}
              />

              <StyledLoadingButton
                variant='contained'
                size='large'
                onClick={handleCalculate}
                loading={isCalculating}
              >
                <span>{buttonLabel}</span>
              </StyledLoadingButton>
            </CardContent >
          </Card >
          <Box sx={{ width: 1, height: 1, padding: 3 }} />
        </Grid>

        <Grid item xs={4}>
          <Card elevation={5} sx={{ padding: 4, borderRadius: 16, backgroundColor: "#31af20", color: "#fff" }}>
            <CardContent>
              <Typography variant="h4" align="left" sx={{ marginBottom: 4, fontWeight: "bold" }}>Applicant Lending Result</Typography>
              {/* <Typography variant='h5' sx={{ fontWeight: "bold" }}>{`Score: ${score || 0}`}</Typography> */}
              <Typography variant='h5' sx={{ fontWeight: "bold" }}>{`Probability of Payback: ${probabilityOfPayback || 0}%`}</Typography>
            </CardContent>
          </Card>
          <Box sx={{ width: 1, height: 1, padding: 6 }} />
        </Grid>
      </Grid>
    </Container >
  );
}

const CardTitle = ({ children }: any) => (
  <Typography variant="h5" color="#31af20" align="left" sx={{ marginBottom: 4, fontWeight: "bold" }}>{children}</Typography>
);
const StyledLoadingButton = styled(LoadingButton)`
  background-color: #31af20;
  color: white;
  margin-top: 32px;
  width: 500px;
  align-self: center;
  border-radius: 30px;

  &:hover {
    background-color: rgb(56, 142, 60);
  }
  .MuiLoadingButton-loadingIndicator {
    position: initial;
    margin-right: 12px;
  }
  & > span {
    text-transform: none;
  }
`;

export default App;