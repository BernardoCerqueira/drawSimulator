import { Button } from "reactstrap";
import Link from "next/link";
import styles from "@/styles/Index.module.scss"

export default function Home() {
  return (
    <main className={styles.indexBody}>
      <div className={styles.background}></div>
      <div className={styles.foreground}>
        <h1 className={styles.h1}>Draw Simulator</h1>
        <p className={styles.p}>Simule os sorteios das suas competições favoritas!</p>
        <Link href="/pot">
          <Button color="success" size="lg">Começar!</Button>
        </Link>
      </div>
    </main>
  )
}
