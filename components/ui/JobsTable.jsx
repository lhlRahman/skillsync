// import styles from "../../styles/JobsJobPoster.module.scss";

import React from "react";
import { BentoGrid, BentoGridItem } from "./bento-grid";

export default function JobsTable({ items }) {
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
        />
      ))}
    </BentoGrid>
  );
}
