import { Component } from 'react';
import css from './Form.module.css';
import PropTypes from 'prop-types';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      number: '',
    };
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    this.props.onSubmit(name, number);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <label htmlFor="name" className={css.label}>
          Imię:
          <input
            id="name"
            value={name}
            onChange={this.handleChange}
            type="text"
            name="name"
            className={css.input}
            pattern="^[a-zA-Z]+([-'\\s][a-zA-Z]+)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder="..."
          />
        </label>
        <label htmlFor="number" className={css.label}>
          Numer telefonu:
          <input
            id="number"
            value={number}
            onChange={this.handleChange}
            type="tel"
            name="number"
            className={css.input}
            pattern="^[a-zA-Z]+([-'\\s][a-zA-Z]+)*$"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit" className={css.button}>
          Dodaj do kontaktów
        </button>
      </form>
    );
  }
}

export default Form;

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
