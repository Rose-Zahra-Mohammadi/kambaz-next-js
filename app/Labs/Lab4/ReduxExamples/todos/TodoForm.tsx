import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store"
import { addTodo, updateTodo, setTodo } from "./todosReducer";
export default function TodoForm(
){
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center">
      <FormControl value={todo.title}
        onChange={ (e) => dispatch(setTodo({ ...todo, title: e.target.value })) }
        className="w-50"
        placeholder="Enter a task"/>
        <div className="d-flex gap-2">
              <Button size="sm" className="btn-success" onClick={() => dispatch(addTodo(todo))}
              id="wd-add-todo-click"> Add </Button>
      <Button size="sm" className="btn-warning" onClick={() => dispatch(updateTodo(todo))}
              id="wd-update-todo-click"> Update </Button>
              </div>
    </ListGroupItem>
);}
