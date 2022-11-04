/* eslint-disable @next/next/no-img-element */
import styles from "./mc.module.scss";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { hostname } from "../../config/hostname";
import { RequestContext } from "../Request Context/request.context";
import { useMemo } from "react";
// import { toast } from "react-toastify";

const ResultCode = () => {
  const {
    result: code,
    method,
    link,
    setLink,
    setMethod,
    showAv,
    setShowAv,
    handleSubmit,
  } = useContext(RequestContext);
  const [codelist, setcl] = useState([]);
  useEffect(() => {
    const stringcode = JSON.stringify(code, undefined, 4);
    if (stringcode) {
      setcl(stringcode.split("\n"));
    }
  }, [code]);

  const showingLink = useMemo(() => link, [code]);

  const availableLinks = [
    "/advocates",
    "/advocates?query=dennis&page=1&limit=5",
    "/advocates/:username",
    "/companies",
    "/companies/:id",
    "/companies/:id?query=dennis&page=1&limit=5",
  ];

  return (
    <div className={styles["div-header-wrapper"]}>
      <div className={styles["div-header-wrapper__space"]}>
        <div className={styles["header-content"]}>
          <img style={{ width: "40px", height: "40px" }} src="/result-icon.svg" alt="result-icon" />
          <p>Result:</p>
        </div>
        <button
          className={styles["show-button"]}
          onClick={() => {
            setShowAv(!showAv);
          }}
        >
          Show Available Links
        </button>
      </div>
      <div className={styles["search__codebox__getbox"]}>
        <p>
          <span>{method}</span> / {showingLink}
        </p>
      </div>
      <div className={styles["script-box"]}>
        {codelist.length !== 1 && !showAv ? (
          codelist.map((line, i) => {
            return (
              <div className={styles["script-box-content"]} key={i}>
                <div className={styles["script-number"]}>
                  <p className={styles["s-line-num"]}>{i + 1}</p>
                </div>
                <pre className={styles["right-script-text"]}>{`${line}`}</pre>
              </div>
            );
          })
        ) : (
          <>
            <div className={styles["script-box-content"]}>
              <div className={styles["script-number"]}>
                <p className={styles["s-line-num"]}>1</p>
              </div>
              <pre className={styles["right-script-text"]} style={{ color: "#2db1e0" }}>
                # Api End-points available :- (query, page and limit are optional)
              </pre>
            </div>
            {availableLinks.map((item, i) => {
              return (
                <div className={styles["script-box-content"]} key={i}>
                  <div className={styles["script-number"]}>
                    <p className={styles["s-line-num"]}>{i + 2}</p>
                  </div>
                  <pre
                    className={styles["right-script-text"]}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setMethod("GET");
                      setLink(hostname + item);
                    }}
                  >
                    {hostname}
                    {item}
                  </pre>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ResultCode;
