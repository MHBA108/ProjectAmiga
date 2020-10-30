import React, { Component, useRef } from "react";
import { Alert, Text, View, TouchableOpacity, Platform } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../assets/COLORS";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import LottieView from "lottie-react-native";
import SelectableChips from "react-native-chip/SelectableChips";
import CustomCallout from "./CustomCallout";
import Modal from "react-native-modal";
import getDirections from "react-native-google-maps-directions";

//const googleAPIKey = "AIzaSyCLn-r29khpkY36M7Lk53fc60o-qGWNGqw"; //this one is fake haha :0
const googleAPIKey = "AIzaSyCLn-r29khpkY36M7Lk53fc60o-qMPNGqw";
interface ResourcesMapProps {}

export default class ResourcesMap extends Component<
  ResourcesMapProps,
  {
    latitude: any;
    longitude: any;
    mapRegion: any;
    hasLocationPermissions: boolean;
    locationResult: any;
    places: Array<Object>;
    isModalVisible: boolean;
    modalName: any;
    modalAddress: any;
    modalCoordinate: any;
    parks: Array<Object>;
    libraries: Array<Object>;
    cafes: Array<Object>;
    therapists: Array<Object>;
  }
> {
  constructor(props: ResourcesMapProps) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      mapRegion: null,
      hasLocationPermissions: false,
      locationResult: null,
      places: [],
      isModalVisible: false,
      modalName: null,
      modalAddress: null,
      modalCoordinate: null,
      parks: [],
      libraries: [],
      cafes: [],
      therapists: [],
    };
  }
  iconRef = new Map([
    ["Park", require("../assets/images/pine-tree.png")],
    ["Library", require("../assets/images/book-open-page-variant.png")],
    ["Cafe", require("../assets/images/coffee.png")],
    ["Therapist", require("../assets/images/tooltip-account.png")],
    ["Test", require("../assets/images/tooltip-account.png")],
  ]);
  //0 means the type markers are not showing on the map, 1 means they are
  hiddenRef = new Map([
    ["Park", 0],
    ["Library", 0],
    ["Cafe", 0],
    ["Therapist", 0],
    ["Test", 0],
  ]);
  chipArray = new Array("Park", "Library", "Cafe", "Therapist");

  passDataToModal = (name: any, address: any, coordinate: any) => {
    this.setState(
      { modalName: name, modalAddress: address, modalCoordinate: coordinate },
      () => {
        this.openModal();
      }
    );
  };
  openModal = () => {
    this.setState({
      isModalVisible: true,
    });
  };
  closeModal() {
    this.setState({ isModalVisible: false });
  }
  componentDidMount() {
    this._getLocationAsync();
  }
  _handleMapRegionChange = (mapRegion: any) => {
    this.setState({ mapRegion });
  };
  handleGetDirections = (latitudeDir: any, longitudeDir: any) => {
    //let { userLatitude, userLongitude } = this.state.mapRegion;
    const data = {
      destination: {
        latitude: latitudeDir,
        longitude: longitudeDir,
      },
    };
    getDirections(data);
  };
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied",
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location) });

    // Center the map on the location we just fetched.
    this.setState({
      mapRegion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.04,
      },
    });
  };
  fetchNearestPlacesFromGoogle = (type: String) => {
    let { latitude, longitude } = this.state.mapRegion;
    let radius = 2 * 1000;

    const url =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
      latitude +
      "," +
      longitude +
      "&radius=" +
      radius +
      "&name=" +
      type +
      "&key=" +
      googleAPIKey;

    fetch(url)
      .then((res) => {
        console.log("URL:" + url);
        return res.json();
      })
      .then((res) => {
        for (let googlePlace of res.results) {
          var places: Array<Object> = this.state.places;
          var place: any = {};
          var myLat = googlePlace.geometry.location.lat;
          var myLong = googlePlace.geometry.location.lng;
          var coordinate = {
            latitude: myLat,
            longitude: myLong,
          };
          place["placeTypes"] = googlePlace.types;
          place["searchType"] = type;
          place["coordinate"] = coordinate;
          place["placeId"] = googlePlace.place_id;
          place["placeName"] = googlePlace.name;
          place["address"] = googlePlace.vicinity;
          places.push(place);
          if (type == "Park") {
            this.state.parks.push(place);
            // console.log(this.state.parks);
          } else if (type == "Library") {
            this.state.libraries.push(place);
            // console.log(this.state.parks);
          } else if (type == "Cafe") {
            this.state.cafes.push(place);
            // console.log(this.state.parks);
          } else if (type == "Therapist") {
            this.state.therapists.push(place);
          }
        }

        this.setState({ places: this.state.places });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //this code is here so I don't waste API credits when testing!!!!!

  // renderMarkers = (placeType: Array<String>) => {
  //   placeType.map((type) => {
  //     var places: Array<Object> = [];
  //     var place: any = {};
  //     var testcoordinate = {
  //       latitude: 33.787,
  //       longitude: -84.316,
  //     };
  //     place["placeTypes"] = "cafe";
  //     place["searchType"] = type;
  //     place["coordinate"] = testcoordinate;
  //     place["placeId"] = "12345678";
  //     place["placeName"] = "My Secret Hiding Spot";
  //     place["address"] = "1234 Kachow Kachinga";
  //     this.state.places.push(place);
  //     this.setState({ places: this.state.places });
  //   });
  // };

  mapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#242f3e",
        },
      ],
    },
    {
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#464d77",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#23273b",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#fbd1a2",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#263c3f",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#343a59",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#6b9a76",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#38414e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#343a59",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#212a37",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9ca5b3",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#746855",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#1f2835",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#f3d19c",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [
        {
          color: "#2f3948",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#17263c",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#2c304a",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#515c6d",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#17263c",
        },
      ],
    },
  ];

  render() {
    return (
      <View>
        <View style={styles.container}>
          {this.state.locationResult === null ? (
            <View>
              <View style={styles.animationStyle}>
                <LottieView
                  source={require("../assets/images/29120-loading-map.json")}
                  autoPlay
                  loop
                  style={{ alignSelf: "center", height: 150 }}
                />
                <Text
                  style={{
                    alignSelf: "center",
                    color: "white",
                    fontFamily: "HindSiliguri_600SemiBold",
                    fontSize: 18,
                  }}
                >
                  Finding your current location...
                </Text>
              </View>
            </View>
          ) : this.state.hasLocationPermissions === false ? (
            <Text>Location permissions are not granted.</Text>
          ) : this.state.mapRegion === null ? (
            <Text>Map region doesn't exist.</Text>
          ) : (
            <View>
              <MapView
                style={{ alignSelf: "stretch", height: 440 }}
                provider={PROVIDER_GOOGLE}
                customMapStyle={this.mapStyle}
                showsUserLocation
                rotateEnabled={false}
                region={this.state.mapRegion}
                onRegionChangeComplete={this._handleMapRegionChange}
              >
                {this.state.parks.map((marker: any, index: number) => {
                  return (
                    <Marker
                      key={index}
                      identifier={marker.placeId}
                      tracksViewChanges={true}
                      image={this.iconRef.get(marker.searchType)}
                      coordinate={marker.coordinate}
                      title={marker.placeName}
                      description={marker.address}
                    >
                      <Callout
                        tooltip
                        onPress={() => {
                          this.passDataToModal(
                            marker.placeName,
                            marker.address,
                            marker.coordinate
                          );
                        }}
                      >
                        <CustomCallout>
                          <Text>{marker.placeName}</Text>
                          <Text>{marker.address}</Text>
                        </CustomCallout>
                      </Callout>
                    </Marker>
                  );
                })}
                {this.state.libraries.map((marker: any, index: number) => {
                  return (
                    <Marker
                      key={index}
                      identifier={marker.placeId}
                      tracksViewChanges={true}
                      image={this.iconRef.get(marker.searchType)}
                      coordinate={marker.coordinate}
                      title={marker.placeName}
                      description={marker.address}
                    >
                      <Callout
                        tooltip
                        onPress={() => {
                          this.passDataToModal(
                            marker.placeName,
                            marker.address,
                            marker.coordinate
                          );
                        }}
                      >
                        <CustomCallout>
                          <Text>{marker.placeName}</Text>
                          <Text>{marker.address}</Text>
                        </CustomCallout>
                      </Callout>
                    </Marker>
                  );
                })}
                {this.state.cafes.map((marker: any, index: number) => {
                  return (
                    <Marker
                      key={index}
                      identifier={marker.placeId}
                      tracksViewChanges={true}
                      image={this.iconRef.get(marker.searchType)}
                      coordinate={marker.coordinate}
                      title={marker.placeName}
                      description={marker.address}
                    >
                      <Callout
                        tooltip
                        onPress={() => {
                          this.passDataToModal(
                            marker.placeName,
                            marker.address,
                            marker.coordinate
                          );
                        }}
                      >
                        <CustomCallout>
                          <Text>{marker.placeName}</Text>
                          <Text>{marker.address}</Text>
                        </CustomCallout>
                      </Callout>
                    </Marker>
                  );
                })}
                {this.state.therapists.map((marker: any, index: number) => {
                  return (
                    <Marker
                      key={index}
                      identifier={marker.placeId}
                      tracksViewChanges={true}
                      image={this.iconRef.get(marker.searchType)}
                      coordinate={marker.coordinate}
                      title={marker.placeName}
                      description={marker.address}
                    >
                      <Callout
                        tooltip
                        onPress={() => {
                          this.passDataToModal(
                            marker.placeName,
                            marker.address,
                            marker.coordinate
                          );
                        }}
                      >
                        <CustomCallout>
                          <Text>{marker.placeName}</Text>
                          <Text>{marker.address}</Text>
                        </CustomCallout>
                      </Callout>
                    </Marker>
                  );
                })}

                {/*   //this code is here so I don't waste API credits when testing!!!!!
                {this.state.places.map((marker: any, index: number) => {
                  
                  return (
                    <Marker
                      key={index}
                      identifier={marker.placeId}
                      tracksViewChanges={true}
                      image={this.iconRef.get(marker.searchType)}
                      coordinate={marker.coordinate}
                      title={marker.placeName}
                      description={marker.address}
                    >
                      <Callout
                        tooltip
                        onPress={() => {
                          this.passDataToModal(
                            marker.placeName,
                            marker.address,
                            marker.coordinate
                          );
                        }}
                      >
                        <CustomCallout>
                          <Text>{marker.placeName}</Text>
                          <Text>{marker.address}</Text>
                        </CustomCallout>
                      </Callout>
                    </Marker>
                  );
                })} */}
              </MapView>
              <Modal
                isVisible={this.state.isModalVisible}
                onBackdropPress={() => this.closeModal()}
                onSwipeComplete={() => this.closeModal()}
                swipeDirection="down"
                backdropColor={COLORS.darkBlue}
                backdropOpacity={0.6}
                animationIn="zoomInDown"
                animationOut="zoomOutDown"
                animationInTiming={300}
                animationOutTiming={300}
                backdropTransitionInTiming={300}
                backdropTransitionOutTiming={300}
              >
                <View style={styles.modalContainer}>
                  <Text style={styles.textStyle}>{this.state.modalName}</Text>
                  <Text style={styles.subtextStyle}>
                    Address: {this.state.modalAddress}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      console.log("press modal:");
                      this.handleGetDirections(
                        this.state.modalCoordinate.latitude,
                        this.state.modalCoordinate.longitude
                      );
                    }}
                    style={styles.button}
                  >
                    <Text>Get directions to {this.state.modalName}</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
              <SelectableChips
                initialChips={this.chipArray}
                onChangeChips={(chips: SelectableChips) => {
                  console.log(chips);
                  chips.map((type: any) => {
                    //sets all values to be hidden (temporary)
                    this.hiddenRef.forEach((value, key, map) =>
                      map.set(key, 0)
                    );
                    //sets all the selected chips to be shown
                    this.hiddenRef.set(type, 1);

                    this.fetchNearestPlacesFromGoogle(type);
                  });
                  this.chipArray.map((placeType: any) => {
                    if (
                      this.hiddenRef.get(placeType) == 0 &&
                      placeType === "Park"
                    ) {
                      this.setState({ parks: [] });
                    } else if (
                      this.hiddenRef.get(placeType) == 0 &&
                      placeType === "Library"
                    ) {
                      this.setState({ libraries: [] });
                    } else if (
                      this.hiddenRef.get(placeType) == 0 &&
                      placeType === "Cafe"
                    ) {
                      this.setState({ cafes: [] });
                    } else if (
                      this.hiddenRef.get(placeType) == 0 &&
                      placeType === "Therapist"
                    ) {
                      this.setState({ therapists: [] });
                    }
                    //console.log(this.hiddenRef.get(placeType));
                  });
                  console.log("length of chips array: " + chips.length);
                  if (chips.length == 0) {
                    //console.log("length: " + chips.length);
                    this.setState({ parks: [] });
                    this.setState({ libraries: [] });
                    this.setState({ cafes: [] });
                    this.setState({ therapists: [] });
                  }
                }}
                chipStyleSelected={styles.chipSelectedStyle}
                chipStyle={styles.chipStyle}
                valueStyle={styles.valueStyle}
                valueStyleSelected={styles.valueStyle}
              />
              {/* //this code is here so I don't waste API credits when testing!!!!!
               <SelectableChips
                initialChips={["Test"]}
                onChangeChips={(chips: SelectableChips) => {
                  console.log(chips);
                  this.renderMarkers(chips);
                  if (chips.length == 0) {
                    console.log("length: " + chips.length);
                    this.setState({ places: [] });
                  }
                }}
                alertRequired={false}
                chipStyleSelected={styles.chipSelectedStyle}
                chipStyle={styles.chipStyle}
                valueStyle={styles.valueStyle}
                valueStyleSelected={styles.valueStyle}
              /> */}
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
    alignItems: "center",
    backgroundColor: COLORS.pink,
    padding: 10,
    borderRadius: 20,
  },
  animationStyle: {
    alignSelf: "stretch",
    height: 180,
  },
  chipSelectedStyle: {
    backgroundColor: COLORS.yellow,
    borderColor: COLORS.yellow,
  },
  valueStyle: {
    color: COLORS.darkBlue,
    fontSize: 16,
  },
  chipStyle: {
    backgroundColor: COLORS.lightBlue,
    borderColor: COLORS.lightBlue,
  },
  modalContainer: {
    marginTop: 50,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    //height: 30,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 20,
    padding: 10,
    shadowColor: "blue",
  },
  textStyle: {
    color: "white",
    fontSize: 20,
  },
  subtextStyle: {
    color: COLORS.beige,
    fontSize: 16,
  },
});
