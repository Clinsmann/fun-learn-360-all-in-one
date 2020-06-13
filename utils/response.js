const response = (body, error) => ({message: {body, error}});
const errorMessage = body => ({message: {body, error: true}});
const successMessage = body => ({message: {body, error: false}});

module.exports = {responseMessage: response, errorMessage, successMessage};
