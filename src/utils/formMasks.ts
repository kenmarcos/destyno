export const cpfMask = (value: string) => {
  value = value.replace(/\D/g, "");

  const formattedCpf = value.split("").slice(0, 11);
  const size = formattedCpf.length;

  if (size > 9) {
    return formattedCpf
      .join("")
      .replace(/^(\d{3})(\d{3})(\d{3})(\d{1,})/g, "$1.$2.$3-$4");
  }

  if (size > 6) {
    return formattedCpf
      .join("")
      .replace(/^(\d{3})(\d{3})(\d{1,})/g, "$1.$2.$3");
  }

  if (size > 3) {
    return formattedCpf.join("").replace(/^(\d{3})(\d{1,})/g, "$1.$2");
  }

  return formattedCpf.join("");
};

export const mobilePhoneMask = (value: string) => {
  value = value.replace(/\D/g, "");

  const formattedMobilePhone = value.split("").slice(0, 11);
  const size = formattedMobilePhone.length;

  if (size > 7) {
    return formattedMobilePhone
      .join("")
      .replace(/^(\d{2})(\d{5})(\d{1,})/g, "($1) $2-$3");
  }

  if (size > 2) {
    return formattedMobilePhone
      .join("")
      .replace(/^(\d{2})(\d{1,})/g, "($1) $2");
  }

  return formattedMobilePhone.join("");
};
