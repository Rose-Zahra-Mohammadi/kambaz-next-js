import { Button, ListGroupItem } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo,

}: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex align-items-center">
          <span className="flex-grow-1 text-truncate" style={{ maxWidth: "300px" }}>
        {todo.title}
      </span> 
      <div className="d-flex justify-content-end flex-shrink-0">
        <Button size="sm" className="btn-danger me-2" onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click"> Delete </Button>
        <Button size="sm" onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click"> Edit </Button>
      </div>
     </ListGroupItem>);
}