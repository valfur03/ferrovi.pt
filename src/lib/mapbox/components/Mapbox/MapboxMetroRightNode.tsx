import { Layer } from "react-map-gl/mapbox";
import * as React from "react";
import { CircleLayerSpecification } from "mapbox-gl";

export type MapboxMetroRightNodeProps = Partial<Pick<CircleLayerSpecification, "source">>;

export const MapboxMetroRightNode = (props: MapboxMetroRightNodeProps) => {
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
                "circle-color": "#0dcb26",
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
