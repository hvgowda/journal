import TableCell from "@material-ui/core/TableCell";
import Input from "@material-ui/core/Input";
import React from "react";
import useStyles from "./style";

const CustomTableCell = ( { row, name, onChange } ) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={e => onChange(e, row)}
          className={classes.input}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

export default CustomTableCell;
