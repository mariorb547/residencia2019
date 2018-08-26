
var CronJob = require('cron').CronJob;
var exec = require('child_process').exec, child;
const MINUTO = '59',
    HORA = '08';

new CronJob(`00 ${MINUTO} ${HORA} * * *`, () => {
    console.log('Ejecutando el respaldo de la base de datos....');
    child = exec('/home/fjaimes/dev-seguimiento-residencias-e-integracion-de-division-de-estudios-profesionales/backups/backup.sh', (error, stdout, stderr) => {
        console.log(stdout);
        if(error !== null){
            console.error('exec error: ' + error);
        }
    })
}, () => {console.log('Respaldo finalizado!')}, true, "America/Mexico_City");