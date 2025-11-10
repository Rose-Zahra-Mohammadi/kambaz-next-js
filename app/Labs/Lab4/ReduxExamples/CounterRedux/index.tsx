import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterReducer";
import { RootState } from "../../store";
export default function CounterRedux() {
  const { count } = useSelector((state: RootState) => state.counterReducer);
  const dispatch = useDispatch();
  return (
    <div id="wd-counter-redux">
      <h2>Counter Redux</h2>
      <h3>{count}</h3>
      <button className="btn btn-success btn-space-right" onClick={() => dispatch(increment())} id="wd-counter-redux-increment-click"> Increment </button>
      <button className="btn btn-danger" onClick={() => dispatch(decrement())} id="wd-counter-redux-decrement-click"> Decrement </button>
      <hr/>
    </div>
);}
