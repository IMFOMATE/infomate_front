import React from 'react';
import {PieChart} from "react-minimal-pie-chart";

const WorkChart=() => {
  return (
      <div>
        <PieChart
            data={[
              {
                value: 20, // 값
                color: '#9F8AFB', // 채워지는 색
                name: 'progress',
              },
            ]}
            style={{ width: '100px' }}
            reveal={20} // 안에 들어가는 값
            lineWidth={18} // 도넛 두께
            background="#f3f3f3" // 색 채워지지 않은 부분
            lengthAngle={360} // 원 모양
            rounded // 동글
            animate // 진입 시 채워지는 움직임
            label={({ dataEntry }) => dataEntry.value + '%'}
            labelStyle={{
              fontSize: '20px',
              fill: '#9F8AFB',
            }}
            labelPosition={0}
        />
      </div>
  );
}

export default WorkChart;