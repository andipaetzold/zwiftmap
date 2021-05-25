export interface Streams {
  watts: Stream;
  latlng: Stream<[number, number]>;
  velocity_smooth: Stream;
  cadence: Stream;
  distance: Stream;
  altitude: Stream;
  heartrate: Stream;
  time: Stream;
}

interface Stream<T = number> {
  data: T[];
  series_type: string;
  original_size: number;
  resolution: string;
}
