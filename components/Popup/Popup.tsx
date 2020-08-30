import React from 'react'

import styles from './Popup.module.css'

interface PopupProps {
  removeHandler: () => void
  cancelHandler: () => void
  title: string
}

export default function Popup({ removeHandler, cancelHandler, title }: PopupProps) {
  return (
    <div className={styles.popup}>
      <h1>{title}</h1>
      <div className={styles.popup__buttons}>
        <button type="button" className={styles.popup__btn} onClick={removeHandler}>
          Remove
        </button>
        <button type="button" className={styles.popup__btn} onClick={cancelHandler}>
          Cancel
        </button>
      </div>
    </div>
  )
}
