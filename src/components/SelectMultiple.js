import React, { useCallback, useState } from 'react';
import { DataTable } from '@elliemae/ds-data-table';

const columns = [
  {
    Header: 'id',
    accessor: 'id',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Position',
    accessor: 'position',
  },
  {
    Header: 'Country',
    accessor: 'country',
  },
  {
    Header: 'Salary',
    accessor: 'salary',
  },
  {
    Header: 'Single date',
    accessor: 'singleDate',
  },
  {
    Header: 'Date range',
    accessor: 'dateRange',
  },
];

const generateRecord = (id) => ({
  id: id + 1,
  name: (id + 1) % 2 ? `John` : 'Francisco',
  position: (id + 1) % 2 ? `Developer` : `Designer`,
  country: (id + 1) % 2 ? 'US' : 'ARG',
  salary: (id + 1) % 2 ? `12321232 $` : `12321232 pesos`,
  singleDate: `${(id % 12) + 1}/${(id % 27) + 1}/2020`,
  dateRange: `${(id % 12) + 1}/${(id % 27) + 1}/2019`,
});

const genRows = (n) => new Array(n).fill({}).map((_, id) => generateRecord(id));

const disabledRows = { 0: true, 3: true };

export const SelectMultiple = () => {
  const mockColumns = React.useMemo(() => columns, []);
  const [selection, setSelection] = useState({});
  const [lastSelected, setLastSelected] = useState(null);

  const mockData = React.useMemo(() => genRows(100), []);

  // Implements multi selection with shift key
  const onSelectionChange = useCallback(
    (newSelection, selectedRow, event) => {
      // Set last selected row
      setLastSelected(selectedRow);

      if (!event.shiftKey) {
        setSelection(newSelection);
        return;
      }

      // Keep in mind in this case the uid of each row matches the indeces
      const last = Number.parseInt(lastSelected, 10);
      const now = Number.parseInt(selectedRow, 10);

      for (let i = Math.min(last, now); i <= Math.max(last, now); i += 1)
        if (!Object.keys(disabledRows).includes(i.toString())) newSelection[i.toString()] = true;

      setSelection(newSelection);
    },
    [lastSelected, selection],
  );

  return (
    <DataTable
      columns={mockColumns}
      data={mockData}
      disabledRows={disabledRows}
      height={500}
      selection={selection}
      onSelectionChange={onSelectionChange}
    />
  );
};
