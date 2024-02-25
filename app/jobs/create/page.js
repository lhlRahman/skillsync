"use client";
import AddJob from "@/components/ui/AddJob";
import styles from "../../../styles/CreateJob.module.scss";
import { useEffect } from "react";
export default function CreateJob() {
  // TODO: redirect if the user is not a poster
  useEffect(() => {
    document.title = "SkillSync | Create Job";
  }, []);
  return (
    <main id={styles.createJob}>
      <AddJob />
    </main>
  );
}
