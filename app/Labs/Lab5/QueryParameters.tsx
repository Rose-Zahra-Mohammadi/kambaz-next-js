"use client"
import { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function QueryParameters() {
    const [a, setA] = useState("34");
    const [b, setB] = useState("23");
    return (
        <div id="wd-query-parameters">
            <h3>Query Parameters</h3>
            <FormControl className="mb-2" id="wd-query-parameters-a" type="number" defaultValue={a} onChange={(e) => setA(e.target.value)}/>
            <FormControl className="mb-2" id="wd-query-parameters-b" type="number" defaultValue={b} onChange={(e) => setB(e.target.value)}/>
            <a className="btn btn-success me-2" id="wd-query-parameters-add" href={`${HTTP_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}>Add {a} + {b}</a>
            <a className="btn btn-danger me-2" id="wd-query-parameters-subtract" href={`${HTTP_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}>Subtract {a} - {b}</a>
            <a className="btn btn-warning me-2" id="wd-query-parameters-multiply" href={`${HTTP_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}>Multiply {a} * {b}</a>
            <a className="btn btn-info me-2" id="wd-query-parameters-divide" href={`${HTTP_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}>Devide {a} / {b}</a>
        </div>
    );
}