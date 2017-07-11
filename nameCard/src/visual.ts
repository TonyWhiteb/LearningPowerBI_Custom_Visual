
module powerbi.extensibility.visual {
    export interface ViewModel {
        value: number
    }
    export class Visual implements IVisual {
        
        constructor(options: VisualConstructorOptions) {
        }

        public update(options: VisualUpdateOptions) {

        }

        private static parseSettings(dataView: DataView): VisualSettings {
            return VisualSettings.parse(dataView) as VisualSettings;
        }

        
    }
}