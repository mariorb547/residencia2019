'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Empresas',[
      // {
      //   nombre: 'Unidad de Especialidad Médica – Centro de Atención Primaria en Adicciones (UNEME-CAPA)',
      //   clasificacion: 'público',
      //   rfc: 'SES870401TX8',
      //   domicilio: 'Venustiano Carranza No. 18',
      //   colonia: '20 de noviembre',
      //   codigo_postal: '39096',
      //   fax: '',
      //   telefono:'7471952005',
      //   correo:'empresa1@gmail.com',
      //   url_documentos_de_validacion:'0e8a8f703fde021960d5dcfcac65f8ee',
      //   id_titular: 1,
      //   id_usuario:26,
      //   id_representante_legal: 1, 
      //   createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      //   updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      // },
      // {
      //   nombre: 'Secretaria de Comunicaciones y Transportes',
      //   clasificacion: 'servicios',
      //   rfc: 'NUF865849RR3',
      //   domicilio: 'Dr. Gabriel Leyva Alarcón S.N.',
      //   colonia: 'Burócratas',
      //   codigo_postal: '39091',
      //   fax: '4725227',
      //   telefono:'7471952005',
      //   correo:'empresa2@gmail.com',
      //   url_documentos_de_validacion:'0e8a8f703fde021960d5dcfcac65f8ee',
      //   id_titular: 2,
      //   id_usuario:27,
      //   id_representante_legal: 3,
      //   createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      //   updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      // },
      // {
      //   nombre: 'Coordinación Estatal del Servicio Profesional Docente (CESPD)  del Estado de Guerrero',
      //   clasificacion: 'público',
      //   rfc: 'SPD547728CE4',
      //   domicilio: 'Prolongación Valerio Trujano 5',
      //   colonia: 'Nicolás Bravo',
      //   codigo_postal: '39050',
      //   fax: '4725227',
      //   telefono:'7471952005',
      //   correo:'empresa3@gmail.com',
      //   url_documentos_de_validacion:'0e8a8f703fde021960d5dcfcac65f8ee',
      //   id_titular: 4,
      //   id_usuario:28,
      //   id_representante_legal: 5,
      //   createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      //   updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      // },
      {
        nombre: 'INSTITUTO TECNOLÓGICO DE CHILPANCINGO',
        clasificacion: 'servicios',
        rfc: 'TNM140723GFA',
        domicilio: 'AV. JOSÉ FRANCISCO RUÍZ MASSIEU No. 5',
        colonia: 'VILLA MODERNA',
        codigo_postal: '39090',
        fax: '4721014',
        convenio:1,
        mision:'“PRESERVAR, INNOVAR, TRASCENDER Y APLICAR EL CONOCIMIENTO CIENTÍFICO-TECNOLÓGICO EN LA FORMACIÓN DE PROFESIONISTA, CON LA RESPONSABILIDAD SOCIAL Y CAPACIDAD DE INVESTIGAR, QUE DESARROLLEN Y APLIQUEN PROPUESTAS DE SOLUCIÓN A LA PROBLEMÁTICA DE LA SOCIEDAD”',
        telefono:'7474801022',
        correo:'contacto@itchilpancingo.edu.mx',
        url_documentos_de_validacion:'0e8a8f703fde021960d5dcfcac65f8ee',
        id_titular: 1,
        id_usuario:3,
        id_representante_legal: 2,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
