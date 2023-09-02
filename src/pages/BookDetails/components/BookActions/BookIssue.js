import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listUsers } from "../../../../services/users";
import { issueBook } from "../../../../services/books";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import format from "date-fns/format";
import { addDays } from "date-fns";

import classes from "../../../../styles/BookDetails.module.css";

import InputSelect from "../../../../components/Forms/InputSelect";
import FormButtons from "../../../../components/Forms/FormButtons";

const BookIssue = () => {
  const [users, setUsers] = useState([]);
  const [submittedUserId, setSubmittedUserId] = useState(null);
  const [submittedDate, setSubmittedDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(addDays(new Date(), 20));
  const [issueErrors, setIssueErrors] = useState({ user: "", date: "" });

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
    console.log(format(date, "MM/dd/yyyy"));
    return format(date, "MM/dd/yyyy");
  };

  const createIssueHandler = async () => {
    try {
      await issueBook(id, {
        student_id: submittedUserId,
        datumIzdavanja: formatDate(submittedDate),
        datumVracanja: formatDate(returnDate),
      });
    } catch (error) {
      console.log(error.response.data.errors);
      const errorData = error.response.data.errors || error.response.data.data;
      setIssueErrors({
        user: errorData.student_id || errorData.errors || "",
        date: errorData.datumIzdavanja,
      });
      return;
    }
    navigate("/dashboard");
  };

  const dateChangeHandler = (date) => {
    setSubmittedDate(date);
    setReturnDate(addDays(date, 20));
    console.log(submittedDate);
  };

  const resetReservationHandler = () => {
    setSubmittedUserId("");
    setSubmittedDate("");
  };

  return (
    <div className={classes.issueFormContainer}>
      <p className={classes.issueFormHeader}>Izdaj knjigu</p>
      <form>
        <InputSelect
          labelText="Izaberi učenika koji zadužuje knjigu"
          id="reserveUsers"
          value={submittedUserId}
          options={users}
          onSelect={(value) => {
            setSubmittedUserId(value);
            console.log(value);
          }}
        />
        <p className={classes.errorText}>{issueErrors.user}</p>
        <div className={classes.issueDatePickers}>
          <div>
            <p>Datum izdavanja</p>
            <ReactDatePicker
              selected={submittedDate}
              onChange={dateChangeHandler}
              dateFormat="dd.MM.yyyy"
              customInput={<CustomInput />}
              disabled
            />
            <p className={classes.errorText}>{issueErrors.date}</p>
          </div>
          <div>
            <p>Datum vraćanja</p>
            <ReactDatePicker
              selected={returnDate}
              dateFormat="dd.MM.yyyy"
              customInput={<CustomInput />}
              disabled
            />
            <p className={classes.issueDurationText}>Rok vraćanja: 20 dana</p>
          </div>
        </div>
      </form>
      <div className={classes.issueButtonsContainer}>
        <FormButtons
          onClickAlt={resetReservationHandler}
          onClick={createIssueHandler}
          label="Izdaj"
          disabled={submittedUserId === null}
        />
      </div>
    </div>
  );
};

export default BookIssue;
