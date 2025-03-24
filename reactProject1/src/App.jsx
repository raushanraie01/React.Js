import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(6);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharacterAllowed, allowedIsCharacterAllowed] = useState(false);
  const [password, setPassword] = useState();
  let passwordRef = useRef("");

  const handleOnChange = (e) => {
    setLength(e.target.value);
  };
  const handleClickNumber = () => {
    setIsNumberAllowed((prev) => !prev);
  };
  const handleClickCharacter = () => {
    allowedIsCharacterAllowed((prev) => !prev);
  };
  const handleCopy = () => {
    passwordRef.current?.select();
    navigator.clipboard.writeText(password);
  };
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumberAllowed) {
      str += "0123456789";
    }
    if (isCharacterAllowed) {
      str += "!@#$%&)(_+?><";
    }
    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * (str.length + 1));
      pass = pass + str.charAt(index);
      setPassword(pass);
    }
  }, [length, isNumberAllowed, isCharacterAllowed, password]);

  useEffect(() => {
    generatePassword();
  }, [length, isCharacterAllowed, isNumberAllowed]);

  return (
    <>
      <div className="w-full max-w-lg mx-auto my-8 px-4 py-3  rounded-md text-white bg-gray-800">
        <div>
          <h1 className="text-4xl mb-5">Password Generator</h1>
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Move Range to generate input"
            className="text-black text-1xl w-3/4 rounded-l-lg py-2 mb-4 pl-2"
            id="passwordValue"
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 pr-3 py-2 px-2  rounded-r-md hover:bg-blue-900"
            onClick={handleCopy}
          >
            COPY
          </button>
        </div>

        <input
          type="range"
          min={6}
          max={100}
          value={length}
          onChange={handleOnChange}
          className="cursor-pointer mx-2"
        />
        <label htmlFor="" className="mx-3">
          ({length})
        </label>
        <input
          type="checkbox"
          className="mx-1 rounded-md px-1"
          onClick={handleClickNumber}
        />
        <label className="mx-1">Number</label>
        <input
          type="checkbox"
          className="mx-1 rounded-md px-1 "
          onClick={handleClickCharacter}
        />
        <label className="mx-1">special</label>
      </div>
    </>
  );
}

export default App;
