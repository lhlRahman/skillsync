"use client";
import Sidebar from "../../components/Sidebar";
import SidebarItem from "../../components/SidebarItem";
import { MdVolunteerActivism } from "react-icons/md";
import { useData } from "@/context/DataContext";
import { isUserPoster } from "@/utils/helpers";
import { FaPlus } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import ApplyModal from "@/components/ui/ApplyModal";
import { MdLeaderboard } from "react-icons/md";

export default function RootLayout({ children }) {
  const { showModal, setShowModal, curJob, user } = useData();

  return (
    <>
      <ApplyModal show={showModal} setShow={setShowModal} job={curJob} />
      <Sidebar show={false}>
        <SidebarItem
          title="Jobs"
          icon="/icons/dashboardIconDark.svg"
          Icon={MdVolunteerActivism}
          link="/jobs"
        />
        {user && user.type && isUserPoster(user) ? (
          <SidebarItem title="Create Job" Icon={FaPlus} link="/jobs/create" />
        ) : (
          <>
            <SidebarItem
              title="Leaderboard"
              Icon={MdLeaderboard}
              link="/jobs/leaderboard"
            />
            <SidebarItem
              title="Jobs Completed"
              Icon={FaHistory}
              link="/jobs/history"
            />
          </>
        )}
      </Sidebar>
      {children}
    </>
  );
}
