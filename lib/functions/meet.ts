const generateMeetLink = () => {
  let result = " ";

  const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const charactersLength = characters.length;

  for (let i = 0; i < 20; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  // console.log(result[0]);

  const meetLink = `${process.env.NEXT_PUBLIC_SITE_URL}/meet/${result.slice(1, 20)}`;

  return meetLink;
};

export { generateMeetLink };
