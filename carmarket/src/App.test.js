import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('checks if the header is rendered correctly', () => {
  render(<App />);
  const headerElement = screen.getByRole('heading', { name: /welcome to our app/i });
  expect(headerElement).toBeInTheDocument();
});

test('checks if navigation links are present', () => {
  render(<App />);
  const navLinks = screen.getAllByRole('link');
  expect(navLinks.length).toBeGreaterThan(0);
});

test('checks if a button with specific text exists', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', { name: /get started/i });
  expect(buttonElement).toBeInTheDocument();
});

test('ensures a non-existent element is not in the document', () => {
  render(<App />);
  const nonExistentElement = screen.queryByText(/non existent text/i);
  expect(nonExistentElement).not.toBeInTheDocument();
});

test('renders a list with items', () => {
  render(<App />);
  const listItems = screen.getAllByRole('listitem');
  expect(listItems.length).toBeGreaterThan(0);
});

test('checks if a form is rendered', () => {
  render(<App />);
  const formElement = screen.getByRole('form');
  expect(formElement).toBeInTheDocument();
});

test('checks for input fields in the form', () => {
  render(<App />);
  const inputElements = screen.getAllByRole('textbox');
  expect(inputElements.length).toBeGreaterThan(0);
});

test('ensures an image is present', () => {
  render(<App />);
  const imageElement = screen.getByRole('img');
  expect(imageElement).toBeInTheDocument();
});

test('simulates a button click', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', { name: /get started/i });
  fireEvent.click(buttonElement);
  const someElement = screen.getByText(/you clicked the button/i);
  expect(someElement).toBeInTheDocument();
});

test('ensures the page has an accessible name', () => {
  render(<App />);
  const mainElement = screen.getByRole('main');
  expect(mainElement).toHaveAccessibleName();
});

test('checks for links that navigate to the correct pages', () => {
  render(<App />);
  const linkElement = screen.getByRole('link', { name: /home/i });
  expect(linkElement).toHaveAttribute('href', '/');
});

test('simulates user typing in an input field', () => {
  render(<App />);
  const inputElement = screen.getByRole('textbox', { name: /name/i });
  fireEvent.change(inputElement, { target: { value: 'John Doe' } });
  expect(inputElement.value).toBe('John Doe');
});

test('ensures a form submission is handled correctly', () => {
  render(<App />);
  const formElement = screen.getByRole('form');
  const inputElement = screen.getByRole('textbox', { name: /name/i });
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.change(inputElement, { target: { value: 'Test User' } });
  fireEvent.submit(formElement);

  const successMessage = screen.getByText(/form submitted successfully/i);
  expect(successMessage).toBeInTheDocument();
});

test('checks if loading spinner is displayed while data is being fetched', () => {
  render(<App />);
  const spinnerElement = screen.getByRole('status', { name: /loading/i });
  expect(spinnerElement).toBeInTheDocument();
});

test('ensures error message is displayed on API failure', () => {
  render(<App />);
  const errorMessage = screen.getByText(/failed to load data/i);
  expect(errorMessage).toBeInTheDocument();
});

test('checks if toggle functionality works', () => {
  render(<App />);
  const toggleButton = screen.getByRole('button', { name: /toggle/i });
  fireEvent.click(toggleButton);

  const toggledElement = screen.getByText(/toggled on/i);
  expect(toggledElement).toBeInTheDocument();
});

test('ensures clicking a navigation link changes the URL', () => {
  render(<App />);
  const linkElement = screen.getByRole('link', { name: /about/i });
  fireEvent.click(linkElement);
  expect(window.location.pathname).toBe('/about');
});

test('checks if an element appears after a button click', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', { name: /show more/i });
  fireEvent.click(buttonElement);

  const newElement = screen.getByText(/more content/i);
  expect(newElement).toBeInTheDocument();
});

test('ensures conditional rendering works based on user input', () => {
  render(<App />);
  const inputElement = screen.getByRole('textbox', { name: /search/i });
  fireEvent.change(inputElement, { target: { value: 'React' } });

  const resultElement = screen.getByText(/results for React/i);
  expect(resultElement).toBeInTheDocument();
});

test('checks if the footer is rendered', () => {
  render(<App />);
  const footerElement = screen.getByRole('contentinfo');
  expect(footerElement).toBeInTheDocument();
});

test('verifies that a modal opens on button click', () => {
  render(<App />);
  const openModalButton = screen.getByRole('button', { name: /open modal/i });
  fireEvent.click(openModalButton);

  const modalElement = screen.getByRole('dialog');
  expect(modalElement).toBeInTheDocument();
});
