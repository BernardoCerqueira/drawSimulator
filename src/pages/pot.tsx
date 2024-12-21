import { Col } from "reactstrap"
import { useContext } from "react"
import Link from "next/link"
import styles from "@/styles/Pot.module.scss"
import RootLayout from "@/components/RootLayout"
import { Context } from "@/contexts/Context"

export default function Pot(){
    const context = useContext(Context)

    async function handleClick(booleanValue: boolean) {
        if(booleanValue){
            context.setPot(true)
        }else{
            context.setPot(false)
        }
    }

    return(
        <RootLayout>
            <main className={styles.main}>
                <h2 className={styles.h2}>Selecione o tipo de sorteio:</h2>
                <Col className={styles.column}>
                    <Link
                    href={"/teams"}
                    className={styles.a}
                    onClick={() => handleClick(false)}>
                        <p>Sem potes</p>
                    </Link>
                    <Link
                    href={"/teams"}
                    className={styles.a}
                    onClick={() => handleClick(true)}>
                        <p>Com potes</p>
                    </Link>
                </Col>
            </main>
        </RootLayout>
    )
}