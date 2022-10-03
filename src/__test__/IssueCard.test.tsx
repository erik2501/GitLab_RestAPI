import IssueCard from '../Components/IssueCard';
import { Issue } from '../helpers/types';
import renderer from 'react-test-renderer'
import { render, screen } from '@testing-library/react';

const dummyAuthor = {
    id: 0,
    username: '',
    name: '',
    state: '',
    avatar_url: '',
    web_url: ''
}

const dummyUser = {
    id: 0,
    username: '',
    name: 'userName',
    state: ''
}



const dummyIssue: Issue = {
    id: 0,
    iid: 0,
    project_id: 0,
    title: 'title',
    description: 'description',
    state: 'closed',
    created_at: "2021-05-02T18:02:30.000-05:00",
    updated_at: "2021-05-02T18:02:30.000-05:00",
    closed_at: "2021-05-02T18:02:30.000-05:00",
    closed_by: dummyUser,
    labels: [''],
    milestone: '',
    assignees: [''],
    author: dummyAuthor,
    type: '',
    assignee: '',
    user_notes_count: 0
}


it('renders when passed an issue', () => {
    const tree = renderer.create((<IssueCard issue={dummyIssue} />)).toJSON();
    expect(tree).toMatchSnapshot();
});


test('should return date in nice format', () => {
    const { container } = render(<IssueCard issue={dummyIssue} />);
    screen.getByText('closed at: 03/05/2021')
});
