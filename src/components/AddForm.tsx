import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useMutation } from '@apollo/react-hooks';
import { ADD_BANK, AddBankVariables } from '../store/resolver/Mutation/addBank';
import { Button, makeStyles, Theme, createStyles, Paper } from '@material-ui/core';

type State = typeof defaultState;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: 10,
      paddingTop: 10,
      marginBottom: 15,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    container: {
      alignItems: 'center',
      display: 'inline-flex',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }),
);

const defaultState = {
  bik: '',
  correspondentAccount: '',
  name: '',
  adress: '',
};

export const AddForm = () => {
  const classes = useStyles();
  const [values, setValues] = useState<State>(defaultState);
  const [addBank] = useMutation<boolean, AddBankVariables>(ADD_BANK, {
    onError: e => console.log(e),
    onCompleted: () => setValues(defaultState),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Paper className={classes.root}>
      <form
        className={classes.container}
        onSubmit={e => {
          e.preventDefault();
          addBank({
            variables: {
              input: {
                ...values,
              },
            },
          });
        }}
      >
        <TextField
          label="Бик"
          name="bik"
          value={values.bik}
          onChange={handleChange}
          className={classes.textField}
          margin="none"
          autoComplete="off"
          required
        />
        <TextField
          label="Корр.счет"
          name="correspondentAccount"
          value={values.correspondentAccount}
          onChange={handleChange}
          className={classes.textField}
          margin="none"
          autoComplete="off"
          required
        />
        <TextField
          label="Название"
          name="name"
          value={values.name}
          onChange={handleChange}
          className={classes.textField}
          margin="none"
          autoComplete="off"
          required
        />
        <TextField
          label="Адрес"
          name="adress"
          value={values.adress}
          onChange={handleChange}
          className={classes.textField}
          margin="none"
          autoComplete="off"
          required
        />
        <Button type="submit" color="primary" size="small" variant="outlined">
          Добавить
        </Button>
      </form>
    </Paper>
  );
};
