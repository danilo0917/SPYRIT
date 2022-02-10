//import useState hook to create menu collapse state
import React, { useState } from "react";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import {  FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { Link } from 'react-router-dom'


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";
import swapIcon from "../../assets/icons/swap.png"
import poolIcon from "../../assets/icons/pool.png"
import farmIcon from "../../assets/icons/farm.png"
import stakeIcon from "../../assets/icons/stake.png"
// import presaleIcon from "../../assets/icons/presale.png"
import mintIcon from "../../assets/icons/mint.png"
import nftStakeIcon from "../../assets/icons/mint.png"

const SideMenu = () => {
  
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)

    //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            {/* <div className="logotext">
              <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
            </div> */}
            <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          <div style={{paddingTop: "30px"}} />
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<img src={swapIcon} />}>
                SWAP
                <Link to="/swap" />
              </MenuItem>
              <MenuItem icon={<img src={poolIcon} />}>POOL <Link to="/pool" /> </MenuItem>
              <MenuItem icon={<img src={farmIcon} />}>FARMS <Link to="/farm" /> </MenuItem>
              <MenuItem icon={<img src={stakeIcon} />}>STAKE <Link to="/stake" /> </MenuItem>
              {/* <MenuItem icon={<img src={presaleIcon} />}>PRESALE <Link to="/presale" /></MenuItem> */}
              <MenuItem icon={<img src={mintIcon} />}>NFT MINT <Link to="/mint" /> </MenuItem>
              <MenuItem icon={<img src={nftStakeIcon} />}>NFT StAKING <Link to="/nftstake" /> </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default SideMenu;