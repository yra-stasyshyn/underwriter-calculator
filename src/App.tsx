import { useEffect, useState } from 'react';

import Select from './core/components/select/Select';
import { InputData } from './core/interfaces/io.type';

import { NUM_OF_TOTAL_CASES } from './core/constants/base.const';
import "./App.css"

import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';


function App() {
  const [input, setInput] = useState<InputData>({});

  const [balAfterPayday1, setBalAfterPayday1] = useState(0);
  const [balAfterPayday2, setBalAfterPayday2] = useState(0);
  const [balAfterPayday3, setBalAfterPayday3] = useState(0);
  const [balAfterPayday4, setBalAfterPayday4] = useState(0);
  const [balAfterPayday5, setBalAfterPayday5] = useState(0);
  const [balAfterPayday6, setBalAfterPayday6] = useState(0);

  const [monthlyLoan1, setMonthlyLoan1] = useState(0);
  const [monthlyLoan2, setMonthlyLoan2] = useState(0);
  const [monthlyLoan3, setMonthlyLoan3] = useState(0);
  const [monthlyLoan4, setMonthlyLoan4] = useState(0);
  const [monthlyLoan5, setMonthlyLoan5] = useState(0);
  const [monthlyLoan6, setMonthlyLoan6] = useState(0);
  const [monthlyLoan7, setMonthlyLoan7] = useState(0);
  const [monthlyLoan8, setMonthlyLoan8] = useState(0);
  const [monthlyLoan9, setMonthlyLoan9] = useState(0);
  const [monthlyLoan10, setMonthlyLoan10] = useState(0);

  const score =
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

  const probabilityOfPayback = (score / NUM_OF_TOTAL_CASES * 100).toFixed(2);

  useEffect(() => {
    const avg = (balAfterPayday1 + balAfterPayday2 + balAfterPayday3 + balAfterPayday4 + balAfterPayday5 + balAfterPayday6) / 6;
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
    const total = (monthlyLoan1 + monthlyLoan2 + monthlyLoan3 + monthlyLoan4 + monthlyLoan5 + monthlyLoan6 + monthlyLoan7 + monthlyLoan8 + monthlyLoan9 + monthlyLoan10) * 2;
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

  return (
      <Container >
        <Box   
          sx={{
            color: '#000',
            fontWeight: 'bold',
            paddingLeft: '20px',  
            paddingRight: '20px',
            textAlign: 'center',
          }}>
          <h1>Underwriter Calculator</h1>
        </Box>

        <section className='orange'>
          <legend>Applicant Financial Information</legend>
          <div>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto'}}>
              <Box component='label' sx={{ pt: '4px', pb: '4px', display: 'flex', flexDirection: 'row'}}>
                <InputLabel sx={{ mr: '8px', color: '#fff'}}>{`Bal after 1 payday: `}</InputLabel>
                <OutlinedInput sx={{
                  color: '#000',
                  backgroundColor: '#fff',
                  borderRadius: '6px',
                  padding: '6px',
                  height: '2em',
                  width: '150px',
                }} type="number" value={balAfterPayday1} onChange={e => setBalAfterPayday1(+e.target.value)} /> <br />
              </Box>
              <Box component='label' sx={{ pt: '4px', pb: '4px', display: 'flex', flexDirection: 'row'}}>
                <InputLabel sx={{ mr: '8px', color: '#fff'}}>{`Bal after 2 payday: `}</InputLabel>
                <OutlinedInput sx={{
                  color: '#000',
                  backgroundColor: '#fff',
                  borderRadius: '6px',
                  padding: '6px',
                  height: '2em',
                  width: '150px',
                }} type="number" value={balAfterPayday2} onChange={e => setBalAfterPayday2(+e.target.value)} /> <br />
              </Box>
              <Box component='label' sx={{ pt: '4px', pb: '4px', display: 'flex', flexDirection: 'row'}}>
                <InputLabel sx={{ mr: '8px', color: '#fff'}}>{`Bal after 3 payday: `}</InputLabel>
                <OutlinedInput sx={{
                  color: '#000',
                  backgroundColor: '#fff',
                  borderRadius: '6px',
                  padding: '6px',
                  height: '2em',
                  width: '150px',
                }} type="number" value={balAfterPayday3} onChange={e => setBalAfterPayday3(+e.target.value)} /> <br />
              </Box>
              <Box component='label' sx={{ pt: '4px', pb: '4px', display: 'flex', flexDirection: 'row'}}>
                <InputLabel sx={{ mr: '8px', color: '#fff'}}>{`Bal after 4 payday: `}</InputLabel>
                <OutlinedInput sx={{
                  color: '#000',
                  backgroundColor: '#fff',
                  borderRadius: '6px',
                  padding: '6px',
                  height: '2em',
                  width: '150px',
                }} type="number" value={balAfterPayday4} onChange={e => setBalAfterPayday4(+e.target.value)} /> <br />
              </Box>
              <Box component='label' sx={{ pt: '4px', pb: '4px', display: 'flex', flexDirection: 'row'}}>
                <InputLabel sx={{ mr: '8px', color: '#fff'}}>{`Bal after 5 payday: `}</InputLabel>
                <OutlinedInput sx={{
                  color: '#000',
                  backgroundColor: '#fff',
                  borderRadius: '6px',
                  padding: '6px',
                  height: '2em',
                  width: '150px',
                }} type="number" value={balAfterPayday5} onChange={e => setBalAfterPayday5(+e.target.value)} /> <br />
              </Box>
              <Box component='label' sx={{ pt: '4px', pb: '4px', display: 'flex', flexDirection: 'row'}}>
                <InputLabel sx={{ mr: '8px', color: '#fff'}}>{`Bal after 6 payday: `}</InputLabel>
                <OutlinedInput sx={{
                  color: '#000',
                  backgroundColor: '#fff',
                  borderRadius: '6px',
                  padding: '6px',
                  height: '2em',
                  width: '150px',
                }} type="number" value={balAfterPayday6} onChange={e => setBalAfterPayday6(+e.target.value)} /> <br />
              </Box>
            </Box>

            <div className='user-input margin-top'>
              <Select
                label='AVG balance: '
                value={input.avgBalance}
                options={[
                  { title: "<200", value: -6 },
                  { title: "200-600", value: 1 },
                  { title: "600-1000", value: 2 },
                  { title: "1000-1500", value: 3 },
                  { title: "1500+", value: 6 },
                ]}
                disabled={true}
              />
            </div>
            <div className='user-input'>
              <Select
                label='For the last 3 paydays, has income consistently lasted for at least 3 days? '
                value={input.incomeLastedForThreePaydays}
                setValue={val => setInput({ ...input, incomeLastedForThreePaydays: val })}
                options={[
                  { title: "Yes", value: 3 },
                  { title: "No", value: -3 }
                ]}
              />
            </div>
            <div className='user-input'>
              <Select
                label='Employed monthly income: '
                value={input.employedMonthlyIncome}
                setValue={val => setInput({ ...input, employedMonthlyIncome: val })}
                options={[
                  { title: "1500-2000", value: -4 },
                  { title: "2000-2500", value: -1 },
                  { title: "2500-4000", value: 2 },
                  { title: "4000+", value: 4 },
                ]}
              />
            </div>
            <div className='user-input'>
              <Select
                label='Number of Microloans: '
                value={input.numOfMicroloans}
                setValue={val => setInput({ ...input, numOfMicroloans: val })}
                options={[
                  { title: "0", value: -1 },
                  { title: "1-2", value: 2 },
                  { title: "3-4", value: 1 }, // designed value is -1, but let's use 1 since -1 conflicts.
                  { title: "5-6", value: -2 },
                  { title: "7+", value: -3 }
                ]}
              />
            </div>
            <div className='user-input col-2-grid'>
            <Box component='label' sx={{ pt: '4px', pb: '4px', display: 'flex', flexDirection: 'row'}}>
                <InputLabel sx={{ mr: '8px', color: '#fff'}}>{`Monthly loan 1: `}</InputLabel>
                <OutlinedInput sx={{
                  color: '#000',
                  backgroundColor: '#fff',
                  borderRadius: '6px',
                  padding: '6px',
                  height: '2em',
                  width: '150px',
                }} type="number" value={monthlyLoan1} onChange={e => setMonthlyLoan1(+e.target.value)} /> <br />
              </Box>
              <Box component='label' sx={{ pt: '4px', pb: '4px', display: 'flex', flexDirection: 'row'}}>
                <InputLabel sx={{ mr: '8px', color: '#fff'}}>{`Monthly loan 2: `}</InputLabel>
                <OutlinedInput sx={{
                  color: '#000',
                  backgroundColor: '#fff',
                  borderRadius: '6px',
                  padding: '6px',
                  height: '2em',
                  width: '150px',
                }} type="number" value={monthlyLoan2} onChange={e => setMonthlyLoan2(+e.target.value)} /> <br />
              </Box>
              <Box component='label' sx={{ pt: '4px', pb: '4px', display: 'flex', flexDirection: 'row'}}>
                <InputLabel sx={{ mr: '8px', color: '#fff'}}>{`Monthly loan 3: `}</InputLabel>
                <OutlinedInput sx={{
                  color: '#000',
                  backgroundColor: '#fff',
                  borderRadius: '6px',
                  padding: '6px',
                  height: '2em',
                  width: '150px',
                }} type="number" value={monthlyLoan3} onChange={e => setMonthlyLoan3(+e.target.value)} /> <br />
              </Box>
              <Box component='label' sx={{ pt: '4px', pb: '4px', display: 'flex', flexDirection: 'row'}}>
                <InputLabel sx={{ mr: '8px', color: '#fff'}}>{`Monthly loan 4: `}</InputLabel>
                <OutlinedInput sx={{
                  color: '#000',
                  backgroundColor: '#fff',
                  borderRadius: '6px',
                  padding: '6px',
                  height: '2em',
                  width: '150px',
                }} type="number" value={monthlyLoan4} onChange={e => setMonthlyLoan4(+e.target.value)} /> <br />
              </Box>
              <Box component='label' sx={{ pt: '4px', pb: '4px', display: 'flex', flexDirection: 'row'}}>
                <InputLabel sx={{ mr: '8px', color: '#fff'}}>{`Monthly loan 5: `}</InputLabel>
                <OutlinedInput sx={{
                  color: '#000',
                  backgroundColor: '#fff',
                  borderRadius: '6px',
                  padding: '6px',
                  height: '2em',
                  width: '150px',
                }} type="number" value={monthlyLoan5} onChange={e => setMonthlyLoan5(+e.target.value)} /> <br />
              </Box>
              <Box component='label' sx={{ pt: '4px', pb: '4px', display: 'flex', flexDirection: 'row'}}>
                <InputLabel sx={{ mr: '8px', color: '#fff'}}>{`Monthly loan 6: `}</InputLabel>
                <OutlinedInput sx={{
                  color: '#000',
                  backgroundColor: '#fff',
                  borderRadius: '6px',
                  padding: '6px',
                  height: '2em',
                  width: '150px',
                }} type="number" value={monthlyLoan6} onChange={e => setMonthlyLoan6(+e.target.value)} /> <br />
              </Box>
              <Box component='label' sx={{ pt: '4px', pb: '4px', display: 'flex', flexDirection: 'row'}}>
                <InputLabel sx={{ mr: '8px', color: '#fff'}}>{`Monthly loan 7: `}</InputLabel>
                <OutlinedInput sx={{
                  color: '#000',
                  backgroundColor: '#fff',
                  borderRadius: '6px',
                  padding: '6px',
                  height: '2em',
                  width: '150px',
                }} type="number" value={monthlyLoan7} onChange={e => setMonthlyLoan7(+e.target.value)} /> <br />
              </Box>
              <Box component='label' sx={{ pt: '4px', pb: '4px', display: 'flex', flexDirection: 'row'}}>
                <InputLabel sx={{ mr: '8px', color: '#fff'}}>{`Monthly loan 8: `}</InputLabel>
                <OutlinedInput sx={{
                  color: '#000',
                  backgroundColor: '#fff',
                  borderRadius: '6px',
                  padding: '6px',
                  height: '2em',
                  width: '150px',
                }} type="number" value={monthlyLoan8} onChange={e => setMonthlyLoan8(+e.target.value)} /> <br />
              </Box>
              <Box component='label' sx={{ pt: '4px', pb: '4px', display: 'flex', flexDirection: 'row'}}>
                <InputLabel sx={{ mr: '8px', color: '#fff'}}>{`Monthly loan 9: `}</InputLabel>
                <OutlinedInput sx={{
                  color: '#000',
                  backgroundColor: '#fff',
                  borderRadius: '6px',
                  padding: '6px',
                  height: '2em',
                  width: '150px',
                }} type="number" value={monthlyLoan9} onChange={e => setMonthlyLoan9(+e.target.value)} /> <br />
              </Box>
              <Box component='label' sx={{ pt: '4px', pb: '4px', display: 'flex', flexDirection: 'row'}}>
                <InputLabel sx={{ mr: '8px', color: '#fff'}}>{`Monthly loan 10: `}</InputLabel>
                <OutlinedInput sx={{
                  color: '#000',
                  backgroundColor: '#fff',
                  borderRadius: '6px',
                  padding: '6px',
                  height: '2em',
                  width: '150px',
                }} type="number" value={monthlyLoan10} onChange={e => setMonthlyLoan10(+e.target.value)} /> <br />
              </Box>
            </div>

            <div className='user-input'>
              <Select
                label='Monthly loans amount: '
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
            </div>
            <div className='user-input'>
              <Select
                label='New loans within 30 days: '
                value={input.newLoansWithin30Days}
                setValue={val => setInput({ ...input, newLoansWithin30Days: val })}
                options={[
                  { title: "0", value: 1 },
                  { title: "1-2", value: -2 },
                  { title: "2-3", value: -3 }
                ]}
              />
            </div>
            <div className='user-input'>
              <Select
                label='# of NSF within 30 days: '
                value={input.numOfNSFWithin30Days}
                setValue={val => setInput({ ...input, numOfNSFWithin30Days: val })}
                options={[
                  { title: "Less than 1", value: 1 },
                  { title: "2+", value: -3 }
                ]}
              />
            </div>
            <div className='user-input'>
              <Select
                label='# of NSF within 60 days: '
                value={input.numOfNSFWithin60Days}
                setValue={val => setInput({ ...input, numOfNSFWithin60Days: val })}
                options={[
                  { title: "Less than 1", value: 1 },
                  { title: "2+", value: -2 }
                ]}
              />
            </div>
            <div className='user-input'>
              <Select
                label='# of NSF within 90 days: '
                value={input.numOfNSFWithin90Days}
                setValue={val => setInput({ ...input, numOfNSFWithin90Days: val })}
                options={[
                  { title: "Less than 1", value: 1 },
                  { title: "2+", value: -1 }
                ]}
              />
            </div>
            <div className='user-input'>
              <Select
                label='# of Payment opposition within 30 days: '
                value={input.numOfPaymentOppositionWithin30Days}
                setValue={val => setInput({ ...input, numOfPaymentOppositionWithin30Days: val })}
                options={[
                  { title: "Less than 1", value: 1 },
                  { title: "2+", value: -3 }
                ]}
              />
            </div>
            <div className='user-input'>
              <Select
                label='# of Payment opposition within 60 days: '
                value={input.numOfPaymentOppositionWithin60Days}
                setValue={val => setInput({ ...input, numOfPaymentOppositionWithin60Days: val })}
                options={[
                  { title: "Less than 1", value: 1 },
                  { title: "2+", value: -2 }
                ]}
              />
            </div>
            <div className='user-input'>
              <Select
                label='# of Payment opposition within 90 days: '
                value={input.numOfPaymentOppositionWithin90Days}
                setValue={val => setInput({ ...input, numOfPaymentOppositionWithin90Days: val })}
                options={[
                  { title: "Less than 1", value: 1 },
                  { title: "2+", value: -1 }
                ]}
              />
            </div>
            <div className='user-input'>
              <Select
                label='Overdraft: '
                value={input.overDraft}
                setValue={val => setInput({ ...input, overDraft: val })}
                options={[
                  { title: "Yes", value: -1 },
                  { title: "No", value: 1 }
                ]}
              />
            </div>
            <div className='user-input'>
              <Select
                label='Gambling: '
                value={input.gambling}
                setValue={val => setInput({ ...input, gambling: val })}
                options={[
                  { title: "Yes", value: -1 },
                  { title: "No", value: 1 }
                ]}
              />
            </div>
            <div className='user-input'>
              <Select
                label='Marijuana: '
                value={input.marijuana}
                setValue={val => setInput({ ...input, marijuana: val })}
                options={[
                  { title: "Yes", value: -1 },
                  { title: "No", value: 1 }
                ]}
              />
            </div>
            <div className='user-input'>
              <Select
                label='Bank account time line: '
                value={input.bankAccountTimeline}
                setValue={val => setInput({ ...input, bankAccountTimeline: val })}
                options={[
                  { title: ">1 month", value: -3 },
                  { title: "2+ months", value: -2 },
                  { title: "3+ months", value: 1 }
                ]}
              />
            </div>
            <div className='user-input'>
              <Select
                label='Employment matches: '
                value={input.employmentMatches}
                setValue={val => setInput({ ...input, employmentMatches: val })}
                options={[
                  { title: "Yes", value: 1 },
                  { title: "No", value: -1 }
                ]}
              />
            </div>
            <div className='user-input'>
              <Select
                label='Reference match: '
                value={input.referencesMatch}
                setValue={val => setInput({ ...input, referencesMatch: val })}
                options={[
                  { title: "Yes", value: 1 },
                  { title: "No", value: -1 }
                ]}
              />
            </div>
            <div className='user-input'>
              <Select
                label='Address match: '
                value={input.addressMatch}
                setValue={val => setInput({ ...input, addressMatch: val })}
                options={[
                  { title: "Yes", value: 1 },
                  { title: "No", value: -1 }
                ]}
              />
            </div>
            <div className='user-input'>
              <Select
                label='Bankruptcy/conprop? (<6 mos): '
                value={input.bankruptcy}
                setValue={val => setInput({ ...input, bankruptcy: val })}
                options={[
                  { title: "Yes", value: -1 },
                  { title: "No", value: 1 }
                ]}
              />
            </div>
            <div className='user-input'>
              <Select
                label='Income source: '
                value={input.incomeSource}
                setValue={val => setInput({ ...input, incomeSource: val })}
                options={[
                  { title: "Employed", value: 2 },
                  { title: "PEnsion", value: 1 },
                  { title: "Employment insurance", value: 0 },
                  { title: "Not Employed", value: -1 }
                ]}
              />
            </div>
            <div className='user-input'>
              <Select
                label='Employed: '
                value={input.employed}
                setValue={val => setInput({ ...input, employed: val })}
                options={[
                  { title: "Less than month", value: -3 },
                  { title: "1-2 months", value: -2 },
                  { title: "3-5 months", value: 1 },
                  { title: "6 months +", value: 2 }
                ]}
              />
            </div>
            <div className='user-input'>
              <Select
                label='Employment Verification: '
                value={input.employmentVerification}
                setValue={val => setInput({ ...input, employmentVerification: val })}
                options={[
                  { title: "Good Standings", value: 1 },
                  { title: "Poor standings", value: -1 }
                ]}
              />
            </div>
            <div className='user-input'>
              <Select
                label='Renewal? '
                value={input.renewal}
                setValue={val => setInput({ ...input, renewal: val })}
                options={[
                  { title: "2nd loan", value: 1 },
                  { title: "3rd loan", value: 3 },
                  { title: "4th+", value: 6 },
                  { title: "No", value: 0 }
                ]}
              />
            </div>
          </div>
        </section>

        <section className='green'>
          <legend>Applicant Lending Result</legend>
          <div>
            <p>{`Score: ${score}`}</p>
            <p>{`Probability of Payback: ${probabilityOfPayback}%`}</p>
          </div>
        </section>
      </Container>
  );
}

export default App;
