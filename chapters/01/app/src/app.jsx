class App {
  render() {
    const greetings = 'Hello';

    return (
      <h1>{ greetings }
        <span style={ fontWeight: 'bold' }>world</span>
      </h1>
    );
  }
}
