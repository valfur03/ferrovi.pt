import { Layer } from "react-map-gl/mapbox";
import * as React from "react";
import { CircleLayerSpecification } from "mapbox-gl";

export type MapboxMetroToNodeProps = Partial<Pick<CircleLayerSpecification, "source">>;

export const MapboxMetroToNode = (props: MapboxMetroToNodeProps) => {
    return (
        <Layer
            {...props}
            type="circle"
            paint={{
                "circle-radius": {
                    type: "exponential",
                    base: 1.6,
                    stops: [
                        [9, 2.5],
                        [22, 250],
                    ],
                },
                "circle-color": "#f54242",
                "circle-stroke-color": "#464646",
                "circle-stroke-width": {
                    type: "exponential",
                    base: 1.6,
                    stops: [
                        [9, 1.5],
                        [22, 100],
                    ],
                },
            }}
        />
    );
};
