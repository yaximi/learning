const formatDate = (timeStamp) => {
    let d = new Date(timeStamp * 1000);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let date = d.getDate();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
};

module.exports = {
    formatDate
};