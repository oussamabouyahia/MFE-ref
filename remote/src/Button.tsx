import React from "react";
// 1. Import both hooks: Read (Selector) and Write (Dispatch)
import { useDispatch, useSelector } from "react-redux";

interface ButtonProps {
  label?: string;
}

// 2. Define the 'Contract'.
// We expect the Global Store to have a 'counter' slice with a 'value'.
// We don't need the whole RootState, just the part we care about.
interface SharedState {
  counter: {
    value: number;
  };
}

const Button: React.FC<ButtonProps> = ({ label = "Remote Increment (+)" }) => {
  const dispatch = useDispatch();

  // 3. Select data from the Host's Store!
  // We use our local interface 'SharedState' to verify the data structure.
  const globalCount = useSelector((state: SharedState) => state.counter.value);

  const handleClick = () => {
    console.log("Remote: Dispatching action to Host Store...");
    dispatch({ type: "counter/increment" });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm text-gray-600 font-bold">
        Remote sees Global Count: {globalCount}
      </span>

      <button
        className="px-6 py-3 bg-green-600 text-white font-bold rounded shadow hover:bg-green-700 transition active:scale-95"
        onClick={handleClick}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
