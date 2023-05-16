const helpers = {
    randomString: (len = 100)=>{
        let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomStr = '';
        let length = chars.length;
        for(let i=1; i<=length; i++){
            let posn = Math.floor(Math.random()*(length-1));
            randomStr += chars[posn];
        }
        return randomStr;
    }
}

module.exports = helpers;