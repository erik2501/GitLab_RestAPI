import CommitCard from '../Components/CommitCard';
import { getCommits } from '../helpers/fetches';
import { Commit } from '../helpers/types';
import { useEffect, useState } from 'react';
import renderer from 'react-test-renderer'
import { render } from '@testing-library/react';


const dummyCommit: Commit = {
    id: '1',
    short_id: '2',
    created_at: '3',
    parent_ids: [''],
    title: 'title',
    message: 'message',
    author_name: 'name',
    author_email: 'epost',
    authored_date: "2021-05-02T18:02:30.000-05:00",
    committer_name: 'com_name',
    committer_email: 'com_email',
    committed_date: "2021-05-02T18:02:30.000-05:00",
    trailers: '',
    web_url: 'url',
};


it('renders when passed a commit', () => {
    const tree = renderer.create((<CommitCard commit={dummyCommit} />)).toJSON();
    expect(tree).toMatchSnapshot();
});

