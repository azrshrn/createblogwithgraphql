import styles from "../styles/BlogCard.module.css"
import Link from "next/link"
import Image from "next/image"

export default function BlogCard({ title, coverPhoto, slug }) {
    const imgStyle = {
        borderRadius: "15px"
    }
    return (
        <Link href={`posts/${slug}`}>
            <div className={styles.card}>
                <div className={styles.imgContainer}>
                    <h1 className={styles.title}>{title}</h1>
                    <div className={styles.overlay}></div>
                    <Image src={coverPhoto} alt="" layout="responsive" width={3} height={4} style={imgStyle} />
                </div>
            </div>
        </Link>
    )
}