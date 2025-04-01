import { Layer } from "react-map-gl/mapbox";
import * as React from "react";
import { LineLayerSpecification } from "mapbox-gl";

export type MapboxMetroFilledEdgeProps = Partial<Pick<LineLayerSpecification, "source">>;

export const MapboxMetroFilledEdge = (props: MapboxMetroFilledEdgeProps) => {
    return (
        <Layer
            {...props}
            type="line"
            paint={{
                "line-width": 4,
                "line-color": "#283343",
            }}
        />
    );
};
