"use client"

import { useQuery, useAction } from "convex/react"
import { api } from "../../convex/_generated/api"

export default function Home() {
  const projects = useQuery(api.projects.get)
  return (
    <>
      welcome world
      {/* {tasks?.map((task) => (
        <div key={task._id}>
          <h1>{task.text}</h1>
        </div>
      ))} */}
    </>
  );
}
