import React from "react";
import { BsFillPersonFill, BsCalendarDate } from "react-icons/bs";
import { SiTestcafe } from "react-icons/si";
import { MdPlayLesson } from "react-icons/md";

import ListItem from "./ListItem";

import { useSelector, useDispatch } from "react-redux";
import * as Action from "../redux/link_reducer";

function Sidebar() {
  // const [selectedLink, setSelectedLink] = useState("الطلاب");

  const selectedLink = useSelector((state) => state.link.link);
  // console.log(selectedLink);
  const dispatch = useDispatch();

  // console.log(selectedLink);

  const handleLinkClick = (link) => {
    dispatch(Action.setLink(link));
    window.localStorage.setItem("link", JSON.stringify(link));
  };

  return (
    <div className="navigation">
      <ul>
        <ListItem position="sidebar" selectedLink={selectedLink} linkText=" " />
        {/* <ListItem
          position="sidebar"
          selectedLink={selectedLink}
          linkText="الرئيسية"
          handleLinkClick={() => handleLinkClick("الرئيسية")}
          to="/main-dashboard"
          icon={<BsFillPersonFill />}
        /> */}
        <ListItem
          position="sidebar"
          selectedLink={selectedLink}
          linkText="المتدربين"
          handleLinkClick={() => handleLinkClick("المتدربين")}
          to="/users-dashboard"
          icon={<BsFillPersonFill />}
        />
        <ListItem
          position="sidebar"
          selectedLink={selectedLink}
          linkText="الدورات"
          handleLinkClick={() => handleLinkClick("الدورات")}
          to="/quizzes-dashboard"
          icon={<SiTestcafe />}
        />
        <ListItem
          position="sidebar"
          selectedLink={selectedLink}
          linkText="البرامج التدريبية"
          handleLinkClick={() => handleLinkClick("البرامج التدريبية")}
          to="/academic-subjects"
          icon={<MdPlayLesson />}
        />
        <ListItem
          position="sidebar"
          selectedLink={selectedLink}
          linkText="المجالات"
          handleLinkClick={() => handleLinkClick("المجالات")}
          to="/catogeries"
          icon={<BsCalendarDate />}
        />
      </ul>
    </div>
  );
}

export default Sidebar;
