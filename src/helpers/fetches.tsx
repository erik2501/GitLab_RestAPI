import { Commit, Issue, Project } from "./types";


// https://gitlab.stud.idi.ntnu.no/api/v4/projects/17430
// glpat-n3y-kCt83mAmv5KK63js


export async function getProjectInfo(ID: string, token: string) {

    // const ID = localStorage.getItem('projectID');
    // const token = localStorage.getItem('accessToken');

    const response = await fetch('https://gitlab.stud.idi.ntnu.no/api/v4/projects/' + ID, {
        headers:
        {
            Authorization: "Bearer " + token
        }
    })
    if (response.ok) {
        return await response.json() as Project;
    } else {
        const error = {
            id: -1,
            description: 'error',
            name: 'error',
            avatar_url: 'error'
        }
        return error as Project;
    }
}

export async function getCommits(ID: string, token: string) {

    const response = await fetch('https://gitlab.stud.idi.ntnu.no/api/v4/projects/' + ID + "/repository/commits", {
        headers:
        {
            Authorization: "Bearer " + token
        }
    })

    if (response.ok) {
        return await response.json() as Commit[];
    } else {
        console.log('Something went wrong. Could not fetch Commits.')
    }
}

export async function getIssues(ID: string, token: string) {

    const response = await fetch('https://gitlab.stud.idi.ntnu.no/api/v4/projects/' + ID + '/issues', {
        headers:
        {
            Authorization: "Bearer " + token
        }
    })
    if (response.ok) {
        return await response.json() as Issue[];
    } else {
        console.log('Something went wrong. Could not fetch Issues')
    }
}
