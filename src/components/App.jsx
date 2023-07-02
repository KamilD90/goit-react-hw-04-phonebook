import Form from './form/Form.jsx';
import ContactList from './ContactList/ContactList.jsx';
import Filter from './filter/Filter.jsx';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';

const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
  name: '',
  number: '',
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      ...INITIAL_STATE,
    };
  }

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate() {
    const { contacts } = this.state;
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  filterContacts = value => {
    this.setState({ filter: value });
  };

  deleteContact = id => {
    this.setState(
      prevState => ({
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      }),
      () => {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
    );
  };

  addContact = (name, number) => {
    const { contacts } = this.state;

    const doesContactExist = contacts.some(
      c => c.name.toLowerCase() === String(name).toLowerCase()
    );

    if (doesContactExist) {
      alert('Kontakt o takim imieniu już istnieje!');
      return;
    }

    const newContact = { id: nanoid(), name, number };
    this.setState({ contacts: [...contacts, newContact] });
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <div className={css.wrapper}>
        <Form
          onSubmit={(name, number) => {
            this.addContact(name, number);
          }}
        />
        <Filter filterContacts={this.filterContacts} />
        <ContactList
          contacts={contacts}
          filter={filter}
          deleteContact={this.deleteContact}
        ></ContactList>
      </div>
    );
  }
}

export default App;
