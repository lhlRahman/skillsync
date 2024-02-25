import styles from "../../styles/ApplyModal.module.scss";
import { useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { MdAutoAwesome } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { autoCompleteAPI, genetatePrompt } from "@/utils/helpers";
import { useData } from "@/context/DataContext";
import axios from "axios";

export default function ApplyModal({ show, setShow, job }) {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const noteRef = useRef(null);
  const { data } = useData();

  const handleInputChange = (e) => {
    e.persist();
    setInputs((inputs) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const cohereAutoComplete = async () => {
    setLoading(true);
    const prompt = genetatePrompt({
      description: job.description,
      bio: data.user.bio,
    });
    console.log(prompt);

    const response = await autoCompleteAPI(prompt);
    if (response.success === true) {
      setInputs({ ...inputs, note: response.text });
      noteRef.current.value = response.text;
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    inputs.job = { id: job.id, location: job.location };
    inputs.applicant = {
      id: data.user.id,
      email: data.user.email,
      note: inputs.note,
    };

    const response = await axios
      .post(`/api/apply`, inputs)
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => {
        return {};
      });
    console.log(response);
    setShow(false);
    window.location.replace("/jobs");
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
          <div style={{ position: "relative" }}>
            <textarea
              ref={noteRef}
              placeholder="Note"
              name="note"
              rows="4"
              className="w-full"
              required
              onChange={handleInputChange}
            />
            <span
              style={{
                position: "absolute",
                right: "1rem",
                bottom: "1rem",
                fontSize: "1.5rem",
              }}
            >
              <MdAutoAwesome
                className={`cursor-pointer ${loading && "hidden"}`}
                style
                onClick={cohereAutoComplete}
              />
              <AiOutlineLoading3Quarters
                className={`animate-spin ${!loading && "hidden"}`}
              />
            </span>
          </div>
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
