import { createTask, handleModalOpen, editTask } from "../TaskSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./TaskForm.module.scss";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { selectSelectedTask } from "../TaskSlice";

type Inputs = {
  taskTitle: string;
};

type PropTypes = {
  edit?: boolean;
};

const TaskForm: React.VFC<PropTypes> = ({ edit }) => {
  const { register, handleSubmit, reset } = useForm();
  const selectedTask = useSelector(selectSelectedTask);

  const handleCreate = (data: Inputs) => {
    dispatch(createTask(data.taskTitle));
    reset();
  };

  const handleEdit = (data: Inputs) => {
    const sendData = { ...selectedTask, title: data.taskTitle };
    dispatch(editTask(sendData));
    dispatch(handleModalOpen(false));
  };

  const dispatch = useDispatch();

  return (
    <div className={styles.root}>
      <form
        onSubmit={edit ? handleSubmit(handleEdit) : handleSubmit(handleCreate)}
        className={styles.form}
      >
        <TextField
          id="outlined-basic"
          label={edit ? "Edit Task" : "New Task"}
          defaultValue={edit ? selectedTask.title : ""}
          variant="outlined"
          {...register("taskTitle")}
          sx={{ width: "100%" }}
        />
        {edit ? (
          <div className={styles.button_wrapper}>
            <button type="submit" className={styles.submit_button}>
              Submit
            </button>
            <button
              type="button"
              onClick={() => dispatch(handleModalOpen(false))}
              className={styles.cancel_button}
            >
              Cancel
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default TaskForm;
