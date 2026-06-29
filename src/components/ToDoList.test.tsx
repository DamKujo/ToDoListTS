
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import ToDoList from './ToDoList';

describe('ToDoList', () => {
    it('should add a new task', () => {
      render(<ToDoList />);
      const input = screen.getByPlaceholderText('Enter a new task');
      const addButton = screen.getByText('Add Task');
  
      fireEvent.change(input, { target: { value: 'New Task' } });
      fireEvent.click(addButton);

      expect(screen.getByDisplayValue('New Task')).toBeInTheDocument();
    });
  
    it('should toggle the status of a task', () => {
      render(<ToDoList />);
      const input = screen.getByPlaceholderText('Enter a new task');
      const addButton = screen.getByText('Add Task');
  
      fireEvent.change(input, { target: { value: 'Task 1' } });
      fireEvent.click(addButton);
  
      const checkbox = screen.getByLabelText('Toggle task status');
      fireEvent.click(checkbox);
  
      expect(screen.getByDisplayValue('Task 1')).toHaveClass('donetask');
    });
  
    it('should edit a task', () => {
      render(<ToDoList />);
      const input = screen.getByPlaceholderText('Enter a new task');
      const addButton = screen.getByText('Add Task');
  
      fireEvent.change(input, { target: { value: 'Task 1' } });
      fireEvent.click(addButton);
  
      const editInput = screen.getByDisplayValue('Task 1');
      fireEvent.change(editInput, { target: { value: 'Edited Task' } });
      fireEvent.blur(editInput);
  
      expect(screen.getByDisplayValue('Edited Task')).toBeInTheDocument();
    });
  
    it('should delete a task', () => {
      render(<ToDoList />);
      const input = screen.getByPlaceholderText('Enter a new task');
      const addButton = screen.getByText('Add Task');
  
      fireEvent.change(input, { target: { value: 'Task 1' } });
      fireEvent.click(addButton);
  
      const deleteButton = screen.getByText('Delete');
      fireEvent.click(deleteButton);

      expect(screen.queryByDisplayValue('Task 1')).not.toBeInTheDocument();
    });

    it('should toggle between light and dark mode', () => {
      render(<ToDoList />);

      expect(document.documentElement).toHaveAttribute('data-theme', 'light');

      const themeToggle = screen.getByLabelText('Toggle dark mode');
      fireEvent.click(themeToggle);
      expect(document.documentElement).toHaveAttribute('data-theme', 'dark');

      fireEvent.click(themeToggle);
      expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    });
  });
