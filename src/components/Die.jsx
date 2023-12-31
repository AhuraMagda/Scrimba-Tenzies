import "./Die.css";

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF",
  };
  return (
    <div className="die" style={styles} onClick={props.holdDice}>
      <h2>{props.value}</h2>
    </div>
  );
}

export default Die;
