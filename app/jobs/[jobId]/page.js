"use client";
import Job from "@/components/ui/Job";
import styles from "../../../styles/EachJob.module.scss";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function EachJob() {
  const { jobId } = useParams();

  useEffect(() => {
    document.title = "SkillSync | Job Details";
  }, []);

  return (
    <main id={styles.eachJob}>
      <Job jobid={jobId} />
    </main>
  );
}
