import { useEffect, useState } from 'react';
import Select from './core/components/select/Select';
import { InputData } from './core/interfaces/io.type';

function App() {
  const [input, setInput] = useState<InputData>({});

  const [balAfterPayday1, setBalAfterPayday1] = useState(0);
  const [balAfterPayday2, setBalAfterPayday2] = useState(0);
  const [balAfterPayday3, setBalAfterPayday3] = useState(0);
  const [balAfterPayday4, setBalAfterPayday4] = useState(0);
  const [balAfterPayday5, setBalAfterPayday5] = useState(0);
  const [balAfterPayday6, setBalAfterPayday6] = useState(0);

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

  return (
    <div>
      <div>
        <span>Logo</span>
        <span>Underwriter Calculator</span>
      </div>

      <fieldset>
        <legend>Input fields</legend>
        <div>
          <div>
            <label>{`Bal after 1 payday: `}</label>
            <input type="number" value={balAfterPayday1} onChange={e => setBalAfterPayday1(+e.target.value)} /> <br />
            <label>{`Bal after 2 payday: `}</label>
            <input type="number" value={balAfterPayday2} onChange={e => setBalAfterPayday2(+e.target.value)} /> <br />
            <label>{`Bal after 3 payday: `}</label>
            <input type="number" value={balAfterPayday3} onChange={e => setBalAfterPayday3(+e.target.value)} /> <br />
            <label>{`Bal after 4 payday: `}</label>
            <input type="number" value={balAfterPayday4} onChange={e => setBalAfterPayday4(+e.target.value)} /> <br />
            <label>{`Bal after 5 payday: `}</label>
            <input type="number" value={balAfterPayday5} onChange={e => setBalAfterPayday5(+e.target.value)} /> <br />
            <label>{`Bal after 6 payday: `}</label>
            <input type="number" value={balAfterPayday6} onChange={e => setBalAfterPayday6(+e.target.value)} /> <br />
          </div>

          <div>
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

          {/* <div>
            <Select
              label='For the last 3 paydays, has income consistently lasted for at least 3 days?'
              value={input.incomeLastedForThreePaydays}
              options={[
                { title: "<200", value: -6 }
              ]}
              disabled={true}
            />
          </div> */}
        </div>
      </fieldset>
    </div>
  );
}

export default App;
