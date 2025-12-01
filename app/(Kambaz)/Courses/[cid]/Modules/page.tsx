"use client"
import { editModule, updateModule as updateModuleAction, setModules }
  from "./reducer";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import ModulesControls from "./ModulesControls";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { ParamValue } from "next/dist/server/request/params";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as client from "../../client";

type Lesson = {
  _id?: string;
  id?: string;
  name: string;
};

type Module = {
  _id: string;
  id?: string;
  name: string;
  course: string | ParamValue;
  lessons?: Lesson[];
  editing?: boolean;

};

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.moduleReducer);
  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY";
  const dispatch = useDispatch();

  const fetchModules = useCallback(async () => {
    try {
      const fetchedModules = await client.fetchModulesForCourse(cid as string);
      dispatch(setModules(fetchedModules));
    } catch (error) {
      console.error("Failed to fetch modules:", error);
    }
  }, [cid, dispatch]);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  return (
    <div className="wd-modules">
      {isFaculty && (
      <ModulesControls  moduleName={moduleName} setModuleName={setModuleName} 
      addModule={async ()=>{
        try {
          await client.createModule(cid as string, { name: moduleName, course: cid });
          // Refresh modules from server to ensure persistence
          await fetchModules();
          setModuleName("");
        } catch (error) {
          console.error("Failed to create module:", error);
          alert("Failed to create module. Please try again.");
        }
        } }/>)}
        <br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        {modules
          .filter((module: Module) => String(module.course) === String(cid))
          .map((module: Module) => (
            <ListGroupItem key={module._id || module.id || module.name} className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                 {!module.editing && module.name}
                 { module.editing && (
                  <FormControl className="w-50 d-inline-block"
                          onChange={(e) => dispatch(
                            updateModuleAction({...module, name: e.target.value })
                 )}
                          onKeyDown={async (e) => {
                            if (e.key === "Enter") {
                              try {
                                const updatedModule = { ...module, editing: false };
                                await client.updateModule(cid as string, updatedModule);
                                // Refresh modules from server to ensure persistence
                                await fetchModules();
                              } catch (error) {
                                console.error("Failed to update module:", error);
                                alert("Failed to update module. Please try again.");
                              }
                            }
                          }}
                            defaultValue={module.name}/>
                 )}
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={async (moduleId) => {
                    if (!isFaculty) return;
                    try {
                      await client.deleteModule(cid as string, moduleId);
                      // Refresh modules from server to ensure persistence
                      await fetchModules();
                    } catch (error) {
                      console.error("Failed to delete module:", error);
                      alert("Failed to delete module. Please try again.");
                    }
                  }}
                  isFaculty = {isFaculty}
                  editModule={(moduleId)=> {
                    if (!isFaculty) return;
                    dispatch(editModule(moduleId))
                  }} />
              </div>
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: Lesson) => (
                    <ListGroupItem key={lesson._id || lesson.id || lesson.name} className="wd-lesson p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                    </ListGroupItem>
                  ))}</ListGroup>)}</ListGroupItem>))}
      </ListGroup>
    </div>
  );
}
