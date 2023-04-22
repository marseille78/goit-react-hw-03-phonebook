import { Component } from 'react';
import ContactForm from './contact-form';
import Filter from './filter';
import ContactList from './contact-list';

export class App extends Component {

  state = {
    contacts: [],
    filter: '',
  }

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const prevContacts = prevState.contacts;
    const nextContacts = this.state.contacts;

    if (prevContacts !== nextContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  getVisibleItems = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()));
  }

  handleFilter = (text) => {
    this.setState({
      filter: text
    });
  }

  handleAddUser = (user) => {

    const repeated = this.state.contacts.find(({ name }) => name === user.name);

    if (repeated) {
      alert(`${user.name} is already in contacts`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [user, ...contacts]
    }));
  }

  handleDeleteUser = (idUser) => {
    this.setState(({contacts}) => ({
      contacts: contacts.filter(({id}) => idUser !== id),
    }));
  }

  render() {
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onAddUser={this.handleAddUser} />

        <h2>Contacts</h2>
        <Filter onFilter={this.handleFilter}/>
        <ContactList visibleList={this.getVisibleItems()} onDeleteUser={this.handleDeleteUser}/>
      </>
    );
  }
};
