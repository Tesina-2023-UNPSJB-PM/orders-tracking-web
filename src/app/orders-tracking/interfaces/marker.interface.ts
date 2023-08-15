export interface IMarker {
    position: {
        lat: number;
        lng: number;
      };
      label: {
        text: string;
      };
      title: string;
      info: string;
      icon: {
        url: string;
      };
}