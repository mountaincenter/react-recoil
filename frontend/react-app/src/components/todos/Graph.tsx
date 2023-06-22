import React from 'react';

import { useRecoilValue } from 'recoil';

import { todoListStatsState } from '../recoil/States/todoState';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Graph = () => {
  const { totalCompletedNum, totalUncompletedNum } =
    useRecoilValue(todoListStatsState);

  const data = {
    labels: ['Completed', 'Uncompleted'],
    datasets: [
      {
        data: [totalCompletedNum, totalUncompletedNum],
        backgroundColor: ['#36a2eb', '#ff6384'],
      },
    ],
  };
  const options = {
    maitainAspectRatio: false,
    responsive: false,
  };

  return <Pie data={data} options={options} />;
};

export default Graph;
