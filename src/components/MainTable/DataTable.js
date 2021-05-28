import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import useStyles from "./style";
import CustomTableCell from "./CustomTableCell";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const createData = (tradeNumber, date, symbol, longShot, qty, bought, sold, initialRisk,PL) => ({
  id: tradeNumber,
  date,
  symbol,
  longShot,
  qty,
  bought,
  sold,
  initialRisk,
  PL,
  isEditMode: false
});

const DataTable = () => {
  const [rows, setRows] = React.useState([
    createData(1, "1/7/21", "Airtel", "L", 100, 100, 100, 500, 200 ),
    createData(2, "1/7/21", "Airtel", "L", 100, 100, 100, 500, -200 ),
    createData(3, "1/7/21", "Airtel", "L", 100, 100, 100, 500, 300 ),
  ]);
  const [previous, setPrevious] = React.useState({});
  const classes = useStyles();

  const onToggleEditMode = id => {
    setRows(state => {
      return rows.map(row => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const onRevert = id => {
    const newRows = rows.map(row => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious(state => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

  const addNewRow = () => {
    const newRows = [...rows]
    newRows.push(createData())
    setRows(newRows);
  }

  return (
    <Paper className={classes.root}>
      <Grid container justify="flex-end">
        <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={()=>addNewRow()}>
          +Add Row
        </Button>
      </Grid>
      <Table className={classes.table} aria-label="caption table">
        <caption>Trading Journal</caption>
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            <TableCell align="left">Trade #</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Symbol</TableCell>
            <TableCell align="left">Long/Shot</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="left">Bought</TableCell>
            <TableCell align="left">Sold</TableCell>
            <TableCell align="left">Initial Risk</TableCell>
            <TableCell align="left">P&L</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell className={classes.selectTableCell}>
                {row.isEditMode ? (
                  <>
                    <IconButton
                      aria-label="done"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="revert"
                      onClick={() => onRevert(row.id)}
                    >
                      <RevertIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    aria-label="delete"
                    onClick={() => onToggleEditMode(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              <CustomTableCell {...{ row, name: "id", onChange }} />
              <CustomTableCell {...{ row, name: "date", onChange }} />
              <CustomTableCell {...{ row, name: "symbol", onChange }} />
              <CustomTableCell {...{ row, name: "longShot", onChange }} />
              <CustomTableCell {...{ row, name: "qty", onChange }} />
              <CustomTableCell {...{ row, name: "bought", onChange }} />
              <CustomTableCell {...{ row, name: "sold", onChange }} />
              <CustomTableCell {...{ row, name: "initialRisk", onChange }} />
              <CustomTableCell {...{ row, name: "PL", onChange }} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default DataTable;
