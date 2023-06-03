export const singleFile = async function (formData) {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL_FILES}upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await response.json();
  return data;
};

export const multiFiles = async function (formData) {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL_FILES}uploads`,
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await response.json();
  return data;
};
