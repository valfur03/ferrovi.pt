import { Layer } from "react-map-gl/mapbox";
import * as React from "react";
import { LineLayerSpecification } from "mapbox-gl";

export type MapboxGeoGuessDistanceProps = Partial<Pick<LineLayerSpecification, "source">>;

export const MapboxGeoGuessDistance = (props: MapboxGeoGuessDistanceProps) => {
    return (
        <Layer
            source={props.source}
            type="line"
            paint={{
                "line-dasharray": [1, 3, 1],
                "line-width": 2,
                "line-color": "#818181",
            }}
        />
    );
};
