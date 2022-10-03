import { NamedExoticComponent } from "react";

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


export type Issue = {
    id: number,
    iid: number,
    project_id: number,
    title: string,
    description: string, 
    state: string,
    created_at: string,
    updated_at: string,
    closed_at: string, 
    closed_by: User,
    labels: string[], 
    milestone: string, 
    assignees: string[], 
    author: Author,
    type: string,
    assignee: string, 
    user_notes_count: number
}

type Namespace = {
    name: string
}

export type Project = {
    id: number,
    description: string,
    name: string,
    avatar_url: string //"https://gitlab.stud.idi.ntnu.no/uploads/-/system/project/avatar/17430/pingvin.png"
    namespace: Namespace
}

export type LoginInfo = {
    projectID: string | null,
    token: string | null
}