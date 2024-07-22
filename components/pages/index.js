import React from 'react';
import AdvancedDataTable from '../components/AdvancedDataTable';

const data = [
  // Populate with your data
];

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Age',
    accessor: 'age',
  },
  {
    Header: 'Date of Birth',
    accessor: 'dob',
  },
  {
    Header: 'Country',
    accessor: 'country',
  },
];

const Home = () => (
  <div>
    <h1>Advanced Data Table</h1>
    <AdvancedDataTable columns={columns} data={data} />
  </div>
);

export default Home;
