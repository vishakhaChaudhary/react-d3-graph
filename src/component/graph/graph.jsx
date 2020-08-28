import React, { useRef, useEffect, useState } from 'react';
import dataSet from "./data.json";
import graphHelper from "../../helper/graph";

// const dataSet = {
//     name: "A",
//     children: [
//         {
//             name: "B",
//             children: [
//                 {
//                     name: "C"
//                 },
//                 {
//                     name: "D"
//                 },
//                 {
//                     name: "E"
//                 }
//             ]
//         },
//         {
//             name: "F"
//         }
//     ]
// }
const GraphComponent = () => {
    const [data, setData] = useState(dataSet);
    const svgRef = useRef();
    const wrapperRef = useRef();

    useEffect(() => {
        graphHelper.runForceGraph(svgRef.current, data.links, data.nodes);
    }, [data]);
    

    return (
        <React.Fragment>
            <div ref = {wrapperRef} style = {{ marginBottom: "2rem" }}>
                <svg ref = {svgRef}></svg>
            </div>
        </React.Fragment>
    )
}

export default GraphComponent;