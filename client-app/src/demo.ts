import { StringLiteral } from "typescript";

let data=33;

// data= '43';// we can do this by putting let data: any =33;  and it will work
// we can also do this  let data: number | string =33;


// creating a interface for duck  typing
export interface IDuck{
    name:string;
    numLegs: number;
    makeSound/*? add this for the optional property*/:  (sound:string)=>void;

}
const Duck1:IDuck={
    name: "meuie",
    numLegs: 2,
    makeSound: (sound: string)=> {console.log(sound);}
}
const Duck2:IDuck={
    name: "hughie",
    numLegs: 2,
    makeSound: (sound: string)=> {console.log(sound);      },
  
        
    
}
Duck2.makeSound/*! this can be used if the makesound property is optional(? ) to suppress build time error*/("meow");


export /* used for using this in another files*/ const ducks= [Duck1,Duck2];
