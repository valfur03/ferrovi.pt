import { Layer } from "react-map-gl/mapbox";
import * as React from "react";
import { CircleLayerSpecification } from "mapbox-gl";

export type MapboxMetroNodeLabelProps = Partial<Pick<CircleLayerSpecification, "source">> & {
    children: string;
};

export const MapboxMetroNodeLabel = ({ children, ...props }: MapboxMetroNodeLabelProps) => {
    return (
        <Layer
            {...props}
            type="symbol"
            layout={{
                "text-field": children,
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
    );
};
