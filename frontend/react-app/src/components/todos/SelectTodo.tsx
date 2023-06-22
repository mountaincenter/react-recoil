import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { useRecoilState } from 'recoil';
import { todoListFilterState } from 'components/recoil/States/todoState';

const SelectTodo = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const handleFilterChange = (e: any) => {
    setFilter(e.target.value as string);
  };

  return (
    <>
      <Select
        fullWidth
        defaultValue="All"
        value={filter}
        onChange={handleFilterChange}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
        <MenuItem value="Uncompleted">Uncompleted</MenuItem>
      </Select>
    </>
  );
};

export default SelectTodo;
