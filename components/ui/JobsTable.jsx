// import styles from "../../styles/JobsJobPoster.module.scss";

import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "./bento-grid";
import { useData } from "@/context/DataContext";

export default function JobsTable({ items }) {
  const { user } = useData();
  const [appliedJobs, setAppliedJobs] = useState(user.appliedJobs);

  useEffect(() => {
    if (user.appliedJobs) setAppliedJobs(user.appliedJobs);
  }, [user]);

  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          link={item.link}
          completed={item.completed}
          neededApplicants={item.neededApplicants}
          acceptedApplicants={item.acceptedApplicants}
          id={item.data.id}
          appliedJobs={appliedJobs}
        />
      ))}
    </BentoGrid>
  );
}
