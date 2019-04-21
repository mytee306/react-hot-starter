import { Button, Divider, FormControl, TextField } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { FC } from 'react';
import * as yup from 'yup';
import { Count, CreateDecrementByAction } from './store/slices/count';

export type Values = { amount: Count };

const initialValues: Values = {
  amount: 1,
};

export const schema = yup.object().shape({
  amount: yup
    .number()
    .min(-5)
    .max(5)
    .required(),
});

export interface DecrementProps {
  decrementBy: CreateDecrementByAction;
}

const Decrement: FC<DecrementProps> = ({ decrementBy }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={({ amount }) => decrementBy(amount)}
    validationSchema={schema}
  >
    {({ values, errors, handleChange, handleBlur }) => (
      <Form>
        <FormControl>
          <TextField
            name="amount"
            label="Decrement By Amount"
            variant="outlined"
            type="number"
            value={values.amount}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.amount)}
            helperText={errors.amount}
          />
        </FormControl>
        <br />
        <br />
        <Divider />
        <br />
        <Button color="secondary" variant="contained" type="submit">
          Decrement
        </Button>
      </Form>
    )}
  </Formik>
);

export default Decrement;
