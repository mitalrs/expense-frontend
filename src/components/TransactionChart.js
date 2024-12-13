//this is a class base component
import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  BarSeries,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import {
    ArgumentAxis,
    ValueAxis,
  } from '@devexpress/dx-react-chart-material-ui';
import { scaleBand } from '@devexpress/dx-chart-core';
import { ArgumentScale } from '@devexpress/dx-react-chart';
import { Animation } from '@devexpress/dx-react-chart';
import { EventTracker } from '@devexpress/dx-react-chart';
import dayjs from 'dayjs';

export default function TransactionChart({data}) {
  const chartDate = data.map(item => {
    item.month = dayjs().month(item._id-1).format('MMMM');
    return item
  })
  
  return (
    <Paper sx={{marginTop:5, bgcolor:'#8a85aa'}}>
      <Chart
        data={chartDate}
      >
       <ArgumentScale factory={scaleBand} />
        <ArgumentAxis />
        <ValueAxis />

        <BarSeries
         color="#201b5b"
          valueField="totalExpenses"
          argumentField="month"
        />
         <Animation />
         <EventTracker />
         <Tooltip />
      </Chart>
    </Paper>
  );
}


