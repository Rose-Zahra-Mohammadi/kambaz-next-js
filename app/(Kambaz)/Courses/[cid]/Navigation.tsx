"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation({ params }: { params: { cid: string } }) {
  const pathname = usePathname();
  const { cid } = params;

  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People/Table"];

  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      {links.map((label) => {
        const path = `/Courses/${cid}/${label}`;
        const isActive = pathname.includes(label);

        return (
          <Link
            key={label}
            href={path}
            className={`list-group-item text-start border-0 py-2 px-3 d-flex align-items-center ${
              isActive ? "bg-light text-black" : "bg-white text-red"
            }`}
            style={{
              position: "relative",
            }}
          >
            {isActive && (
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "2px",
                  backgroundColor: "black",
                  borderRadius: "0 4px 4px 0",
                }}
              />
            )}
            <span className="ms-3">{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
