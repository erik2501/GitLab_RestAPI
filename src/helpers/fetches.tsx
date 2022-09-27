import { Commit, Issue } from "./types";


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
        console.log('Something went wrong. Could not fetch Commits.')
    }
}

export async function getIssues() {
    const response = await fetch("https://gitlab.stud.idi.ntnu.no/api/v4/projects/17430/issues", {
        headers:
        {
            Authorization: "Bearer glpat-n3y-kCt83mAmv5KK63js"
        }
    })
    if (response.ok) {
        return await response.json() as Issue[];
    } else {
        console.log('Something went wrong. Could not fetch Issues')
    }
}


export async function getUserClosedBy() {
    const response = await fetch("https://gitlab.stud.idi.ntnu.no/api/v4/projects/17430/issues", {
        headers:
        {
            Authorization: "Bearer glpat-n3y-kCt83mAmv5KK63js"
        }
    })
    if (response.ok) {
        return await response.json();
    } else {
        console.log('Something went wrong. Could not fetch Issues')
    }
}