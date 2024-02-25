import styles from "../../styles/ApplyModal.module.scss";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";

export default function ApplyModal({ show, setShow, job }) {
  const [inputs, setInputs] = useState({});

  const handleInputChange = (e) => {
    e.persist();
    setInputs((inputs) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    setShow(false);
  };
  return (
    <div id={styles.applyModal} className={`${show ? styles.show : ""}`}>
      <div className={`${styles.modal}`}>
        <div className="flex justify-between items-center">
          <h1>Applying for {job && job.title}</h1>
          <button onClick={() => setShow(false)}>
            <IoIosClose style={{ fontSize: "2rem" }} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Note"
            name="note"
            rows="4"
            className="w-full"
            required
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="w-fit text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 justify-self-end"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
}
