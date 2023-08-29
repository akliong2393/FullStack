import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import styles from "../styles/modules/app.module.scss";
import ContactItem from "./ContactItem";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AppContent() {
  const contactList = useSelector((state: any) => state.contact.contactList);
  const filterStatus = useSelector((state: any) => state.contact.filterStatus);

  const sortedContactList = [...contactList];
  sortedContactList.sort(
    (a, b) => new Date(b.time).getDate() - new Date(a.time).getDate()
  );

  const filteredContactList = sortedContactList.filter((item) => {
    if (filterStatus === "all") {
      return true;
    }
    var result = filterStatus === "Starred" ? true : false;
    return item.isStarred === result;
  });

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filteredContactList && filteredContactList.length > 0 ? (
          filteredContactList.map((contact) => (
            <ContactItem key={contact.id} contact={contact} />
          ))
        ) : (
          <motion.p variants={child} className={styles.emptyText}>
            No Contacts
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;