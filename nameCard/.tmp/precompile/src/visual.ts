
module powerbi.extensibility.visual.nameCard8F5BA631B90B48ED812066A0ED6A04E7  {
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