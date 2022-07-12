import React from "react";
import { ducks, IDuck} from "./demo";interface Props
{
    duck:IDuck
}
export  default function DuckItem({duck}:Props)
{
    return (
        <div >
          <span>{duck.name}</span>
          <button onClick={()=>duck.makeSound(duck.name+" quack")}>Make SOund</button>
        </div>
    )
}