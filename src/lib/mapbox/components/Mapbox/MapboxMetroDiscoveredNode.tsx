import { Layer } from "react-map-gl/mapbox";
import * as React from "react";
import { CircleLayerSpecification } from "mapbox-gl";

export type MapboxMetroDiscoveredNodeProps = Partial<Pick<CircleLayerSpecification, "source">> & {
    color?: string;
    strokeColor?: string;
};

export const MapboxMetroDiscoveredNode = ({
    color = "#fffaf4",
    strokeColor = "#464646",
    ...props
}: MapboxMetroDiscoveredNodeProps) => {
    return (
        <>
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
                    "circle-color": color,
                    "circle-stroke-color": strokeColor,
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
            <Layer
                {...props}
                type="symbol"
                layout={{
                    "text-field": ["get", "label"],
                    "text-variable-anchor": ["top", "bottom"],
                    "text-radial-offset": 1,
                    "text-justify": "auto",
                    "text-size": {
                        type: "exponential",
                        base: 1.6,
                        stops: [
                            [9, 0],
                            [22, 800],
                        ],
                    },
                }}
            />
        </>
    );
};
