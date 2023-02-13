import { useState } from "react";

const Form = ({ tasks, setTasks, addTaskFirebase }) => {
  const [value, setValue] = useState("");

  const changeValue = (e) => {
    setValue(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    setTasks([
      ...tasks,
      { value: value, id: new Date().getSeconds(), isEdit: false },
    ]);
    setValue("");
    addTaskFirebase({
      value: value,
      id: new Date().getSeconds(),
      isEdit: false,
    });
  };

  return (
    <>
      <form>
        <input
          type="text"
          value={value}
          data-testid="input-value"
          onChange={(e) => changeValue(e)}
        />
        <button type="submit" onClick={(e) => addTask(e)}>
          Add new task
        </button>
      </form>
    </>
  );
};

export default Form;
