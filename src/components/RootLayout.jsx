import Link from "next/link"
import styles from "@/styles/RootLayout.module.scss"

export default function RootLayout({children}){
    return(
        <>
            <header className={styles.header}>
                <h3>Draw Simulator</h3>
                <Link
                    className={styles.link}
                    href={"/"}>
                        Voltar ao início
                </Link>
            </header>
            {children}
            <footer className={styles.footer}>
                Made with&nbsp;
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#f64348" stroke="#f64348" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                &nbsp;by&nbsp;
                <a href="https://github.com/BernardoCerqueira" target="_blank">@BernardoCerqueira</a>
            </footer>
        </>
    )
}