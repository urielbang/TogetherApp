import React from "react";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { SlBadge } from "react-icons/sl";
import { TfiWorld } from "react-icons/tfi";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { TfiEmail } from "react-icons/tfi";
import { FaHotel } from "react-icons/fa6";
import { BsFillGeoAltFill } from "react-icons/bs";
import { AiOutlineYoutube } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { GrAnalytics } from "react-icons/gr";
import { CiChat1 } from "react-icons/ci";

import { FiUser } from "react-icons/fi";

import "./style.css";

export default function SideBar() {
  return (
    <div className="sideBar">
      <div className="containerSideBar">
        <div className="newDeedIcons">
          <span className="txtSpan">New Feeds</span>
          <ul className="listFeedIcons">
            <li>
              <PiTelevisionSimpleBold className="Newsfeed" />
              <span className="textStyle">Newsfeed</span>
            </li>
            <li>
              <SlBadge className="budgesicon" />
              <span className="textStyle">Badges</span>
            </li>
            <li>
              <HiOutlineLightningBolt className="groupes" />{" "}
              <span className="textStyle">Popular Groups</span>
            </li>

            <li>
              <TfiWorld className="exploreIcon" />{" "}
              <span className="textStyle">Explore Stories</span>
            </li>
            <li>
              <FiUser className="authorProfile" />{" "}
              <span className="textStyle">Author Profile </span>
            </li>
          </ul>
        </div>
        <div className="newDeedIcons">
          <span className="txtSpan">More Pages</span>
          <ul>
            <li>
              <TfiEmail className="iconMoer" />
              <span>Email Box</span>
            </li>
            <li>
              <FaHotel className="iconMoer" />
              <span>Near Hotel</span>
            </li>
            <li>
              <BsFillGeoAltFill className="iconMoer" />
              <span>Latest Event</span>
            </li>
            <li>
              <AiOutlineYoutube className="iconMoer" />
              <span>Live Stream</span>
            </li>
          </ul>
        </div>
        <div className="AccountIcons">
          <span className="txtSpan">Account</span>
          <ul>
            <li>
              <CiSettings className="acoountIcon" /> <span> Settings</span>
            </li>
            <li>
              <GrAnalytics className="acoountIcon" /> <span>Analytics</span>
            </li>
            <li>
              <CiChat1 className="acoountIcon" /> <span>Chat</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
