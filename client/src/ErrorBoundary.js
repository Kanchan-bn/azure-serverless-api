import React from 'React';

export class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: {} };
    }
  
    componentDidCatch(error, info) {
      // Display fallback UI
      this.setState({ hasError: true, error:error.message });
      // You can also log the error to an error reporting service
    //   logErrorToMyService(error, info);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
        <>
            <h1>Something went wrong.</h1>
            {this.state.error}
        </>
        );
      }
      return this.props.children;
    }
}