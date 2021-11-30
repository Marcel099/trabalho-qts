import { OngsTable } from "../OngsTable";

import styles from "./styles.module.scss";

export function Dashboard() {
  return (
    <main className={styles.container}>
      <OngsTable />
    </main>
  )
}