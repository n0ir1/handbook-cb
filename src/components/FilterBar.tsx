import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles, Toolbar, TextField, Icon, InputAdornment } from '@material-ui/core';
import { Filters } from '../store/resolver/Query/filters';
import { SetFiltersVariables, SET_FILTERS } from '../store/resolver/Mutation/setFilters';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  input: {
    marginLeft: 8,
    width: 500,
  },
  iconButton: {
    padding: 10,
  },
});

export const FilterBar = ({ bik, name }: Filters) => {
  const classes = useStyles();
  const [setFilters] = useMutation<boolean, SetFiltersVariables>(SET_FILTERS, {
    onError: e => console.log(e),
  });

  return (
    <Toolbar className={classes.root} variant="regular">
      <TextField
        className={classes.input}
        placeholder="Фильтр по БИК"
        onChange={e => setFilters({ variables: { name, bik: e.target.value } })}
        value={bik}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon
                aria-label="search"
                className={classes.iconButton}
                title="Фильтр по БИК"
              >
                filter_list
              </Icon>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.input}
        placeholder="Фильтр по названию"
        onChange={e => setFilters({ variables: { bik, name: e.target.value } })}
        value={name}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon
                aria-label="search"
                className={classes.iconButton}
                title="Фильтр по названию"
              >
                filter_list
              </Icon>
            </InputAdornment>
          ),
        }}
      />
    </Toolbar>
  );
};
