# Blank Visual

`module powerbi.extensibility.visual {`

      export vlass Visual implements IVsual {
         `constructor(options: VisualConstuctorOptions) {
         }
           
         public update(options: VisualUpdateOptions) {
         }
         private static parseSettings(dataView: DataView): VisualSettings {
             return VisualSettings.parse(dataView) as VisualSettings;
         }       
