export class GeocoderResponse {
  status: string;
  errorMessage: string;
  results: google.maps.GeocoderResult[];

  constructor(
    status: string,
    results: google.maps.GeocoderResult[],
    errorMessage?: string
  ) {
    this.status = status;
    this.results = results ?? [];
    this.errorMessage = errorMessage ?? '';
  }
}
