export type Commit = {
    id: string;
    short_id: string;
    created_at: string;
    parent_ids: string[];
    title: string;
    message: string;
    author_name: string;
    author_email: string;
    authored_date: string;
    committer_name: string;
    committer_email: string;
    committed_date: string;
    trailers: unknown;
    web_url: string;
}

type Author = {
    id: number,
    username: string,
    name: string,
    state: string,
    avatar_url: string,
    web_url: string
}

export type User = {
    id: number;
    username: string;
    name: string;
    state: string;
}


// mulig noen av de under som er number burde vaere bigInt ?
export type Issue = {
    id: number,
    iid: number,
    project_id: number,
    title: string,
    description: string, // usikker paa denne
    state: string,
    created_at: string,
    updated_at: string,
    closed_at: string, // usikker paa denne
    closed_by: User,// usikker paa denne
    labels: string[], // usikker paa denne
    milestone: string, // usikker paa denne
    assignees: string[], // usikker paa denne
    author: Author,
    type: string,
    assignee: string, // usikker 
    user_notes_count: number
    // tar resten hvis det trengs
}

export type Project = {
    id: number,
    description: string,
    name: string,
    avatar_url: string //"https://gitlab.stud.idi.ntnu.no/uploads/-/system/project/avatar/17430/pingvin.png"
}
