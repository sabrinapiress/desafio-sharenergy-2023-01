import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { useStyles } from "./styled";
import CardMedia from '@material-ui/core/CardMedia';


export default function ModalHttpCat({ open, handleClose, code }) {
  const classes = useStyles();

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener('change', e => setMatches(e.matches));
  }, []);

  return (
    <div>
      {matches && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
        >
          <div>
            <div className={classes.paper}>
              <h2 id="transition-modal-title" className={classes.title}>Status code: {code}</h2>
              <img src={`https://http.cat/${code}`} className={classes.image} />
            </div>
          </div>
        </Modal>)}
      {!matches && (
        <div  className={classes.divmodal}>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
          >
            <div>
              <div className={classes.paper}>
                <h2 id="transition-modal-title" className={classes.title}>Status code: {code}</h2>
                <img src={`https://http.cat/${code}`} className={classes.smallimage} />
              </div>
            </div>
          </Modal>
        </div>)}
    </div>

  );
}
