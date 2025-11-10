"use client"
import store from "./store";
import { Provider } from "react-redux";
import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent"
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariable";
import EventObject from "./EventObject";
import ObjectStateVariable from "./ObjectStatevariable";
import PassingDataOnEvent from "./PassingDataOnEvents"
import PassingFunctions from "./PassingFunctions"
import ReduxExamples from "./ReduxExamples";
import StringStateVariables from "./StringStateVariables";
import ParentStateComponent from "./ParentStateComponent";
import TodoList from "./ReduxExamples/todos/TodoList";
export default function Lab4() {
    function sayHello() {
        alert("Hello");
    }

    return (
        <Provider store={store}>
        <div>
            <h2>lab 4</h2>
            <ClickEvent />
            <PassingDataOnEvent />
            <PassingFunctions theFunction={sayHello} />
            <EventObject />
            <Counter />
            <BooleanStateVariables />
            <StringStateVariables />
            <DateStateVariable />
            <ObjectStateVariable />
            <ArrayStateVariable />
            <ParentStateComponent />
            <ReduxExamples />
            <TodoList />
        </div>
        </Provider>
    )
}