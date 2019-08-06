import React from 'react';
import { makeStyles, Toolbar, TextField, Icon, InputAdornment } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { FilterNames } from '../store/resolver/Query/filterNames';
import {
  SET_FILTER_NAME,
  FilterNamesVariables,
} from '../store/resolver/Mutation/setFilterName';

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

export const FilterBar = ({ bik, name }: FilterNames) => {
  const classes = useStyles();

  return (
    <Mutation<boolean, FilterNamesVariables>
      mutation={SET_FILTER_NAME}
      onError={e => console.log(e)}
    >
      {setFilterName => (
        <Toolbar className={classes.root} variant="regular">
          <TextField
            className={classes.input}
            placeholder="Фильтр по БИК"
            onChange={e => setFilterName({ variables: { name, bik: e.target.value } })}
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
            onChange={e => setFilterName({ variables: { bik, name: e.target.value } })}
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
      )}
    </Mutation>
  );
};
