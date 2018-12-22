import { connect } from "react-redux";
import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import mapboxgl from "mapbox-gl";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { Create as CreateCampaignIcon } from "styled-icons/material/Create";

const GlobalStyle = createGlobalStyle`
  *,*::before,*::after{
      box-sizing:border-box;
  }
  html,body{
      height:100%;
      overflow-x:hidden;
  }
  html {
    font-size:62.5%;
  }
`;
const MapMenuOverlay = styled.aside`
  max-width: 80px;
  min-width: 80px;
  position: absolute;
  top: 0;
  right: 0;
  background: #fff;
  height: 100%;
  text-align: center;
  -webkit-box-shadow: -1px 0px 28px 1px rgba(222, 219, 222, 1);
  -moz-box-shadow: -1px 0px 28px 1px rgba(222, 219, 222, 1);
  box-shadow: -1px 0px 28px 1px rgba(222, 219, 222, 1);
  z-index: 20;
`;

const MapMenuNavIcon = styled.div`
  display: block;
  width: 50px;
  margin: 0 auto;
  height: 50px;
  border-radius: 100%;
  -webkit-box-shadow: -1px 0px 28px 1px rgba(222, 219, 222, 1);
  -moz-box-shadow: -1px 0px 28px 1px rgba(222, 219, 222, 1);
  box-shadow: -1px 0px 28px 1px rgba(222, 219, 222, 1);
  line-height: 50px;

  &:hover {
    transform: scale(1.1, 1.1);
    background: #f3f3f3;
  }
`;
const MapMenuNavItem = styled.li`list-style-type: none;`;
const MapMenuNavItemTitle = styled.small`color: #3a3335;`;
const MapMenuNav = styled.nav`
  padding: 1rem;
  list-style-type: none;
  display: block;
  margin: 0 auto;

  & > ${MapMenuNavItem} {
    margin-top: 1rem;
  }
`;

const SlideOutMenu = styled.div`
  width: 70%;
  max-width: 300px;
  position: absolute;
  top: 0;
  z-index: 0;
  right: ${props => (props.open ? "80px" : "-80%")};
  visibility: ${props => (props.open ? "visible" : "hidden")};
  background: #fff;
  transition: all 0.3s linear;
  height: 100%;
  -webkit-box-shadow: -1px 0px 28px 1px rgba(222, 219, 222, 1);
  -moz-box-shadow: -1px 0px 28px 1px rgba(222, 219, 222, 1);
  box-shadow: -1px 0px 28px 1px rgba(222, 219, 222, 1);
  overflow: hidden;
`;

const SlideOutMenuSubMenu = styled.div`
  width: 100%;
  position: absolute;
  z-index: ${props => props.page * 20};
  left: ${props =>
  props.currentPage >= props.page ? props.page * 20 + "px" : "100%"};
  top: 0px;
  background: #fff;
  transition: all 0.3s linear;
  visibility: ${props =>
  props.currentPage >= props.page ? "visible" : "hidden"};
  -webkit-box-shadow: -1px 0px 28px 1px rgba(222, 219, 222, 1);
  -moz-box-shadow: -1px 0px 28px 1px rgba(222, 219, 222, 1);
  box-shadow: -1px 0px 28px 1px rgba(222, 219, 222, 1);
  height: 100%;
`;


class StackedMenu{

    render(){
        return (
             <SlideOutMenu
          onClick={e => this.setCampaignPage(e, 0)}
          open={this.state.campaignOpen}
        >
          <button
            onClick={e => {
              this.setCampaignPage(e, this.state.campaignMenuPage + 1);
            }}
          >
            {JSON.stringify(this.state.campaignMenuPage)}{" "}
          </button>
          <SlideOutMenuSubMenu
            onClick={e => this.setCampaignPage(e, 1)}
            page={1}
            currentPage={this.state.campaignMenuPage}
          >
            <p>Sub menu one</p>
          </SlideOutMenuSubMenu>
          <SlideOutMenuSubMenu
            onClick={e => this.setCampaignPage(e, 2)}
            page={2}
            currentPage={this.state.campaignMenuPage}
          >
            <p>Sub menu two</p>
          </SlideOutMenuSubMenu>
          <SlideOutMenuSubMenu
            onClick={e => this.setCampaignPage(e, 3)}
            page={3}
            currentPage={this.state.campaignMenuPage}
          >
            <p>Sub menu three</p>
          </SlideOutMenuSubMenu>
        </SlideOutMenu>
        )
    }
}



export class Map extends React.Component {
  constructor() {
    super();
    this.Map = ReactMapboxGl({
      accessToken:
        "pk.eyJ1IjoiYmxhY2tqZW0iLCJhIjoiY2pwdDBzMDRxMDExczQxcGFkOTQ4Zzk3eSJ9.UwargVwExzoIPkGdBI51sA"
    });
    this.state = {
      campaignOpen: false,
      campaignMenuPage: 0,
      maxPages: 3
    };
  }
  openCampaign = () => {
    console.log("opening camp");
    this.setState(prevState => ({
      campaignOpen: !prevState.campaignOpen
    }));
  };

  setCampaignPage = (e, page) => {
    e.stopPropagation();
    console.log("setting campaign page to " + page);
    this.setState(prevState => ({
      campaignMenuPage: page
    }));
  };
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <this.Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}
          >
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
          </Layer>
        </this.Map>
        <MapMenuOverlay>
          <MapMenuNav>
            <MapMenuNavItem onClick={this.openCampaign}>
              <MapMenuNavIcon>
                <CreateCampaignIcon size="20" />
              </MapMenuNavIcon>
              <MapMenuNavItemTitle>Create campaign</MapMenuNavItemTitle>
            </MapMenuNavItem>
            <MapMenuNavItem>
              <MapMenuNavIcon>
                <CreateCampaignIcon size="20" />
              </MapMenuNavIcon>
              <MapMenuNavItemTitle>Create campaign</MapMenuNavItemTitle>
            </MapMenuNavItem>
            <MapMenuNavItem>
              <MapMenuNavIcon>
                <CreateCampaignIcon size="20" />
              </MapMenuNavIcon>
              <MapMenuNavItemTitle>Create campaign</MapMenuNavItemTitle>
            </MapMenuNavItem>
          </MapMenuNav>
        </MapMenuOverlay>
        <StackedMenu>
        </StackedMenu>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  currentTheme: state.theme
});

export default connect(mapStateToProps, null)(Map);
