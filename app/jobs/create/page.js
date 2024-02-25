import AddJob from "@/components/ui/AddJob";
import styles from "../../../styles/CreateJob.module.scss";
export default function CreateJob() {
  // TODO: redirect if the user is not a poster
  return (
    <main id={styles.createJob}>
      <AddJob />
    </main>
  );
}
