import { Commit, Issue, Project } from "./types";

// type infoProp = {
//     ID?: string | undefined;
//     token?: string | undefined;
// }

// export function setInfo(props?: infoProp) {

//     const [groupID, setGroupID] = useState<string>();
//     const [accessToken, setAccessToken] = useState<string>();

//     if (props?.ID) {
//         setGroupID(props?.ID)
//     }
//     if (props?.token) {
//         setAccessToken(props.token)
//     }
//     return [groupID, accessToken];



// }



// https://gitlab.stud.idi.ntnu.no/api/v4/projects/17430
// glpat-n3y-kCt83mAmv5KK63js


export async function getProjectInfo() {

    const ID = localStorage.getItem('projectID');
    const token = localStorage.getItem('accessToken');

    const response = await fetch('https://gitlab.stud.idi.ntnu.no/api/v4/projects/' + ID, {
        headers:
        {
            Authorization: "Bearer " + token
        }
    })
    if (response.ok) {
        return await response.json() as Project;
    }
}

export async function getCommits() {

    const ID = localStorage.getItem('projectID');
    const token = localStorage.getItem('accessToken');

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

export async function getIssues() {
    const ID = localStorage.getItem('projectID');
    const token = localStorage.getItem('accessToken');

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
