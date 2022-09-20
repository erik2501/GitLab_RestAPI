import { Commit } from "./types";


export async function getCommits() {
    const response = await fetch("https://gitlab.stud.idi.ntnu.no/api/v4/projects/17430/repository/commits", {
        headers:
        {
            Authorization: "Bearer glpat-n3y-kCt83mAmv5KK63js"
        }
    })
    if (response.ok) {
        return await response.json() as Commit[];
    } else {
        console.log('something went wrong')
    }
}


