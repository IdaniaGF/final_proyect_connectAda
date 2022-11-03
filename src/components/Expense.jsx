import { MdFastfood, MdSavings } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { RiMentalHealthFill } from "react-icons/ri";
import { GiAnt } from "react-icons/gi";
import { SiNetflix } from "react-icons/si";
import { IoIosBeer } from "react-icons/io";
import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

function Expense({ expense}) {
  const { expenseName, amount, category, formatDate, id } = expense;
  const {setExpense, deleteExpense} = useContext(BudgetContext);

  const edit = () => {
    setExpense(expense)
  }

  const icons = {
    food: <MdFastfood />,
    home: <FaHome />,
    health: <RiMentalHealthFill />,
    ant: <GiAnt />,
    saving: <MdSavings />,
    suscription: <SiNetflix />,
    leisure: <IoIosBeer />,
  };

  return (
    <div>
      {icons[category]}
      <h4>{category}</h4>
      <h3>{expenseName}</h3>
      <p>Added: {formatDate}</p>
      <p>$ {amount}</p>
      <button onClick={edit}>Edit</button>
      <button
        onClick={() => {
          const confirmation = confirm(
            "Are you sure you want to delete this expense?"
          );
          if (confirmation) {
            deleteExpense(id);
          }
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Expense;
