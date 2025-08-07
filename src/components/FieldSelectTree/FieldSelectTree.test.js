import React from 'react';
import '@testing-library/jest-dom';
import { Form as FinalForm } from 'react-final-form';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';
import * as validators from '../../util/validators';

import FieldSelectTree from './FieldSelectTree';

const { screen, userEvent } = testingLibrary;

const noop = () => {};

const config = {
  options: [
    {
      option: 'dogs',
      label: 'Dogs',
      suboptions: [
        {
          option: 'labradors',
          label: 'Labradors',
        },
        {
          option: 'poodles',
          label: 'Poodles',
        },
      ],
    },
    {
      option: 'cats',
      label: 'Cats',
      suboptions: [
        {
          option: 'burmese',
          label: 'Burmese cats',
        },
        {
          option: 'egyptian-mau',
          label: 'Egyptian mau',
        },
      ],
    },
    {
      option: 'fish',
      label: 'Fish',
      suboptions: [
        {
          option: 'freshwater',
          label: 'Freshwater',
          suboptions: [
            {
              option: 'greyling',
              label: 'Greyling',
            },
            {
              option: 'arctic-char',
              label: 'Arctic char',
            },
            {
              option: 'pike',
              label: 'Pike',
            },
          ],
        },
        {
          option: 'saltwater',
          label: 'Saltwater',
          suboptions: [
            {
              option: 'tuna',
              label: 'Tuna',
            },
            {
              option: 'cod',
              label: 'Cod',
            },
          ],
        },
      ],
    },
    {
      option: 'birds',
      label: 'Birds',
      suboptions: [
        {
          option: 'parrot',
          label: 'Parrot',
        },
        {
          option: 'macaw',
          label: 'Macaw',
        },
      ],
    },
    {
      option: 'reptiles',
      label: 'Reptiles',
      suboptions: [
        {
          option: 'lizards',
          label: 'Lizards',
        },
        {
          option: 'snakes',
          label: 'Snakes',
        },
      ],
    },
  ],
};

// Test config with more than 5 options to test "show more" functionality
const configWithManyOptions = {
  options: [
    { option: 'option1', label: 'Option 1' },
    { option: 'option2', label: 'Option 2' },
    { option: 'option3', label: 'Option 3' },
    { option: 'option4', label: 'Option 4' },
    { option: 'option5', label: 'Option 5' },
    { option: 'option6', label: 'Option 6' },
    { option: 'option7', label: 'Option 7' },
  ],
};

const FormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const { handleSubmit, invalid, pristine, submitting } = formRenderProps;
      const submitDisabled = invalid || pristine || submitting;
      const required = validators.requiredSelectTreeOption('This field is required');
      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <FieldSelectTree
            label="Nested options"
            name="nestedLevel"
            options={config.options}
            validate={required}
          />
          <button style={{ marginTop: 24 }} type="submit" disabled={submitDisabled}>
            Submit
          </button>
        </form>
      );
    }}
  />
);

const FormComponentWithManyOptions = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const { handleSubmit, invalid, pristine, submitting } = formRenderProps;
      const submitDisabled = invalid || pristine || submitting;
      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <FieldSelectTree
            label="Many options"
            name="manyOptions"
            options={configWithManyOptions.options}
          />
          <button style={{ marginTop: 24 }} type="submit" disabled={submitDisabled}>
            Submit
          </button>
        </form>
      );
    }}
  />
);

const initialData = {}; //{ nestedLevel1: 'women', nestedLevel2: 'jackets', foo: 'bar' };

describe('FieldSelectTree', () => {
  it('matches snapshot', () => {
    const tree = render(<FormComponent onSubmit={noop} initialValues={initialData} />);
    expect(tree.asFragment().firstChild).toMatchSnapshot();
  });

  it('enables submit', () => {
    render(<FormComponent onSubmit={noop} />);

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Dogs' })).not.toBeDisabled();

    // Select "Fish" and see more options
    expect(screen.queryByRole('button', { name: 'Freshwater' })).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Fish' }));
    expect(screen.getByRole('button', { name: 'Freshwater' })).toBeInTheDocument();

    // Select "Freshwater" and see more options
    expect(screen.queryByRole('button', { name: 'Pike' })).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Freshwater' }));
    expect(screen.getByRole('button', { name: 'Pike' })).toBeInTheDocument();
  });

  it('shows only first 5 options by default and "more..." button when there are more than 5 options', () => {
    render(<FormComponentWithManyOptions onSubmit={noop} />);

    // Should show first 5 options
    expect(screen.getByRole('button', { name: 'Option 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Option 2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Option 3' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Option 4' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Option 5' })).toBeInTheDocument();

    // Should not show the 6th and 7th options initially
    expect(screen.queryByRole('button', { name: 'Option 6' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Option 7' })).not.toBeInTheDocument();

    // Should show "Show more" button
    expect(screen.getByRole('button', { name: 'Show more' })).toBeInTheDocument();

    // Click "Show more" button
    userEvent.click(screen.getByRole('button', { name: 'Show more' }));

    // Should now show all options
    expect(screen.getByRole('button', { name: 'Option 6' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Option 7' })).toBeInTheDocument();

    // Should show "Show less" button
    expect(screen.getByRole('button', { name: 'Show less' })).toBeInTheDocument();

    // Click "Show less" button
    userEvent.click(screen.getByRole('button', { name: 'Show less' }));

    // Should hide the 6th and 7th options again
    expect(screen.queryByRole('button', { name: 'Option 6' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Option 7' })).not.toBeInTheDocument();

    // Should show "Show more" button again
    expect(screen.getByRole('button', { name: 'Show more' })).toBeInTheDocument();
  });
});
