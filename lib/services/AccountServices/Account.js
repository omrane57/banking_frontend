import axios from "axios";
export const createAccount = async (userId, bankId) => {
  let response;

  response = await axios.post(
    `http://127.0.0.1:20200/api/v1/user/${userId}/account`,
    { bankId: bankId },
    {
      headers: { auth: localStorage.getItem("auth") },
    }
  );

  return response;
};
export const getAllAccount = async (filterObject, id) => {
  let response;

  response = await axios.get(
    `http://127.0.0.1:20200/api/v1/user/${id}/account`,
    {
      headers: { auth: localStorage.getItem("auth") },
      params: filterObject,
    }
  );

  return response;
};
export const deleteAccount = async (userId, accountId) => {
  const response = await axios.delete(
    `http://127.0.0.1:20200/api/v1/user/${userId}/account/${accountId}`,
    {
      headers: { auth: localStorage.getItem("auth") },
    }
  );

  return response;
};
export const deposite = async (userId, accountId, amount) => {
  const response = await axios.put(
    `http://127.0.0.1:20200/api/v1/user/${userId}/account/${accountId}/transaction/deposite`,
    { amount: amount },
    {
      headers: { auth: localStorage.getItem("auth") },
    }
  );

  return response;
};
export const withDraw = async (userId, accountId, amount) => {
  const response = await axios.put(
    `http://127.0.0.1:20200/api/v1/user/${userId}/account/${accountId}/transaction/withDraw`,
    { amount: amount },
    {
      headers: { auth: localStorage.getItem("auth") },
    }
  );

  return response;
};
export const transfer = async (
  userId,
  accountId,
  transferAmount,
  receiverAccountId
) => {
  const response = await axios.put(
    `http://127.0.0.1:20200/api/v1/user/${userId}/account/${accountId}/transaction/transfer`,
    { transferAmount: transferAmount, receiverAccountId: receiverAccountId },
    {
      headers: { auth: localStorage.getItem("auth") },
    }
  );

  return response;
};
export const userNetworth = async (userId) => {
  const response = await axios.get(
    `http://127.0.0.1:20200/api/v1/user/${userId}/networth`,

    {
      headers: { auth: localStorage.getItem("auth") },
    }
  );

  return response;
};
export const passbook = async (filterObject, userId, accountId) => {
  let response;
  console.log(filterObject, userId, accountId);
  console.log(filterObject);
  response = await axios.get(
    `http://127.0.0.1:20200/api/v1/user/${userId}/account/${accountId}/transaction/passbook`,
    {
      headers: { auth: localStorage.getItem("auth") },
      params: filterObject,
    }
  );

  console.log(response);
  return response;
};
export const getAllPassbookRecord = async (userId, accountId) => {
  let response;

  response = await axios.get(
    `http://127.0.0.1:20200/api/v1/user/${userId}/account/${accountId}/transaction/passbook`,
    {
      headers: { auth: localStorage.getItem("auth") },
    }
  );

  return response;
};
