import "./Nowget.css";

function Nowget(props) {
  return (
    <div className="Nowgetdiv">
      <h1 className="Nowgeth">나의 기록은 {props.num} </h1>
    </div>
  );
}

export default Nowget;
