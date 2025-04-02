import { useGame } from "@/contexts/game/use-game";
import { buildMapLayers } from "@/components/Game/shared/utils/build-map-layers";
import { Feature, FeatureCollection, GeoJsonProperties, LineString, Point } from "geojson";
import { buildGeoJsonPointFromCoordinates } from "@/lib/mapbox/utils/build-geo-json-point-from-coordinates";

export type UseGameMapReturnType =
    | {
          initialized: false;
          endpointsGeoJson: null;
          metroStationsGeoJson: null;
          rightPathsGeoJson: null;
          wrongPathsGeoJson: null;
      }
    | {
          initialized: true;
          endpointsGeoJson: [Feature<Point>, Feature<Point>];
          metroStationsGeoJson: FeatureCollection<Point, GeoJsonProperties & { label: string }>;
          rightPathsGeoJson: FeatureCollection<LineString>;
          wrongPathsGeoJson: FeatureCollection<LineString>;
      };

export const useGameMap = (): UseGameMapReturnType => {
    const { discoveredStations, endpoints } = useGame();

    if (discoveredStations === null || endpoints === null) {
        return {
            initialized: false,
            endpointsGeoJson: null,
            metroStationsGeoJson: null,
            rightPathsGeoJson: null,
            wrongPathsGeoJson: null,
        };
    }

    const mapLayers = buildMapLayers(discoveredStations, endpoints);

    return {
        initialized: true,
        endpointsGeoJson: [
            buildGeoJsonPointFromCoordinates(endpoints[0].coordinates),
            buildGeoJsonPointFromCoordinates(endpoints[1].coordinates),
        ],
        ...mapLayers,
    };
};
