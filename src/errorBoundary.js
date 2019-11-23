import React from 'react';
import PropTypes from 'prop-types';


export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true}
  }

  render() {
    if (this.state.hasError) {      
      return (
        <div className="errorPage">
          <h2 className="errorMessage">Something went wrong. Please try again later.</h2>
          <img className="errorImage" src="https://media0.giphy.com/media/12BQY6Nj4ZDAFG/giphy.gif" alt="Sorry!"/>
        </div>
      );
    }
    return this.props.children;
  }  
}

ErrorBoundary.propTypes = {
  children: PropTypes.element
};
