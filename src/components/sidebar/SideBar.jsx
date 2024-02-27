import React from "react";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { SlBadge } from "react-icons/sl";
import { TfiWorld } from "react-icons/tfi";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { FiUser } from "react-icons/fi";

import "./style.css";

export default function SideBar() {
  return (
    <div className="sideBar">
      <div className="newDeedIcons">
        <ul className="listFeedIcons">
          <li>
            <PiTelevisionSimpleBold /> <span>Newsfeed</span>
          </li>
          <li>
            <SlBadge />
            <span>Badges</span>
          </li>
          <li>
            <HiOutlineLightningBolt /> <span>Popular Groups</span>
          </li>

          <li>
            <TfiWorld /> <span>Explore Stories</span>
          </li>
          <li>
            <FiUser /> <span>Author Profile </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
