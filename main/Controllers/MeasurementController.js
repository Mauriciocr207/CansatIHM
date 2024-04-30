export default class MeasurementController {
    CPID = "cp";
    CSID = "cs";

    carga_primaria_data = null;
    carga_secundaria_data = null;

    saveData(data) {
        const {id, ...values} = data;
        console.log(data);
        if(id === this.CPID) {
            this.carga_primaria_data = values;
        } else if(id === this.CSID) {
            this.carga_secundaria_data = values;
        } else {
            return;
        }

        if(this.carga_primaria_data && this.carga_secundaria_data) {
            console.log('guardando en db', {
                ...this.carga_primaria_data,
                ...this.carga_secundaria_data,
            });
        }
    }
}