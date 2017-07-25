
module powerbi.extensibility.visual {
   
    export class Visual implements IVisual {
        private host: IVisualHost; 
        private svg: d3.Selection<SVGElement>; 
        private container: d3.Selection<SVGElement>;
        private textValue: d3.Selection<SVGElement>; 
        private textLabel: d3.Selection<SVGElement>;
        private selectionIdBuilder: ISelectionIdBuilder; 
        private selectionManager: ISelectionManager;
        private selectionId: ISelectionId;

        
        constructor(options: VisualConstructorOptions) {

            this.selectionId = options.host.createSelectionIdBuilder();

            
            this.selectionManager = options.host.createSelectionManager();

            this.svg = d3.select(options.element)  
                         .append('svg')  
                         .classed('circleCard', true); 
            this.container = this.svg.append("g")  
                                     .classed('container', true); 

            this.textValue = this.container.append("text")  
                                           .classed("textValue", true); 
            this.textLabel = this.container.append("text")  
                                           .classed("textLabel", true);

        }

        public update(options: VisualUpdateOptions) {
            let dataView: DataView = options.dataViews[0];
            let width: number = options.viewport.width; 
            let height: number = options.viewport.height; 
            let selectionManager  = this.selectionManager;

            this.svg.attr({  
                width: width,  
                height: height 
            }); 

            let tests = this.textValue.text(dataView.single.value as number) ;

            let fontSizeValue: number = Math.min(width, height) / 2; 
            
            tests.attr({   
                    x: "50%", 
                    y: "50%",   
                    dy: "0.35em",   
                    "text-anchor": "middle"  
                }).style("font-size", fontSizeValue + "px"); 




                
            let fontSizeLabel: number = fontSizeValue / 4; 
            
            this.textLabel  
                .text(dataView.metadata.columns[0].displayName)  
                .attr({   
                    x: "50%",   
                    y: height / 2,   
                    dy: fontSizeValue / 1.2,   
                    "text-anchor": "middle"  
                }).style("font-size", fontSizeLabel + "px")

        }

        private static parseSettings(dataView: DataView): VisualSettings {
            return VisualSettings.parse(dataView) as VisualSettings;
        }

    }
}