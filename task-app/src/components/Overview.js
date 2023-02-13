import { useEffect, useState } from "react";
import Form from "./Form";
import {
  addTaskFirebase,
  deleteTaskFirebase,
  loadTasks,
} from "../firebase/firebase";

const Overview = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks().then((res) => setTasks(res));
  }, []);

  const handleValue = (e, id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { value: e.target.value, id: task.id, isEdit: true };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const editTask = (id, isEdit) => {
    if (isEdit === false) {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return { value: task.value, id: task.id, isEdit: true };
        }
        return task;
      });
      setTasks(newTasks);
    } else {
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return { value: task.value, id: task.id, isEdit: false };
        }
        return task;
      });
      setTasks(newTasks);
    }
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };
  return (
    <>
      <Form
        tasks={tasks}
        setTasks={setTasks}
        addTaskFirebase={addTaskFirebase}
      />
      <div data-testid="tasks-container">
        {tasks.length !== 0 &&
          tasks.map((task, id) => {
            const { value, isEdit } = task;
            return (
              <div key={id}>
                {isEdit ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                      handleValue(e, task.id);
                    }}
                  />
                ) : (
                  <h3 data-testid="value-output">{value}</h3>
                )}
                <button onClick={() => editTask(task.id, isEdit)}>
                  {isEdit ? "Save" : "Edit"}
                </button>
                <button
                  onClick={() => {
                    deleteTask(task.id);
                    deleteTaskFirebase(task.id);
                  }}>
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Overview;
