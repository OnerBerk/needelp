import * as React from 'react';

export class DisplayMapClass extends React.Component {
  mapRef = React.createRef();
  

  state = {

    map: null
  };

  componentDidMount() {

    const H = window.H;
    const platform = new H.service.Platform({
        apikey: "DObEqaiEw_Oqtou1Km77hp-SPAfeSVM2yr2ewaUUz7c"
    });

    const defaultLayers = platform.createDefaultLayers();


    const map = new H.Map(
        
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
      
        center: { lat: 48.81, lng: 2.36 },
        zoom: 9,
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    
    //const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // permet de creer une interactivité avec le user
    var ui = H.ui.UI.createDefault(map, defaultLayers, 'fr-FR');

    var bubble = new H.ui.InfoBubble({ lng: 2.36, lat: 48.81 }, 
        {content: '<b>Hello World!</b>'});

    // Add info bubble to the UI:
    ui.addBubble(bubble);

    this.setState({ map });
  }
  
  

  componentWillUnmount() {
    
    this.state.map.dispose();
  }

  render() {
    return (
      <div ref={this.mapRef} style={{ height: "500px" }} />
    );
  }
}