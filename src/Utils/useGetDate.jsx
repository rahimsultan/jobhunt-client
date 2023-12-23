
const useGetDate = (dateString) => {
    const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const mydate = `${day}-${month}-${year}`;
  return mydate
}

export default useGetDate
