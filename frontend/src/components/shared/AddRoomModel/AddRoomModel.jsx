import React from "react";
import styles from "./AddRoomModel.module.css"
import TextInput from '../TextInput/TextInput'

const AddRoomModel = ({onClose}) => {
   return (
      <div className={styles.modelMask}>
         <div className={styles.modelBody}>
            <div onClick={onClose} className={styles.closeButton}>
               <img src="/images/close.png" alt="close" />
            </div>
            <div className={styles.modelHeader}>
               <h3 className={styles.heading}>Enter the topic to be Discussed</h3>
               <TextInput fullwidth='true'/>
               <h2 className={styles.subHeading}>Room Types</h2>
               <div className={styles.roomTypes}>
                  <div className={styles.typeBox}>
                     <img src="/images/open.png" alt="open" />
                     <span>Open</span>
                  </div>
                  <div className={styles.typeBox}>
                     <img src="/images/social.png" alt="open" />
                     <span>Social</span>
                  </div>
                  <div className={styles.typeBox}>
                     <img src="/images/Lock.png" alt="open" />
                     <span>Open</span>
                  </div>
               </div>
            </div>
            <div className={styles.modelFooter}>
               <h2>Start a room, open to everyone</h2>
               <button>
                  <img src="/images/Emoji-cleb.png" alt="emoji" />
                  Let's go
               </button>
            </div>
         </div>
      </div>
   )
}

export default AddRoomModel