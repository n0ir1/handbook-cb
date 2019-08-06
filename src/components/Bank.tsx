import React, { useState, Fragment } from 'react';
import { BankInformation } from '../store/resolver/Query/listBank';
import { TableCell, TextField, IconButton } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { DeleteVariables, DELETE_BANK } from '../store/resolver/Mutation/deleteBank';
import { UpdateBankVariables, UPDATE_BANK } from '../store/resolver/Mutation/updateBank';

type Props = {
  data: BankInformation;
};

type EditProps = Props & {
  action: () => void;
};

const EditColumns = ({ data: { id, ...props }, action }: EditProps) => {
  const [values, setValues] = useState<typeof props>(props);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>
      <TableCell>
        <TextField
          name="bik"
          value={values.bik}
          onChange={handleChange}
          margin="none"
          required
        />
      </TableCell>
      <TableCell>
        <TextField
          name="correspondentAccount"
          value={values.correspondentAccount}
          onChange={handleChange}
          margin="none"
          required
        />
      </TableCell>
      <TableCell>
        <TextField
          name="adress"
          value={values.adress}
          onChange={handleChange}
          margin="none"
          required
        />
      </TableCell>
      <TableCell>
        <TextField
          name="name"
          value={values.name}
          onChange={handleChange}
          margin="none"
          required
        />
      </TableCell>
      <TableCell>
        <Mutation<boolean, UpdateBankVariables>
          mutation={UPDATE_BANK}
          onError={e => console.log(e)}
        >
          {updateBank => (
            <IconButton
              onClick={() => {
                action();
                updateBank({ variables: { id, payload: { ...values } } });
              }}
            >
              <Icon>save</Icon>
            </IconButton>
          )}
        </Mutation>
        <IconButton onClick={action}>
          <Icon>cancel</Icon>
        </IconButton>
      </TableCell>
    </Fragment>
  );
};

export const Bank = ({ data }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const { id, bik, correspondentAccount, name, adress } = data;

  const DefaultColumns = () => (
    <Fragment>
      <TableCell>{bik}</TableCell>
      <TableCell>{correspondentAccount}</TableCell>
      <TableCell>{adress}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>
        <IconButton onClick={() => setIsEdit(true)}>
          <Icon>edit</Icon>
        </IconButton>
        <Mutation<boolean, DeleteVariables> mutation={DELETE_BANK}>
          {deleteBank => (
            <IconButton onClick={() => deleteBank({ variables: { id } })}>
              <Icon>delete</Icon>
            </IconButton>
          )}
        </Mutation>
      </TableCell>
    </Fragment>
  );

  return isEdit ? (
    <EditColumns data={data} action={() => setIsEdit(false)} />
  ) : (
    <DefaultColumns />
  );
};
