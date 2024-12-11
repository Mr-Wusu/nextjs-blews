"use client";
import { FaRegUser } from "react-icons/fa";
import styles from "@/styles/components.module.scss";

export default function MenuAndProfile() {

  return (
    <div className={styles.menu_and_profile}>
      <div className={styles.menu}>
        <div className={styles.first_line} />
        <div className={styles.second_line} />
        <p>MENU</p>
      </div>
      <button className={styles.profile}>
        <FaRegUser />
      </button>
    </div>
  );
}
