/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from "clsx";
import { useEffect, useState } from "react";
import { GeoJSONSource, LngLat, Map } from "mapbox-gl";

import mapbox from "providers/mapbox";
import { Typography } from "ui/typography/Typography";
import { Modal } from "ui/modal/Modal";
import { Button } from "ui/button/Button";

import { PolygonBoundsProps } from "./PolygonBounds.types";
import styles from "./PolygonBounds.module.scss";

import "mapbox-gl/dist/mapbox-gl.css";

const latLngPoints: LngLat[] = [];

export const PolygonBounds: React.FC<PolygonBoundsProps> = ({
  className,
  informersCoordinates,
  onSaveBounds,
  onSaveBoundsState,
  getUsersByLocationBoundsState,
}) => {
  const [, setMap] = useState<Map>();
  const [modalMap, setModalMap] = useState<Map>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [estUsersByLocationBoundsCount, setEstUsersByLocationBoundsCount] = useState(0);

  useEffect(() => {
    const container = new mapbox.lib.Map({
      container: "map",
      style: "mapbox://styles/netpoe/clfcp3c4y000801nywoluppzr",
      center: [-74.5, 40],
      zoom: 9,
    });

    setMap(container);

    return () => {
      container.remove();
    };
  }, []);

  useEffect(() => {
    if (!getUsersByLocationBoundsState.data?.getUsersByLocationBounds) {
      return;
    }

    setEstUsersByLocationBoundsCount(getUsersByLocationBoundsState.data?.getUsersByLocationBounds.length);
  }, [getUsersByLocationBoundsState.data]);

  const onClickModalClose = () => {
    setIsModalOpen(false);

    modalMap!.remove();
  };

  const onClickSaveModalMap = async () => {
    const polygonString = mapbox.makePolygonString(latLngPoints);

    try {
      await onSaveBounds(polygonString);
    } catch (error) {
      // @TODO Handle onClickSaveModalMap error — use campaign service error codes
      console.error(error);
    }
  };

  const onClickModalMapClear = () => {
    latLngPoints.splice(0, latLngPoints.length);

    (modalMap!.getSource("campaign-bounds") as GeoJSONSource)?.setData({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [[]],
          },
        },
      ],
    });
  };

  const onClickModalOpen = () => {
    setIsModalOpen(true);

    setTimeout(() => {
      const container = new mapbox.lib.Map({
        container: "modal-map",
        style: "mapbox://styles/netpoe/clfcp3c4y000801nywoluppzr",
        center: [-121.403_732, 40.492_392],
        zoom: 3,
      });

      setModalMap(container);

      container.on("load", (_event) => {
        informersCoordinates.forEach((point) => {
          new mapbox.lib.Marker({ color: "#d7f205" }).setLngLat([point.lng, point.lat]).addTo(container);
        });

        // @TODO Load latLngPoints from campaign.bounds to show existing bounds
        const features = mapbox.makeFeatures(latLngPoints);

        container.addSource("campaign-bounds", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features,
          },
        });

        container.addLayer({
          id: "campaign-polygon",
          type: "fill",
          source: "campaign-bounds",
          paint: {
            "fill-color": "#d7f205",
            "fill-opacity": 0.4,
          },
          filter: ["==", "$type", "Polygon"],
        });

        container.addLayer({
          id: "campaign-points",
          type: "circle",
          source: "campaign-bounds",
          paint: {
            "circle-radius": 4,
            "circle-color": "#d7f205",
          },
          filter: ["==", "icon", "circle"],
        });
      });

      container.on("click", (event) => {
        latLngPoints.push(event.lngLat);

        const features = mapbox.makeFeatures(latLngPoints);

        (container.getSource("campaign-bounds") as GeoJSONSource)?.setData({
          type: "FeatureCollection",
          features,
        });
      });
    }, 300);
  };

  return (
    <>
      <div className={clsx(styles["polygon-bounds"], className)}>
        <div id="map" className={styles["polygon-bounds__map"]} />
        <span />
        <div className={styles["polygon-bounds__overlay"]} onClick={onClickModalOpen}>
          <Typography.TextLead flat>Set campaign bounds</Typography.TextLead>
        </div>
      </div>

      <Modal
        isOpened={isModalOpen}
        onClose={onClickModalClose}
        aria-labelledby="map-bounds-modal"
        fullscreenVariant="default"
      >
        <Modal.Header onClose={onClickModalClose}>
          <Typography.Headline2>Draw your campaign area</Typography.Headline2>
          <Typography.Text flat>Click or tap the map to draw a bounding box</Typography.Text>
        </Modal.Header>
        <Modal.Content flat className={styles["polygon-bounds__modal--content"]}>
          <div id="modal-map" className={styles["polygon-bounds__modal--map"]} />
          <span />
          <div className={styles["polygon-bounds__modal--map-stats"]}>
            <div>
              <Typography.Description>Est. users by region drawn</Typography.Description>
              <Typography.Text flat>
                {onSaveBoundsState.loading || getUsersByLocationBoundsState.loading
                  ? "loading"
                  : estUsersByLocationBoundsCount}
              </Typography.Text>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <div>
            <Button variant="outlined" color="secondary" onClick={onClickModalMapClear}>
              Clear
            </Button>
            <Button variant="outlined" onClick={onClickSaveModalMap}>
              Set bounds
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClickModalClose}>
              Done
            </Button>
          </div>
        </Modal.Actions>
      </Modal>
    </>
  );
};
