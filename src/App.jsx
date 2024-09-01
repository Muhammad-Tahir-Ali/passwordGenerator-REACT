import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberON, setNumberON] = useState(false);
  const [charON, setCharON] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberON) {
      str += "0123456789";
    }
    if (charON) {
      str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      password += str.charAt(char);
    }

    setPassword(password);
  }, [length, numberON, charON]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberON, charON, passwordGenerator]);

  const copyToClipboard = () => {
    passRef.current.select();
    passRef.current.setSelectionRange(0, 99);
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10 bg-white p-5 rounded-lg shadow-md text-gray-800">
      <h1 className="text-2xl font-bold mb-5 text-center">
        Password Generator
      </h1>
      <div className="flex items-center mb-5">
        <input
          type="text"
          value={password}
          className="flex-grow px-3 py-2 border-2 border-gray-300 rounded-l text-gray-700"
          placeholder="Generated password"
          readOnly
          ref={passRef}
        />
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-r hover:bg-blue-600 transition-colors"
        >
          Copy
        </button>
      </div>
      <div className="mb-5">
        <label
          htmlFor="length"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Password Length: {length}
        </label>
        <input
          type="range"
          id="length"
          min={8}
          max={128}
          value={length}
          className="w-full"
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </div>
      <div className="flex items-center mb-5">
        <input
          type="checkbox"
          id="numberInput"
          checked={numberON}
          onChange={(e) => setNumberON(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="numberInput" className="text-sm">
          Include Numbers
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="charInput"
          checked={charON}
          onChange={(e) => setCharON(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="charInput" className="text-sm">
          Include Special Characters
        </label>
      </div>
    </div>
  );
}

export default App;
