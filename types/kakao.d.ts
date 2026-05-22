interface KakaoMapsLatLng {
  getLat(): number
  getLng(): number
}

interface KakaoMapsLatLngBounds {
  extend(latlng: KakaoMapsLatLng): void
}

interface KakaoMapsMap {
  setCenter(latlng: KakaoMapsLatLng): void
  setLevel(level: number): void
  panTo(latlng: KakaoMapsLatLng): void
  setBounds(bounds: KakaoMapsLatLngBounds): void
}

interface KakaoMapsMarker {
  setMap(map: KakaoMapsMap | null): void
}

interface KakaoMapsInfoWindow {
  open(map: KakaoMapsMap, marker: KakaoMapsMarker): void
  close(): void
}

interface KakaoMapsMaps {
  load(callback: () => void): void
  LatLng: new (lat: number, lng: number) => KakaoMapsLatLng
  Map: new (container: HTMLElement, options: { center: KakaoMapsLatLng; level: number }) => KakaoMapsMap
  Marker: new (options: { position: KakaoMapsLatLng; map?: KakaoMapsMap }) => KakaoMapsMarker
  InfoWindow: new (options: { content: string; removable?: boolean }) => KakaoMapsInfoWindow
  LatLngBounds: new () => KakaoMapsLatLngBounds
  event: {
    addListener(target: KakaoMapsMarker, type: string, handler: () => void): void
  }
}

interface Kakao {
  maps: KakaoMapsMaps
}

declare global {
  interface Window {
    kakao: Kakao
  }
}

export {}
