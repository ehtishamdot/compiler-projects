import { useState } from "react";
import "./App.css";

function App() {
  const [tokens, setTokens] = useState<any[]>([]);
  const [codeInput, setCodeInput] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState();

  const handleChange = async (event: any) => {
    event.preventDefault();
    setCodeInput(event.target.value);
    fetch("http://localhost:3000/lexer", {
      method: "POST",
      body: JSON.stringify({
        input: event.target.elements[0].value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTokens(data.tokens);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <form
          style={{
            display: "flex",
            alignItems: "start",
            flexDirection: "column",
          }}
          onSubmit={handleChange}
        >
          <textarea
            style={{
              fontFamily: "monospace",
              backgroundColor: "#fafafa",
              border: "1px solid #ccc",
              padding: "0.5em",
              marginBottom: "1rem",
              width: "400px",
              height: "400px",
            }}
            value={
              codeInput === ""
                ? `int a = 3, b;
                  b = 5;
                  printf(b);

                  int count = 0;

                  while(count > 5){
                  printf(count);
                  count++;
                  }

                  const function =  sum(valueOne , valueTwo){
                  return valueOne + valueTwo;
                  }

                  `
                : codeInput
            }
          />
          <button type="submit">Generate Tokens</button>
        </form>
        <div
          style={{
            gap: "10px",
          }}
        >
          <div style={{ marginBottom: "2rem" }}>
            {selectedToken ? selectedToken : "Select the Token"}
          </div>
          {tokens.map((token) => (
            <button
              style={{
                padding: ".5rem .9rem",
                borderRadius: "10px",
                background: token.color,
                color: "white",
                margin: "5px",
                fontSize: ".7rem",
                opacity:
                  selectedToken && selectedToken === token.type ? "1" : ".5",
                transition: "all .1s ease-in-out",
              }}
              onMouseEnter={(event) => {
                //@ts-ignore
                console.log(event?.target?.name);
                //@ts-ignore
                setSelectedToken(event?.target?.name);
              }}
              onMouseLeave={(event) => {
                //@ts-ignore
                setSelectedToken("");
              }}
              name={token.type}
            >
              {token.value}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <table
          style={{
            border: "1px solid #ccc",
            borderCollapse: "collapse",
            marginTop: "1rem",
          }}
        >
          <thead>
            <tr style={{ background: "#eee" }}>
              <th style={{ border: "1px solid #ccc", padding: "0.5em" }}>
                Type
              </th>
              <th style={{ border: "1px solid #ccc", padding: "0.5em" }}>
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((tokens) => (
              <tr>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "0.9em 4em",
                    fontSize: ".7em",
                  }}
                >
                  {tokens.type}
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "0.5em",
                    color: tokens.color,
                  }}
                >
                  {tokens.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
