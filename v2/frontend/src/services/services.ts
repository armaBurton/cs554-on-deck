// src/services/services.ts

export const getName = ({
  first_name,
  last_name,
  stage_name,
  email,
}: {
  first_name: string;
  last_name: string;
  stage_name: string;
  email: string;
}) => {
  return stage_name !== null || stage_name !== ""
    ? stage_name
    : (first_name !== null || first_name !== "") &&
        (last_name !== null || last_name !== "")
      ? `${first_name} ${last_name}`
      : email;
};

export const manageTime = (time: string) => {
  time.split(":");
  const split = time.split(":");
  console.log("Split: ", split[0]);
  if (split[0] > "12") {
    const val = Number(split[0]) - 12;

    split[0] = val.toString();

    return `${split[0]}:${split[1]} pm`;
  } else if (split[0] === "12") {
    return `${split[0]}:${split[1]} pm`;
  } else {
    return `${split[0]}:${split[1]} am`;
  }
};
