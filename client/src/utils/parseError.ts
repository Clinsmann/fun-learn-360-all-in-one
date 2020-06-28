import { AxiosError } from "axios";
import { sentenceCase } from "change-case";

const parseError = (err: AxiosError) => {
  if (err.response && err.response.data && err.response.data.errors) {
    if (Array.isArray(err.response.data.errors)) {
      return `${parseFieldName(err.response.data.errors[0].fieldName)} ${
        err.response.data.errors[0].message
      }`;
    }
    return err.response.data.errors.message;
  } else if (err.response && err.response.data && err.response.data.message) {
    return err.response.data.message;
  }
  //  else if (err.response && err.response.data) {
  //   return err.response.data;
  // }
  else if (err.message) {
    return err.message;
  } else {
    return err;
  }

};

export const parseFieldError = (err: AxiosError) => {
  if (err.response && err.response.data && err.response.data.errors) {
    if (Array.isArray(err.response.data.errors)) {
      return err.response.data.errors.map(
        (e: any) => `${parseFieldName(e.fieldName)} ${e.message}`
      );
    }
    return err.response.data.errors.message;
  } else if (err.response && err.response.data && err.response.data.message) {
    return err.response.data.message;
  }
  //  else if (err.response && err.response.data) {
  //   return err.response.data;
  // }
  else if (err.message) {
    return err.message;
  } else {
    return err;
  }
};

function parseFieldName(val: string) {
  if (!val) return "";
  return sentenceCase(val);
}

export default parseError;
