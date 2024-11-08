// Error message handling

const handleError = (errorMessage) => {
  // Display error message
  const errorDiv = document.querySelector('.error-msg-div');
  const errorMsg = document.querySelector('.error-msg');

  errorMsg.textContent = errorMessage;
  errorDiv.style.display = 'flex';

  // Hide after 10s
  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 10000);
};

export default handleError;
