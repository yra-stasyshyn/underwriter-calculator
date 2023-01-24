import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Container, styled } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import Select from './core/components/select/Select';
import SelectBalance from './core/components/select/SelectBalance';
import StyledToggleButtonGroup from './core/components/select/StyledToggleButtonGroup';
import { InputData } from './core/interfaces/io.type';

import Input from './core/components/input/Input';
import InputPayday from './core/components/input/InputPayday';

import "./App.css";
import logoSrc from "./assets/images/logo.png";
import { NUM_OF_TOTAL_CASES } from './core/constants/base.const';

function App() {
  const [input, setInput] = useState<InputData>({});

  const [balAfterPayday1, setBalAfterPayday1] = useState<number | undefined>();
  const [balAfterPayday2, setBalAfterPayday2] = useState<number | undefined>();
  const [balAfterPayday3, setBalAfterPayday3] = useState<number | undefined>();
  const [balAfterPayday4, setBalAfterPayday4] = useState<number | undefined>();
  const [balAfterPayday5, setBalAfterPayday5] = useState<number | undefined>();
  const [balAfterPayday6, setBalAfterPayday6] = useState<number | undefined>();

  const [monthlyLoan1, setMonthlyLoan1] = useState<number | undefined>();
  const [monthlyLoan2, setMonthlyLoan2] = useState<number | undefined>();
  const [monthlyLoan3, setMonthlyLoan3] = useState<number | undefined>();
  const [monthlyLoan4, setMonthlyLoan4] = useState<number | undefined>();
  const [monthlyLoan5, setMonthlyLoan5] = useState<number | undefined>();
  const [monthlyLoan6, setMonthlyLoan6] = useState<number | undefined>();
  const [monthlyLoan7, setMonthlyLoan7] = useState<number | undefined>();
  const [monthlyLoan8, setMonthlyLoan8] = useState<number | undefined>();
  const [monthlyLoan9, setMonthlyLoan9] = useState<number | undefined>();
  const [monthlyLoan10, setMonthlyLoan10] = useState<number | undefined>();

  const [buttonLabel, setButtonLabel] = useState("Calculate");
  const [isCalculating, setIsCalculating] = useState(false);

  // const [score, setScore] = useState<number | undefined>();
  const [probabilityOfPayback, setProbabilityOfPayback] = useState<number | undefined>();

  useEffect(() => {
    const avg = (
      Number(balAfterPayday1) +
      Number(balAfterPayday2) +
      Number(balAfterPayday3) +
      Number(balAfterPayday4) +
      Number(balAfterPayday5) +
      Number(balAfterPayday6)
    ) / 6;
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
  }, [balAfterPayday1, balAfterPayday2, balAfterPayday3, balAfterPayday4, balAfterPayday5, balAfterPayday6]);

  useEffect(() => {
    const total = (
      Number(monthlyLoan1) +
      Number(monthlyLoan2) +
      Number(monthlyLoan3) +
      Number(monthlyLoan4) +
      Number(monthlyLoan5) +
      Number(monthlyLoan6) +
      Number(monthlyLoan7) +
      Number(monthlyLoan8) +
      Number(monthlyLoan9) +
      Number(monthlyLoan10)
    ) * 2;
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
  }, [monthlyLoan1, monthlyLoan2, monthlyLoan3, monthlyLoan4, monthlyLoan5, monthlyLoan6, monthlyLoan7, monthlyLoan8, monthlyLoan9, monthlyLoan10]);

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

      <Card sx={{ padding: 4, borderRadius: 0 }}>
        <Typography variant="h5" color="#31af20" align="left" sx={{ marginBottom: 4, fontWeight: "bold" }}>APPLICATION FINANCIAL INFORMATION</Typography>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Input 1 */}
          <Typography variant="h6" color="#000" align="left" sx={{ }}>Balance after payday</Typography>
          <Grid container spacing={2}>
          
            <Grid item xs={6}>
              <InputPayday
                label="Payday 1"
                value={balAfterPayday1}
                setValue={e => setBalAfterPayday1(+e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <InputPayday
                label="Payday 2"
                value={balAfterPayday2}
                setValue={e => setBalAfterPayday2(+e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <InputPayday
                label="Payday 3"
                value={balAfterPayday3}
                setValue={e => setBalAfterPayday3(+e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <InputPayday
                label="Payday 4"
                value={balAfterPayday4}
                setValue={e => setBalAfterPayday4(+e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <InputPayday
                label="Payday 5"
                value={balAfterPayday5}
                setValue={e => setBalAfterPayday5(+e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <InputPayday
                label="Payday 6"
                value={balAfterPayday6}
                setValue={e => setBalAfterPayday6(+e.target.value)}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2 }}>Avg. Balance</Typography>
          <SelectBalance
            value={input.avgBalance || -6}
            options={[
              { title: "<200", value: -6 },
              { title: "200-600", value: 1 },
              { title: "600-1000", value: 2 },
              { title: "1000-1500", value: 3 },
              { title: "1500+", value: 6 },
            ]}
            disabled={true}
          />

          {/* Input 2 */}
          <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2 }}>For the last 3 paydays, has income consistently lasted for at least 3 days? </Typography>
          <StyledToggleButtonGroup
            value={input.incomeLastedForThreePaydays}
            gridAutoFlow='column'
            setValue={val => setInput({ ...input, incomeLastedForThreePaydays: val })}
            options={[
              { title: "Yes", value: 3 },
              { title: "No", value: -3 }
            ]}
          />
        </CardContent>
      </Card>
        
      <Card sx={{ marginTop: 5, padding: 4, borderRadius: 0}}>
      <Typography variant="h5" color="#31af20" align="left" sx={{ marginBottom: 4, fontWeight: "bold" }}>LOAN AMOUNT INFORMATION</Typography>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          
          {/* Input 3 */}
          <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2 }}>Employed Monthly Income : </Typography>
          <StyledToggleButtonGroup
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
          <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2 }}>Number of Microloans: </Typography>
          <StyledToggleButtonGroup
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
          <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2 }}>Monthly Loan Amount: </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Input
                label="Monthly loan 1:"
                value={monthlyLoan1}
                setValue={e => setMonthlyLoan1(+e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Monthly loan 2:"
                value={monthlyLoan2}
                setValue={e => setMonthlyLoan2(+e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Monthly loan 3:"
                value={monthlyLoan3}
                setValue={e => setMonthlyLoan3(+e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Monthly loan 4:"
                value={monthlyLoan4}
                setValue={e => setMonthlyLoan4(+e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Monthly loan 5:"
                value={monthlyLoan5}
                setValue={e => setMonthlyLoan5(+e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Monthly loan 6:"
                value={monthlyLoan6}
                setValue={e => setMonthlyLoan6(+e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Monthly loan 7:"
                value={monthlyLoan7}
                setValue={e => setMonthlyLoan7(+e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Monthly loan 8:"
                value={monthlyLoan8}
                setValue={e => setMonthlyLoan8(+e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Monthly loan 9:"
                value={monthlyLoan9}
                setValue={e => setMonthlyLoan9(+e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                label="Monthly loan 10:"
                value={monthlyLoan10}
                setValue={e => setMonthlyLoan10(+e.target.value)}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2 }}>Monthly Loans Amount: </Typography>
          <Select
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
          <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2 }}>New loans within 30 days: </Typography>
          <Select
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
              <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2 }}># of NSF within 30 days: </Typography>
              <Select
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
              <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2 }}># of NSF within 60 days: </Typography>
              < Select
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
            <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2 }}># of NSF within 90 days: </Typography>
              < Select
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
              <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2 }}># of Payment opposition within 30 days: </Typography>
              < Select
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
              <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2 }}># of Payment opposition within 60 days: </Typography>
              < Select
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
              <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2 }}># of Payment opposition within 90 days: </Typography>
              < Select
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
              <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2, marginBottom: 2  }}>Overdraft: </Typography>
              < StyledToggleButtonGroup
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
              <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2, marginBottom: 2 }}>Gambling: </Typography>
              < StyledToggleButtonGroup
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
              <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2, marginBottom: 2 }}>Marijuana: </Typography>
              < StyledToggleButtonGroup
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
          <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2, marginBottom: 2  }}>Bank account time line: </Typography>
          < StyledToggleButtonGroup
            label='Bank account time line: '
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
              <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2, marginBottom: 2  }}>Employment matches: </Typography>
              < StyledToggleButtonGroup
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
              <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2, marginBottom: 2  }}>Reference match: </Typography>
              < StyledToggleButtonGroup
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
              <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2, marginBottom: 2  }}>Address match: </Typography>
              < StyledToggleButtonGroup
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
              <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2, marginBottom: 2  }}>Bankruptcy/conprop? -6 mos: </Typography>
              < StyledToggleButtonGroup
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
          <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2}}>Income source: </Typography>
          < StyledToggleButtonGroup
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
          <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2}}>Employed: </Typography>
          < StyledToggleButtonGroup
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
              <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2, marginBottom: 2}}>Employment Verification: </Typography>
              < StyledToggleButtonGroup
                label=''
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
              <Typography variant="h6" color="#000" align="left" sx={{ marginTop: 2, marginBottom: 2}}>Renewal? </Typography>
              < StyledToggleButtonGroup
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
            loadingPosition='start'
          >
            <span>{buttonLabel}</span>
          </StyledLoadingButton>
        </CardContent >
      </Card >

      <Box sx={{ width: 1, height: 1, padding: 3 }} />

      <Card elevation={5} sx={{ padding: 4, borderRadius: 16, backgroundColor: "#31af20", color: "#fff" }}>
        <Typography variant="h4" align="left" sx={{ marginBottom: 4, fontWeight: "bold" }}>Applicant Lending Result</Typography>
        <CardContent>
          {/* <Typography variant='h5' sx={{ fontWeight: "bold" }}>{`Score: ${score || 0}`}</Typography> */}
          <Typography variant='h5' sx={{ fontWeight: "bold" }}>{`Probability of Payback: ${probabilityOfPayback || 0}%`}</Typography>
        </CardContent>
      </Card>

      <Box sx={{ width: 1, height: 1, padding: 6 }} />
    </Container >
  );
}

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
