export const EMPLOYEES_MARKERS = [
  {
    position: {
      lat: -42.777981,
      lng: -65.041811,
    },
    label: {
      text: 'Manolo García',
    },
    title: 'Manolo García',
    info: `
        Num. Empleado: <b>1234</b></br>
        Estado: <b>En reparto</b></br>
        Cant. Ordenes asignadas: <b>3</b></br>
        Cant. Ordenes pendientes: <b>2</b></br>
    `,
    icon: {
      url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      anchor: new google.maps.Point(32, 80),
      labelOrigin: new google.maps.Point(30, 30),
    },
  },
  {
    position: {
      lat: -42.760307, //-42.760307, -65.053484
      lng: -65.053484,
    },
    label: {
      text: 'Maria Celeste Gonzalez',
    },
    title: 'Marker title 2',
    info: `
        Num. Empleado: <b>1235</b></br>
        Estado: <b>Disponible</b></br>
        Cant. Ordenes asignadas: <b>0</b></br>
        Cant. Ordenes pendientes: <b>0</b></br>
    `,
    icon: {
      url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      anchor: new google.maps.Point(32, 80),
      labelOrigin: new google.maps.Point(30, 30),
    },
  },
  {
    position: {
      lat: -42.785005, //-42.785005, -65.012929
      lng: -65.012929,
    },
    label: {
      text: 'Sandra Noemi Fernandez',
    },
    title: 'Marker title 2',
    info: `
        Num. Empleado: <b>1236</b></br>
        Estado: <b>En reparto</b></br>
        Cant. Ordenes asignadas: <b>1</b></br>
        Cant. Ordenes pendientes: <b>0</b></br>
    `,
    icon: {
      url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      anchor: new google.maps.Point(32, 80),
      labelOrigin: new google.maps.Point(30, 30),
    },
  },
  //   {
  //     position: {
  //       lat: -42.790422, //-42.785005, -65.012929
  //       lng: -65.080005,
  //     },
  //     label: {
  //       text: 'Rafa Nadal',
  //     },
  //     title: 'Marker title 2',
  //     info: `
  //     Num. Empleado: <b>1236</b></br>
  //     Estado: <b>En reparto</b></br>
  //     Cant. Ordenes asignadas: <b>3</b></br>
  //     Cant. Ordenes pendientes: <b>2</b></br>
  // `,
  //     icon: {
  //       url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  //       anchor: new google.maps.Point(32, 80),
  //       labelOrigin: new google.maps.Point(30, 30),
  //     },
  //   },
  //   {
  //     position: {
  //       lat: -42.67125,
  //       lng: -65.67125,
  //     },
  //     label: {
  //       text: 'Mauri Savarro',
  //     },
  //     title: 'Marker title 2',
  //     info: `
  //     Num. Empleado: <b>1237</b></br>
  //     Estado: <b>En reparto</b></br>
  //     Cant. Ordenes asignadas: <b>3</b></br>
  //     Cant. Ordenes pendientes: <b>2</b></br>
  // `,
  //     icon: {
  //       url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  //       anchor: new google.maps.Point(32, 80),
  //       labelOrigin: new google.maps.Point(30, 30),
  //     },
  //   },
];

export const ORDERS_MARKERS = [
  {
    position: {
      lat: -42.780131,
      lng: -65.055571,
    },
    label: {
      text: 'Orden #1234',
    },
    title: 'Orden #1234',
    info: `
            Num. Orden: <b>1234</b></br>
            Tipo: <b>Medición</b></br>
            Estado: <b>Pendiente</b></br>
            Dir: <b>Se debe verificar el estado del medidor</b></br>
            Descripción: <b>Pendiente</b></br>
            Cliente: <b>Jose Manuel Arza</b></br>
            Tel.: <b>2804190587</b></br>
        `,
    icon: {
      url: 'http://maps.google.com/mapfiles/ms/icons/homegardenbusiness.png',
      anchor: new google.maps.Point(32, 80),
      labelOrigin: new google.maps.Point(30, 30),
    },
  },
  {
    position: {
      lat: -42.782529,
      lng: -65.02696,
    },
    label: {
      text: 'Orden #1235',
    },
    title: 'Orden #1235',
    info: `
            Num. Orden: <b>1235</b></br>
            Tipo: <b>Desconexión</b></br>
            Estado: <b>Pendiente</b></br>
            Dir: <b>Bartolomé Mitre 1889</b></br>
            Descripción: <b>Se debe realizar una desconexión del medidor.</b></br>
            Cliente: <b>Alfredo Casero</b></br>
            Tel.: <b>2804894484</b></br>
        `,
    icon: {
      url: 'http://maps.google.com/mapfiles/ms/icons/homegardenbusiness.png',
      anchor: new google.maps.Point(32, 80),
      labelOrigin: new google.maps.Point(30, 30),
    },
  },
  {
    position: {
      lat: -42.781321, //-42.781321, -65.029085
      lng: -65.029085,
    },
    label: {
      color: '#333',
      text: 'Orden #1236',
    },
    title: 'Orden #1236',
    info: `
            Num. Orden: <b>1236</b></br>
            Tipo: <b>Medición</b></br>
            Estado: <b>Pendiente</b></br>
            Dir: <b>Marcos A. Zar 1663</b></br>
            Descripción: <b>Pendiente</b></br>
            Cliente: <b>Jose Manuel Arza</b></br>
            Tel.: <b>2804190587</b></br>
        `,
    icon: {
      url: 'http://maps.google.com/mapfiles/ms/icons/homegardenbusiness.png',
      anchor: new google.maps.Point(32, 80),
      labelOrigin: new google.maps.Point(30, 30),
    },
  },
];
