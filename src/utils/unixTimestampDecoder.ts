const unixTimestampToHumanReadable = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000);

    const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    const formattedDateTime = `${date.toLocaleDateString('en-US', {
        weekday: 'long',
    })} ${month} ${day}, ${hours}:${minutes}`;

    return formattedDateTime;
};

export default unixTimestampToHumanReadable;
