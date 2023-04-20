import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import css from './contact-form.module.css';

class ContactForm extends Component {

  state = {
    name: '',
    number: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.isInvalid()) return;

    const user = {
      id: nanoid(),
      ...this.state,
    };

    this.props.onAddUser(user);

    this.clearForm();
  }

  handleInput = (e) => {
    const target = e.target;
    this.setState({ [target.name]: target.value });
  }

  clearForm = () => {
    this.setState({
      name: '',
      number: '',
    })
  }

  isInvalid = () => {
    const {name, number} = this.state;
    return !(name.length > 0 && number.length > 0)
  }

  render() {
    const {name, number} = this.state;

    return (
      <div className={css.container}>
        <form onSubmit={this.handleSubmit}>
          <label>
            <h3>Name</h3>
            <input
              className={css.field}
              type='text'
              name='name'
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={this.handleInput}
            />
          </label>

          <label>
            <h3>Number</h3>
            <input
              className={css.field}
              type='tel'
              name='number'
              pattern='\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}'
              title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
              required
              value={number}
              onChange={this.handleInput}
            />
          </label>

          <div className={css.btnBlock}>
            <button
              className={css.btn}
              type='submit'
              disabled={this.isInvalid()}
            >
              Add contact
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  onAddUser: PropTypes.func.isRequired
};

export default ContactForm;
