import Job from "@/components/ui/Job";
import styles from "../../../styles/EachJob.module.scss";
export default function EachJob() {
  // TODO: redirect if the user is not a poster
  return (
    <main id={styles.eachJob}>
      <Job />
    </main>
  );
}
