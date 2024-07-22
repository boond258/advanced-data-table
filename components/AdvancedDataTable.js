import React, { useState } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  usePagination,
  useGroupBy,
  useExpanded,
} from 'react-table';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
} from '@material-ui/core';

function AdvancedDataTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useGroupBy,
    useExpanded,
    usePagination
  );

  const [columnVisibility, setColumnVisibility] = useState(
    columns.reduce((acc, column) => {
      acc[column.accessor] = true;
      return acc;
    }, {})
  );

  const handleToggleColumn = (columnId) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        onChange={(e) => setGlobalFilter(e.target.value || undefined)}
      />
      <div>
        {columns.map((column) => (
          <FormControlLabel
            key={column.accessor}
            control={
              <Checkbox
                checked={columnVisibility[column.accessor]}
                onChange={() => handleToggleColumn(column.accessor)}
              />
            }
            label={column.Header}
          />
        ))}
      </div>
      <TableContainer>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) =>
                  columnVisibility[column.id] ? (
                    <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </TableCell>
                  ) : null
                )}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) =>
                    columnVisibility[cell.column.id] ? (
                      <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                    ) : null
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={rows.length}
        rowsPerPage={10}
        page={state.pageIndex}
        onPageChange={(e, newPage) => gotoPage(newPage)}
        nextIconButtonProps={{ onClick: nextPage, disabled: !canNextPage }}
        backIconButtonProps={{ onClick: previousPage, disabled: !canPreviousPage }}
      />
    </div>
  );
}

export default AdvancedDataTable;
