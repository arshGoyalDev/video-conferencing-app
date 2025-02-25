const generateMeetLink = () => {
  let result = " ";

  const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=}{][|?/';:,><~`";

  const charactersLength = characters.length;

  for (let i = 0; i < 30; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  const meetLink = `/meet/${result.slice(1, 20)}`;

  return meetLink;
};

export { generateMeetLink };
