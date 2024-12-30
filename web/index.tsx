import React from 'react';

const sendMessageToExtension = () => {
  window.postMessage(
    {
      type: "DATA_FROM_WEB",
      payload: { message: "Hello from the React app!" },
    },
    "*"
  );
};

const App: React.FC = () => (
  <button onClick={sendMessageToExtension}>Click me</button>
);

export default App;
