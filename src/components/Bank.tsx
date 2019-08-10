import React, { useState, Fragment, Dispatch, SetStateAction} from 'react';
import { BankInformation } from '../store/resolver/Query/listBank';
import { TableCell, TextField, IconButton } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { DeleteVariables, DELETE_BANK } from '../store/resolver/Mutation/deleteBank';
import { UpdateBankVariables, UPDATE_BANK } from '../store/resolver/Mutation/updateBank';

type Props = {
  data: BankInformation;
};

type EditProps = Props & {
  setIsEdit: Dispatch<SetStateAction<boolean>>
};

const EditColumns = ({ data: { id, ...props }, setIsEdit }: EditProps) => {
  const [values, setValues] = useState<typeof props>(props);
  const [updateBank] = useMutation<boolean, UpdateBankVariables>(UPDATE_BANK, {
    onError: e => console.log(e),
  });

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
        <IconButton
          onClick={() => {
            setIsEdit(false);
            updateBank({ variables: { id, payload: { ...values } } });
          }}
        >
          <Icon>save</Icon>
        </IconButton>
        <IconButton onClick={() => setIsEdit(false)}>
          <Icon>cancel</Icon>
        </IconButton>
      </TableCell>
    </Fragment>
  );
};

export const Bank = ({ data }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [deleteBank] = useMutation<boolean, DeleteVariables>(DELETE_BANK, {
    onError: e => console.log(e),
  });
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
        <IconButton onClick={() => deleteBank({ variables: { id } })}>
          <Icon>delete</Icon>
        </IconButton>
      </TableCell>
    </Fragment>
  );

  return isEdit ? (
    <EditColumns data={data} setIsEdit={setIsEdit} />
  ) : (
    <DefaultColumns />
  );
};
