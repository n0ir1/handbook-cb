import React from 'react';
import {
  makeStyles,
  IconButton,
  Toolbar,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import { Icon } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import {
  SearchQueryVariables,
  SET_SEARCH_QUERY,
} from '../store/resolver/Mutation/setSearchQuery';
import { SearchQuery } from '../store/resolver/Query/searchQuery';

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

export const SearchBar = ({ searchQuery }: SearchQuery) => {
  const classes = useStyles();
  const [setSearchQuery] = useMutation<boolean, SearchQueryVariables>(SET_SEARCH_QUERY);

  return (
    <Toolbar className={classes.root} variant="regular">
      <TextField
        className={classes.input}
        placeholder="Поиск"
        onChange={e => setSearchQuery({ variables: { query: e.target.value } })}
        value={searchQuery}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon aria-label="search" className={classes.iconButton}>
                search
              </Icon>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                color="primary"
                className={classes.iconButton}
                aria-label="close"
                onClick={_ => setSearchQuery({ variables: { query: '' } })}
              >
                <Icon>close</Icon>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Toolbar>
  );
};
