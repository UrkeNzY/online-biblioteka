import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { listUsers } from "../../../../services/users";
import { reserveBook } from "../../../../services/books";
import format from "date-fns/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

import classes from "../../../../styles/BookDetails.module.css";

import InputSelect from "../../../../components/Forms/InputSelect";
import FormButtons from "../../../../components/Forms/FormButtons";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookReserve = () => {
  const [users, setUsers] = useState([]);
  const [submittedUserId, setSubmittedUserId] = useState(null);
  const [submittedDate, setSubmittedDate] = useState(new Date());
  const [reserveErrors, setReserveErrors] = useState({ user: "", date: "" });

  const navigate = useNavigate();
  const { id } = useParams();

  const CustomInput = ({ value, onClick, disabled }) => (
    <div className={classes.customInput}>
      <input
        type="text"
        value={value}
        onClick={onClick}
        className={disabled ? classes.disabledInput : ""}
        readOnly
      />
      <div className={classes.calendarIcon}>
        <FontAwesomeIcon icon={faCalendarAlt} />
      </div>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await listUsers();
        const reserveUsers = users.data
          .filter((user) => user.role === "Učenik")
          .map((user) => ({
            id: user.id,
            name: user.name + " " + user.surname,
          }));
        setUsers((prevState) => [prevState, ...reserveUsers]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (date) => {
    return format(date, "MM/dd/yyyy");
  };

  const createReservationHandler = async () => {
    try {
      await reserveBook(id, {
        student_id: submittedUserId,
        datumRezervisanja: formatDate(submittedDate),
      });
    } catch (error) {
      console.log(error.response.data.errors);
      const errorData = error.response.data.errors || error.response.data.data;
      setReserveErrors({
        user: errorData.student_id || errorData.errors || "",
        date: "",
      });
      return;
    }
    navigate("/dashboard");
  };

  const dateChangeHandler = (date) => {
    setSubmittedDate(date);
  };

  const resetReservationHandler = () => {
    setSubmittedUserId("");
    setSubmittedDate("");
  };

  return (
    <div className={classes.reserveFormContainer}>
      <p className={classes.reserveFormHeader}>Rezerviši knjigu</p>
      <form>
        <InputSelect
          labelText="Izaberi učenika za koga se knjiga rezerviše"
          id="reserveUsers"
          value={submittedUserId}
          options={users}
          onSelect={(value) => {
            setSubmittedUserId(value);
          }}
        />
        <p className={classes.errorText}>{reserveErrors.user}</p>
        <div className={classes.datePicker}>
          <p>Datum rezevisanja</p>
          <ReactDatePicker
            selected={submittedDate}
            onChange={dateChangeHandler}
            dateFormat="dd.MM.yyyy"
            customInput={<CustomInput />}
            disabled
          />
        </div>
      </form>
      <div className={classes.reserveButtonsContainer}>
        <FormButtons
          onClickAlt={resetReservationHandler}
          onClick={createReservationHandler}
          label="Rezerviši"
          disabled={submittedUserId === null}
        />
      </div>
    </div>
  );
};

export default BookReserve;
