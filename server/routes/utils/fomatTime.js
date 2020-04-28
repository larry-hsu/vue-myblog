const Time = {
    // 获取当前时间戳
    getUnix: function () {
        let date = new Date();
        return date.getTime();
    },

    getYear(time) {
        return time.getFullYear();
    },

    getMonthAndDay(time) {
        let date = new Date(time);
        let month = date.getMonth() + 1 < 10 ? 
                '0' + (date.getMonth() + 1) : 
                date.getMonth() + 1;
        let day = date.getDate() < 10 ?
                '0' + date.getDate():
                date.getDate();
                
        return month + '-' + day;
    },

    // 获取今天0点0分0秒的时间戳
    getTodayUnix: function () {
        let date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },

    // 获取今年1月1日0点0分0秒的时间戳
    getYearUnix: function() {
        let date = new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },

    // 获得标准年月日
    getLastDate: function(time) {
        let date = new Date(time);
        let month = date.getMonth() + 1 < 10 ? 
                '0' + (date.getMonth() + 1) : 
                date.getMonth() + 1;
        let day = date.getDate() < 10 ?
                '0' + date.getDate():
                date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
    },

    // 转换时间
    getFormatTime: function(timestamp) {
        let now = this.getUnix();
        let today = this.getTodayUnix();
        let year = this.getYearUnix();
        let timer = (now - timestamp) / 1000;
        let tip = '';

        if(timer <= 0 || Math.floor(timer/60)<=0) tip = 'Just Now';
        else if(timer < 3600) tip = `${Math.floor(timer / 60)} Minutes Ago`;
        else if(timer>=3600 && (timestamp - today >= 0)) tip = `${Math.floor(timer/3600)} Hours Ago`;
        else if(timer/86400<=31) tip =`${Math.ceil(timer/86400)} Days Ago`;
        else tip = this.getLastDate(timestamp);

        return tip;
    }
}

module.exports = Time;
