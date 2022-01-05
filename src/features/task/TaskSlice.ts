import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface TaskState {
  /* taskに何個あるのかを管理する */
  idCount: number;
  /* storeに保存するtaskの一覧 */
  tasks: { id: number; title: string; completed: boolean }[];
  /* taskのtitleを編集する際にどのtaskが選択されているか */
  selectedTask: { id: number; title: string; completed: boolean };
  isModalOpen: boolean;
}

const initialState: TaskState = {
  idCount: 1,
  tasks: [{ id: 1, title: "taskA", completed: false }],
  selectedTask: { id: 0, title: "", completed: false },
  isModalOpen: false,
};

export const TaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    /* タスクの作成 */
    createTask: (state, action) => {
      state.idCount++;
      const newTask = {
        id: state.idCount,
        title: action.payload,
        completed: false,
      };
      state.tasks = [newTask, ...state.tasks];
    },
    /* taskの編集 */
    editTask: (state, action) => {
      /* state.tasksの中から指定したtaskを抜き出している */
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        /* 抜き出したtaskのtitleを書き換える */
        task.title = action.payload.title;
      }
    },
    /* taskの削除 */
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
    /* どのtaskを選択しているか管理 */
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    /* modalを開くか閉じるかのフラグ管理 */
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    /* task完了・未完了のチェックを変更 */
    completeTask: (state, action) => {
      /* state.tasksの中から指定したtaskを抜き出している */
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

export const {
  createTask,
  handleModalOpen,
  selectTask,
  editTask,
  deleteTask,
  completeTask,
} = TaskSlice.actions;

/* 各コンポーネントでsliceで管理しているstateを使用できるようにしている */
export const selectTasks = (state: RootState): TaskState["tasks"] =>
  state.task.tasks;

export const selectIsModalOpen = (state: RootState): TaskState["isModalOpen"] =>
  state.task.isModalOpen;

export const selectSelectedTask = (
  state: RootState
): TaskState["selectedTask"] => state.task.selectedTask;

export default TaskSlice.reducer;
