import styles from "./search.module.scss";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { RequestContext } from "../Request Context/request.context";

export default function Search() {
  const options = [
    { value: "GET", label: "GET", isDisabled: false },
    { value: "POST", label: "POST", isDisabled: false },
    { value: "PUT", label: "PUT", isDisabled: true },
    { value: "DELETE", label: "DELETE", isDisabled: true },
  ];
  const [option, setOption] = useState("GET");
  const { setMethod, link, setLink, handleSubmit } = useContext(RequestContext);

  useEffect(() => {
    setMethod(option);
  }, [option, setMethod]);

  return (
    <div className={styles["search__wrapper"]}>
      <div className={styles["search__wrapper__dropdown"]} style={{ cursor: "pointer" }}>
        <Select
          options={options}
          onChange={(option) => {
            setOption(option.value);
          }}
          value={options.filter((item) => {
            return item.value === option;
          })}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary: "#415562",
            },
          })}
        />
      </div>
      <input
        className={styles["search__wrapper__input"]}
        placeholder="Send HTTP Request Here"
        type="text"
        value={link}
        onChange={(e) => {
          setLink(e.target.value);
        }}
      />
      <button className={styles["search__wrapper__button"]} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
