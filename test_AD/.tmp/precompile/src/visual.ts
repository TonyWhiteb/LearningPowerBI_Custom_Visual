

module powerbi.extensibility.visual.test3CD6800D3BA74A4A9D0B9DC6AC17AFB0  {
         /**
      * Interface for BarCharts viewmodel.
      *
      * @interface
      * @property {BarChartDataPoint[]} dataPoints - Set of data points the visual will render.
      * @property {number} dataMax                 - Maximum data value in the set of data points.
      */
     interface BarChartViewModel {

         dataPoints: BarChartDataPoint[];
         dataMax: number;

     };
     /**
      * Interface for BarChart data points.
      *
      * @interface
      * @property {number} value    - Data value for point.
      * @property {string} category - Coresponding category of data value.
      */
     interface BarChartDataPoint {
         value: number;
         category: string; 
     }; 


    /**

     * Function that converts queried data into a view model that will be used by the visual

     *

     * @function

     * @param {VisualUpdateOptions} options - Contains references to the size of the container

     *                                        and the dataView which contains all the data

     *                                        the visual had queried.

     * @param {IVisualHost} host            - Contains references to the host which contains services

     */

    function visualTransform(options: VisualUpdateOptions, host: IVisualHost): BarChartViewModel {

        let dataViews = options.dataViews;

        let viewModel: BarChartViewModel = {

            dataPoints: [],

            dataMax: 0

        };



        if (!dataViews

            || !dataViews[0]

            || !dataViews[0].categorical

            || !dataViews[0].categorical.categories

            || !dataViews[0].categorical.categories[0].source

            || !dataViews[0].categorical.values)

            return viewModel;



        let categorical = dataViews[0].categorical;

        let category = categorical.categories[0];

        let dataValue = categorical.values[0];



        let barChartDataPoints: BarChartDataPoint[] = [];

        let dataMax: number;



        for (let i = 0, len = Math.max(category.values.length, dataValue.values.length); i < len; i++) {

            barChartDataPoints.push({ category: <string>category.values[i], value: <number>dataValue.values[i] });

        }

        dataMax = <number>dataValue.maxLocal;



        return {

            dataPoints: barChartDataPoints,

            dataMax: dataMax

        };

    }
    export class Visual implements IVisual {
        
         private svg: d3.Selection<SVGElement>; 
         private host: IVisualHost;
         private barChartContainer: d3.Selection<SVGElement>;
         private barContainer: d3.Selection<SVGElement>;
         private bars: d3.Selection<SVGElement>;
         static Config = {
             xScalePadding: 0.1, /**influence the width of barchart */
         };
         /**
          * Creates instance of BarChart. This method is only called once.
          *
          * @constructor
          * @param {VisualConstructorOptions} options - Contains references to the element that will
          *                                             contain the visual and a reference to the host
          *                                             which contains services.
          */
        constructor(options: VisualConstructorOptions) {
             this.host = options.host;
        /** 
         * IVisualHost contains:
         * 1. colors, an array of default colors that your visual can use
         * 2. Selection Builder, Generates and stores metadata for seletable items in your visul.
         * 3. Selection Manager, The communication bridge used to notify the visual's host that there has been a change in the selection state
         * 4. allowInteractions, a boolean flag which hints whether or not the visual should be interative
         */

             let svg = this.svg = d3.select(options.element)
                 .append('svg')
                 .classed('barChart', true);

             this.barContainer = svg.append('g')
                 .classed('barContainer', true);
        }

         /**
          * Updates the state of the visual. Every sequential databinding and resize will call update.
          *
          * @function
          * @param {VisualUpdateOptions} options - Contains references to the size of the container
          *                                        and the dataView which contains all the data
          *                                        the visual had queried. 
          */
        public update(options: VisualUpdateOptions) {
             
         let viewModel: BarChartViewModel = visualTransform(options, this.host); 
 
          
          let width = options.viewport.width; 
        /**
         * viewport: IViewpoart - the dimensions of the viewport that the visual should be rendered within
         */
          let height = options.viewport.height; 
          
          this.svg.attr({
              
              width: width,
              height: height
            
        });
        
        let yScale = d3.scale.linear()

        .domain([0, viewModel.dataMax])/** data range */

        .range([height, 0]);/**Scale range */
        /**
         * what if you suddenly have more or less space? or your data changes? 
         * you’d have to go back to the entrails of your code and make the change.
         * This is very error prone. So instead, you can use a scale above.
         */
        let xScale = d3.scale.ordinal()
        
        .domain(viewModel.dataPoints.map(d => d.category))
        
        .rangeRoundBands([0, width], Visual.Config.xScalePadding);
        
        let bars = this.barContainer.selectAll('.bar').data(viewModel.dataPoints);
        
        bars.enter() 
            .append('rect')
            .classed('bar', true); 
            
        
        bars.attr({
            
            width: xScale.rangeBand(), 
             
             height: d => height - yScale(d.value), 
             
             y: d => yScale(d.value),
             
             x: d => xScale(d.category)


            });
            
        bars.exit()
        
        .remove();
        
    }

        private static parseSettings(dataView: DataView): VisualSettings {
            return VisualSettings.parse(dataView) as VisualSettings;
        }

        /** 
         * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the 
         * objects and properties you want to expose to the users in the property pane.
         * 
         */

    }
}