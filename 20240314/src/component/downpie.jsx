import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Tooltip } from 'recharts';

export default (props)=>{
    let {data, step, dataKey, emptyRadius, nameKey, downKey, ...prop} = props;
    dataKey = dataKey || "value"; nameKey = nameKey || "name";
    downKey = downKey || "down"; emptyRadius = emptyRadius || 0;
    function pieGenerator(total, data, step, inner = 0, beginAngle = 0, endAngle = 360){
        if(!(typeof step === 'object' && Array.isArray(step) && step.length > 0)) return [];
        let [now, ...after] = step;
        let result = [
            <Pie 
                data={data} 
                nameKey={nameKey} 
                dataKey={dataKey} 
                innerRadius={emptyRadius + inner}
                outerRadius={emptyRadius + inner + now}
                startAngle={beginAngle}
                endAngle={endAngle}/>
        ];
        let totalAngle = endAngle - beginAngle;
        for(let index in data){
            let ratio = data[index][dataKey] / total;
            if(data[index][downKey]){
                result = [result,
                    pieGenerator(
                        data[index][downKey].reduce((p,v)=>p+v[dataKey],0),
                        data[index][downKey],
                        after, now + inner, beginAngle, beginAngle + totalAngle * ratio
                    )
                ].flatMap(v=>v);
            }
            beginAngle = beginAngle + totalAngle * ratio;
        }
        return result;
    }

    return <ResponsiveContainer {...prop}>
        <PieChart>
            <Tooltip/>
            {
                pieGenerator(
                    data.reduce((p,v)=>p+v[dataKey],0),
                    data, step
                )
            }
        </PieChart>
    </ResponsiveContainer>
}