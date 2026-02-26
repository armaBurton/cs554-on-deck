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
