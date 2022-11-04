import styles from "../styles/Home.module.scss";
import Search from "../components/Search/search.component";
import ResultCode from "../components/Result/mc.component";
import { RequestSetContext } from "../components/Request Context/request.context";

export default function Home() {
  return (
    <RequestSetContext>
      <div className={styles["search"]}>
        <div className={styles["search__header"]}>ExpressJS REST Api (for Advocates)</div>
        <div className={styles["search__codebox"]}>
          <Search />
          <ResultCode />
        </div>
      </div>
    </RequestSetContext>
  );
}
