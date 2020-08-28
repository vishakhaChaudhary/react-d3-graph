import * as d3 from "d3";

class GraphHelper {

 /**
   * @desc To return color
   *
   * @return string
   *
 */
 color = () => { return "#9D79A0"; };

 /**
   * @desc To return graph data
   * @param simulation
   *
   * @return
   *
*/

// dragDrop = (simulation) => { 
// return d3.drag()
//   .on('start', node => {
//     node.fx = node.x
//     node.fy = node.y
//   })
//   .on('drag', node => {
//     simulation.alphaTarget(0.7).restart()
//     // node.fx = d3.event.x
//     // node.fy = d3.event.y
//     node.fx = node.x
//     node.fy = node.y
//   })
//   .on('end', node => {
//     // if (!d3.event.active) {
//     //   simulation.alphaTarget(0)
//     // }
//     node.fx = null
//     node.fy = null
//   })
// }

 /**
   * @desc To return graph data
   * @param linkData
   * @param nodeData 
   *
   * @return object
   *
  */
  runForceGraph = (
    container,
    linksData,
    nodesData
  ) => { 

    const width = window.innerWidth
    const height = window.innerHeight
    const links = linksData.map((d) => Object.assign({}, d));
    console.log("links", links);
    const nodes = nodesData.map((d) => Object.assign({}, d));

    const simulation = d3.forceSimulation(nodes)
                        .force('charge', d3.forceManyBody().strength(-20)) 
                        .force('center', d3.forceCenter(width / 2, height / 2))
                         .force("link", d3.forceLink(links).id(d => d.id))
                         .force("charge", d3.forceManyBody().strength(-150))
                         .force("x", d3.forceX())
                         .force("y", d3.forceY());

    const svg = d3.select(container)
                  .attr("viewBox", [0, 0, width, height]);
    
    const link = svg.append("g")
                    .attr("stroke", "#999")
                    .attr("stroke-opacity", 0.6)
                    .selectAll("line")
                    .data(links)
                    .join("line");

    const node = svg.append("g")
                  .attr("stroke", "#fff")
                  .attr("stroke-width", 2)
                  .selectAll("circle")
                  .data(nodes)
                  .join("circle")
                  .attr("r", 12)
                  .attr("fill", this.color);
                //   .call(this.dragDrop(simulation));
    
    simulation.on("tick", () => {
        //update link positions
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        // update node positions
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

    });
    
    return {
        destroy: () => {
            simulation.stop();
        },
        nodes: () => {
            return svg.node();
        }
    };
  }
}

export default new GraphHelper();