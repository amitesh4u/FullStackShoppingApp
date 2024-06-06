export function handleRestApiError(error) {
  console.log(error);
  let errCode = error.code;
  let errMessage = "Houston is working on the problem. Please try again later!!";
  if (errCode === 'ERR_NETWORK') {
    errMessage = "Connection Error. Please try again later!!"
  } else if (errCode === 'ERR_BAD_REQUEST') {
    errMessage = error.response.data.errorMessage;
  }
  return errMessage;
}