import Login from "../Components/Login";
import renderer from 'react-test-renderer'
import { fireEvent, render, screen } from "@testing-library/react";


it('when run the login renders', () => {
    const tree = renderer.create((<Login  />)).toJSON();
    expect(tree).toMatchSnapshot();
});

test('check login button when empty fields', () => {
    render(<Login></Login>)
    fireEvent.click(screen.getByTestId('loginBtn'))
    screen.getByText('You have to fill in all forms')
});