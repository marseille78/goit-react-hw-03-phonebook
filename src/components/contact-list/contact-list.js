import React from 'react';
import PropTypes from 'prop-types';

import css from './contact-list.module.css';

const ContactList = ({ visibleList, onDeleteUser }) => {

  const listContacts = visibleList.map(({id, name, number}) => {
    return (
      <li key={id} className={css.item}>
        {name}: <span className={css.value}>{number}</span>
        <button
          className={css.btn}
          type="button"
          onClick={() => onDeleteUser(id)}
        >
          Delete
        </button>
      </li>
    );
  });

  return (
    <ul>
      { listContacts }
    </ul>
  );
};

ContactList.propTypes = {
  visibleList: PropTypes.arrayOf(PropTypes.object),
  onDeleteUser: PropTypes.func.isRequired,
};

export default ContactList;
